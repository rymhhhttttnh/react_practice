import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import '../modal.css'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

//ホームチームの試合情報をセット
function setHomeData(match, props) {
  var homeData = new Map();
  if (match) {
    if (match.text == 'home') {
      homeData.set("homeUrl", props.url)
    } else {
      homeData.set("homeUrl", match.logo)
    }
    homeData.set("score", match.score.homeTeam === null ? "-" : match.score.homeTeam)
    return homeData
  } else {
    return null;
  }
}

//アウェイチームの試合情報をセット
function setAwayData(match, props) {
  var awayData = new Map();
  if (match) {
    if (match.text == 'away') {
      awayData.set("awayUrl", props.url)
    } else {
      awayData.set("awayUrl", match.logo)
    }
    awayData.set("score", match.score.awayTeam === null ? "-" : match.score.awayTeam)
    return awayData
  } else {
    return null;
  }
}

const OpenModal = (props) => {
  const match = props.state[props.value]
  const homeData = setHomeData(match, props);
  const awayData = setAwayData(match, props);
  
  return (
    <>
      {
        props.show ? (
          <>
            {/* <Modal> */}
              {/* <ModalOverlay /> */}
              {/* <ModalContent> */}
                {/* <ModalBody> */}
                  <div id="overlay">
                    <div id="modalContent">
                      <table>
                        <tr>
                          <th></th>
                          <td><img src={homeData.get("homeUrl")} width="30" height="30" /></td>
                          <td><img src={awayData.get("awayUrl")} width="30" height="30" /></td>
                        </tr>
                        <tr>
                          <th>competition:</th>
                          <td>{match.competitionName}</td>
                        </tr>
                        <tr>
                          <th>キックオフ:</th>
                          <td>{match.kickOff}</td>
                        </tr>
                        <tr>
                          <th>score</th>
                          <td>{homeData.get("score")}</td>
                          <td>{awayData.get("score")}</td>
                        </tr>
                      </table>
                      <Button onClick={props.closeShow} colorScheme="blue">Close</Button>
                      </div>
                    </div>
                    {/* </ModalBody> */}
                    {/* <ModalCloseButton /> */}
              {/* </ModalContent> */}
            {/* </Modal> */}
          </>
        ) : (
          <></>
        )
      }
    </>
  )
};

export default OpenModal;