import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const navLocation = () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };

      const position = await navLocation();
      const { latitude, longitude } = position.coords;
      console.log("Latitude:", latitude, "Longitude:", longitude);

      // Instead of sending the location to the backend, we directly use it
      const location = `Lat: ${latitude}, Long: ${longitude}`;
      console.log("Location:", location);
      setAddress(location);
      setCredentials({ ...credentials, geolocation: location });
    } catch (error) {
      console.error("Error fetching location:", error);
      let errorMessage = "Location cannot be fetched. Please ensure location services are enabled and try again.";
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = "Location permission denied. Please enable location services and try again.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = "Location information is unavailable. Please try again later.";
      } else if (error.code === error.TIMEOUT) {
        errorMessage = "Location request timed out. Please try again.";
      }
      alert(errorMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(credentials));
      localStorage.setItem('location', credentials.geolocation);
      navigate("/login");
    } catch (error) {
      console.error("Error storing user data:", error);
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
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name='address' placeholder='Click below for fetching address' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="m-3">
            <button type="button" onClick={handleClick} className="btn btn-success">Click for current Location</button>
          </div>
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
}
