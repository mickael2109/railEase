import { Link } from "react-router-dom";

export const Navbar = () => {

    return (
        <div className='header' id='headerPage'>
            <div className='navbar-public'>
                <div className='navbar-logo'>
                    <div className='logo'>
                        <img src='../media/background/trainLogo.png' alt="" className='img-logo-max'/>
                    </div>
                </div>
                <div className='navbar-lien'>
                    <div className='lien'>
                        <Link to='/login' className='btn-auth login' target="_blank">
                            <span>Se Connecter</span>
                        </Link>
                    </div>
                    <div className='lien'>
                        <Link to='/login/create' className='btn-auth create' target="_blank">
                            <span>Créer Compte</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}