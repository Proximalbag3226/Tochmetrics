import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar_data';
import './navbar.css'
import { IconContext } from 'react-icons/lib';
import { Button } from 'reactstrap';
import { IoIosExit } from "react-icons/io";

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    const handleClearStorage = () => {
        localStorage.clear();
        alert('LocalStorage limpiado');
      };
    
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
        <div className='navbar'>
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="/#" className='menu-bars'>
                        <AiIcons.AiOutlineClose/>
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                      <Button color="danger" type="button" onClick={handleClearStorage} className="ms-2"><IoIosExit/>Cerrar Sesion</Button>
            </ul>
        </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar;
