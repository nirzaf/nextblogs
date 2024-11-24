"use client";

import Image from "next/image";
import Link from "next/link";
import { Coffee, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Profile Header */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div 
            className="relative w-48 h-48 mx-auto mb-8"
            variants={fadeIn}
          >
            <Image
              src="https://ik.imagekit.io/fazrinphcc/myprofilepic%20-%20crpped.jpg?updatedAt=1725949317901"
              alt="M.F.M Fazrin"
              fill
              className="rounded-full object-cover shadow-lg ring-4 ring-white dark:ring-gray-700"
            />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400"
            variants={fadeIn}
          >
            M.F.M Fazrin
          </motion.h1>
          <motion.h2 
            className="text-2xl text-gray-600 dark:text-gray-300 mb-6"
            variants={fadeIn}
          >
            MSc in Software Engineering
          </motion.h2>
          <motion.div 
            className="flex justify-center items-center space-x-6 mb-8"
            variants={fadeIn}
          >
            <Link 
              href="https://github.com/nirzaf" 
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <Github className="w-8 h-8" />
            </Link>
            <Link 
              href="https://linkedin.com/in/mfmfazrin" 
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <Linkedin className="w-8 h-8" />
            </Link>
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm font-medium"
            variants={fadeIn}
          >
            <div className="flex items-center space-x-2">
              <span className="text-primary-500">📍</span>
              <span>Al Sadd, Doha, Qatar</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-primary-500">📞</span>
              <span>+97433253203 | +94772049123</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-primary-500">✉️</span>
              <span>mfmfazrin1986@gmail.com</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Buy Me A Coffee Section */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#07091c] to-[#4d9fff] p-8 mb-16 text-white"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Support My Work</h3>
            <p className="text-blue-50 mb-6 max-w-lg">
              Your contribution helps me create more content and improve this blog. Every coffee counts! ☕
            </p>
            <Link
              href="#"
              className="inline-flex items-center space-x-2 bg-white text-[#07091c] px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Coffee className="w-5 h-5" />
              <span>Buy me a coffee</span>
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07091c]/30 to-[#4d9fff]/30 backdrop-blur-[2px]" />
        </motion.div>

        {/* Summary Section */}
        <motion.section 
          className="mb-16"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Summary</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              As a Senior Software Development Specialist at the Primary Health Care Corporation in Qatar, 
              I develop robust, high-concurrency web applications with a strong focus on delivering a 
              seamless and positive end-user experience.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mt-4">
              With over a decade of experience in software engineering, I have a proven track record of 
              delivering high-quality solutions across diverse industries. My technical proficiency spans 
              a wide range of technologies, and I am adept at quickly learning and adapting to new challenges.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          className="mb-16"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "C#/.NET Core",
              "ASP.NET Core",
              "Angular",
              "Azure Cloud Services",
              "SQL Server",
              "Microservices",
              "REST API",
              "Agile Methodologies",
              "Leadership & Mentoring"
            ].map((skill) => (
              <motion.div
                key={skill}
                variants={fadeIn}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <p className="relative z-10 font-medium text-center">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Work Experience Section */}
        <motion.section 
          className="mb-16"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Experience</h2>
          {workExperience.map((job, index) => (
            <motion.div 
              key={index} 
              className="mb-12 last:mb-0"
              variants={fadeIn}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{job.period}</p>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{job.company}</p>
              {job.projects.map((project, pIndex) => (
                <div key={pIndex} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-lg mb-4">{project.name}</h4>
                  <ul className="space-y-3">
                    {project.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.section>

        {/* Education & Qualifications */}
        <motion.section
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">MSc in Software Engineering</h4>
                  <p className="text-gray-600 dark:text-gray-300">Kingston University</p>
                </div>
                <div>
                  <h4 className="font-semibold">BE in Software Engineering</h4>
                  <p className="text-gray-600 dark:text-gray-300">London Metropolitan University</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">IELTS Academic</h4>
                  <p className="text-gray-600 dark:text-gray-300">7.5 Average</p>
                </div>
                <div>
                  <h4 className="font-semibold">Microsoft Azure Developer Associate (AZ-204)</h4>
                  <p className="text-gray-600 dark:text-gray-300">Azure Cloud Platform Specialist</p>
                </div>
                <div>
                  <h4 className="font-semibold">Udemy Certifications</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4">
                    <li>Power Automate</li>
                    <li>Power Apps</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

const workExperience = [
  {
    title: "Software Development Specialist",
    company: "Primary Health Care Corporation (Qatar)",
    period: "July 2022 - Present",
    projects: [
      {
        name: "Nar'aakom Mobile Application",
        details: [
          "Migrated REST APIs to GraphQL, integrated Azure Active Directory for authentication, and optimized query performance with Azure Redis caching.",
          "Migrated data from SQL Server to a FHIR (Fast Healthcare Interoperability Resources) database.",
          "Developed an Open API system to allow third-party service integrations."
        ]
      }
    ]
  },
  {
    title: "Senior Full-stack Engineer",
    company: "Quadrate Tech Solutions Private Limited",
    period: "July 2020 - June 2022",
    projects: [
      {
        name: "Hotel ERP Solution",
        details: [
          "Developed and maintained the administration module, handling user authentication, authorization, and configuration of modules.",
          "Deployed a mail service and SMS gateway using Azure Functions and Logic Apps for user communication and third-party integrations.",
          "Increased system scalability by synchronizing legacy data from SQL Server to Cosmos Database using SQL API.",
          "Developed user interfaces using Angular and integrated microservices using Azure Service Bus and RabbitMQ.",
          "Implemented CI/CD pipelines using Azure DevOps."
        ]
      }
    ]
  },
  {
    title: "Dot NET Engineer",
    company: "Voigue Private Limited",
    period: "Nov 2019 - June 2020",
    projects: [
      {
        name: "SmartPABX System",
        details: [
          "Developed Backend API with .NET Core and Updated the existing PABX legacy system to the latest version.",
          "User interface optimized completely by converting WinForms to WPF and enabled Dynamic User interface functions."
        ]
      }
    ]
  }
];
