import React,{useMemo} from 'react';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Bar} from "@visx/shape";


//TODO: change the title of the data to match server data. 
const x = (d) => d.label;
const y = (d) => d.value;


/**
 * BarChart components let you create bar charts from formatted data you have.
 * Data should be formatted in a x and y format where the calculation are done before hand.
 * @param {Array} data - A parameter that allows developers to put their data to the component
 *  @param {number} width - A parameter that allows you to change the width of the chart.
 * @param {number} height - A parameter that allows you to change the height of the chart.
 * @param {String} xAxisTitle - A parameter that allows you to change the x axis title.
 * @param {String} yAxisTitle - A parameter that allows you to change the y axis title.
 */
function Barchart({data,width,height,xAxisTitle,yAxisTitle,}){

// bounds
const xMax = width - 80;
const yMax = height - 80;

// scales and useMemo for performance enhacement.
const xScale = useMemo( 
  ()=> scaleBand({
  range: [0, xMax],
  round:true,
  domain: data.map(x),
  padding: 0.4,
}),[xMax]);

const yScale = useMemo(
  ()=> scaleLinear({
  range: [0, yMax],
  round:true,
  domain: [Math.max(...data.map(y)), 0],
}),[yMax]
);

return (
  <svg width={width} height={height}>
    <LinearGradient 
    from={`#e9e9e9`} 
    to={`#fff`}
    id='teal' />
    <rect 
    width={width} 
    height={height} 
    fill={`url(#teal)`} 
    rx={5} />
    <Group top={25} left={55}>

      <AxisLeft 
      left={10} 
      scale={yScale} 
      numTicks={4} 
      label={yAxisTitle}
      tickLabelProps={() =>({
        fontSize:15,
        textAnchor:'end'
      })}
      labelProps={()=>({
        fontSize:15
      })}/>

      {data.map((d) => {
        const label = x(d);
        const barWidth = xScale.bandwidth();
        const barHeight = yMax - yScale(y(d));
        const barX = xScale(label);
        const barY = yMax - barHeight;
        return <Bar key={`bar-${label}`} x={barX} y={barY} width={barWidth} height={barHeight} fill= "rgba(23, 233, 217, .5)"  />;
      })}

      <AxisBottom 
      scale={xScale} 
      label={xAxisTitle} 
      labelOffset={20} 
      top={yMax} 
      tickLabelProps={()=>({
        textAnchor:'middle',
        fontSize:15
      })}
      labelProps={()=>({
        textAnchor:'start',
        fontSize:15
      })}
      />
      
    </Group>
  </svg>
);
}

export default Barchart;