import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Pill } from '@/components/ui/pill';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';
import Footer from './components/footer';
import Title from './components/title';

const food1 = new URL('./public/food1.svg', import.meta.url).href;
const food3 = new URL('./public/food3.svg', import.meta.url).href;
const food4 = new URL('./public/food4.svg', import.meta.url).href;
const food5 = new URL('./public/food5.svg', import.meta.url).href;

const Landing = () => {
  return (
    <Container>
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-1 text-center">
          <Title />
          <Typography variant="body1" className="text-slate-600">
            Find the best places to eat, drink, and relax in Chula.
          </Typography>
        </div>
        <Link to="/login">
          <Button className="w-fit">
            <Typography variant="body1">Get Started</Typography>
          </Button>
        </Link>
        <Footer />
      </div>
      <Pill className="left-24 top-20 rotate-3">Read Reviews 100++</Pill>
      <Pill className="right-24 top-20 -translate-y-1/2 -rotate-6">Discover Restaurants</Pill>
      <Pill className="bottom-12 left-24 -rotate-6">Random Dishes !!</Pill>
      <Pill className="bottom-32 left-12 aspect-square -translate-y-full translate-x-full">
        <img src={food1} alt="food1" className="w-20 h-20 object-contain" />
      </Pill>
      <Pill className="bottom-48 right-12 -translate-y-1/2">Favorite Foods !!</Pill>
      <Pill className="bottom-20 right-36 aspect-square translate-x-1/2 translate-y-1/2 p-1">
        <img src={food3} alt="food3" className="w-full h-full object-none" />
      </Pill>
      <Pill className="right-12 top-32 aspect-square translate-y-full p-1">
        <img src={food4} alt="food4" className="w-full h-full object-contain" />
      </Pill>
      <Pill className="left-12 top-32 aspect-square translate-y-full p-2">
        <img src={food5} alt="food5" className="w-full h-full object-contain" />
      </Pill>
    </Container>
  );
};

export default Landing;
