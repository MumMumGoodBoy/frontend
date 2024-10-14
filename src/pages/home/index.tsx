import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import Footer from './components/footer';

const Home = () => {
  return (
    <Container className="bg-pink-100">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-0.5">
          <Typography variant="h1" fontWeight="bold" className="mx-auto">
            WongChula 🥐
          </Typography>
          <Typography variant="body1" className="text-slate-600">
            Find the best places to eat, drink, and relax in Chula.
          </Typography>
        </div>
        <Button className="w-fit">
          <Typography variant="body1">Get Started</Typography>
        </Button>
        <Footer />
      </div>
    </Container>
  );
};

export default Home;
