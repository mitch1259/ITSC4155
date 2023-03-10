import * as d3 from 'd3';

// inspired by article: https://medium.com/tinyso/how-to-create-pie-donut-chart-in-react-using-d3-js-9ea695bcf819
//original arc pie: https://observablehq.com/@d3/donut-chart
//documenation: https://github.com/d3/d3-shape/blob/v3.2.0/README.md#pies

//adopt the current chart to include double array for  [{saved:3000}{remaining:6000}]
function DoughnutPieChart(element,data) {


    //boxsize
    const boxSize = 300;
    //maxvalue
    // const maxValue = data.reduce((cur, val) => Math.max(cur, val.value), 0);
    //inner 
    const innerRadius=100;
    //outter
    const outterRadius=60;

    //starting angle
    // const startingAngle=6.219718788925247;

    //ending angle
    // const endingAngle=6.267318677616002;

    //pad angle
    const padAngle=0;

    //colors
    const colors = [ '#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd' ];


    

    d3.select(element).select("svg").remove(); // Remove the old svg

    //svg
    const svg=d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);


    //pi generator
    const pieGenerator = d3
    .pie()
    .startAngle(-0.75 * Math.PI)
    .value((d) => d.value);

    //arcgenerator
    const arcGenerator=d3.arc().outerRadius(outterRadius).padAngle(padAngle).innerRadius(innerRadius)

    //arcs
    const arcs = svg.selectAll().data(pieGenerator(data)).enter();

  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d, i) => colors[i % data.length])
    .transition()
    .duration(700)
    .attrTween("d", function (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arcGenerator(d);
      };
  
    });

    //append text
    arcs
    .append("text")
    .attr("text-anchor", "middle")
    .text((d) => `${d.data.value}%`) // label text
    .style("fill", "#05386b") // label color
    .style("font-size", "30px") // label size
    .style("font-family","Varela Round")
    .attr("transform", (d) => {
      const [x, y] = arcGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    })
    .style("font-size", 0)
    .transition()
    .duration(700)
    .style("font-size", "26px");
}

export default DoughnutPieChart;