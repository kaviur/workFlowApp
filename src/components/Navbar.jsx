import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import NavItem from './NavItem';
import {FiMenu,FiXCircle} from 'react-icons/fi'

export default function Navbar() {

    const {logged,name} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const [open,setOpen] = useState(true)

    const signOut = () =>{
        dispatch(logout())
        }

    return (
        <nav className="backdrop-opacity-10 bg-nile-blue-500 py-3 text-white">
            <div className='max-w-screen-xl mx-auto flex justify-between relative'>
            <Link to="/"><p className='ml-2 md:ml-0'>WorkFlowApp</p></Link>
            <ul className={`${open?"block":"hidden"} fixed md:bg-transparent text-right md:flex absolute right-0 top-7 md:static p-2 pl-10 md:p-0 md space-y-2 md:space-y-0`}>
                <NavItem to="/" title={"Link"}/>
                <NavItem to="/" title={"Link"}/>
                <NavItem to="/" title={"Link"}/>
                <NavItem to="/" title={"Link"}/>
                <NavItem to="/drag_and_drop" title={"DnD"}/>
                <NavItem to="/drag_and_drop2" title={"DnD2"}/>
                {logged&&<NavItem to="/my_teams" title={"My teams"}/>}

                {logged?<li className="ml-2" onClick={signOut}> {name}-Cerrar sesión</li>:<NavItem to="/login" title={"Iniciar sesión"}/>}
            </ul>
            <button onClick={()=>{setOpen(!open)}} className='block md:hidden mr-2 md:mr-0'>{open?<FiXCircle className='h-5 w-5'/>:<FiMenu className='h-5 w-5'/>}</button>
            </div>
        </nav>
    )
}