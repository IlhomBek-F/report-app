import { Slider } from 'antd';
import '../styles/slider.css';

interface SliderElemPropsModel {
    title: string,
    value: number
}


function SliderElem({title, value}: SliderElemPropsModel) {

    return (
        <div className='slider-container'>
        <p>{title}</p>
          <Slider max={1000} value={value}/>
        </div>
    )
}

export {SliderElem}