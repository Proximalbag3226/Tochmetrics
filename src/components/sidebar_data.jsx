import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";
import * as PiIcons from "react-icons/pi";


export const SidebarData = [
    {
        title: "Inicio",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    {
        title: "Gestion de partidos",
        path: "/partidos",
        icon: <TbIcons.TbSoccerField/>,
        cName: "nav-text"
    },
    {
        title: "Usuarios",
        path: "/usuarios",
        icon: <FaIcons.FaUsers/>,
        cName: "nav-text"
    },
    {
        title: "Estadisticas",
        path: "/estadisticas",
        icon: <BsIcons.BsFileBarGraph/>,
        cName: "nav-text"
    },
    {
        title: "Reportes",
        path: "/reportes",
        icon: <TbIcons.TbReportAnalytics/>,
        cName: "nav-text"
    },
    {
        title: "Ligas",
        path: "/ligas",
        icon: <IoIcons.IoAmericanFootballOutline/>,
        cName: "nav-text"
    },
    {
        title: "Torneos",
        path: "/torneos",
        icon: <GiIcons.GiTrophy/>,
        cName: "nav-text"
    },
    {
        title: "Reglas",
        path: "/reglas",
        icon: <PiIcons.PiShieldCheckeredFill/>,
        cName: "nav-text"
    },
]