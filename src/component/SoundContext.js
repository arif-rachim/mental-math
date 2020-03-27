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
    // testing for IOS
    function playSounds(numbers){
        numbers.forEach((number,index) => {
            setTimeout(() => {
                soundRef.current[number.toString()].current.play();
            },index * 1000);
        });
    }
    return <SoundContext.Provider value={{playSound,playSounds}}>
        <Sound soundRef={soundRef}/>
        {children}
    </SoundContext.Provider>
}
export function useSound(){
    const {playSound,playSounds} = useContext(SoundContext);
    return {playSound,playSounds};
}
