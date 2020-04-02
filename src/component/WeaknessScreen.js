import React, { useState} from "react";
import {useAppContext} from "../AppContext";

import styles from "../App.module.css";

export default function WeaknessScreen(){
    const {getWeakness,setPage} = useAppContext();
    let [scores] = useState(() => getWeakness());
    return <div>
        <div style={{margin:'1rem',textAlign:'right'}}>
            <button className={styles.button} onClick={() => setPage(31)}>Exercise Weakness</button>
        </div>
        <div>
            <table style={{textAlign:'center',backgroundColor:'rgba(255,255,255,0.1)',margin:'1rem'}}>
                <thead>
                <tr>
                    <td style={{padding:'1rem'}}>No</td>
                    <td style={{padding:'1rem'}}>Question</td>
                    <td style={{padding:'1rem'}}>Failed Answers</td>
                </tr>
                </thead>
                <tbody>
                {scores.map((score,index) => {
                    return <tr key={index}>
                        <td style={{paddingLeft:'1rem',paddingRight:'1rem'}}>{index + 1}</td>
                        <td style={{paddingLeft:'1rem',paddingRight:'1rem'}}>{score.questions.join(',')}</td>
                        <td style={{textAlign:'left',paddingLeft:'1rem',paddingRight:'1rem'}}>{score.answers.map(a => a.answer).join(',')}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>

    </div>
}
