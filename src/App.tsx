import './App.css'
import { ChartView, data } from './components/Chart-view'
import { SliderElem } from './components/Slider-elem'

function App() {

  return (
    <>
       <ChartView />
       <div className='container'>
        {data.map(({Value, rus_name}, index) => {
          return <SliderElem title={rus_name} value={Value} key={index}/>
        })}
       </div>
    </>
  )
}

export default App
