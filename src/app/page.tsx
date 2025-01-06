import Image from "next/image";
import React from "react";
import Title from "@/components/Title/Title"
import TextBox from "@/components/TextBox/TextBox"
import styles from "./page.module.css"


export default function Home() {
  return (
    <div className={styles.holder}>
      <Title></Title>
      
      <div className = {styles.midSection}> 
        <TextBox></TextBox>
      </div>
      
    </div>

  );
}
