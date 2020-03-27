import React, {useRef, useState} from "react";
import styles from './App.module.css';
import ExerciseScreen from "./component/ExerciseScreen";
import SetupScreen from "./component/SetupScreen";
import {SoundContextProvider} from "./component/SoundContext";
import {AppContextProvider, useAppContext} from "./AppContext";
import SummaryScreen from "./component/SummaryScreen";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";

function AppDrawer() {
    const [displayAnchor,setDisplayAnchor] = useState(false);
    const {setPage} = useAppContext();

    const hasConfig = useRef((() => {
        const config = localStorage.getItem('config');
        if(config && config.length > 0){
            return true;
        }
        return false;
    })());
    return <>
        <Drawer anchor={'left'} open={displayAnchor} onClose={() => setDisplayAnchor(false)}>
            <div style={{padding: '1rem', backgroundColor: 'rgba(0,0,0,1)', height: '100%'}}>
                <div className={styles.button} onClick={() => {
                    setPage(1);
                    setDisplayAnchor(false);
                }}>Home</div>
                <div className={styles.button} style={{marginTop: '2rem'}} onClick={() => {
                    setPage(0);
                    setDisplayAnchor(false);
                }}>Change Settings
                </div>
                <div className={styles.button} style={{marginTop: '2rem'}} onClick={() => {
                    setPage(2);
                    setDisplayAnchor(false)
                }}>View Report</div>
            </div>
        </Drawer>
        {hasConfig.current &&
        <div style={{position: 'absolute', top: '0', left: 0}}>
            <IconButton onClick={() => setDisplayAnchor(true)}>
                <MenuIcon style={{color: 'white', fontSize: '2rem'}}/>
            </IconButton>
        </div>
        }
    </>;
}

export default function App() {
    return <AppContextProvider>
            {(page) => {
                return (
                    <SoundContextProvider>
                    <div className={styles.main}>
                    {page === 0 && <SetupScreen/>}
                    {page === 1 && <ExerciseScreen/>}
                    {page === 2 && <SummaryScreen/>}
                    {<AppDrawer />}
                </div></SoundContextProvider>)
            }}</AppContextProvider>



}
