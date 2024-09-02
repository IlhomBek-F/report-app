import { ChartView, createChart } from './components/Chart-view'
import { SliderElem } from './components/Slider-elem'
import { useDebounce } from './hooks/useDebounce'
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { Actions } from './components/Actions';
import { ReportDataModel } from './core';
import { ProductRate } from './components/Product-rate';
import { useQuery } from '@tanstack/react-query';
import './App.css'

function App() {
  const [rates, setRates] = useState<ReportDataModel[]>([]);
  const chart = useRef<null | Chart>(null);
  const { data, isFetched, isPending, isError, refetch } = useQuery({ queryKey: [''] });

  const handleSliderOnChange = useDebounce((value: number, index: number) => {
    data[index] = { ...data[index], Value: value };
    chart.current!.data.datasets[0].data[index] = value;
    chart.current?.update();
  })

  useEffect(() => {
    if (isFetched && !isError) {
      chart.current = createChart(data);
    }

    return () => chart.current?.destroy();
  }, [isFetched]);

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong please try again. <button onClick={() => refetch()}>Refetch</button></p>
  }

  return (
    <>
      <ProductRate rates={rates} />
      <ChartView />
      <Actions chart={chart} data={data} setRates={setRates} />
      <div className='container'>
        {data?.map(({ Value, rus_name }: ReportDataModel, index: number) => {
          return <SliderElem title={rus_name}
            value={Value}
            index={index}
            handleSliderOnChange={handleSliderOnChange}
            key={index} />
        })}
      </div>
    </>
  )
}

export default App
