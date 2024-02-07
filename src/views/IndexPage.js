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

                {/* ACCUEIL */}
                <div className='accueil'>
                    <div className='back-accueil'>
                        <img src="../media/background/wave(2).svg" alt="" className='imageback' />
                    </div>
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

                {/* SERVICE */}
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
                      
                    </div>
                    <div className='accueil-image'>
                        <img src='../media/background/train3.gif' alt='accueil-images'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;