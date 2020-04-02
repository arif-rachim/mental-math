import React, {useState} from "react";
import {useAppContext} from "../AppContext";
import moment from 'moment';

export default function SummaryScreen() {
    const {getSession} = useAppContext();
    const [sessions] = useState(() => getSession());
    if (!(sessions && sessions.length > 0)) {
        return <div style={{marginTop: '5rem'}}>No Report Yet</div>
    }
    const lastSession = sessions[sessions.length - 1];
    const correctAnswers = lastSession.sums.reduce((acc, sum) => {
        const total = sum.questions.reduce((acc, num) => acc + num, 0);
        return sum.answer === total ? ++acc : acc;
    }, 0);
    const percentage = Math.round((correctAnswers / lastSession.sums.length) * 100);
    const duration = lastSession.duration;
    const seconds = Math.round(duration / 1000);
    const minute = Math.floor(seconds / 60);
    const leftSecond = seconds % 60;
    return <div style={{
        fontSize: '1.5rem',
        width: '100%',
        paddingTop: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                <div
                    style={{backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', margin: '0.2rem', width: '70%'}}>
                    <div style={{fontSize: '1rem'}}>Date</div>
                    <div>{moment(new Date(lastSession.date)).format('DD MMM YYYY HH:mm:ss')}</div>
                </div>
                <div
                    style={{backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', margin: '0.2rem', width: '15%'}}>
                    <div style={{fontSize: '1rem'}}>Sums</div>
                    <div>{lastSession.sums.length}</div>
                </div>
                <div style={{backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', margin: '0.2rem'}}>
                    <div style={{fontSize: '1rem'}}>Questions</div>
                    <div>{lastSession.sums.length * lastSession.sums[0].questions.length}</div>
                </div>
            </div>

            <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    margin: '0.2rem',
                    width: '100%'
                }}>
                    <div style={{fontSize: '1rem'}}>Duration</div>
                    <div>{minute} Min : {leftSecond < 9 ? `0${leftSecond}` : leftSecond} Sec</div>
                </div>
                <div style={{backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', margin: '0.2rem'}}>
                    <div style={{fontSize: '1rem'}}>Score</div>
                    <div>{percentage}</div>
                </div>
            </div>

            <table style={{
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                margin: '0.2rem',
                fontSize: '0.9rem'
            }}>
                <thead>
                <tr>
                    <td style={{padding: '1rem'}}>No</td>
                    <td style={{padding: '1rem'}}>Time</td>
                    <td style={{padding: '1rem'}}>Questions</td>
                    <td style={{padding: '1rem'}}>Answer</td>
                </tr>
                </thead>
                <tbody>
                {lastSession.sums.map((sum, index) => {
                    const isCorrect = sum.answer === sum.questions.reduce((acc, next) => acc + next, 0);
                    return <tr key={index} style={{backgroundColor: isCorrect ? 'none' : 'rgba(169,8,8,0.5)'}}>
                        <td style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
                            {index + 1}
                        </td>
                        <td style={{textAlign: 'right', paddingLeft: '1rem', paddingRight: '1rem'}}>
                            {(sum.time / 1000).toFixed(1)}
                        </td>
                        <td style={{textAlign: 'right', paddingLeft: '1rem', paddingRight: '1rem'}}>
                            {sum.questions.join(',')}
                        </td>
                        <td style={{textAlign: 'right', paddingLeft: '1rem', paddingRight: '1rem'}}>
                            {sum.answer}
                        </td>
                    </tr>

                })}
                </tbody>
            </table>
        </div>
    </div>
}
