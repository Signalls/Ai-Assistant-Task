import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({onSubmit}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    let [token, Id] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userData = {
        userName: name,
        password: password,
  
      };
  
      try {
        const response = await fetch("https://localhost:7137/api/Account/authenticate/user", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
            const data = await response.json();
            token = data.token;
            localStorage.setItem("authToken", token);

            navigate("/Home");
          // Optionally, you can redirect the user or perform other actions
        } else {
          console.error("Failed to login user");
          setName('')
          setPassword('') 
        }
      } catch (error) {
        setName('')
        setPassword('') 
        console.error("An error occurred:", error);
      }
    };
 
    return (
      <div className="signup-container">
      <h2>Log in</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="Login-group">
          <input
            type="text"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="Login-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn">Sign In</button>
        <a href="/">Go back to Sign up</a>
      </form>
    </div>
    
  )
}

export default Login