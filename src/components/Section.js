"use client";

export default function Section({ title, children, icon = "🌸" }) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            {icon}
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full w-20"></div>
      </div>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
