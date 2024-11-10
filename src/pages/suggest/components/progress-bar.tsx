interface Props {
  progress: number; // 0 - 1
  className?: string;
}

function ProgressBar({ progress, className }: Props) {
  const progressPercentage = Math.floor(progress * 100);

  return (
    <div className={`relative top-0 left-0 right-0 h-1.5 bg-gray-200/20 ${className || ''}`}>
      <div
        className="overflow-hidden h-full bg-[#00bfa5] text-transparent transition-[width] duration-300"
        style={{ width: `${progressPercentage}%` }}
      >
        Progress: {progressPercentage}%
      </div>
    </div>
  );
}

export default ProgressBar;
