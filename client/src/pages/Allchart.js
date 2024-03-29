import LayoutOne from '../components/layouts/LayoutOne';
import '../css/allchart.css';
import '../css/gobal.css';
function Allchart(){

    document.title = "Savings Boards";

    return(
        <div className='all-charts-main'>
            <p className='all-dashboard-welcome-header'>All Boards</p>
            <div className='all-charts-display'>
                <LayoutOne title="First Board" savings={10000}/>
                <LayoutOne title="Second Board" savings={1000}/>
                <LayoutOne title="Third Board" savings={30000}/>
            </div>
            
        </div>
    )
}

export default Allchart;