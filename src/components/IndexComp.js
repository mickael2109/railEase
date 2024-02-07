import AnchorLink from "react-anchor-link-smooth-scroll"
import { FaBars, FaTimes } from 'react-icons/fa';
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
                        <AnchorLink to='/'>
                            <span>Accueil</span>
                        </AnchorLink>
                    </div>
                    <div className='lien'>
                        <AnchorLink to='/activite' >
                            <span>Services</span>
                        </AnchorLink>
                    </div>
                    <div className='lien'>
                        <AnchorLink to='/realisation'>
                            <span>Chemin</span>
                        </AnchorLink>
                    </div>
                    <div className='lien'>
                        <AnchorLink to='/apropos'>
                            <span>A Propos</span>
                        </AnchorLink>
                    </div>
                    <div className='lien'>
                        <AnchorLink to='/contact' >
                            <span>Contact</span>
                        </AnchorLink>
                    </div>
                    <div className='lien'>
                        <Link to='/login' className='btn-login' target="_blank">
                            <span>Se Connecter</span>
                        </Link>
                    </div>
                </div>
                <div className='cliquer-navbar'>
                    <div><i><FaBars/></i></div>
                </div>
            </div>
        </div>
    )
}