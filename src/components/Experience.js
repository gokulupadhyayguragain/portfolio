"use client";
import Section from "./Section";

const experiences = [
  {
    company: "Fusemachines",
    date: "May 2025 - Present",
    role: "AI Fellowship (Microdegree™ in AI and Data Science)",
    details: [
      "Selected for the prestigious Fusemachines AI Fellowship with a full scholarship.",
      "Hands-on experience in ML, Deep Learning, and Data Science through expert-led training and real-world projects.",
      "Working on individual & collaborative AI solutions focusing on data preprocessing, model development, and deployment."
    ],
    icon: "🤖",
    type: "Fellowship"
  },
  {
    company: "Adex International",
    date: "Nov 2024 – Feb 2025",
    role: "Cloud Apprenticeship – AWS Solutions Architect",
    details: [
      "Completed a structured cloud apprenticeship focused on AWS-based architectures.",
      "Hosted static and dynamic websites using Amazon S3, CloudFront, and EC2 with Apache Web Server.",
      "Designed a 3-tier web application architecture using EC2, SQS, and DynamoDB inside a custom VPC.",
      "Built a decoupled backend system by integrating SQS and SNS for scalable asynchronous processing."
    ],
    icon: "🏗️",
    type: "Apprenticeship"
  },
  {
    company: "Sudur Debug",
    date: "Sep 2024 – Nov 2024",
    role: "Web Developer Intern (React, Express, MongoDB)",
    details: [
      "Worked on frontend & backend development using React, Express & MongoDB for a local business website project.",
      "Designed responsive UI components and developed RESTful APIs to support user interaction and data flow.",
      "Collaborated with cross-functional teams to deliver high-quality web solutions within project timelines."
    ],
    icon: "💻",
    type: "Internship"
  },
  {
    company: "Open Source Contributions",
    date: "2023 - Present",
    role: "GitHub Developer Program Member",
    details: [
      "Active contributor to open source projects with focus on Linux desktop environments and system configuration.",
      "Maintained and published Hyprland window manager dotfiles with community contributions and enhancements.",
      "Developed automation scripts for productivity and system optimization shared with the open source community.",
      "Member of GitHub Developer Program with proven track record of quality contributions."
    ],
    icon: "🌟",
    type: "Open Source"
  }
];

export default function Experience() {
  return (
    <Section title="Experience" icon="💼">
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300">
            <div className="absolute top-4 right-4 text-2xl">{exp.icon}</div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-pink-600 text-xl">
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition-colors">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    exp.type === 'Founder' ? 'bg-purple-100 text-purple-800' :
                    exp.type === 'Fellowship' ? 'bg-blue-100 text-blue-800' :
                    exp.type === 'Apprenticeship' ? 'bg-green-100 text-green-800' :
                    exp.type === 'Internship' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {exp.type}
                  </span>
                </div>
                <p className="text-pink-500 font-medium">{exp.role}</p>
              </div>
              <span className="text-pink-400 text-sm bg-pink-100 px-3 py-1 rounded-full mt-2 sm:mt-0 flex-shrink-0">{exp.date}</span>
            </div>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {exp.details.map((detail, i) => (
                <li key={i} className="leading-relaxed">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
