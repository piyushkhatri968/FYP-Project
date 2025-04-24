import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const MONGO_URI = "mongodb+srv://pawankumar:pawankumar@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project";

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    seedData();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  userType: String,
  recruiterDetails: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
  __v: Number
});

const recruiterSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  position: String,
  department: String,
  companyAddress: String,
  companyName: String,
  contactNumber: String,
  createdAt: Date,
  updatedAt: Date,
  __v: Number
});

const jobPostSchema = new mongoose.Schema({
  title: String,
  department: String,
  location: String,
  description: String,
  experience: String,
  skills: [String],
  slug: String,
  jobType: String,
  postedBy: mongoose.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date,
  __v: Number
});

// Models
const User = mongoose.model('User', userSchema);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);
const JobPost = mongoose.model('JobPost', jobPostSchema);

// Technical roles and data pools
const techJobTitles = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "DevOps Engineer", "Software Engineer", "Mobile App Developer",
  "Cloud Engineer", "Data Engineer", "Machine Learning Engineer", "Cybersecurity Analyst"
];

const techSkills = [
  "React", "Node.js", "Docker", "AWS", "Python", "Kubernetes", "TypeScript",
  "MongoDB", "GraphQL", "CI/CD", "Next.js", "PostgreSQL", "Jenkins", "Express.js"
];

const pakistaniCities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Peshawar",
  "Multan", "Quetta", "Sialkot", "Hyderabad"
];

// Seeder
async function seedData() {
  try {
    const users = [];
    const recruiters = [];
    const jobposts = [];

    for (let i = 0; i < 100; i++) {
      const hashedPassword = await bcrypt.hash("12345678", 10);
      const userId = new mongoose.Types.ObjectId();
      const recruiterId = new mongoose.Types.ObjectId();
      const now = new Date();

      const jobTitle = faker.helpers.arrayElement(techJobTitles);
      const selectedSkills = faker.helpers.arrayElements(techSkills, 3);
      const city = faker.helpers.arrayElement(pakistaniCities);

      const user = {
        _id: userId,
        name: faker.person.fullName(),
        username: `recruiter_${i}`,
        email: faker.internet.email(),
        password: hashedPassword,
        profilePicture: faker.image.avatar(),
        userType: 'recruiter',
        recruiterDetails: recruiterId,
        createdAt: now,
        updatedAt: now,
        __v: 0
      };

      const recruiter = {
        _id: recruiterId,
        userId: userId,
        position: faker.person.jobTitle(),
        department: 'IT',
        companyAddress: faker.location.streetAddress(),
        companyName: faker.company.name(),
        contactNumber: faker.phone.number('03#########'),
        createdAt: now,
        updatedAt: now,
        __v: 0
      };

      const jobPost = {
        title: jobTitle,
        department: 'IT',
        location: city,
        description: `We are looking for a ${jobTitle.toLowerCase()} with experience in ${selectedSkills.join(", ")}. Strong problem-solving and teamwork skills are essential.`,
        experience: '1-3 years',
        skills: selectedSkills,
        slug: faker.helpers.slugify(`${jobTitle}-${city}-${selectedSkills.join('-')}`).toLowerCase(),
        jobType: 'Remote',
        postedBy: userId,
        createdAt: now,
        updatedAt: now,
        __v: 0
      };

      users.push(user);
      recruiters.push(recruiter);
      jobposts.push(jobPost);
    }

    await User.insertMany(users);
    await Recruiter.insertMany(recruiters);
    await JobPost.insertMany(jobposts);

    console.log("✅ Seeded 100 users, recruiters, and technical jobposts successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    mongoose.connection.close();
  }
}
