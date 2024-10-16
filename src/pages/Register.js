import React, { useState } from 'react';
import axios from '../.api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../Form.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nick, setNick] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      setError('');

      const response = await axios.post('/register', {
        email,
        password,
        nick,
      });

      Swal.fire({
        title: '¡YA ERES UNO DE LOS NUESTROS!',
        text: '¡¡¡¡¡te has registrado con éxito!!!!!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      localStorage.setItem('token', response.data.token); 
      navigate('/login');
    } catch (error) {
      
      if (error.response && error.response.data) {
        
        setError(error.response.data.error || 'Error en el registro.');
      } else {
        setError('Error en el registro.');
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nick"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p className='aclaracion'><b>Recuerda:</b><br />
       -Introduce un email correcto.<br />
        -La contraseña debe tener al menos 8 caracteres. <br />
        -El nick debe tener al menos 3 caracteres y solo letras o números
      </p>
    </div>
  );
}

export default Register;
