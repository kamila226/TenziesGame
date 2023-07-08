export default function Time(props) {
    const time = props.time;
    
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    const hours = Math.floor(time / 3600);
    
    return (
        <>
            {hours < 10 && "0"}{hours}:
            {minutes < 10 && "0"}{minutes}:
            {seconds < 10 && "0"}{seconds}
        </>
    )
}