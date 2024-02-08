import React from 'react';
import { Navbar } from '../components/IndexComp';
import '../assets/IndexPublic.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { MdMeetingRoom } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaTachometerAlt } from 'react-icons/fa';

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
                        <p className='titre'>Train Urbain d'Antananarivo</p>
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

                    <div className='service'>
                        <div className='card-service'>
                            <div className='icon-service'><i><MdMeetingRoom/></i></div>
                            <div className='titre-service'><span>Gain du Temps</span></div>
                            <div className='text-service'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Porro, laborum fuga, nihil facilis vero blanditiis 
                                    perferendis maiores repellendus quo modi quia nobis, 
                                    delectus nostrum autem minima alias totam commodi sapiente.
                                </p>
                            </div>
                        </div>
                        <div className='card-service'>
                            <div className='icon-service'><i><PiStudentFill/></i></div>
                            <div className='titre-service'><span>Sécurité</span></div>
                            <div className='text-service'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Porro, laborum fuga, nihil facilis vero blanditiis 
                                    perferendis maiores repellendus quo modi quia nobis, 
                                    delectus nostrum autem minima alias totam commodi sapiente.
                                </p>
                            </div>
                        </div>
                        <div className='card-service'>
                            <div className='icon-service'><i><FaTachometerAlt/></i></div>
                            <div className='titre-service'><span>Rapidité</span></div>
                            <div className='text-service'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Porro, laborum fuga, nihil facilis vero blanditiis 
                                    perferendis maiores repellendus quo modi quia nobis, 
                                    delectus nostrum autem minima alias totam commodi sapiente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;