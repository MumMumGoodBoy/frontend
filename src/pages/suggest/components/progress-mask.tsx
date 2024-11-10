import { useLayoutEffect, useState } from 'react';
import { clamp } from './pick-card';
import iconThumbUpFilled from '../assets/icons/thumb-up.svg';
import iconThumbDownFilled from '../assets/icons/thumb-down.svg';
import { cn } from '@/lib/utils';

interface Props {
  progress: number; // -1 ~ 1
  isInteracting: boolean;
}

function ProgressMask({ progress, isInteracting }: Props) {
  const [status, setStatus] = useState<'good' | 'bad' | null>(null);
  const isGood = status === 'good';
  const isBad = status === 'bad';

  useLayoutEffect(() => {
    if (progress > 0) setStatus('good');
    if (progress < 0) setStatus('bad');
  }, [progress]);

  const dasharray = Math.PI * 2 * 27;
  const dashoffset = dasharray - Math.PI * 2 * 27 * clamp(progress, -1, 1);
  const isActive = Math.abs(progress) === 1;

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center text-center opacity-0 pointer-events-none transition-opacity',
        isActive && 'opacity-1 pointer-events-auto',
        isGood && 'bg-good',
        isBad && 'bg-bad',
      )}
      style={{
        opacity: Math.abs(progress) * 0.95,
        transition: isInteracting ? '' : 'opacity 0.3s linear',
      }}
    >
      <div className="absolute top-5 left-5 text-0">
        <svg className="rotate-[-90deg]" width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="27"
            className="fill-none stroke-grayLight opacity-100"
            style={{
              strokeWidth: '4px',
              strokeLinecap: 'round',
              strokeDasharray: dasharray,
              strokeDashoffset: dashoffset,
              transition: isInteracting ? '' : 'stroke-dashoffset 0.3s linear',
            }}
          />
        </svg>

        <div
          className={cn(
            'absolute top-1/2 left-1/2 flex items-center justify-center w-14 h-14 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity',
            isActive && 'opacity-100',
            !isActive && 'opacity-0',
          )}
        >
          {isGood && <img src={iconThumbUpFilled} alt="good" className="w-7 h-7" />}
          {isBad && <img src={iconThumbDownFilled} alt="bad" className="w-7 h-7" />}
        </div>
      </div>
    </div>
  );
}

export default ProgressMask;
