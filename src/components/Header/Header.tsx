'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/">
                <Image src='/assets/images/logoFinal.svg' className ="Logo" alt="Logo" height={130} width={130}/>
            </Link>
        </div>
        
    </header>
    );
};

export default Header;