import { useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { Container, SxProps } from '@mui/material';
import { PageSubTitle } from '../../components';

interface IDailyClicks {
  date: Date;
  count: number;
}

interface IClicksChartProps {
  data: IDailyClicks[];
}

const sxProp: SxProps = {
  height: 300,
};

function ClicksChart(props: IClicksChartProps) {
  const {
    data,
  } = props;

  const primaryAxis = useMemo<AxisOptions<IDailyClicks>>(() => ({
    getValue: (datum) => datum.date,
    scaleType: 'time',
    formatters: {
      scale: (datum) => datum?.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      }),
    },
  }), []);

  const secondaryAxes = useMemo<AxisOptions<IDailyClicks>[]>(() => [{
    getValue: (datum) => datum.count,
    scaleType: 'linear',
    formatters: {
      scale: (datum) => Math.round(datum).toString(),
    },
  }], []);

  return (
    <Container sx={sxProp} maxWidth="md">
      {
        data.length
        ? (<Chart
            role='presentation'
            options={{
              data: [{
                data,
                label: 'Clicks',
              }],
              primaryAxis,
              secondaryAxes,
            }}
          />)
        : <PageSubTitle title="There is no any single click" />
      }
    </Container>
  );
}

export default ClicksChart;
