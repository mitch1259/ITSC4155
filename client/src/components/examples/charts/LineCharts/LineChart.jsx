import { useCallback } from "react"
import { Group } from "@visx/group";
import { scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Line, LinePath } from "@visx/shape";
import { extent, bisector } from 'd3-array';
import { LinearGradient } from '@visx/gradient';
import { GridRows, GridColumns } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { GlyphCircle } from '@visx/glyph';

/**
 * A line graph component that allows data, width and height to be inserted.
 * @param {Array} data - an array of data you want to present information in
 * @param {number} height- The height of the line graph
 * @param{width} width- The width of the line graph 
 * @returns 
 */


// insipred by the aricle here: https://dev.to/mariazentsova/building-a-line-chart-in-react-with-visx-1jkp
// colors inspiration: https://github.com/BlakeRMills/MetBrewer#palettes
// git repo: https://github.com/MariaZentsova/visx-linechart/blob/main/pages/index.js
// visx: https://airbnb.io/visx/annotation

function LineChart({ data, width, height, backgroundColor,strokeColor,fontSize }) {

    // tooltip parameters
    const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip();

    // define margins from where to start drawing the chart
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // defining inner measurements
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // data for lines
    // TODO: Change this to something fimilar to this project

    const data1 = data.filter(function (el) {
        return el.type === "RENEWABLE"
    });


    const data2 = data.filter(function (el) {
        return el.type === "TOTAL"
    });

    const series = [data1, data2]

    //Line Colors
    //TODO:Change this to color that match our project.
    const colors = ['#43b284', '#fab255']

    // Defining selector functions
    //TODO: change where it will get its data.
    const getRD = (d) => d.amount;
    const getDate = (d) => d.year;
    const bisectDate = bisector((d) => d.year).left;

    // get data from a year
    const getD = (year) => {
        const output = data.filter(function (el) {
            return el.year === year
        })
        return output
    }
    
    // to remove comma from date
    const formatDate = (year) => year.toString()
    
    // Defining scales
    // horizontal, x scale
    const timeScale = scaleLinear({
        range: [0, innerWidth],
        domain: extent(data, getDate),
        nice: true
    })

    // vertical, y scale
    const rdScale = scaleLinear({
        range: [innerHeight, 0],
        domain: extent(data, getRD),
        nice: true,
    });

    // defining tooltip styles
    const tooltipStyles = {
        ...defaultStyles,
        minWidth: 60,
        backgroundColor: '#EDF5E1',
        color: 'white',
    };

    const handleTooltip = useCallback((event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = timeScale.invert(x - margin.left); // get Date from the scale

        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;


        if (d1 && getDate(d1)) {
            d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
            tooltipData: getD(d.year),
            tooltipLeft: x,
            tooltipTop: rdScale(getRD(d))
        })
    })

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height} >
            <rect x={0} y={0} width={width} height={height} fill={'#05386b'} rx={14} />
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
                        tickLabelProps={() => ({
                            fill: '#EDF2F7',
                            fontSize: 18,
                            textAnchor: 'end',
                        })} />


                        The title shows in the graph
                        {/* TODO:change the text displayed */}
                    <text x="-125" y="20" transform="rotate(-90)" fontSize={18} fill='#EDF2F7'>
                        R&D Spend, RDDUSD
                    </text>
                    <AxisBottom
                        scale={timeScale}
                        stroke={'#EDF2F7'}
                        tickFormat={formatDate}
                        tickStroke={'#EDF2F7'}
                        tickTextFill={'#EDF2F7'}
                        top={innerHeight}
                        tickLabelProps={() => ({
                            fill: '#EDF2F7',
                            fontSize: 18,
                            textAnchor: 'middle',
                        })} />
                    {series.map((sData, i) => (
                        <LinePath
                            key={i}
                            stroke={colors[i]}
                            strokeWidth={3}
                            data={sData}
                            x={(d) => timeScale(getDate(d)) ?? 0}
                            y={(d) => rdScale(getRD(d)) ?? 0}
                            />
                    ))}
                    {tooltipData && (
                        <g>
                            <Line
                                from={{ x: tooltipLeft - margin.left, y: 0 }}
                                to={{ x: tooltipLeft - margin.left, y: innerHeight }}
                                stroke={'#EDF2F7'}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="4,2"
                            />
                        </g>
                    )}
                    {tooltipData && tooltipData.map((d, i) => (<g>
                        <GlyphCircle 
                            left={tooltipLeft - margin.left}
                            top={rdScale(d.amount) + 2}
                            size={110}
                            fill={colors[i]}
                            stroke={'white'}
                            strokeWidth={2} />
                    </g>))}
                    <rect x={0} y={0} width={innerWidth} height={innerHeight} onTouchStart={handleTooltip} fill={'transparent'}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                      />
                </Group>
            </svg>
            {/* render a tooltip */}
            {tooltipData ? (
                <TooltipWithBounds key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                > 
                <p>{`Total Spend: $${getRD(tooltipData[1])}`}</p>
                <p>{`Renewable Spend: $${getRD(tooltipData[0])}`}</p>
                <p>{`Year: ${getDate(tooltipData[1])}`}</p>
                </TooltipWithBounds>
            ) : null}
        </div>
    )
}

export default LineChart