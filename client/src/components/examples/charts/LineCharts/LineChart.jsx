import { Group } from "@visx/group";
import { scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinePath } from "@visx/shape";
import { extent } from 'd3-array';
import { LinearGradient } from '@visx/gradient';
import { GridRows, GridColumns } from '@visx/grid';


/**
 * A line graph component that allows data, width and height to be inserted.
 * @param {Array} data - an array of data you want to present information with total and date as y and x
 * @param {number} height- The height of the line graph
 * @param{width} width- The width of the line graph 
 * @param{backgroundColor} backgroundColor - The background color, default is black
 */


// insipred by the aricle here: https://dev.to/mariazentsova/building-a-line-chart-in-react-with-visx-1jkp
// colors inspiration: https://github.com/BlakeRMills/MetBrewer#palettes
// git repo: https://github.com/MariaZentsova/visx-linechart/blob/main/pages/index.js
// visx: https://airbnb.io/visx/annotation

function LineChart({ data, width, height, backgroundColor,fontSize, chartTitle }) {

    // tooltip parameters
    // define margins from where to start drawing the chart
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // defining inner measurements
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    //Line Colors
        const colors = ['#43b284', '#fab255']

    // Defining selector functions
    const getAmount = (d) => d.amount;
    const getDate = (d) => new Date(d.year).valueOf();

    // to remove comma from date
    const formatDate = (year) =>String((new Date(year).getMonth()+1)+"/"+( new Date(year).getDate()+1));
    
    // Defining scales
    // horizontal, x scale
    const timeScale = scaleLinear({
        range: [0, innerWidth],
        domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
        nice: true
    })

    // vertical, y scale
    const rdScale = scaleLinear({
        range: [innerHeight, 0],
        domain: extent(data, getAmount),
        nice: true,
    });



    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height} >
            <rect x={0} y={0} width={width} height={height} fill={backgroundColor} rx={14} />
                <Group left={margin.left} top={margin.top}>

                    <GridRows scale={rdScale} width={innerWidth} height={innerHeight - margin.top} stroke='#EDF2F7' strokeOpacity={0.2} />
                    <GridColumns scale={timeScale} width={innerWidth} height={innerHeight} stroke='#EDF2F7' strokeOpacity={0.2} />
                    <LinearGradient id="area-gradient" from={'#43b284'} to={'#43b284'} toOpacity={0.1} />

                    {/* Y-axis graph css control */}
                    <AxisLeft
                        tickTextFill={'#EDF2F7'}
                        stroke={'#EDF2F7'}
                        tickStroke={'#EDF2F7'}
                        scale={rdScale}
                        label="RDDUSD"
                        tickLabelProps={() => ({
                            fill: '#EDF2F7',
                            fontSize: {fontSize},
                            textAnchor: 'end',
                        })} />

                    <text x="-125" y="20" transform="rotate(-90)" fontSize={fontSize} fill='#EDF2F7'>{chartTitle} </text>

                    <AxisBottom
                        scale={timeScale}
                        label={"R&D Spend"}
                        stroke={'#EDF2F7'}
                        tickFormat={formatDate}
                        numTicks={7}
                        tickStroke={'#EDF2F7'}
                        tickTextFill={'#EDF2F7'}
                        top={innerHeight}
                        tickLabelProps={() => ({
                            fill: '#EDF2F7',
                            fontSize: {fontSize},
                            textAnchor: 'middle',
                        })} />

                        <LinePath
                            stroke={colors[0]}
                            strokeWidth={3}
                            data={data}
                            x={(d) => timeScale(getDate(d))}
                            y={(d) => rdScale(getAmount(d))}
                            />  
                </Group>
            </svg>
        </div>
    )
}

export default LineChart