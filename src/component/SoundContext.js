import React, {createContext, useContext, useEffect, useRef} from "react";
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

    const {config} = useAppContext();
    const range = [];
    for (let i = 0; i < 99; i++) {
        range.push(i);
    }


    function playSounds(numbers) {
        const delayInMiliseconds = config.pauseBetweenQuestionInMs;
        if (numbers === null || numbers === undefined || numbers.length === 0) {
            return;
        }

        numbers.forEach((number,index) => {
            setTimeout(() => {
                try{
                    if(number<0){
                        document.getElementById('audio-minus').play();
                        setTimeout(() => {
                            const audioNode = document.getElementById(`audio-${Math.abs(number)}`);
                            audioNode.play();
                        },300)
                    }else{
                        const audioNode = document.getElementById(`audio-${number}`);
                        audioNode.play();
                    }

                }catch(err){
                    console.error(err);
                    console.log('Unable to play ',number);
                }

            },(index + 1) * delayInMiliseconds);
        });

    }

    return <SoundContext.Provider value={{playSounds}}>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            textAlign: 'center',
            paddingTop: '1rem',
        }}>
            {range.map(i => {
                return <audio key={i} id={`audio-${i+1}`} preload="auto" >
                    <source src={`${process.env.PUBLIC_URL}/audio/${i+1}.wav`} type="audio/wav"/>
                </audio>
            })}
            <audio id={'audio-minus'} preload="auto" >
                <source src={`${process.env.PUBLIC_URL}/audio/minus.mp3`} type="audio/mp3"/>
            </audio>
        </div>
        {children}
    </SoundContext.Provider>
}

export function useSound() {
    const {playSounds} = useContext(SoundContext);
    return {playSounds};
}
