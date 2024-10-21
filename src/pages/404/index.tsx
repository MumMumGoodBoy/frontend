import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';

import { useLocation, useNavigate } from 'react-router-dom';

const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col items-center justify-center min-w-screen min-h-screen">
      <div className="w-4/5 h-3/4 flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col h-full md:h-fit gap-4 md:gap-5">
          <div className="flex flex-col">
            <Typography variant="h2" fontWeight="bold" className="md:h1">
              404 Ooops!
            </Typography>
            <Typography variant="h2" fontWeight="bold" className="md:h1">
              Page not found
            </Typography>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full md:w-fit"
          onClick={() => {
            if (location.key === 'default') {
              navigate('/');
            } else {
              window.history.back();
            }
          }}
        >
          Try again
        </Button>
      </div>
    </Container>
  );
};

export default Page;
