import { Chart } from "chart.js/auto"
import { useEffect, useRef } from "react";
const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

function ChartView() {
    useEffect(() => {
           const a = new Chart(
                document.getElementById('acquisitions') as any,
                {
                  type: 'bar',
                  data: {
                    labels: data.map(row => row.year),
                    datasets: [
                      {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                      }
                    ]
                  }
                }
              );
        return () => {
            a.destroy()
        }
    }, [])
    

    return (
        <>
        <div style={{width: "800px"}}><canvas id="acquisitions"></canvas></div>
        </>
    )
}

export {ChartView}