import React,{useState} from "react";

const HelloWorld = (props) => <p>HelloWorld{props.count}</p>

const INITIAL = "！";

const CountHelloWorldCounter = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pushButton,setPushButton] = useState(INITIAL);

    const countAdd = () => setPushButton((prev) => prev +"！");
    const countReset = () => setPushButton(INITIAL);

    return(
        <>
        <HelloWorld count={pushButton}/>
        <button onClick={countAdd}>！</button>
        <button onClick={countReset}>！リセット</button>
        </>
    )
}

export default CountHelloWorldCounter

