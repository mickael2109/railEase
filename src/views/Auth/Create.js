import axios from 'axios';
import React, { useState } from 'react';
import { FaEdit, FaLock, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDriveFileRenameOutline, MdEmail, MdPermIdentity } from "react-icons/md";
import { Utils } from '../../_utils/utils';

const Create = () => {

    const [user, setUser] = useState({
        nom: '', email: '', cin: '', num: '', password: '',preview: '../media/userdefault.png', confirm_mdp: ""
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
        if(user.password === user.confirm_mdp){
            try {
                await axios.put('http://localhost:5000/user/register', 
                {
                  "nom": user.nom,
                  "email": user.email,
                  "cin": user.cin,
                  "phone": user.num,
                  "password": user.password,
                  "image ": profile, 
                  "nomImage": profile.name,
                  "roleId": 3
                },{
                  headers: {"Content-Type": "multipart/form-data"}
                }).then(res=>{
                      Utils.sucess("Votre compte est bien enregistrée!")
                      setUser(...user)
                      setUser({...user, preview: '../media/userdefault.png'})
                      setProfile('')
                })
                .catch((error) => {
                  Utils.errorPage("Erreur d'enregistrement! ")
                })
              } catch (error) {
                  Utils.errorPage('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.')
            }
            
        }else{
            Utils.errorPage("Veuillez confirmer votre mot de passe! ")
        };
    }
        


    return (
        <div className='authentification'>
            <div className='logo-auth'>
              <img src='../media/background/createCompte.jpg' alt='logo'/>
            </div>
            <form onSubmit={createCompte}>
                <div className='input-auth'>
                <h2>Inscription</h2>
                <div className='profile-user'>
                    <label className='file-label'>
                        <input type='file' className='file-input' onChange={loadProfile}/>
                        <span className='file-cta'>
                            <img src={user.preview} alt='profile' className='img-profile' />
                        </span>
                    </label>
                    <div className='icon-modifier'><i><FaEdit/></i></div>
                </div>
        
                <div className="control">
                    <i><MdDriveFileRenameOutline /></i>
                    <input type="text" value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} className='input' placeholder="Nom" />
                </div>
                <div className="control">
                    <i><MdEmail/></i>
                    <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='input' placeholder="Email" />
                </div>
                <div className="control">
                    <i><MdPermIdentity/></i>
                    <input type="text" value={user.cin} onChange={(e) => setUser({...user, cin: e.target.value})} className='input' placeholder="CIN" />
                </div>
                <div className="control">
                    <i><FaPhoneAlt/></i>
                    <input type="text" value={user.num} onChange={(e) => setUser({...user, num: e.target.value})} className='input' placeholder="Numéro téléphone" />
                </div>
                <div className="control">
                    <i><FaLock/></i>
                    <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='input' placeholder="Mot de passe"/>
                </div>
                <div className="control">
                    <i><FaLock/></i>
                    <input type="password" value={user.confirm_mdp} onChange={(e) => setUser({...user, confirm_mdp: e.target.value})} className='input' placeholder="Comfirmer votre mot de passe"  />
                </div>

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