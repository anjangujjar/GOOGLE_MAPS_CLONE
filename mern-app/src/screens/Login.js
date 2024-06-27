import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const storedUser = storedUsers.find(user => user.email === credentials.email && user.password === credentials.password);

      if (storedUser) {
        localStorage.setItem('currentUser', JSON.stringify(storedUser)); // Store current user
        localStorage.setItem('location', storedUser.geolocation); // Store location
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">New user? Signup</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
