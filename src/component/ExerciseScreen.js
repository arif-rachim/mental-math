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

function handleSubmit({event,setTimerRunning,setCurrentSum,setCurrentQuestion,setAnswers}) {
    event.preventDefault();
    setTimerRunning(false);
    setCurrentSum(val => val + 1);
    setCurrentQuestion(-1);
    const answer = parseInt(event.target.elements.answer.value);
    setAnswers((val)=>[...val,answer]);
}

function ClickToStart({studentName, setSessionRunning}) {
    return <div style={{width: '100%'}}>
        <h1 style={{textAlign: 'center', marginBottom: '5rem'}}>{studentName}</h1>
        <div style={{textAlign: 'center'}}>
            <button className={styles.button} onClick={() => setSessionRunning(true)}>Click Here To Start</button>
        </div>
    </div>;
}

function AnswerForm({setTimerRunning, setCurrentQuestion, setCurrentSum, setAnswers, answerRef, isTrial}) {
    return <form style={{width: '100%', display: 'flex', flexDirection: 'column'}} action=""
                 onSubmit={(e) => handleSubmit({
                     event: e,
                     setTimerRunning,
                     setCurrentQuestion,
                     setCurrentSum,
                     setAnswers
                 })}>
        <div style={{textAlign: 'left', fontSize: '2rem', marginBottom: '2rem'}}>Answer :</div>
        <input ref={answerRef} className={styles.input} style={{marginBottom: '2rem', fontSize: '8rem'}}
               name={"answer"}/>
        {!isTrial &&
        <div style={{
            textAlign: 'right',
        }}>
            <button className={styles.buttonNavigator} type={'submit'}>Enter</button>
        </div>
        }
    </form>;
}

function QuestionPanel({questionSets, currentSum, currentQuestion}) {
    return <div style={{
        fontSize: '18rem',
        width: '21rem',
        height: '21rem',
        position: 'relative',
        margin: 'auto'
    }}>
        <div style={{
            background: 'rgba(0,0,0,0.5)',
            boxShadow: '0px 0px 80px 10px rgba(0,0,0,0.7)',
            borderRadius: '20rem',position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>
        <div style={{
            position: 'absolute',
            top: '-2rem',
            width: '100%',
            textAlign: 'center'
        }}>{questionSets[currentSum][currentQuestion]}</div>
    </div>;
}

export default function ExerciseScreen({isTrial}) {
    const {config} = useAppContext();
    const {studentName, totalSums, totalQuestions, pauseBetweenQuestionInMs} = config;
    const [questionSets] = useState(setupQuestions(totalQuestions, totalSums));
    const [timerRunning, setTimerRunning] = useState(false);
    const [sessionRunning, setSessionRunning] = useState(false);
    const [currentSum, setCurrentSum] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(-1);
    const {playSound} = useSound();
    const [answers,setAnswers] = useState([]);
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
            }
            else {
                setTimerRunning(true);
            }
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [timerRunning, sessionRunning, pauseBetweenQuestionInMs, totalQuestions]);

    const answerRef = useRef(null);
    useEffect(() => {
        if(currentQuestion === totalQuestions && answerRef.current){
            answerRef.current.focus();
        }

    },[currentQuestion,totalQuestions]);
    useEffect(() => {
        if(sessionRunning && timerRunning){
            const number = questionSets[currentSum][currentQuestion];
            if(number !== undefined){
                playSound(number.toString());
            }
        }
    },[timerRunning,sessionRunning,currentQuestion,currentSum,questionSets,playSound]);

    useEffect(() => {
        if(currentSum === totalSums){
            setSessionRunning(false);
            setTimerRunning(false);
            setCurrentQuestion(-1);
            setCurrentSum(0);
        }
    },[currentSum,totalSums]);
    const isLastQuestionInTheSum = currentQuestion === totalQuestions;
    const currentTotalQuestions = (currentSum * totalQuestions) + (currentQuestion === -1 ? 0 : currentQuestion);
    const grandTotalQuestions = totalSums * totalQuestions;
    const percentage = Math.round((currentTotalQuestions / grandTotalQuestions) * 100);
    console.log(percentage);
    return (<div style={{maxWidth:'100%'}}>
        <div style={{display:'flex'}}>
            <div style={{flexGrow:'1'}}></div>
            <ReactMinimalPieChart
                style={{width:100,marginRight:'-1.5rem',marginTop:'-1.5rem'}}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                    {
                        color: 'rgba(255,255,255,0.9)',
                        value:  percentage
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
        {!sessionRunning && <ClickToStart studentName={studentName} setSessionRunning={setSessionRunning} />}
        {sessionRunning && currentSum < totalSums && (
            <div style={{textAlign: 'center'}}>
                {timerRunning && <div>
                    {currentQuestion === -1 && <h1 style={{fontSize:'4rem'}}>Ready !</h1>}
                    {currentQuestion >= 0 && !isLastQuestionInTheSum && <QuestionPanel questionSets={questionSets} currentSum={currentSum} currentQuestion={currentQuestion} />}
                    {isLastQuestionInTheSum &&
                    <AnswerForm setTimerRunning={setTimerRunning} setCurrentQuestion={setCurrentQuestion}
                                setCurrentSum={setCurrentSum} setAnswers={setAnswers} answerRef={answerRef} isTrial={isTrial} />
                    }
                </div>}
            </div>
        )}
    </div>)
}
