import React, { Component, useState, ReactDom } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import '../Calendar.css';
import OpenModal from './modal';
import BasicUsage from './ModalComponent';

//試合結果のデータ取得用URL
const url = "https://api.football-data.org/v2/teams/66/matches/"
const config = {
    headers: {
        'X-Auth-Token': 'a4fac023ffb841cd9bb0e7cd38581145',
    }
}

//Manchester UnitedのチームIDとロゴ画像を取得するURL
const myTeamId = "66";
const myTeamUrl = "https://crests.football-data.org/" + myTeamId + ".svg";

//mapをjsonへと変換
function replacer(key, value) {
    if (value instanceof Map) {
        return Object.fromEntries(value);
    } else {
        return value;
    }
}

//JST表示をyyyyMMddに変換
const changeJSTDate = (date) => {
    const newDate = new Date(date)//中身は「Wed Aug 11 2021 22:38:05 GMT+0900 (GMT+09:00)
    const year = newDate.getFullYear()//「2021」が代入される
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2) //「8」が代入される(getMonthだと1月分少なくなって返ってくるので+1する)
    const day = ("0" + newDate.getDate()).slice(-2)//「11」が代入される
    return `${year}${month}${day}`;
}

//JST表示をyyyy-MM-dd HH:mm表示に変換
const changeJSTToDate = (date) => {
    const newDate = new Date(date)//中身は「Wed Aug 11 2021 22:38:05 GMT+0900 (GMT+09:00)
    const year = newDate.getFullYear()//「2021」が代入される
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2) //「8」が代入される(getMonthだと1月分少なくなって返ってくるので+1する)
    const day = ("0" + newDate.getDate()).slice(-2)//「11」が代入される
    const hour = (`0` + (newDate.getHours())).slice(-2)//「22」が代入される
    const minute = (`0` + (newDate.getMinutes())).slice(-2)//「38」が代入される
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

export default class CalendarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // 初期値
            date: new Date(),//本日の日付
            month_item: {},//試合結果
            show: false,//modalの表示非表示
            value: null//選択した日にち
        }
    }

    //日にちを選択したときの処理
    clickHandler(value,event) {
        const date = changeJSTDate(value) //選択した日付をyyyyMMddに変換
        this.setState({value:date})//変換した日付をstateにセットし、更新
        //試合結果が存在する日付のときだけmodalを開くようにする
        if(this.state.month_item[date]){
            this.setState({ show: true });
        }
    }

    //modalウィンドウの閉じるボタン押下時の処理
    closeShow() {
        this.setState({ show: false });
    }

    componentDidMount() {
        //「日付:試合情報」の形式で格納するようの変数
        var matchMap = new Map();

        //apiでデータ取得
        fetch(url, config)
            .then(response => response.json())//レスポンスをjson形式に変換
            .then(data => {//上の処理の次の処理
                data.matches.map((match) => {//リスト形式のデータを一つずつ処理
                    var url = "https://crests.football-data.org/";//チームのロゴ画像用のURL(これにidと.svgをくっつける)
                    url += match.homeTeam.id == myTeamId ? match.awayTeam.id
                        : match.homeTeam.id;//homeかawayを判定して相手チームのidを格納
                    url += ".svg";

                    var listMap = new Map();//試合情報のみ格納用変数

                    //それぞれ試合情報をセットする
                    listMap.set("text", match.homeTeam.id == myTeamId ? "home" : "away");//homeかawayを判定
                    listMap.set("logo", url);
                    listMap.set("competition", match.competition.id);
                    listMap.set("competitionName", match.competition.name);
                    listMap.set("score",match.score.fullTime)
                    listMap.set("kickOff",changeJSTToDate(match.utcDate))
                    //「日付:試合情報」の形式でセット
                    matchMap.set(changeJSTDate(match.utcDate), listMap)
                })
            }).finally(() => {//最後の処理
                //map→jsonに変換
                var matchJson = JSON.stringify(matchMap, replacer);
                //テキスト表示の部分をjson形式に変換
                matchJson = JSON.parse(matchJson);
                //stateにセット
                this.setState({
                    month_item: matchJson
                })
            });
    }

    //日付の内容を出力
    getTileContent({ date, view }) {
        //月単位で日にちを確認
        if (view === 'month') {
            //dateはその月の一日
            let targetDate = moment(date).format('YYYY-MM-DD')//フォーマット変換
            targetDate = targetDate.replaceAll("-", "")//「-」削除

            //targetDateとmonth_item内の日付と一致するデータの中からhomeかaway、対戦チームのロゴ画像を表示
            return this.state.month_item[targetDate] && this.state.month_item[targetDate].text ?
                <div>
                    <p>{this.state.month_item[targetDate].text}</p>
                    <p><img src={this.state.month_item[targetDate].logo} width="30" height="30" /></p>
                </div>
                : null
        }
    }

    
    render() {
        return (
            <div>
                <img src={myTeamUrl} width="50" height="50" /> {/* 自チームのロゴ表示  */} 
                2021-2022 schedules
                {/* modal.jsxへ要素受け渡し  */} 
                <OpenModal 
                show={this.state.show} 
                closeShow={this.closeShow.bind(this)} 
                state={this.state.month_item} 
                value={this.state.value}
                url={myTeamUrl}/> 
                <Calendar
                    locale="en-US"
                    calendarType={"US"}
                    value={this.state.date} //選択した日付を受け渡し
                    onClickDay={this.clickHandler.bind(this)} //日にちを選択したとき
                    tileContent={this.getTileContent.bind(this)} //カレンダーの日にちに書き込む
                />
                <BasicUsage />
            </div>
        )
    }
}
