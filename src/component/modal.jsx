import React from "react";
import '../modal.css'
import {
  Button,
  Table,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'


//ホームチームの試合情報をセット
function setHomeData(match, props) {
  var homeData = new Map();
  if (match) {
    if (match.text == 'home') {
      homeData.set("homeUrl", props.url)
      homeData.set("homeTeamName",props.name)
    } else {
      homeData.set("homeUrl", match.logo)
      homeData.set("homeTeamName",match.opponent)
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
      awayData.set("awayTeamName",props.name)
    } else {
      awayData.set("awayUrl", match.logo)
      awayData.set("awayTeamName",match.opponent)
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

  console.log(homeData)

  return (
    <>
      {
        props.show ? (
          <>
                  <div id="overlay">
                    <div id="modalContent">
                    <Button onClick={props.closeShow} class="margin-button">✖</Button>
                      <Table>
                        <Tr>
                          <Th></Th>
                          <Td><img src={homeData.get("homeUrl")} width="50" height="50" /><br />
                          {homeData.get("homeTeamName")}</Td>
                          <Td><img src={awayData.get("awayUrl")} width="50" height="50" /><br />
                          {awayData.get("awayTeamName")}</Td>
                        </Tr>
                        <Tr>
                          <Th>competition</Th>
                          <Td>{match.competition == 2021 ? match.competitionName + "第" + match.matchDay + "節"
                           : match.competitionName}</Td>
                        </Tr>
                        <Tr>
                          <Th>キックオフ</Th>
                          <Td>{match.kickOff}</Td>
                        </Tr>
                        <Tr>
                          <Th>score</Th>
                          <Td>{homeData.get("score")}</Td>
                          <Td>{awayData.get("score")}</Td>
                        </Tr>
                      </Table>
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

export default OpenModal;