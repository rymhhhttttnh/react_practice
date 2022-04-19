import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import '../modal.css'

//ホームチームの試合情報をセット
function setHomeData(match,props){
  var homeData = new Map();
  if(match){
    if(match.text == 'home'){
      homeData.set("homeUrl",props.url) 
    }else{
      homeData.set("homeUrl",match.logo)
    }
    homeData.set("score",match.score.homeTeam === null ? "-":match.score.homeTeam)
    return homeData
  }else{
    return null;
  }
}

//アウェイチームの試合情報をセット
function setAwayData(match,props){
  var awayData = new Map();
  if(match){
    if(match.text == 'away'){
      awayData.set("awayUrl",props.url)
    }else{
      awayData.set("awayUrl",match.logo)
    }
    awayData.set("score",match.score.awayTeam === null ? "-":match.score.awayTeam)
    return awayData
  }else{
    return null;
  }
}

const Modal = (props) => {
  const match = props.state[props.value]
  const homeData = setHomeData(match,props);
  const awayData = setAwayData(match,props);
  return (
    <>
      {
        props.show ? ( 
          <>
            <div id="overlay">
              <div id="modalContent">
              <ul>
                <li><img src={homeData.get("homeUrl")} width="30" height="30"/></li>
                <li><img src={awayData.get("awayUrl")} width="30" height="30"/></li>
                <li>{homeData.get("score")}</li>
                <li>{awayData.get("score")}</li>
                <li></li>
                <li></li>
              </ul>
                <button onClick={props.closeShow}>Close</button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
};

export default Modal;