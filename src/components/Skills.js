"use client";
import Section from "./Section";

const skillCategories = [
  { 
    category: "Programming", 
    skills: ["C", "Python", "Java", "JavaScript", "React", "NextJS"], 
    icon: "💻",
    color: "from-blue-400 to-blue-600"
  },
  { 
    category: "Databases", 
    skills: ["SQL Server", "PostgreSQL", "MongoDB", "DynamoDB"], 
    icon: "🗄️",
    color: "from-green-400 to-green-600"
  },
  { 
    category: "Cloud Platforms", 
    skills: ["AWS", "Azure", "GCP"], 
    icon: "☁️",
    color: "from-purple-400 to-purple-600"
  },
  { 
    category: "DevOps & Tools", 
    skills: ["Docker", "Kubernetes", "Terraform", "Ansible", "ArgoCD"], 
    icon: "🔧",
    color: "from-orange-400 to-orange-600"
  },
  { 
    category: "Monitoring", 
    skills: ["CloudWatch", "Prometheus", "Grafana", "CloudTrail"], 
    icon: "📊",
    color: "from-red-400 to-red-600"
  },
  { 
    category: "Operating Systems", 
    skills: ["Windows", "Linux (Debian, RHEL, Arch)"], 
    icon: "🖥️",
    color: "from-gray-400 to-gray-600"
  }
];

export default function Skills() {
  return (
    <Section title="Skills & Technologies" icon="⚡">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{category.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIdx) => (
                <span 
                  key={skillIdx} 
                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Soft Skills Section */}
      <div className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
            🌟
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Soft Skills</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Communication", "Team Work", "Leadership", "Decision Making", "Adaptability", "Work Under Pressure", "Documentation"].map((skill, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-200 transition-colors duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
