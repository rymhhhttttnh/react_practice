import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Counter from './component/test';
// import App from './component/appComponent';
import {ChakraProvider} from "@chakra-ui/react";
// import theme from "./theme/theme"
// import HelloWorld from "./example/HelloWorld"
// import App from "./example/App"
// import { createRoot } from 'react-dom/client';
import MyApp from './example/calendar';


const Hello = () =>{
  return <h1>Hello, React</h1>;
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Hello /> */}
    {/* <Counter /> */}
    {/* TODOアプリを動かすときは以下をコメントイン */}
    {/* <ChakraProvider theme={theme}>
    <App /> */}
    {/* </ChakraProvider> */}
    {/* <HelloWorld /> */}
    {/* 試合予定をみたいとき以下コメントイン */}
    {/* <App /> */}
    <ChakraProvider >
     <MyApp />
    </ChakraProvider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// ReactDOM.render(<Hello />,document.getElementById("root"));