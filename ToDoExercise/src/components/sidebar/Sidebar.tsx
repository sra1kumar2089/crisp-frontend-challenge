import React from 'react'
import { NavLink } from "react-router-dom";
import './Sidebar.css'

const Sidebar = () => {
    const activeLink = 'hover:hover:bg-blue-800 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-500'
    const normalLink = 'hover:bg-red-500 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold'

    return (
        <React.Fragment>
            <section>
                <div className="sidenav">
                    <NavLink to={"/"} className={({ isActive }) => isActive ? activeLink : normalLink}>
                        <span>{"Tasks"}</span>
                    </NavLink>

                    <NavLink to={"/matrix"} className={({ isActive }) => isActive ? activeLink : normalLink}>
                        <span>{"Matrix"}</span>
                    </NavLink>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Sidebar