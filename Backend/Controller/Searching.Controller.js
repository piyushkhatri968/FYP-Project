import compareTwoStrings from 'similarity';
import natural from 'natural';
import mongoose from 'mongoose';
const { stem } = natural.PorterStemmer;

const techJobTitles = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "DevOps Engineer", "Software Engineer", "Mobile App Developer",
  "Cloud Engineer", "Data Engineer", "Machine Learning Engineer", "Cybersecurity Analyst"
];

const techSkills = [
  "React", "Node.js", "Docker", "AWS", "Python", "Kubernetes", "TypeScript",
  "MongoDB", "GraphQL", "CI/CD", "Next.js", "PostgreSQL", "Jenkins", "Express.js"
];

// --- Handle common variations and abbreviations ---
const termVariations = {
  "react": ["reactjs", "react.js"],
  "node.js": ["node", "nodejs"],
  "typescript": ["ts"],
  "javascript": ["js"],
  "machine learning": ["ml", "machinelearning"]
};

const dictionaryTerms = [
  ...techJobTitles.map(t => t.toLowerCase()),
  ...techSkills.map(s => s.toLowerCase())
];

const allTerms = [...dictionaryTerms];
Object.entries(termVariations).forEach(([term, variations]) => {
  allTerms.push(...variations);
});

const spellcheck = new natural.Spellcheck(allTerms);

export const AdvanceJobSearch = async (req, res, next) => {
  try {
    const { position, location, skills, experience } = req.body;

    if (!position && !location && !skills && !experience) {
      return res.status(400).json({
        error: "At least one search parameter is required"
      });
    }

    let allJobs = await mongoose.model('JobPost').find({});

    const processed = {
      position: position ? processSearchTerm(position) : null,
      location: location ? processSearchTerm(location) : null,
      skills: skills
        ? (Array.isArray(skills) ? skills : [skills]).map(processSearchTerm)
        : null,
      experience: experience ? normalizeExperience(experience) : null,
    };

    // Pre-filter jobs by location if location is provided
    if (processed.location) {
      allJobs = allJobs.filter((job) => {
        const locSim = compareTwoStrings(
          processJobText(job.location),
          processed.location
        );
        return locSim > 0.7;  // Lowered threshold for better matching
      });
    }

    const scoredJobs = allJobs.map((job) => {
      let score = 0;
      let matches = {};

      // --- Position Matching ---
      if (processed.position) {
        const titleSim = compareTwoStrings(
          processJobText(job.title),
          processed.position
        );
        score += titleSim * 0.5;
        matches.position = { score: titleSim, term: processed.position };
      }

      // --- Skills Matching ---
      if (processed.skills && job.skills?.length) {
        const skillScores = processed.skills.map((searchSkill) => {
          const maxScore = Math.max(
            ...job.skills.map((jobSkill) =>
              compareTwoStrings(processJobText(jobSkill), searchSkill)
            )
          );
          return maxScore > 0.3 ? maxScore : 0;
        });

        const avgSkillScore =
          skillScores.reduce((a, b) => a + b, 0) / skillScores.length;
        score += avgSkillScore * 0.3;
        matches.skills = { score: avgSkillScore, terms: processed.skills };
      }

      // --- Location Matching ---
      if (processed.location) {
        const locationSim = compareTwoStrings(
          processJobText(job.location),
          processed.location
        );
        score += locationSim * 0.1;
        matches.location = { score: locationSim };
      }

      // --- Experience Matching ---
      if (processed.experience) {
        const jobExp = parseInt(job.experience) || 0;
        const expDiff = Math.abs(jobExp - processed.experience);
        const expScore = 1 - Math.min(expDiff / 5, 1);
        score += expScore * 0.1;
        matches.experience = { score: expScore, diff: expDiff };
      }

      return {
        ...job.toObject(),
        relevanceScore: parseFloat(score.toFixed(2)),
        _matches: matches
      };
    });

    // Handle filtering & sorting differently if only location is searched
    let results;
    if (processed.location && !processed.position && !processed.skills && !processed.experience) {
      // Only location search: just sort by relevanceScore descending, no filter
      results = scoredJobs.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } else {
      // Normal filter & sort for multi-criteria search
      results = scoredJobs
        .filter((job) => job.relevanceScore > 0.15)
        .sort((a, b) => {
          if (Math.abs(a.relevanceScore - b.relevanceScore) < 0.05) {
            return (b.experience || 0) - (a.experience || 0);
          }
          return b.relevanceScore - a.relevanceScore;
        });
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

// --- UTILITY FUNCTIONS ---

function processSearchTerm(term) {
  if (!term) return '';

  term = term.toLowerCase().replace(/[-/]/g, ' ');

  // Normalize abbreviations
  if (term === 'js') return 'javascript';
  if (term === 'ts') return 'typescript';
  if (term === 'ml') return 'machine learning';

  // Correct spelling
  if (!spellcheck.isCorrect(term)) {
    const corrections = spellcheck.getCorrections(term, 1);
    if (corrections.length > 0) term = corrections[0];
  }

  return stem(term);
}

function processJobText(text) {
  return text?.toLowerCase().trim() || '';
}

function normalizeExperience(exp) {
  const match = exp.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}
