'use client'

import Image from 'next/image';
import styles from "./Caption.module.css";



function Caption() {
    return (

        <div className={styles.caption}>
            Please provide a list of restaurant websites with each on a new line.
        </div>

    );
}

export default Caption;