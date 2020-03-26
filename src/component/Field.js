import styles from "../App.module.css";
import React from "react";

export default function Field({label, description, type, value, onValueChange}) {

    return (<div style={{display: 'flex', flexDirection: 'column'}}>
        <p className={styles.questionTitle}>{label}</p>
        <input type={type} className={styles.input} value={value}
               onChange={(e) => onValueChange(e.target.value.toUpperCase())}
        />
        <p className={styles.questionDescription}>{description}</p>
    </div>)
}
