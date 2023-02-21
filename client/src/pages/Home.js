import '../css/home.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function Home() {

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
      <div className="home-wrapper">
          <h3 className="home-header">ITSC-4155 Group 9: Sample Application</h3>
          <label>First Name:</label>
          <input type="text" name="firstName" onChange={(e)=> {
            setFirstName(e.target.value);
          }}/>
          <label>Last Name:</label>
          <input type="text" name="lastName" onChange={(e)=> {
            setLastName(e.target.value);
          }}/>
          <button onClick={submitName}>Submit</button>
          {users.map((val) => {
            return <h4>First Name: {val.first_name} | Last Name: {val.last_name}</h4>
          })}

          
      </div>
      
          
    );
  }
  
  export default Home;
  