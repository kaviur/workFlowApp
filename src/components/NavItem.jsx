import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem({title,to}) {
    return (
        <li className='text-white hover:text-acapulco-900 m-0 ml-3 height-auto cursor-pointer'>
            <Link to={to}>{title}</Link>
        </li>
    )
}