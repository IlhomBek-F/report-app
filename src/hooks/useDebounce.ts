
function useDebounce(fc: Function) {
    let time: number;
    
    return (value: number, index: number) => {
       clearTimeout(time);
       time = setTimeout(() => fc(value, index), 500)
    }
}

export {useDebounce}