import {useState, useEffect} from "react";
import Time from "./Time"
export default function Timer(props) {

    const [time, setTime] = useState(0);
    
    useEffect(() => {
        let interval;
        if (props.gameStarted) {

            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000);
        }
        return () => clearInterval(interval);
        
    }, [props.gameStarted]);

    useEffect(() => {
        if (props.gameStarted) {
            setTime(0);
        }
    }, [props.gameStarted])

    useEffect(() => {
        props.handleBestTime(time)
    }, [props.gameStarted])
  
    return (
            <Time 
                time={time}
            />
    )
    
}