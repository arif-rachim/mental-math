import React, {useContext, createContext,useRef} from "react";
import Sound from "./Sound";

const SoundContext = createContext(null);

export function SoundContextProvider({children}){
    const soundRef = useRef(null);
    function playSound(number){
        if(soundRef.current){
            soundRef.current[number.toString()].current.play();
        }
    }
    return <SoundContext.Provider value={{playSound}}>
        <Sound soundRef={soundRef}/>
        {children}
    </SoundContext.Provider>
}
export function useSound(){
    const {playSound} = useContext(SoundContext);
    return {playSound};
}
