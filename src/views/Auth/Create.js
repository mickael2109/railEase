import axios from 'axios';
import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Create = () => {

    const [user, setUser] = useState({
        nom: '', email: '', cin: '', num: '', password: '',preview: ''
    })

    const [profile, setProfile] = useState('')

    const loadProfile = (e) =>{
        const image = e.target.files[0]
        if(image){
            setProfile(image)
            setUser({...user, preview: URL.createObjectURL(image)})
        }
    }

    const createCompte = async (e) => {
        e.preventDefault()
        console.log("nom : ",user.name)
        console.log("email : ",user.email)
        console.log("cin : ",user.cin)
        console.log("num : ",user.num)
        console.log("password : ",user.password)
        console.log("image : ",user.preview)
        
        // try {
        //   await axios.put('http://localhost:5000/auth/create', 
        //   {
        //     "name": user.nom,
        //     "email": user.email,
        //     "cin": user.cin,
        //     "num": user.num,
        //     "password": user.password,
        //     "image ": user.preview
        //   }).then(res=>{
        //         window.location.href='/admin'
        //         const token = res.data.access_token;
        //         localStorage.setItem('token', token);       
        //   })
        //   .catch((error) => {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Erreur de connexion',
        //       text: error.response.data.message,
        //     });
        //   })
        // } catch (error) {
        //   console.error('Erreur de connexion:', error);
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Erreur de connexion',
        //     text: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.',
        //   });
        // }

      };


    return (
        <div className='authentification'>
            <div className='logo-auth'>
              <img src='../media/background/createCompte.jpg' alt='logo'/>
            </div>
            <form onSubmit={createCompte}>
                <div className='input-auth'>
                <h2>Inscription</h2>
                <div className="control">
                        <div className="file">
                            <label className='file-label'>
                                <input type='file' className='file-input' onChange={loadProfile}/>
                                <span className='file-cta'>
                                    <span className='file-label'>Choisir une image ...</span>
                                </span>
                            </label>
                        </div>
                    </div>
                <div className="control">
                    <i><FaUser/></i>
                    <input type="text" value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} className='input' placeholder="Nom" />
                </div>
                <div className="control">
                    <i><FaUser/></i>
                    <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='input' placeholder="Email" />
                </div>
                <div className="control">
                    <i><FaUser/></i>
                    <input type="text" value={user.cin} onChange={(e) => setUser({...user, cin: e.target.value})} className='input' placeholder="CIN" />
                </div>
                <div className="control">
                    <i><FaUser/></i>
                    <input type="text" value={user.num} onChange={(e) => setUser({...user, num: e.target.value})} className='input' placeholder="Numéro téléphone" />
                </div>
                <div className="control">
                    <i><FaLock/></i>
                    <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='input' placeholder="Mot de passe"/>
                </div>
                <div className="control">
                    <i><FaLock/></i>
                    <input type="password" className='input' placeholder="Comfirmer votre mot de passe"  />
                </div>
                {
                    user.preview ? (
                        <figure className='image is-128x128'>
                            <img src={user.preview} alt='Preview images' />
                        </figure>
                    ):(
                        ""
                    )
                }
                
                <button className='btn-auth'>S'inscrire</button>

                <div className='create-compte'>
                    <span><Link to='/login'>J'ai déjà un compte</Link></span>
                </div>

                </div>
            </form>
        </div>
    );
};

export default Create;