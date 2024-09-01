import { ArrowDownOutlined, VerticalAlignMiddleOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { ReportDataModel } from "../core";

const getIcon = (value: number, key: number) => {
    if(value < 1) {
        return <ArrowDownOutlined className="rate-down" key={key}/>
    }

    if(value >= 1 && value <= 1.5) {
        return <VerticalAlignMiddleOutlined className="rate-middle" key={key}/>
    }

    if(value >= 1.5) {
        return <ArrowUpOutlined className="rate-up" key={key}/>
    }
}

function ProductRate({rates}: {rates: ReportDataModel[]}) {
    
    return (
        <div>
            {rates.map((rate: ReportDataModel, index: number) => {
              return getIcon(rate.Value, index)
            })}
       </div>
    )
}

export {ProductRate}