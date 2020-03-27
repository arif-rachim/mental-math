import React, {useEffect, useRef, useState} from "react";
import styles from "../App.module.css";
import {useSound} from "./SoundContext";
import {useAppContext} from "../AppContext";
import ReactMinimalPieChart from "react-minimal-pie-chart";


function generateRandomNumber(result) {
    const total = result.reduce((ac, next) => ac + next, 0);
    const shouldBeNegative = Math.random() <= 0.3; // 30 percent chance;
    const nextCandidate = (Math.floor(Math.random() * 9) + 1) * (shouldBeNegative ? -1 : 1);
    if ((total + nextCandidate) > 0 && Math.abs(result[result.length - 1]) !== Math.abs(nextCandidate)) {
        return nextCandidate;
    } else {
        return generateRandomNumber(result);
    }
}

function generateQuestionArray(totalQuestions) {
    const result = [];
    while (result.length < totalQuestions) {
        result.push(generateRandomNumber(result))
    }
    return result;
}

function setupQuestions(totalQuestions, totalSums) {
    const result = [];
    for (let i = 0; i < totalSums; i++) {
        result.push(generateQuestionArray(totalQuestions))
    }
    return result;
}

function handleSubmit({answer, setTimerRunning, setCurrentSum, setCurrentQuestion, setAnswers, timeLogger}) {
    setTimerRunning(false);
    setCurrentSum(val => val + 1);
    setCurrentQuestion(-1);
    const time = new Date().getTime() - timeLogger.current;
    setAnswers((val) => [...val, {answer, time}]);
}

function ClickToStart({studentName, setSessionRunning}) {
    return <div style={{display:'inline-block',margin:'auto',marginTop:'2rem',padding:'1rem',background:'rgba(0,0,0,0.5)'}}>
        <h1 style={{textAlign: 'center', marginBottom: '5rem'}}>{studentName}</h1>
        <div style={{textAlign: 'center'}}>
            <button className={styles.button} onClick={() => setSessionRunning(true)}>Click Here To Begin Session</button>
        </div>
    </div>;
}

function AnswerForm({setTimerRunning, setCurrentQuestion, setCurrentSum, setAnswers, isTrial}) {
    const answerRef = useRef(null);
    const timeLogger = useRef(null);
    useEffect(() => {
        timeLogger.current = new Date().getTime();
        answerRef.current.focus();
    }, []);
    return <form style={{
        width: '100%', display: 'flex',
        flexDirection: 'column'
    }} action=""
                 onSubmit={(e) => {
                     e.preventDefault();
                     const answer = parseInt(e.target.elements.answer.value);
                     if(answer >= 0){
                         handleSubmit({
                             answer,
                             setTimerRunning,
                             setCurrentQuestion,
                             setCurrentSum,
                             setAnswers,
                             timeLogger
                         })
                     }
                 }}>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
            marginBottom: '1rem'
        }}>
            <div style={{textAlign: 'left', fontSize: '2rem'}}>Answer :</div>
            <div style={{flexGrow: '1'}}></div>
            {!isTrial &&
            <button className={styles.button} type={'submit'}>Enter</button>
            }
        </div>
        <input ref={answerRef} className={styles.input} style={{marginBottom: '2rem', fontSize: '8rem'}}
               name={"answer"}/>

    </form>;
}

function QuestionPanel({questionSets, currentSum, currentQuestion}) {
    return <div style={{
        fontSize: '18rem',
        position: 'relative',
        margin: 'auto',
        maxWidth : '18rem',
        height : '18rem',
    }}>
        <div style={{
            background: 'rgba(0,0,0,0.5)',
            boxShadow: '0px 0px 80px 10px rgba(0,0,0,1)',
            borderRadius: '20rem', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
        }}/>
        <div style={{
            position : 'relative',
            top: '-4rem',
            width: '100%',
            textAlign: 'center'
        }}>{questionSets[currentSum][currentQuestion]}</div>
    </div>;
}

export function ExerciseSession({isTrial}) {
    const {config,saveSession,setPage} = useAppContext();
    const {studentName, totalSums, totalQuestions, pauseBetweenQuestionInMs} = config;
    const [questionSets] = useState(setupQuestions(totalQuestions, totalSums));
    const [timerRunning, setTimerRunning] = useState(false);
    const [sessionRunning, setSessionRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const {playSound} = useSound();
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        let intervalId = null;
        if (sessionRunning) {
            if (timerRunning) {
                intervalId = setInterval(() => {
                    setCurrentQuestion((val) => {
                        if (val < totalQuestions) {
                            return val + 1
                        }
                        return val;
                    });
                }, pauseBetweenQuestionInMs);
            } else {
                setTimerRunning(true);
            }
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [timerRunning, sessionRunning, pauseBetweenQuestionInMs, totalQuestions]);


    useEffect(() => {
        if (sessionRunning && timerRunning) {
            const number = questionSets[currentSum][currentQuestion];
            if (number !== undefined) {
                playSound(number.toString());
            }
        }
    }, [timerRunning, sessionRunning, currentQuestion, currentSum, questionSets, playSound]);

    useEffect(() => {
        if (currentSum === totalSums) {
            setSessionRunning(false);
            setTimerRunning(false);
            setCurrentQuestion(-1);
            setCurrentSum(0);
            if(!isTrial){
                saveSession(questionSets,answers);
                setPage(2);
            }
            setAnswers([]);
        }
    }, [currentSum, totalSums, answers, questionSets,saveSession,setPage]);
    const isLastQuestionInTheSum = currentQuestion === totalQuestions;
    const currentTotalQuestions = (currentSum * totalQuestions) + (currentQuestion === -1 ? 0 : currentQuestion);
    const grandTotalQuestions = totalSums * totalQuestions;
    const percentage = Math.round((currentTotalQuestions / grandTotalQuestions) * 100);
    return (<div style={{maxWidth: '100%',display:'flex',flexDirection:'column'}}>
        <div style={{display: 'flex'}}>
            <div style={{flexGrow: '1'}}></div>
            <ReactMinimalPieChart
                style={{width: 100, marginRight: '-1.5rem', marginTop: '-1.5rem'}}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                    {
                        color: 'rgba(255,255,255,0.9)',
                        value: percentage
                    },
                    {
                        color: 'rgba(255,255,255,0.5)',
                        value: 100 - percentage
                    }
                ]}
                label={false}
                labelPosition={50}
                lengthAngle={360}
                lineWidth={30}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={50}
                rounded={false}
                startAngle={-90}
            />
        </div>
        {!sessionRunning && <ClickToStart studentName={studentName} setSessionRunning={setSessionRunning}/>}
        {sessionRunning && currentSum < totalSums && (
            <div style={{textAlign: 'center'}}>
                {timerRunning && <div>
                    {currentQuestion === -1 && <h1 style={{fontSize: '4rem'}}>Ready !</h1>}
                    {currentQuestion >= 0 && !isLastQuestionInTheSum &&
                    <QuestionPanel questionSets={questionSets} currentSum={currentSum}
                                   currentQuestion={currentQuestion}/>}
                    {isLastQuestionInTheSum &&
                    <AnswerForm setTimerRunning={setTimerRunning} setCurrentQuestion={setCurrentQuestion}
                                setCurrentSum={setCurrentSum} setAnswers={setAnswers} isTrial={isTrial}/>
                    }
                </div>}
            </div>
        )}
    </div>)
}

export default function ExerciseScreen() {
    return <div style={{padding: '2rem', width: '100%'}}><ExerciseSession isTrial={false}/></div>;
}
