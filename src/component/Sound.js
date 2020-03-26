import React, { useRef} from 'react';

export default function Sound({soundRef}){
    const ONE = useRef(null);
    const TWO = useRef(null);
    const THREE = useRef(null);
    const FOUR = useRef(null);
    const FIVE = useRef(null);
    const SIX = useRef(null);
    const SEVEN = useRef(null);
    const EIGHT = useRef(null);
    const NINE = useRef(null);

    const MIN_ONE = useRef(null);
    const MIN_TWO = useRef(null);
    const MIN_THREE = useRef(null);
    const MIN_FOUR = useRef(null);
    const MIN_FIVE = useRef(null);
    const MIN_SIX = useRef(null);
    const MIN_SEVEN = useRef(null);
    const MIN_EIGHT = useRef(null);
    const MIN_NINE = useRef(null);
    soundRef.current = {
        '1' : ONE,
        '2' : TWO,
        '3' : THREE,
        '4' : FOUR,
        '5' : FIVE,
        '6' : SIX,
        '7' : SEVEN,
        '8' : EIGHT,
        '9' : NINE,
        '-1' : MIN_ONE,
        '-2' : MIN_TWO,
        '-3' : MIN_THREE,
        '-4' : MIN_FOUR,
        '-5' : MIN_FIVE,
        '-6' : MIN_SIX,
        '-7' : MIN_SEVEN,
        '-8' : MIN_EIGHT,
        '-9' : MIN_NINE
    };

    return <div style={{width:1,height:1,overflow:'hidden'}}>
        <audio ref={ONE} controls preload="auto" >
            <source src={`${process.env.PUBLIC_URL}/audio/plus-1.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={TWO} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-2.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={THREE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-3.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={FOUR} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-4.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={FIVE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-5.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={SIX} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-6.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={SEVEN} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-7.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={EIGHT} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-8.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={NINE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/plus-9.mp3`} type="audio/mpeg"/>
        </audio>

        <audio ref={MIN_ONE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-1.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_TWO} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-2.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_THREE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-3.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_FOUR} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-4.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_FIVE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-5.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_SIX} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-6.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_SEVEN} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-7.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_EIGHT} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-8.mp3`} type="audio/mpeg"/>
        </audio>
        <audio ref={MIN_NINE} controls preload="auto">
            <source src={`${process.env.PUBLIC_URL}/audio/minus-9.mp3`} type="audio/mpeg"/>
        </audio>
    </div>
}
