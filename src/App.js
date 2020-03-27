import React from "react";
import styles from './App.module.css';
import ExerciseScreen from "./component/ExerciseScreen";
import SetupScreen from "./component/SetupScreen";
import {SoundContextProvider} from "./component/SoundContext";
import {AppContextProvider} from "./AppContext";
import SummaryScreen from "./component/SummaryScreen";


export default function App() {
    return <SoundContextProvider>
        <AppContextProvider>
            {(page) => {
                return (<div className={styles.main}>
                    {page === 0 && <SetupScreen/>}
                    {page === 1 && <ExerciseScreen/>}
                    {page === 2 && <SummaryScreen/>}
                </div>)
            }}</AppContextProvider>
    </SoundContextProvider>

}
