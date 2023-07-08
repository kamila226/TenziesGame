import {useState, useEffect} from "react";
import Time from "./Time"
export default function Timer(props) {

    const [time, setTime] = useState(0);

    // =========== SET TIMER =========== //
    
    useEffect(() => {
        let interval;
        if (props.gameStarted) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        }
        return () => clearInterval(interval);
        
    }, [props.gameStarted]);

    // =========== RESTART TIMER =========== //

    useEffect(() => {
        if (props.gameStarted) {
            setTime(0);
        }
    }, [props.gameStarted])

    // =========== SAVE BEST TIME =========== //

    useEffect(() => {
        props.handleBestTime(time)
    }, [props.gameStarted])
  
    return (
            <Time 
                time={time}
            />
    )
    
}