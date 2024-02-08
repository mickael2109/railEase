import React, { useEffect, useState } from 'react';
import { FaBars, FaBook, FaChalkboardTeacher, FaEllipsisV, FaTachometerAlt } from 'react-icons/fa';
import { BiSolidTrain } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';

const CSidebar = () => {

    const [activeTab, setActiveTab] = useState('Dashboard')
    const location = useLocation()
    const [reduice, setReduice] = useState(false)

    const reduiceSidebar = () => {
        const sidebarSolarma =  document.getElementById("sidebarFront");
        const logoS =  document.getElementById("logoS");

        sidebarSolarma.classList.toggle("miniSidebar");
        logoS.classList.toggle("logoReduice");
    }

    const reduiceTab = () => {
        setReduice(true)
    }
    const agrandirTab = () => {
        setReduice(false)
    }
    useEffect(() => {
        if(location.pathname === '/admin'){
            setActiveTab('Dashboard')
        }else if (location.pathname === '/admin/prof'){
            setActiveTab('Prof')
        }else if (location.pathname === '/admin/etudiant'){
            setActiveTab('Etudiant')
        }else if (location.pathname === '/admin/classe'){
            setActiveTab('Classe')
        }else if (location.pathname === '/admin/matiere'){
            setActiveTab('Matiere')
        }
    }, [location.pathname])
    return (
        <div className=''>
            <div className='logo-place'>
               <div className='logo' id='logoS'>
                    <div className='logo_min' id='mini-logo'><img src='../media/logo.png' alt='logo'/></div>
               </div>
               <div className='icon-bar'>
                    <div className={`${!reduice ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduiceSidebar(); reduiceTab(); }}><i><FaBars/></i></div>
                    <div className={`${reduice ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduiceSidebar(); agrandirTab(); }}><i><FaBars/></i></div>
               </div>
            </div>
            <div className='profile-sidebar'>
                <div className='profile-image'>
                    <div className='' id='profile-image'><img src='../media/user.png' alt='profile'/></div>
                </div>
                <div className={`${!reduice ? "profile-information" : "desactiveMaxSidebar"}`}>
                    <div><span className='info-nom'>Mickael</span></div>
                    <div><span className='info-fonction'>Administrateur</span></div>
                </div>
                <div className={`${!reduice ? "profile-parametre" : "desactiveMaxSidebar"}`} id='info-parametre'>
                    <i><FaEllipsisV/></i>
                </div>
            </div>
            <div className='navigation'>
                <div className='titre'><span id='titre-navigation'>Navigation</span></div>
                
                <Link to='/client'>
                    <li className={`${activeTab === "Dashboard" ? "active" : ""}`} onClick={() => setActiveTab("Dashboard")}>
                        <i className=''><BiSolidTrain /></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Gare</span>
                    </li>
                </Link>
                <Link to='/client/historique'>
                    <li className={`${activeTab === "Prof" ? "active" : ""}`} onClick={() => setActiveTab("Prof")}>
                        <i className=''><FaChalkboardTeacher/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Historique</span>
                    </li>
                </Link>
            </div>
        </div>
    );
};

export default CSidebar;