import { Chart } from "chart.js/auto"

function ChartView() {
   
    return (
        <div style={{width: "800px"}}><canvas id="acquisitions"></canvas></div>
    )
}

export const createChart = (data: any) => {
  const chart = new Chart(
    document.getElementById('acquisitions') as HTMLCanvasElement,
    {
      type: 'bar',
      data: {
        labels: data.map((row: any) => 2030),
        datasets: [
          {
              label: 'XS',
              data: data.map((row) => row.Value),
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
          },
      ],
      },
      options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let currentData = data[context.dataIndex];
                        return `${currentData.rus_name}: ${currentData.Value}`;
                    }
                }
            }
        }
    }
    }
  );

  return chart
}

export {ChartView}