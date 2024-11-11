import { searchSuggestFood } from '@/api/suggest';
import { Food } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link } from 'react-router-dom';

function formatFoodName(name: string, maxLength: number = 15): string {
  if (name.length > maxLength) {
    return name.slice(0, maxLength) + '…';
  }
  return name;
}

const Random = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);

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
  };

  return (
    <Container className="flex flex-col items-center justify-between py-20">
      <div className=" px-10 self-start space-y-5">
        <Typography variant="h2" fontWeight="bold">
          Random Food
        </Typography>
        {!mustSpin && prizeNumber !== -1 ? (
          <>
            <Typography variant="h4">
              Random: <span className="underline">{foodOptions[prizeNumber].option}</span>
            </Typography>
            <Link to={`/food/${queryData?.[prizeNumber].id}`}>
              <Button variant="outline" className='mt-4'>Get Detail</Button>
            </Link>
          </>
        ) : (
          <Typography variant="h4">Click spin to random food !!</Typography>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
{/*         <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={foodOptions}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          backgroundColors={["darkgray",
            "lightgray"]}
          innerBorderWidth={2}
          outerBorderWidth={1}
          fontFamily="IBM Plex Sans"
          fontWeight={500}
          fontSize={16}
        /> */}
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
            '#ff4a4a'  // Red
            ]}
          innerBorderWidth={2}
          outerBorderWidth={2}
          radiusLineWidth={1}
          fontFamily="IBM Plex Sans"
          fontWeight={500}
          fontSize={16}
        />
        <Button onClick={handleSpinClick} size="lg" disabled={mustSpin}>
          Spin
        </Button>
      </div>
    </Container>
  );
};

export default Random;
