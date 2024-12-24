import { useEffect, useState } from "react";

const TimerBox = () => {

    const [clock, setClock] = useState("");
    const [times, setTimes] = useState("");

    function returnToParseDate(){

        const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; 
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const days = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const isDay = date.getDay();       

        function zero(value){
            let str = String(value)
            return str.length < 2 ? `0${str}` : str
        }
        
        return {
            date : `${year}.${zero(month)}.${zero(days)} ${WEEKDAY[isDay]}`,
            clock : `${zero(hours)} : ${zero(minutes)} : ${zero(seconds)}`
        }
    }

    useEffect(() => {

        setTimes(returnToParseDate()["date"])
        setClock(returnToParseDate()["clock"])

        let timer = setInterval(() => {            
            setTimes(returnToParseDate()["date"])
            setClock(returnToParseDate()["clock"])
            
        }, 1000);

        return () => {
            clearInterval(timer);
            timer = null;
        }
    },[])
    
    return (
        <div className="timerBox">
            <p>{times}</p>
            <p>
               {clock} 
            </p>
        </div>
    )
}

export default TimerBox