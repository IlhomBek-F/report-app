import { ChartView, createChart } from './components/Chart-view'
import { SliderElem } from './components/Slider-elem'
import { useDebounce } from './hooks/useDebounce'
import { useQuery } from '@tanstack/react-query';
import { getData } from './service';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { Actions } from './components/Actions';
import { ReportDataModel } from './core';
import './App.css'

function App() {
  const chart = useRef<null | Chart>(null)
  const {data, isFetched, isPending, isError} = useQuery({queryKey: ['data'], queryFn: getData});

  const handleSliderOnChange = useDebounce((value: number, index: number) => {
    data[index] = {...data[index], Value: value};
    chart.current!.data.datasets[0].data[index] = value;
    chart.current?.update();
  })

  useEffect(() => {
    if(isFetched && !isError) {
      chart.current = createChart(data);
    }

    return () => chart.current?.destroy();
  }, [isFetched]);

  if(isPending) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Something went wrong please try again.</p>
  }
   
  return (
    <>
       <ChartView />
       <Actions chart={chart} data={data}/>
       <div className='container'>
        {data?.map(({Value, rus_name}: ReportDataModel, index: number) => {
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
