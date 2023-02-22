import '../css/Profile.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Profile() {

    const handleClick = () => {
        console.log("clicked");
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:3002/api/get').then((response) => {
        var data = Array.from(response.data);
        setUsers(data);
      });
    }, []);

    const submitName = () => {
      Axios.post('http://localhost:3002/api/insert', {
        firstName: firstName,
        lastName: lastName
      }).then(() => {
        console.log("successful insert");
      });
      console.log("clicked! firstName: ", firstName, " lastName: ", lastName);
    };

    return (
        <div>
        <header>
          <p>Temp Space for the Navigation Bar</p>
        </header>
            <div class="user-profile">
              <div class="inside-profile">
                <div class="pic-display">
                  {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
                  <img src="https://reactjs.org/logo-og.png" alt="React Image"/>
                </div>
                <div class='user-display'>
                  <h3>User Profile</h3>
                  <button>Edit Profile</button>
                </div>
                <p>____________________</p>
                <div class='savings-display'>
                  <p> Total Savings: []</p>
                </div>
                <div class='transation-button'>
                  <button >View Transaction History</button>
                </div>
              </div>
            </div>
            <div class="saves-board">
                <div class="inside">
                  <h3>Your Savings Boards</h3>

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
  