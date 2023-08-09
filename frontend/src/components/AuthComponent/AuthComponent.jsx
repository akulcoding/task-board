import React, { useState } from 'react';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
// import './AuthComponent.css';

const AuthComponent = () => {
    const navigate = useNavigate();

    const [rusername, setRusername] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [lusername, setLusername] = useState('');
    const [lpassword, setLpassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5001/register', { rusername, rpassword });
            setMessage('Registration successful.');
        } catch (error) {
            setMessage('An error occurred during registration.');
        }
    };

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5001/login', { lusername, lpassword });
            setMessage('Login successful.');
            navigate("/lists");
        } catch (error) {
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={rusername} onChange={e => setRusername(e.target.value)} />
            <input type="password" placeholder="Password" value={rpassword} onChange={e => setRpassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>

            <h2>Login</h2>
            <input type="text" placeholder="Username" value={lusername} onChange={e => setLusername(e.target.value)} />
            <input type="password" placeholder="Password" value={lpassword} onChange={e => setLpassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <p>{message}</p>
        </div>
    );
}

export default AuthComponent;