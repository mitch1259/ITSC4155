import '../css/EditProfile.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function EditProfile() {

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
        <div class="container-content">
            <form action="#">
    
                <div>
                    <input type="text" name="name" id="name" placeholder="Name" required></input>
                </div>
        
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" required></input>
                </div>
                    
        
                <div>
                    <input type="tel" name="phone" id="phone" placeholder="Phone number" required></input>
                </div>
                    
        
                <div>
                    <input type="number" name="count" id="count" min="1" max="20" placeholder="Enter Credit Card Information"></input>
        
                </div>
                <div>
                    <textarea name="message" id="message" placeholder="Special requests"></textarea>
                </div>
        
                <div class="btn-purchase">
                    <input type="submit" name="submit" id ="submit" value="Purchase"></input>
                </div>
                
        </form>
        </div>
        </div>
    );
  }
  
  export default EditProfile;
  