import React, {createContext, useContext, useEffect, useRef, useState} from 'react';

const AppContext = createContext(null);


export function AppContextProvider({children}){
    const [config, setConfig] = useState({
            studentName : 'RAOUL ARDY',
            totalSums : 200,
            totalQuestions : 6,
            pauseBetweenQuestionInMs : 1000
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
        setPage(1);
    }

    const sessionTimer = useRef();
    function markSessionBegin(){
        sessionTimer.current = new Date().getTime();
    }

    function markSessionEnd(){
        return new Date().getTime() - sessionTimer.current;
    }

    return <AppContext.Provider value={{ setPage,setConfig,config,saveSettings,saveSession,getSession,markSessionBegin}}>
        {children(page)}
    </AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext);
}
