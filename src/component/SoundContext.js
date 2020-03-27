import React, {useContext, createContext,useRef} from "react";
import Sound from "./Sound";
import {useAppContext} from "../AppContext";

const SoundContext = createContext(null);

export function SoundContextProvider({children}){
    const soundRef = useRef(null);
    const {config} = useAppContext();

    // testing for IOS
    function playSounds(numbers){
        numbers.forEach((number,index) => {
            setTimeout(() => {
                soundRef.current[number.toString()].current.play();
            },(index + 1) * config.pauseBetweenQuestionInMs);
        });
    }
    return <SoundContext.Provider value={{playSounds}}>
        <Sound soundRef={soundRef}/>
        {children}
    </SoundContext.Provider>
}
export function useSound(){
    const {playSounds} = useContext(SoundContext);
    return {playSounds};
}
