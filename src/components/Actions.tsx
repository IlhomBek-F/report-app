import { useMutation } from "@tanstack/react-query";
import { Button, Select } from "antd"
import { calculateCoef } from "../service";
import { useRef } from "react";
import { downloadCSV } from "../utils";

function Actions({chart, data}: any) {
 const resData = useRef();
 const chartYears = chart.current.data;

 const mutation = useMutation({
        mutationFn: (payload) => calculateCoef(payload),
        onSuccess(data) {
          resData.current = data;
        },
        onError(error) {
            console.log(error.message)
        },
 });

  const handleYearChange = (year: number) => {
    chartYears.labels = Array.from({length: 8}).map(() => year);
    chart.current.update();
  }

  const handleCalculationKoef = () => {
    const payloadData = data.map((d: any) => ({...d, year: chartYears.labels?.[0]}));
    mutation.mutate(payloadData)
  }

  const handleExportCsv = () => {
    downloadCSV(resData.current)
  }

    return (
     <div className="actions">
     <Button type="primary" onClick={handleCalculationKoef}> calculate koef</Button>
     <Button type="primary" onClick={handleExportCsv}>Export</Button>
     <Select
       defaultValue={2030}
       style={{ width: 80 }}
       onChange={handleYearChange}
       options={[
        { value: 2030, label: 2030 },
        { value: 2040, label: 2040 },
        { value: 2050, label: 2050 },
      ]}
    />
     </div>
    )
}

export {Actions}