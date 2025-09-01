"use client";
import Section from "./Section";

const achievements = [
  {
    title: "Scholar || Computer Association Nepal (CAN)",
    date: "2023 - 2026",
    details: "Awarded the CAN ICT Scholarship for academic excellence & potential in Information and Communication Technology. Actively contributed to CAN InfoTech 2024 and 2025 by assisting with logistics & participant coordination across the event."
  },
  {
    title: "Leader || Software Architect Club",
    date: "2024 - 2025",
    details: "Organized events, IT seminars, and peer workshops to promote applied learning in software and system architecture. Led a student committee to plan and deliver tech-focused programs with collaboration from faculty and industry experts."
  },
  {
    title: "College Representative || AWS Cloud Clubs Nepal X LBEF",
    date: "2025 - 2026",
    details: "Represented LBEF in AWS Cloud Clubs Nepal by hosting cloud workshops in college promoting students in AWS cloud. Build engagement through organized events, peer sessions, and certification awareness for aspiring cloud professionals."
  },
  {
    title: "Organizer || Technical Lead || HackXLBEF",
    date: "Jan 11 - 13, 2025",
    details: "Managed the planning of a 48-hour hackathon to promote innovation, collaboration, and real-world software development. Handled logistics, judging coordination, mentoring sessions, and co-developed the official event website and tools."
  },
  {
    title: "Organizer || AWS Women Summit 2025",
    date: "Jan 11 - 13, 2025",
    details: "Assisted AWS Women in Tech in organizing Nepal’s largest cloud summit focused on women in cloud leadership. Assisted in event flow, session transitions, and on-site registration to ensure a seamless attendee experience."
  },
  {
    title: "Volunteer || AWS Cloud Clubs Nepal",
    date: "Sep 29, 2024",
    details: "Volunteered at Nepal’s largest AWS student event, supporting logistics, workshop flow, and attendee interaction. Helped guide students, manage technical rooms, and provide assistance during speaker-led hands-on sessions."
  }
];

export default function Achievements() {
  return (
    <Section title="Achievements & Events">
      <div className="space-y-8">
        {achievements.map((ach, idx) => (
          <div key={idx} className="bg-pink-50 rounded-xl p-6 shadow-md border border-pink-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
              <span className="font-bold text-pink-600 text-lg">{ach.title}</span>
              <span className="text-pink-400 text-sm">{ach.date}</span>
            </div>
            <div className="text-pink-700 text-base">{ach.details}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
