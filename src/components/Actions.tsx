import { useMutation } from "@tanstack/react-query";
import { Button, Select } from "antd"
import { calculateCoef } from "../service";
import { useRef } from "react";
import { downloadCSV } from "../utils";
import { ReportDataModel } from "../core";

interface ActionsModel {
  chart: null | any,
  data: ReportDataModel[]
}

function Actions({chart, data}: ActionsModel) {
 const resData = useRef<null | ReportDataModel[]>([]);

 const mutation = useMutation({
        mutationFn: (payload: ReportDataModel[]) => calculateCoef(payload),
        onSuccess(data) {
          resData.current = data;
        },
        onError(error) {
            console.log(error.message)
        },
 });

  const handleYearChange = (year: number) => {
    chart.current.data.labels = Array.from({length: 8}).map(() => year);
    chart.current.update();
  }

  const handleCalculationKoef = () => {
    const payloadData = data.map((d: ReportDataModel) => ({...d, year: chart.current?.data.labels?.[0]}));
    mutation.mutate(payloadData)
  }

  const handleExportCsv = () => {
    if(resData.current?.length) {
        downloadCSV(resData.current as ReportDataModel[])
    }
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