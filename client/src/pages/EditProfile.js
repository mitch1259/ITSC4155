import '../css/EditProfile.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import StickMan from '../images/stickman.jpg';
import SimpleDialog from "../components/profile.jsx";


function EditProfile() {

    const handleClick = () => {
        console.log("clicked");
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //   Axios.get('http://localhost:3002/api/get').then((response) => {
    //     var data = Array.from(response.data);
    //     setUsers(data);
    //   });
    // }, []);

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
        <div class="container-content">
            <form action="#">
              <p class='edit_profile_header'>Update Your Profile Informations</p>
                <div class="pic-display">
                  {/* <img src="pics/Temp Gallery Pic 2.png" alt="temp pic"></img> */}
                  <img src={StickMan} alt="React Image"/>
                  <button class='new_pfp_button'> Click to upload new Picture</button>
                </div>
    
                <div>
                    <input type="text" name="name" id="first_name" placeholder="Update First Name" required></input>
                </div>

                <div>
                    <input type="text" name="name" id="last_name" placeholder="Update Last Name" required></input>
                </div>

                <div>
                    <input type="email" name="email" id="email" placeholder="Enter new Email" required></input>
                </div>
                <div>
                    <input type="text" name="name" id="password" placeholder="Update Password" required></input>
                </div>
                <div>
                    <input type="text" name="name" id="password" placeholder="Retype New Password" required></input>
                </div>
                <div>
                    <button class='submit'>Submit Changes</button>
                </div>
                <SimpleDialog></SimpleDialog>
                
        </form>
        </div>
        </div>
    );
  }
  
  export default EditProfile;
  