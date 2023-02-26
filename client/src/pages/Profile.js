import '../css/Profile.css';


function Profile(props) {

    return (
        <div className='profile-wrapper'>
            <div class="user-profile">
              <div class="inside-profile">
                <div class="pic-display">
                  {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
                  <img src="https://reactjs.org/logo-og.png" alt="React Image"/>
                </div>
                <div class='user-display'>
                  <h3 className='user-profile-header'>User Profile</h3>
                  <button>Edit Profile</button>
                </div>
                <p>____________________</p>
                <div class='savings-display'>
                  <p> Total Savings: {props.totalSavings}</p>
                </div>
                <div class='transation-button'>
                  <button >View Transaction History</button>
                </div>
              </div>
            </div>
            <div class="saves-board">
                <div class="inside">
                  <h3 className='user-profile-header'>Your Savings Boards</h3>

                    <div class="board">
                    <h1>Board 1</h1>
                    <h1>Savings: $100,000</h1>
                </div>
                <div class="board">
                    <h1>Board 2</h1>
                    <h1>Savings: </h1>
                </div>   
                </div>   
            </div>
        </div>
    );
  }
  
  export default Profile;
  