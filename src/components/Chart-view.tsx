import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react";

export const data = [
  {
    "Value": 500,
    "Variable": "XS_agr",
    "rus_name": "Выпуск в сельском хозяйстве",
    "type": "test"
  },
  {
    "Value": 625,
    "Variable": "XS_man",
    "rus_name": "Выпуск в промышленности",
    "type": "test"
  },
  {
    "Value": 600,
    "Variable": "XS_ser",
    "rus_name": "Выпуск в сфере услуг",
    "type": "test"
  },
  {
    "Value": 200,
    "Variable": "XS_pub",
    "rus_name": "Выпуск в государственном секторе",
    "type": "test"
  },
  {
    "Value": 300,
    "Variable": "LD_agr",
    "rus_name": "Спрос на труд в сельском хозяйстве",
    "type": "test"
  },
  {
    "Value": 100,
    "Variable": "LD_man",
    "rus_name": "Спрос на труд в промышленности",
    "type": "test"
  },
  {
    "Value": 200,
    "Variable": "LD_ser",
    "rus_name": "Спрос на труд в сфере услуг",
    "type": "test"
  },
  {
    "Value": 150,
    "Variable": "LD_pub",
    "rus_name": "Спрос на труд в государственном секторе",
    "type": "test"
  }
]

function ChartView() {
    useEffect(() => {
      const chart = createChart(data);

        return () => {
            chart.destroy()
        }
    }, [])
    

    return (
        <>
        <div style={{width: "800px"}}><canvas id="acquisitions"></canvas></div>
        </>
    )
}

const createChart = (data: any) => {
  const chart = new Chart(
    document.getElementById('acquisitions') as any,
    {
      type: 'bar',
      data: {
        labels: data.map((row: any) => `${row['Variable']}-2030`),
        datasets: [
          {
            label: '',
            data: data.map((row: any) => row['Value'])
          }
        ]
      }
    }
  );

  return chart
}

export {ChartView}