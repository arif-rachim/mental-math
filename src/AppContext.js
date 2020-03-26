import React, {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext(null);

export function AppContextProvider({children}){
    const [config, setConfig] = useState({
            studentName : 'RAOUL ARDY',
            totalSums : 200,
            totalQuestions : 6,
            pauseBetweenQuestionInMs : 1000
        });
    const [page, setPage] = useState(0);

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

    return <AppContext.Provider value={{ setPage,setConfig,config,saveSettings}}>
        {children(page)}
    </AppContext.Provider>
}

export function useAppContext(){
    return useContext(AppContext);
}