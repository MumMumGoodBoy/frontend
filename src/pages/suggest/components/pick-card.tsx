import { Food } from '@/api/types';
import Typography from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProgressMask from './progress-mask';

interface InteractionStart {
  x: number;
  y: number;
  $card?: HTMLDivElement;
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export type EvaluateStatus = 'good' | 'bad';

interface Props {
  cardList: Food[];
  onEvaluate?: (card: Food, status: EvaluateStatus) => void;
}

const getPosition = (event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
  if ('touches' in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

function PickCard({ cardList = [], onEvaluate }: Props) {
  const interactionRef = useRef<InteractionStart>();
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIndex] = useState(cardList.length - 1);
  const [progress, setProgress] = useState(0);

  const handleStart = useCallback((e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    document.body.classList.add('overflow-hidden');
    e.currentTarget.style.transition = '';

    const { x, y } = getPosition(e);
    interactionRef.current = {
      x,
      y,
      $card: e.currentTarget,
    };

    setIsInteracting(true);
  }, []);

  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!interactionRef.current) return;
    const $card = interactionRef.current.$card;
    if (!$card) return;

    const { x, y } = getPosition(e);
    const dx = (x - interactionRef.current.x) * 0.8;
    const dy = (y - interactionRef.current.y) * 0.5;
    const deg = (dx / 600) * -30;

    $card.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg)`;
    const newProgress = clamp(dx / 100, -1, 1);
    setProgress(newProgress);
  }, []);

  const handleEnd = useCallback(() => {
    const $card = interactionRef.current?.$card;
    if (!$card) return;

    const isSelect = Math.abs(progress) === 1;
    const isGood = progress === 1;
    const [, currentXString] = $card.style.transform.match(/translate\(([^,]+), [^)]+\)/) || [];
    const [, currentYString] = $card.style.transform.match(/translate\([^,]+, ([^)]+)\)/) || [];
    const [, currentRotateString] = $card.style.transform.match(/rotate\(([^)]+)\)/) || [];

    const currentX = parseInt(currentXString, 10);
    const currentY = parseInt(currentYString, 10);
    const currentRotate = parseInt(currentRotateString, 10);
    const dx = isGood ? window.innerWidth : (window.innerWidth + $card.getBoundingClientRect().width) * -1;

    $card.style.transition = 'transform 0.3s ease-in-out';
    $card.style.transform = isSelect
      ? `translate(${currentX + dx}px, ${currentY}px) rotate(${currentRotate * 2}deg)`
      : 'translate(0, 0) rotate(0deg)';

    interactionRef.current = undefined;
    setIsInteracting(false);
    setProgress(0);

    if (isSelect) {
      const removedCard = cardList[cardList.length - 1]; // Last card is swiped
      setTimeout(() => {
        cardList.pop();
        onEvaluate?.(removedCard, isGood ? 'good' : 'bad');
        document.body.classList.remove('overflow-hidden');
      }, 300);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [cardList, onEvaluate, progress]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [handleMove, handleEnd]);

  // const handleEvaluate = (status: EvaluateStatus) => {
  //   window.navigator?.vibrate?.(50);
  //   const selectedCard = cardList[cardList.length - 1];

  //   if (!selectedCard || activeIndex !== cardList.length - 1) return;

  //   const $cardAll = document.querySelectorAll('.card');
  //   const selectedCardElement = $cardAll[$cardAll.length - 1] as HTMLDivElement;

  //   setProgress(status === 'good' ? 1 : -1);
  //   selectedCardElement.style.transition = 'transform 0.3s ease-in-out';
  //   selectedCardElement.style.transform =
  //     status === 'good' ? `translateX(120%) rotate(-30deg)` : `translateX(-150%) rotate(30deg)`;

  //   setActiveIndex((prev) => prev - 1);
  //   setTimeout(() => {
  //     setProgress(0);
  //     onEvaluate?.(selectedCard, status);
  //   }, 300);
  // };

  return (
    <>
      <div className="relative flex flex-col w-full h-full z-10 max-w-[600px] max-h-[900px] touch-none">
        {cardList.map((card, index) => {
          const isActiveCard = index >= activeIndex;
          const isLastCard = index === cardList.length - 1;

          return (
            // If empty card, return Somthing above
            <div
              key={index}
              className={cn('absolute w-full h-full top-0 left-0 card', isActiveCard && 'active', {
                'pointer-events-auto': isLastCard,
                'pointer-events-none': !isLastCard,
              })}
              {...(isLastCard && {
                onTouchStart: handleStart,
                onMouseDown: handleStart,
              })}
            >
              <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg transform translate-y-5 scale-95 transition-shadow duration-300 gap-4">
                <div className="flex-2 relative w-full h-full max-h-[80%]">
                  <img src={card.image_url} alt={card.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col m-4">
                  <Typography variant="h2" fontWeight="bold" className="self-center">
                    {card.name}
                  </Typography>
                  <Typography variant="body1" className="self-center text-center">
                    {card.description}
                  </Typography>
                  <Typography variant="h2" fontWeight="bold" className="self-center">
                    {card.price} บาท !
                  </Typography>
                </div>

                {isLastCard && <ProgressMask progress={progress} isInteracting={isInteracting} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* {activeIndex >= 0 && (
        <div className="absolute flex space-x-4 bottom-10">
          <button
            type="button"
            onClick={() => handleEvaluate('bad')}
            className="flex items-center justify-center w-20 h-20 bg-red-500 rounded-full opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src={iconThumbDownFilled} alt="bad" className="w-12 h-12" />
          </button>

          <button
            type="button"
            onClick={() => handleEvaluate('good')}
            className="flex items-center justify-center w-20 h-20 bg-teal-500 rounded-full opacity-80 hover:opacity-100 transition-opacity"
          >
            <img src={iconThumbUpFilled} alt="good" className="w-12 h-12" />
          </button>
        </div>
      )} */}
    </>
  );
}

export default PickCard;
