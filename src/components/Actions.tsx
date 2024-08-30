import { useMutation } from "@tanstack/react-query";
import { Button, Select } from "antd"
import { calculateCoef } from "../service";

function Actions({chart, data}) {
 const mutation = useMutation({
        mutationFn: (payload) => calculateCoef(payload),
        onSuccess(data, variables, context) {
          console.log(data)
        },
 });

  const handleYearChange = (year: number) => {
    chart.current.data.labels = Array.from({length: 8}).map(() => year);
    chart.current.update();
  }

  const handleCalculationKoef = () => {
    const payloadData = data.map((d: any) => ({...d, year: chart.current?.data?.labels?.[0]}));
    mutation.mutate(payloadData)
  }

  const handleExportCsv = () => {
    
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