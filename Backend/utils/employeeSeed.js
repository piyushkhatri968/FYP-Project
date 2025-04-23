import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import User from "../Models/user.model.js";
import Candidate from "../Models/candidate.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const jobRoles = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Redux",
  ],
  "Backend Developer": [
    "Node.js",
    "Express",
    "MongoDB",
    "Flask",
    "PostgreSQL",
    "REST APIs",
  ],
  "MERN Stack Developer": [
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "Redux Toolkit",
  ],
  "Software Engineer": [
    "Java",
    "C++",
    "Data Structures",
    "OOP",
    "System Design",
    "Git",
  ],
  "DevOps Engineer": [
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Linux",
    "Jenkins",
  ],
  "AI/ML Engineer": [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
  ],
  "Java Developer": [
    "Java",
    "Spring Boot",
    "Hibernate",
    "MySQL",
    "REST APIs",
    "Maven",
  ],
  "Python Developer": [
    "Python",
    "Flask",
    "Django",
    "SQLAlchemy",
    "APIs",
    "FastAPI",
  ],
  "Full Stack Developer": [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Tailwind CSS",
  ],
  "Data Scientist": [
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Machine Learning",
    "Statistics",
  ],
  "Cybersecurity Analyst": [
    "Kali Linux",
    "Nmap",
    "Wireshark",
    "Metasploit",
    "Burp Suite",
  ],
  "Cloud Engineer": ["AWS", "Azure", "GCP", "Terraform", "Docker", "CI/CD"],
  "Mobile App Developer": [
    "React Native",
    "Flutter",
    "Android",
    "iOS",
    "Firebase",
  ],
  "Blockchain Developer": [
    "Solidity",
    "Ethereum",
    "Smart Contracts",
    "Web3.js",
    "Hardhat",
  ],
  "Game Developer": ["Unity", "C#", "Blender", "Unreal Engine", "Game Physics"],
};

const positions = Object.keys(jobRoles);

const pakistaniCities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Multan",
  "Faisalabad",
  "Quetta",
  "Peshawar",
  "Hyderabad",
  "Mirpurkhas",
  "Mithi",
  "Umerkot",
];

const qualifications = [
  "BSCS",
  "BSIT",
  "BSSE",
  "MSCS",
  "MCS",
  "BS Data Science",
  "MS Data Science",
];
const specializations = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Data Science",
];
const experienceFormats = ["1", "2", "3", "4", "1-2", "1-3", "2-3"];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using environment variable for URI
    await mongoose.connect(
      "mongodb+srv://piyushkhatri968:wh2Z0AIFwFUJZm8x@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project"
    );
    console.log("✅ MongoDB Connected");

    // Clear previous data
    await User.deleteMany();
    await Candidate.deleteMany();

    for (let i = 0; i < 100; i++) {
      const name = faker.person.fullName();
      const username = faker.internet
        .username({ firstName: name.split(" ")[0] })
        .toLowerCase();
      const email = faker.internet
        .email({ firstName: name.split(" ")[0] })
        .toLowerCase();
      const password = await bcrypt.hash("12345678", 10); // Hashing the password
      const userType = "employee";
      const profilePicture = faker.image.avatar();

      const position = faker.helpers.arrayElement(positions);
      const skills = jobRoles[position];
      const city = faker.helpers.arrayElement(pakistaniCities);
      const qualification = faker.helpers.arrayElement(qualifications);
      const specialization = faker.helpers.arrayElement(specializations);
      const experience = faker.helpers.arrayElement(experienceFormats);

      // Create user first to get its _id
      const user = new User({
        name,
        username,
        email,
        password,
        profilePicture,
        userType,
      });

      const savedUser = await user.save();

      // Create candidate with reference to user _id
      const candidate = new Candidate({
        userId: savedUser._id, // Assign the user _id to userId
        phone: faker.phone.number("03#########"),
        language: faker.helpers.arrayElement(["English", "Urdu"]),
        age: faker.number.int({ min: 18, max: 45 }),
        location: {
          country: "Pakistan",
          city,
          zipCode: faker.number.int({ min: 10000, max: 99999 }),
          province: faker.location.state(),
        },
        skills,
        position,
        education: [
          {
            qualification,
            specialization,
            institution: faker.company.name(),
          },
        ],
        experience,
        resume: faker.internet.url(),
      });

      await candidate.save();

      // Update the user with the candidateDetails reference (candidate._id)
      savedUser.candidateDetails = candidate._id;
      await savedUser.save();
    }

    console.log("🎉 Seeded 100 users successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
