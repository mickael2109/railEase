import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        await axios.post('http://localhost:5000/auth/login', 
        {
          "email": email,
          "password": password
        }).then(res=>{
              window.location.href='/admin'
              const token = res.data.access_token;
              localStorage.setItem('token', token);       
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: error.response.data.message,
          });
        })
      } catch (error) {
        console.error('Erreur de connexion:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.',
        });
      }
    };


    return (
        <div className='authentification'>
            <div className='logo-auth'>
              <img src='../media/background/login.jpg' alt='logo'/>
            </div>
            <div className='input-auth'>
              <h2>Connexion</h2>
              <div className="control">
                <i><FaUser/></i>
                <input type="text" className='input' placeholder="Email d'utilisateur" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" className='input' placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
              </div>
                   
              <button onClick={handleLogin} className='btn-auth'>Se connecter</button>

              <div className='create-compte'>
                <span>Vous n'avez pas de compte ? <Link to='/login/create'>Inscrivez-vous maintenant</Link></span>
              </div>

            </div>
            
        </div>
    );
};

export default Login;