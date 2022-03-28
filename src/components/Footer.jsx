import React from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';

export default function Footer() {
    return  (
        <footer className="w-full px-5 pt-10 border-t-2 border-slate-300 dark:border-neutral-300 bg-rwr-red-50 dark:bg-neutral-800 text-stone-900 dark:text-stone-50">
        <section className="flex flex-row pb-10 justify-evenly align-start">
            <div className="flex flex-col p-2">
            <p className="inline text-base">CONTACTO</p>
            <nav>
                <ul className="flex flex-col text-sm">
                    <NavItem to="/" title={"contacto"}/>
                    <NavItem to="/" title={"About us"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"and other.."}/>
                </ul>
            </nav>
            </div>
            <div className="flex flex-col p-2">
            <p className="text-base">SOBRE WORKFLOW.COM</p>
            <nav>
                <ul className="flex flex-col text-sm">
                    <NavItem to="/" title={"contacto"}/>
                    <NavItem to="/" title={"About us"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"and other.."}/>
                </ul>
            </nav>
            </div>
            <div className="flex flex-col p-2">
            <p className="text-base">REDES SOCIALES</p>
            <nav>
                <ul className="flex flex-col text-sm">
                    <NavItem to="/" title={"contacto"}/>
                    <NavItem to="/" title={"About us"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"Another link"}/>
                    <NavItem to="/" title={"and other.."}/>
                </ul>
            </nav>
            </div>
        </section>
        <section className="w-full p-2 border-t-2 border-slate-300 dark:border-neutral-300">
            <h2 className='text-center'>
            Copyright © YYYY-2022 workflow.com Dirección. Todos los derechos
            reservados.
            </h2>
        </section>
        </footer>
    );
}