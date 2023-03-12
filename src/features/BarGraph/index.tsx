import * as React from 'react';
import { Chart, AxisOptions } from 'react-charts';
import { Datum } from '../../interfaces';

export interface BarGraphProps {
  data: any[];
  title: string;
}

export const BarGraph = ({ data, title }: BarGraphProps): JSX.Element => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<Datum> => ({
      getValue: (datum) => datum.primary,
    }),
    [],
  );

  const secondaryAxes = React.useMemo(
    (): Array<AxisOptions<Datum>> => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    [],
  );

  return (
    <div className="h-full text-center">
      <h5>{title}</h5>
      <div className="h-full">
        <Chart
          options={{
            primaryAxis,
            secondaryAxes,
            data,
            initialHeight: 200,
            initialWidth: 300,
          }}
        />
      </div>
    </div>
  );
};
