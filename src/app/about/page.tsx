"use client";

import Image from "next/image";
import Link from "next/link";
import { Coffee, Github, Linkedin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image
            src="https://ik.imagekit.io/fazrinphcc/myprofilepic%20-%20crpped.jpg?updatedAt=1725949317901"
            alt="M.F.M Fazrin"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">M.F.M Fazrin</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">MSc in Software Engineering</h2>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <Link href="https://github.com/nirzaf" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="https://linkedin.com/in/mfmfazrin" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <p>📍 Al Sadd, Doha, Qatar</p>
          <p>📞 +97433253203 | +94772049123</p>
          <p>✉️ mfmfazrin1986@gmail.com</p>
        </div>
      </div>

      {/* Buy Me A Coffee Section */}
      <div className="bg-yellow-50 dark:bg-gray-800 rounded-lg p-6 mb-12 text-center">
        <h3 className="text-xl font-bold mb-2">Buy Me A Coffee</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your contribution helps me create more content and improve this blog.
        </p>
        <Link
          href="#"
          className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Coffee className="w-5 h-5" />
          <span>Buy me a coffee</span>
        </Link>
      </div>

      {/* Summary Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            As a Senior Software Development Specialist at the Primary Health Care Corporation in Qatar, 
            I develop robust, high-concurrency web applications with a strong focus on delivering a 
            seamless and positive end-user experience.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            With over a decade of experience in software engineering, I have a proven track record of 
            delivering high-quality solutions across diverse industries. My technical proficiency spans 
            a wide range of technologies, and I am adept at quickly learning and adapting to new challenges.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            I am seeking a challenging role where I can leverage my expertise and passion for innovation 
            to contribute to the development of impactful software.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Top Skills</h2>
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
            <div
              key={skill}
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-center"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        {workExperience.map((job, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {job.company} | {job.period}
            </p>
            {job.projects.map((project, pIndex) => (
              <div key={pIndex} className="mb-4">
                <h4 className="font-semibold">{project.name}</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {project.details.map((detail, dIndex) => (
                    <li key={dIndex} className="ml-4">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">MSc in Software Engineering</h3>
            <p className="text-gray-600 dark:text-gray-300">Kingston University</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">BE in Software Engineering</h3>
            <p className="text-gray-600 dark:text-gray-300">London Metropolitan University</p>
          </div>
        </div>
      </section>

      {/* Other Qualifications Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Other Qualifications</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">International English Language Testing System (IELTS) (Academic)</h3>
            <p className="text-gray-600 dark:text-gray-300">7.5 Average</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Microsoft Azure Developer Associate (AZ-204)</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Completed an instructor-led training program on developing solutions using Microsoft Azure cloud platform.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Udemy Certifications</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4">
              <li>Power Automate - Workflow automation tool</li>
              <li>Power Apps - Low-code application development platform</li>
            </ul>
          </div>
        </div>
      </section>
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
        name: "Project: Nar'aakom Mobile Application (Backend Services)",
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
        name: "Project: Hotel ERP (SaaS-based ERP Solution for hotels)",
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
        name: "Project: SmartPABX - Cloud-Based Phone System",
        details: [
          "Developed Backend API with .NET Core and Updated the existing PABX legacy system to the latest version.",
          "User interface optimized completely by converting WinForms to WPF and enabled Dynamic User interface functions."
        ]
      }
    ]
  }
];
