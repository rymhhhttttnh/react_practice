import React,{Component,useState}  from 'react';
import Calendar from 'react-calendar';
import moment from 'moment'; 
import '../Calendar.css';
import Modal from './modal';
import CalendarInfo from './CalendarInfo';

const url = "https://api.football-data.org/v2/teams/66/matches/"
const config = {
    headers:{
        'X-Auth-Token' : 'a4fac023ffb841cd9bb0e7cd38581145',
    }
}




const myTeamId = "66";

const myTeamUrl = "https://crests.football-data.org/" + myTeamId + ".svg";

// const matches = () => {
//     fetch(url,config)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data.matches)
//                     return data.matches 
//             })

function replacer(key, value) {
    if (value instanceof Map) {
        return Object.fromEntries(value);
    } else {
        return value;
    }
}
   

const changeJSTDate = (date) => {
    const newDate = new Date(date)//中身は「Wed Aug 11 2021 22:38:05 GMT+0900 (GMT+09:00)
    const year = newDate.getFullYear()//「2021」が代入される
    const month = ("0"+(newDate.getMonth() + 1)).slice(-2) //「8」が代入される(getMonthだと1月分少なくなって返ってくるので+1する)
    const day = ("0"+newDate.getDate()).slice(-2)//「11」が代入される
  
    // const dayOfWeek = '日月火水木金土'.charAt(newDate.getDay());//「水」が代入される
  
    // const hour = (`0` + (newDate.getHours())).slice(-2)//「22」が代入される
    // const minute = (`0` + (newDate.getMinutes())).slice(-2)//「38」が代入される
    return `${year}${month}${day}`;
}

export default class CalendarComponent extends Component {

    constructor(props) {
        super(props);
            this.state = {
                date: new Date(),
                //テストデータ
                month_item: {
                },
                show: false 
                }
    }
    clickHandler() {
        this.setState = ({show:true})
    }

    componentDidMount(){
        var matchMap = new Map();

        fetch(url,config)
            .then(response => response.json())
            .then(data => {
                data.matches.map((match) => {
                    var url = "https://crests.football-data.org/";
                    url += match.homeTeam.id == myTeamId ? match.awayTeam.id
                    : match.homeTeam.id;
                    url += ".svg";
                    var listMap = new Map();
                    listMap.set("text",match.homeTeam.id == myTeamId ? "home" : "away");
                    listMap.set("logo",url);
                    matchMap.set(changeJSTDate(match.utcDate), listMap)
                })
            }).finally(() => {
                 var matchJson = JSON.stringify(matchMap,replacer);
                 matchJson = JSON.parse(matchJson); 
                console.log(matchJson)
                    this.setState({
                        month_item:matchJson
                    })
                    console.log(this.state)
                    
             
            });
        }

     //日付の内容を出力
      getTileContent({ date, view }) {
          if (view === 'month') {
              let targetDate = moment(date).format('YYYY-MM-DD')
              targetDate = targetDate.replaceAll("-","")

             return   this.state.month_item[targetDate] && this.state.month_item[targetDate].text ?
                 <div>
                        <p>{this.state.month_item[targetDate].text}</p>
                        <p><img src={this.state.month_item[targetDate].logo } width="30" height="30" /></p>
                 </div>
               : null

          }
        
      }

    render() {
        return(
            <div>
                <CalendarInfo show={this.show}/>
                <img src={myTeamUrl} width="50" height="50"/>
                schedules
                <Calendar
                    locale="en-US"
                    calendarType={"US"}
                    value={this.state.date}
                    onClickDay={this.clickHandler.bind(this)}
                    tileContent={this.getTileContent.bind(this)} //ここを追加
                 />
            </div>
        )
    } 
}