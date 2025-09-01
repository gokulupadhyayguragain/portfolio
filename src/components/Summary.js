"use client";
import Section from "./Section";

export default function Summary() {
  return (
    <Section title="Professional Summary">
      <div className="space-y-6">
        <p className="text-pink-700 text-lg leading-relaxed">
          Passionate DevOps engineer and cloud architect with extensive experience in multi-cloud infrastructure, 
          automation, and scalable solution design. Creator and maintainer of <a href="https://addtocloud.tech/" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-semibold hover:text-pink-800">AddToCloud</a> - 
          an enterprise-grade multi-cloud platform serving approved users with comprehensive cloud service provisioning.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
            <h4 className="font-bold text-pink-600 mb-3 flex items-center gap-2">
              ☁️ Cloud Expertise
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Microsoft Azure (Administrator Associate certified)</li>
              <li>• Oracle Cloud Infrastructure (AI & Generative AI certified)</li>
              <li>• Multi-cloud deployment strategies</li>
              <li>• Infrastructure as Code (Terraform)</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-blue-600 mb-3 flex items-center gap-2">
              🛠️ DevOps & Automation
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• CI/CD Pipelines (GitHub Actions)</li>
              <li>• Container Orchestration (Docker, Kubernetes)</li>
              <li>• Linux System Administration</li>
              <li>• Hyprland Window Manager contributions</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
            🌟 Professional Highlights
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-green-700">GitHub Developer Program</p>
              <p>Active member with proven open-source contributions</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Enterprise Platform</p>
              <p>Built and deployed production-ready AddToCloud platform</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Certified Professional</p>
              <p>Microsoft Azure & Oracle Cloud certified</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-center italic">
          Based in Kathmandu, Nepal • Open to remote opportunities • 
          Passionate about cloud technologies and automation
        </p>
      </div>
    </Section>
  );
}
