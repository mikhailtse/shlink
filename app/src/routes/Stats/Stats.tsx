import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import { AppError, useErrorHandler } from '../../error';
import { getStats } from '../../api/links';

import ClicksChart from './ClicksChart';
import PageTitle from '../../components/PageTitle';
import PeriodSelect, { IPeriodSelectProps } from '../../components/PeriodSelect';

interface IState {
  id: string;
  link: string;
  createdAt: Date;
  clicks: Array<{
    date: Date;
    count: number;
  }>;
}

function Stats() {
  const [state, setState] = useState<IState>();
  const [period, setPeriod] = useState<IPeriodSelectProps['value']>('1');

  const { id } = useParams();
  const handleError = useErrorHandler();

  if (!id) {
    throw new AppError('404')
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!id) {
          throw new AppError('404')
        }

        const stats = await getStats(id, period === '0' ? undefined : period);

        if (!stats) {
          throw new AppError('404');
        }

        setState({
          ...stats,
          createdAt: new Date(stats.createdAt),
          clicks: stats.clicks.map((el) => ({ ...el, date: new Date(el.date) })),
        });
      } catch (error) {
        handleError(error);
      }
    }

    fetchStats();
  }, [id, period, handleError]);

  if (!state?.clicks) {
    return null;
  }

  return (
    <Container disableGutters sx={{ pt: { xs: 10, md: 15 } }}>
      <PageTitle title='Here my stats' />
      <PeriodSelect value={period} onChange={setPeriod} />
      <ClicksChart data={state.clicks} />
    </Container>
  );
}

export default Stats;
