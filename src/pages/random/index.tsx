import { searchFood } from '@/api/search';
import { Food } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link } from 'react-router-dom';

const Random = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);

  const { data: queryData } = useQuery({
    queryKey: ['foods', 'random'],
    queryFn: () => searchFood('', '10'),
  });

  if (!queryData) return null;

  const foodOptions =
    queryData?.hits.map((food: Food) => ({
      option: food.name,
    })) || [];

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
            <Link to={`/food/${queryData?.hits[prizeNumber].id}`}>
              <Button variant="outline">Get Detail</Button>
            </Link>
          </>
        ) : (
          <Typography variant="h4">Click spin to random food !!</Typography>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={foodOptions}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          backgroundColors={[]}
          innerBorderWidth={2}
          outerBorderWidth={2}
          fontFamily="IBM Plex Sans"
          fontWeight={500}
          fontSize={20}
        />
        <Button onClick={handleSpinClick} size="lg" disabled={mustSpin}>
          Spin
        </Button>
      </div>
    </Container>
  );
};

export default Random;
