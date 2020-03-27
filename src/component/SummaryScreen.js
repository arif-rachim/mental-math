import React, {useRef} from "react";
import {useAppContext} from "../AppContext";
import { CartesianGrid, YAxis, ResponsiveContainer, BarChart, Bar} from 'recharts';
import moment from 'moment';

export default function SummaryScreen() {
    const {getSession} = useAppContext();
    const sessions = useRef(getSession());
    if(!(sessions.current && sessions.current.length > 0)){
        return <div style={{marginTop:'5rem'}}>No Report Yet</div>
    }
    const lastSession = sessions.current[sessions.current.length - 1];
    const correctAnswers = lastSession.sums.reduce((acc, sum) => {
        const total = sum.questions.reduce((acc, num) => acc + num, 0);
        return sum.answer === total ? ++acc : acc;
    }, 0);
    const percentage = Math.round((correctAnswers / lastSession.sums.length) * 100);
    const duration = lastSession.duration;
    const seconds = Math.round(duration/1000);
    const minute = Math.floor(seconds / 60);
    const leftSecond = seconds % 60;
    return <div style={{fontSize: '1.5rem',width:'100%',padding:'1rem',paddingTop:'3rem',background:'rgba(0,0,0,0.4)',boxShadow:'0px 30px 30px 0px rgba(0,0,0,0.5)'}}>
        <table style={{fontSize:'1rem'}}>
            <tr>
                <td>Date</td>
                <td>{moment(new Date(lastSession.date)).format('DD MMM YYYY HH:mm:ss')}</td>
            </tr>
            <tr>
                <td>Total Sums</td>
                <td>{lastSession.sums.length}</td>
            </tr>
            <tr>
                <td>Total Questions</td>
                <td>{lastSession.sums.length * lastSession.sums[0].questions.length}</td>
            </tr>
            <tr>
                <td>Score</td>
                <td>{percentage} %</td>
            </tr>
            <tr>
                <td>Completion time</td>
                <td>{minute} Min : {leftSecond < 9 ? `0${leftSecond}`:leftSecond} Sec</td>
            </tr>
        </table>

        <div style={{width:'100%',height:300}}>
        <ResponsiveContainer>
            <BarChart  data={lastSession.sums} margin={{
                top: 20, right: 20, left: 20, bottom: 20,
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Bar dataKey="time" fill="rgba(255,255,255,0.9)" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
}
