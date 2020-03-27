import React, {useContext, createContext,useRef} from "react";
import Sound from "./Sound";

const SoundContext = createContext(null);

export function SoundContextProvider({children}){
    const soundRef = useRef(null);

    function playSounds(numbers){
        numbers.forEach((number,index) => {
            setTimeout(() => {
                soundRef.current[number.toString()].current.play();
            },(index + 1) * 1000);
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
