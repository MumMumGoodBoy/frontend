import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const Random = () => {
  const foods = [
    'Apple',
    'Banana',
    'Cherry',
    'Dewberry',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
  ];

  const data = foods.map((food) => ({
    option: food,
  }));
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
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
              Random: <span className="underline">{data[prizeNumber].option}</span>
            </Typography>
            <Button variant="outline">Get Detail</Button>
          </>
        ) : (
          <Typography variant="h4">Click spin to random food !!</Typography>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
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
