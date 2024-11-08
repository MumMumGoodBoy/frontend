import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Pill } from '@/components/ui/pill';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';
import Footer from './components/footer';
import Title from './components/title';

const Landing = () => {
  return (
    <Container>
      <div className="flex flex-col gap-6 items-center justify-center">
        <Title />
        <Typography variant="h3" className="text-slate-600">
          Find the best places to eat, drink, and relax in Chula.
        </Typography>

        <Link to="/login">
          <Button size="lg" className="w-fit">
            <Typography variant="body1">Get Started</Typography>
          </Button>
        </Link>
        <Footer />
      </div>
      <Pill className="left-24 top-20 rotate-3 text-lg">Read Reviews 100++</Pill>
      <Pill className="right-24 top-20 -translate-y-1/2 -rotate-6 text-lg">Discover Restaurants</Pill>
      <Pill className="bottom-12 left-24 -rotate-6 text-lg">Random Dishes !!</Pill>
      <Pill className="bottom-32 left-12 aspect-square -translate-y-full translate-x-full text-[48px]">🍎</Pill>
      <Pill className="bottom-48 right-12 -translate-y-1/2 text-lg">Favorite Foods !!</Pill>
      <Pill className="bottom-20 right-36 aspect-square translate-x-1/2 translate-y-1/2 text-[48px]">🍔</Pill>
      <Pill className="right-12 top-32 aspect-square translate-y-full text-[48px]">🥐</Pill>
      <Pill className="left-12 top-32 aspect-square translate-y-full text-[48px]">🥗</Pill>
    </Container>
  );
};

export default Landing;
