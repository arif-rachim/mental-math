import React, {useState} from "react";
import Field from "./Field";
import styles from "../App.module.css";
import {useAppContext} from "../AppContext";
import {ExerciseSession} from "./ExerciseScreen";

export default function SetupScreen() {
    const {config} = useAppContext();
    const {studentName, totalSums, totalQuestions, pauseBetweenQuestionInMs} = config;
    const [currentConfigScreen, setCurrentConfigScreen] = useState(0);
    const {setConfig, saveSettings} = useAppContext();
    return (<div style={{width:'100%'}}>
        <div style={{
            display: 'flex',
            position:'fixed',
            bottom : 0,
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
            {currentConfigScreen > 0 &&
            <button className={styles.buttonNavigator}
                    onClick={() => setCurrentConfigScreen((val) => val - 1)}>Back</button>}
            <div style={{flexGrow: '1'}}></div>
            {currentConfigScreen < 5 &&
            <button className={styles.buttonNavigator}
                    onClick={() => setCurrentConfigScreen((val) => val + 1)}>Next</button>
            }
            {currentConfigScreen === 5 &&
            <button className={styles.buttonNavigator}
                    onClick={() => {
                        setConfig({studentName, totalSums, totalQuestions, pauseBetweenQuestionInMs});
                        saveSettings();
                    }}>Save Changes
            </button>
            }
        </div>

        <div style={{padding: '2rem',width:'100%',background:'rgba(0,0,0,0.5)',boxShadow:'0px 30px 80px 10px rgba(0,0,0,0.7)'}}>
            {currentConfigScreen === 0 &&
            <h1>Mental Math Exercise</h1>
            }
            {currentConfigScreen === 1 && <Field
                label={"Student name ?"}
                type={"text"}
                value={studentName}
                onValueChange={(val) => setConfig(state => ({...state, studentName: val}))}
                description={"Your name will be recorded and your historical session will be kept in the device"}
            />

            }
            {currentConfigScreen === 2 &&
            <Field
                label={`Total sums in each session ?`}
                type={"number"}
                value={totalSums}
                onValueChange={(val) => setConfig(state => ({...state, totalSums: parseInt(val)}))}

                description={"For competition practice, total sums in a session usually `200`"}
            />
            }
            {currentConfigScreen === 3 &&
            <Field
                label={`Total questions in each sums ?`}
                type={"number"}
                value={totalQuestions}
                onValueChange={(val) => setConfig(state => ({...state, totalQuestions: parseInt(val)}))}
                description={"For competition practice, recommended total questions in a sum is `6`"}
            />}
            {currentConfigScreen === 4 &&
            <Field
                label={`Pause between question  ?`}
                type={"number"}
                value={pauseBetweenQuestionInMs}
                onValueChange={(val) => setConfig(state => ({...state, pauseBetweenQuestionInMs: parseInt(val)}))}
                description={"For competition practice, recommended pause is `1000` milliseconds (1 second)"}
            />
            }
            {currentConfigScreen === 5 && <ExerciseSession isTrial={true}/>}
        </div>
    </div>)
}
