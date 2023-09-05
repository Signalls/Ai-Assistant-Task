import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm= ({onSubmit}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName: name,
      password: password,
      email: email,

    };

    try {
      const response = await fetch("https://localhost:7137/api/Account/create/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        setName('')
        setEmail('')
        setPassword('') 
        navigate("/Login");
        // Optionally, you can redirect the user or perform other actions
       
      } else {
        console.error("Failed to register user");
        
        setName('')
        setEmail('')
        setPassword('') 
      }
    } catch (error) {
      setName('')
      setEmail('')
      setPassword('') 
      console.error("An error occurred:", error);
    }
  };
  return (
    <div class="signup-container">
  <h2>Sign up</h2>
  <form className="signup-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="text"
        placeholder="UserName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="form-group">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="btn">Sign up</button>
    <a href="/login">Login</a>
  </form>

</div>
  );
};
export default SignUpForm
