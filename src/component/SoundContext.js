import React, {createContext, useContext, useRef} from "react";
import {useAppContext} from "../AppContext";

const SoundContext = createContext(null);

const numberTimeline = {
    '-9': 0,
    '-8': 1,
    '-7': 2,
    '-6': 3,
    '-5': 4,
    '-4': 5,
    '-3': 6,
    '-2': 7,
    '-1': 8,
    '1': 9,
    '2': 10,
    '3': 11,
    '4': 12,
    '5': 13,
    '6': 14,
    '7': 15,
    '8': 16,
    '9': 17,
};

export function SoundContextProvider({children}) {
    const soundRef = useRef();
    const {config} = useAppContext();
    function playSounds(numbers) {
        const delayInMiliseconds = config.pauseBetweenQuestionInMs;
        if(numbers === null || numbers === undefined || numbers.length === 0){
            return;
        }
        numbers.forEach((number, index) => {
            setTimeout(() => {
                soundRef.current.currentTime = numberTimeline[number.toString()];
                soundRef.current.play();
                setTimeout(() => {
                    soundRef.current.pause();
                },800);
            }, (index + 1) * delayInMiliseconds);
        });

    }
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    return <SoundContext.Provider value={{playSounds}}>
        <div style={{display: 'flex', justifyContent: 'center',width:'100%',position:'absolute',textAlign:'center',paddingTop:'1rem'}}>
            <audio ref={soundRef} controls preload="auto">
                <source src={`${process.env.PUBLIC_URL}/audio/mental-math-v2.mp3`} type="audio/mpeg"/>
            </audio>
        </div>
        {children}
    </SoundContext.Provider>
}

export function useSound() {
    const {playSounds} = useContext(SoundContext);
    return {playSounds};
}
