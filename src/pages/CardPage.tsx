import { useSearchParams, Navigate } from 'react-router-dom';
import { BirthdayCard } from '@/components/BirthdayCard';

const CardPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  if (!name) {
    return <Navigate to="/" replace />;
  }

  return <BirthdayCard recipientName={decodeURIComponent(name)} />;
};

export default CardPage;
