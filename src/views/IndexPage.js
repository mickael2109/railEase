import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/IndexComp';
import '../assets/IndexPublic.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const IndexPage = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div className='content-index'>
                <div className='accueil'>
                    <div className='accueil-text'>
                        <p className='titre'>Colourful & sexy!</p>
                        <p className='sous-titre'>creating websites that make you stop & stare</p>
                        <p className='txt'>Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. 
                            Maecen aliquam, risus at semper. Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum. 
                        </p>
                        <div className='btn-commencer'>
                            <AnchorLink href="#service">Get Started</AnchorLink>
                        </div>
                    </div>
                    <div className='accueil-image'>
                        <img src='../media/background/train3.gif' alt='accueil-images'/>
                    </div>
                </div>
                <div className='service' id='service'>
                    <div className='titre-section'>
                        <span><span className='gras'>N</span>otre <span className='gras'>S</span>ervice</span>
                    </div>
                    <div className='accueil-text'>
                        <p className='titre'>Colourful & sexy!</p>
                        <p className='sous-titre'>creating websites that make you stop & stare</p>
                        <p className='txt'>Accusantium quam, aliquam ultricies eget tempor id, aliquam eget nibh et. 
                            Maecen aliquam, risus at semper. Proin iaculis purus consequat sem cure digni ssim. Donec porttitora entum. 
                        </p>
                        <div className='btn-commencer'>
                            <AnchorLink to="">Get Started</AnchorLink>
                        </div>
                    </div>
                    <div className='accueil-image'>
                        <img src='../media/background/train3.gif' alt='accueil-images'/>
                    </div>
                </div>


                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/controller'>Controller</Link></li>
                <li><Link to='/client'>Client</Link></li>
            </div>
        </div>
    );
};

export default IndexPage;