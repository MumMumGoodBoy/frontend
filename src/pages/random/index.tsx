import { searchSuggestFood } from '@/api/suggest';
import { Food } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';

function formatFoodName(name: string, maxLength: number = 15): string {
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + '…';
  }
  return name;
}

const Random = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [isExplode, setIsExplode] = useState(false);
  const { data: queryData } = useQuery({
    queryKey: ['foods', 'random'],
    queryFn: () => searchSuggestFood(),
  });

  if (!queryData) return null;

  const foodOptions =
    queryData?.map((food: Food) => ({
      option: food.name,
    })) || [];

  const foodData = foodOptions.map((food) => ({
    option: formatFoodName(food.option),
  }));

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * foodOptions.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsExplode(true);
    setTimeout(() => {
      setIsExplode(false);
    }, 5000);
  };

  return (
    <Container className="py-10 w-full">
      <div className="flex gap-4 w-[800px] flex-col max-h-[50%]">
        <div className="flex flex-col min-w-[50%] gap-4">
          <Typography variant="h2" fontWeight="bold">
            Random Food
          </Typography>
          <Typography variant="h4">
            Random:{' '}
            {!mustSpin && prizeNumber !== -1 ? (
              <span className="underline">{foodOptions[prizeNumber].option}</span>
            ) : (
              'Click spin to random food !!'
            )}
          </Typography>
          <Typography variant="body1">
            Feeling adventurous? Spin the wheel to find a delicious surprise tailored just for you. Click "Spin" and let
            the food wheel decide your next treat!
          </Typography>
          <div className="flex border shadow-md p-4 rounded-md items-center bg-white min-h-[400px] max-h-[400px] m-w-[50%]">
            <div className="flex-2 relative w-full h-full">
              {!mustSpin && prizeNumber !== -1 ? (
                <>
                  <img
                    src={queryData?.[prizeNumber].image_url}
                    alt={queryData?.[prizeNumber].name}
                    className="object-cover w-full h-full"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Coffee size={64} color="#4B5563" />
                </div>
              )}
            </div>
          </div>
          {/* if didn't spin don't show link but show only button */}
          {!mustSpin && prizeNumber !== -1 ? (
            <Link to={`/food/${queryData?.[prizeNumber].id}`}>
              <Button size="lg" className="w-full" variant="outline">
                See Food
              </Button>
            </Link>
          ) : (
            <Button size="lg" className="w-full" disabled variant="outline">
              See Food
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4 items-center w-full h-fit">
          {!mustSpin && prizeNumber !== -1 && isExplode && (
            <ConfettiExplosion
              height={1000}
              width={1000}
              duration={3000}
              className="relative flex justify-center items-center"
            />
          )}
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={foodData}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            spinDuration={0.3}
            backgroundColors={[
              '#a86eff', // Purple
              '#42a4ff', // Light Blue
              '#4ef2e5', // Sea
              '#A8E80C', // Green
              '#FFDD44', // Yellow
              '#FF7F00', // Orange
              '#FF3F8E', // Pink
              '#ff4a4a', // Red
            ]}
            innerBorderWidth={2}
            outerBorderWidth={2}
            radiusLineWidth={1}
            fontFamily="IBM Plex Sans"
            fontWeight={500}
            fontSize={16}
            innerRadius={16}
          />

          <Button onClick={handleSpinClick} size="lg" disabled={mustSpin}>
            Spin
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Random;
