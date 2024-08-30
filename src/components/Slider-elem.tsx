import { Slider } from 'antd';
import { useState } from 'react';

interface SliderElemPropsModel {
    title: string,
    value: number,
    index: number,
    handleSliderOnChange: (value: number, index: number) => void;
}

function SliderElem({title, value, handleSliderOnChange, index}: SliderElemPropsModel) {
    const [sliderValue, setSliderValue] = useState(value);

    const onChange = (e: number) => {
        setSliderValue(e);
        handleSliderOnChange(e, index)
    };

    return (
        <div className='slider-container'>
          <p>{title}</p>
          <Slider min={10} max={1000} value={sliderValue} onChange={onChange}/>
        </div>
    )
}

export {SliderElem}