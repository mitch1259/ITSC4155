import React,{useEffect,useRef} from "react";
import DoughnutPieChart from "./DoughnutPieChart";

const DonutChart= ({data})=>{
    const ref=useRef(null);

    useEffect(()=>{
        if(ref.current){
            DoughnutPieChart(ref.current,data);
        }
    });

    return(
        <div className="container">
            <div className="graph" ref={ref}/>
        </div>
    )
};

export default React.memo(DonutChart);