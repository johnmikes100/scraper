'use client'

import React, { useState, ChangeEvent } from 'react';

import styles from "./TextBox.module.css";
import Caption from "@/components/TextBox/Caption/Caption"
import SubmitButton from '@/components/TextBox/SubmitButton/SubmitButton';
import { submitURLs } from '@/backend/submitURLs.js'; 

function Textbox() {
    const [urls, setUrls] = useState('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUrls(event.target.value);
    };

    const handleButtonClick = () => {
        const urlsArray = urls.split('\n').filter(url => url.trim()); // Split by newline and filter out empty entries
        submitURLs(urlsArray);
    };

    return (
        <div className={styles.container}>
            
            <textarea className={styles.largeTextArea} placeholder="Enter websites here..." value = {urls} onChange={handleChange}></textarea>
            <Caption></Caption>

            <div  className={styles.buttonArea} > 
                <SubmitButton urls={urls.split('\n')} onClick={handleButtonClick} />
            </div>  
        </div>

    );
}

export default Textbox;