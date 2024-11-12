import { useEffect, useState } from 'react';
import PickCard, { EvaluateStatus } from './components/pick-card';
import { useQuery } from '@tanstack/react-query';
import Typography from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import { useNavigate } from 'react-router-dom';
import { Food } from '@/api/types';
import { searchSuggestFood } from '@/api/suggest';

function Suggest() {
  const { data } = useQuery({
    queryKey: ['foods'],
    queryFn: () => searchSuggestFood(),
  });

  const [cardList, setCardList] = useState(data || []);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCardList(data);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Typography variant="h1" className="text-slate-600">
          Loading... 🥗🥐
        </Typography>
      </div>
    );
  }

  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <Typography variant="h2" fontWeight="bold">
          Suggest
        </Typography>
        {cardList.length === 0 && (
          <div className="flex justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              No more food to suggest 🥗🥐
            </Typography>
          </div>
        )}
        <PickCard
          cardList={cardList || []}
          onEvaluate={(card: Food, status: EvaluateStatus) => {
            setCardList((prev) => prev.filter((c) => c.id !== card.id));
            if (status === 'good') {
              navigate(`/food/${card.id}`);
            }
          }}
        />
      </div>
    </Container>
  );
}

export default Suggest;
