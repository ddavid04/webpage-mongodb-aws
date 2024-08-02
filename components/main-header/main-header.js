'use client';
import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

export default function MainHeader() {

    return (<>
        <MainHeaderBackground/>
        <header className={classes.header}>
            <Link className={classes.logo} href={"/"}>
                <Image src={logoImg} alt={"logo"} priority/>
                <span className={classes.spanSize}><span className={classes.underline}>Sha</span>
                    <span className={classes.hero}><span className={classes.underline}>re</span>cipe</span></span>
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink href={'/meals'}>Browse Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href={'/community'}>Foodies Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>);
}