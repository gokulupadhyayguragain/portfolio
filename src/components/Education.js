"use client";
import Section from "./Section";

export default function Education() {
  return (
    <Section title="Education">
      <div className="bg-pink-50 rounded-xl p-6 shadow-md border border-pink-200">
        <div className="font-bold text-pink-600 text-lg mb-1">Lord Buddha Education Foundation, Maitidevi, Kathmandu</div>
        <div className="text-pink-400 text-sm mb-2">Sep 2023 – Sep 2026</div>
        <div className="font-semibold text-pink-500 mb-2">Bachelors of Computer Science in Information Technology</div>
        <div className="text-pink-700 text-sm">Modules: COA, OS, Probability and Statistics, C Programming, Object Oriented Java, DataBase, Python, .NET, Web Development, System Network Administration, Data Center Infrastructure</div>
      </div>
    </Section>
  );
}
