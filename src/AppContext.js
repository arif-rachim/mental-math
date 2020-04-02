import React, {createContext, useContext, useEffect, useRef, useState} from 'react';

const AppContext = createContext(null);


export function AppContextProvider({children}){

    const [config, setConfig] = useState(() => {
        const config = localStorage.getItem('config');
        if (config && config.length > 0) {
            return JSON.parse(config);
        }
        return {
            studentName : 'RAOUL ARDY',
            totalSums : 200,
            totalQuestions : 6,
            pauseBetweenQuestionInMs : 1000
        }
    });

    const [page, setPage] = useState(0);

    function getSession(){
        let sessions = localStorage.getItem('sessions');
        if(sessions && sessions.length > 0){
            sessions = JSON.parse(sessions);
        }else{
            sessions = [];
        }
        return sessions;
    }

    function saveSession(questions,answers){
        const sessionDuration = markSessionEnd();
        const sums = answers.map((answer,index) => {
            return {
                ...answer,
                questions : questions[index]
            };
        });
        const session = {date : new Date(),sums,duration:sessionDuration };
        let sessions = getSession();
        sessions.push(session);
        localStorage.setItem('sessions',JSON.stringify(sessions));
    }



    useEffect(() => {
        const config = localStorage.getItem('config');
        if (config && config.length > 0) {
            setConfig(JSON.parse(config));
            setPage(1);
        } else {
            setPage(0);
        }
    }, []);

    function saveSettings() {
        localStorage.setItem('config', JSON.stringify(config));
        window.location.reload();
    }

    const sessionTimer = useRef();
    function markSessionBegin(){
        sessionTimer.current = new Date().getTime();
    }

    function markSessionEnd(){
        const time = new Date().getTime() - sessionTimer.current
        sessionTimer.current = null;
        return time;
    }

    function getAllWrongAnswers(limit){
        const sessions = getSession();
        let wrongSums = sessions.reduce((accumulator,session) => {
            let wrongAnswers = session.sums.filter(sum => {
                return sum.answer !== sum.questions.reduce((acc,next) => acc+next,0);
            });
            wrongAnswers = wrongAnswers.map(wa => {
                return {...wa,date:session.date}
            });
            return [...accumulator,...wrongAnswers]
        },[]);
        let startIndex = wrongSums.length - limit;
        startIndex = startIndex < 0 ? 0 : startIndex;
        const result = wrongSums.splice(startIndex,wrongSums.length);
        return result;
    }

    function getWeakness(){
        let wrongAnswers = getAllWrongAnswers(1000);

        const score = {};
        wrongAnswers.forEach((wa) => {
            const key = wa.questions.join(',');
            score[key] = score[key] || {
                count : 0,
                questions : wa.questions,
                answers : []
            };
            score[key].count += 1;
            score[key].answers.push({answer:wa.answer,date:wa.date,time:wa.time});
        });
        const scores = Object.values(score);
        scores.sort((a,b) => {
            if (a.answers.length > b.answers.length) return -1;
            if (b.answers.length > a.answers.length) return 1;
            return 0;
        });
        return scores;
    }

    return <AppContext.Provider value={{ setPage,setConfig,config,saveSettings,saveSession,getSession,markSessionBegin,sessionTimer,getAllWrongAnswers,getWeakness}}>
        {children(page)}
    </AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext);
}
