import { ChartView, createChart } from './components/Chart-view'
import { SliderElem } from './components/Slider-elem'
import { useDebounce } from './hooks/useDebounce'
import './App.css'
import { useQuery } from '@tanstack/react-query';
import { getData } from './service';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { Actions } from './components/Actions';

function App() {
  const chart = useRef<null | Chart>(null)
  const {data, isFetched, isPending} = useQuery({queryKey: ['data'], queryFn: getData});

  const handleSliderOnChange = useDebounce((value: number, index: number) => {
    data[index] = {...data[index], Value: value};
    chart.current!.data.datasets[0].data[index] = value;
    chart.current?.update();
  })

  useEffect(() => {
    if(isFetched) {
      chart.current = createChart(data);
    }

    return () => chart.current?.destroy();
  }, [isFetched]);

  if(isPending) {
    return <p>Loading...</p>
  }
   
  return (
    <>
       <ChartView />
       <Actions chart={chart} data={data}/>
       <div className='container'>
        {data?.map(({Value, rus_name}: any, index: number) => {
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
