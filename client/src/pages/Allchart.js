import Barchart from '../components/examples/charts/BarCharts/BarChart';
import LineChart from '../components/examples/charts/LineCharts/LineChart';
import LayoutOne from '../components/layouts/LayoutOne';
import '../css/allchart.css';
import '../css/gobal.css';
import { defaultData1 } from '../SampleData/barchartdata/CatgData';
import { data } from '../SampleData/linechartdata/DemarkData';


function Allchart(){

    return(
        <div className='all-charts-main'>
            <p className='all-dashboard-welcome-header'>All Boards</p>
            <div className=''>
                <LayoutOne title="First Board" savings={10000}/>
                <LayoutOne title="Second Board" savings={1000}/>
                <LayoutOne title="Third Board" savings={30000}/>

                {/* line chart works props and everything, now begins the cusomizations */}
                <LineChart data={data} width={400} height={400}/>
                <Barchart data={defaultData1} width={400} height={400}/>
            </div>
            
        </div>
    )
}

export default Allchart;