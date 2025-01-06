'use client'

import Image from 'next/image';
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
    urls: string[];  // Array of URLs
    onClick: (urls: string[]) => void;  // Pass the URLs on click
}


function SubmitButton({ urls, onClick }: SubmitButtonProps) {
    return (
        <div className={styles.container}>
            <button onClick={() => onClick(urls)} className={styles.buttonStyle}>
                Scrape Happy Hours
            </button>
        </div>
    );
}

export default SubmitButton;