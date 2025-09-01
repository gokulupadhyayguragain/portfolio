export default function ProjectImage({ projectName, className = "" }) {
  const getProjectIcon = (name) => {
    if (name.toLowerCase().includes('hyprland')) return '🪟';
    if (name.toLowerCase().includes('lms') || name.toLowerCase().includes('learning')) return '📚';
    if (name.toLowerCase().includes('voting')) return '🗳️';
    if (name.toLowerCase().includes('food')) return '🍔';
    if (name.toLowerCase().includes('health')) return '💊';
    if (name.toLowerCase().includes('test') || name.toLowerCase().includes('paper')) return '📝';
    return '💻';
  };

  const getGradient = (name) => {
    const gradients = [
      'from-blue-400 to-purple-600',
      'from-green-400 to-blue-500',
      'from-pink-400 to-red-500',
      'from-yellow-400 to-orange-500',
      'from-purple-400 to-pink-500',
      'from-indigo-400 to-purple-600'
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  return (
    <div className={`w-full h-32 bg-gradient-to-br ${getGradient(projectName)} rounded-lg flex items-center justify-center ${className}`}>
      <span className="text-4xl">{getProjectIcon(projectName)}</span>
    </div>
  );
}
