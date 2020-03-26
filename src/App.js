import React from "react";
import styles from './App.module.css';
import ExerciseScreen from "./component/ExerciseScreen";
import SetupScreen from "./component/SetupScreen";
import {SoundContextProvider} from "./component/SoundContext";
import {AppContextProvider} from "./AppContext";

export default function App() {
    return <SoundContextProvider>
        <AppContextProvider>
            {(page) => {
            return (<div className={styles.main}>
                    {page === 0 && <SetupScreen />}
                    {page === 1 && <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                        <div style={{padding:'2rem',width:'100%'}}>
                        <ExerciseScreen  isTrial={false}/>
                        </div>
                    </div>}
                </div>)
        }}</AppContextProvider>
    </SoundContextProvider>

}
