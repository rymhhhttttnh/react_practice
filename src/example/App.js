import React,{useState, useEffect} from "react";
import axios from "axios";

const url = "https://api.football-data.org/v2/teams/66/matches?status=SCHEDULED"
const config = {
    headers:{
        'X-Auth-Token' : 'a4fac023ffb841cd9bb0e7cd38581145',
    }
}

const matchList = (list) => {
    const matchLists = list.map((match) => {
        const homeUrl = "https://crests.football-data.org/" + match.homeTeam.id + ".svg"; 
        const awayUrl = "https://crests.football-data.org/" + match.awayTeam.id + ".svg";
        return (
            <li>
                {changeJSTDate(match.utcDate)} <br />
                {match.homeTeam.name} vs {match.awayTeam.name}<br/>
                <img src={homeUrl}/>
                <img src={awayUrl}/>
            </li>
        )
    })
    return <ul>{matchLists}</ul>
};

const changeJSTDate = (date) => {
    const newDate = new Date(date)//中身は「Wed Aug 11 2021 22:38:05 GMT+0900 (GMT+09:00)
    const year = newDate.getFullYear()//「2021」が代入される
    const month = newDate.getMonth() + 1 //「8」が代入される(getMonthだと1月分少なくなって返ってくるので+1する)
    const day = newDate.getDate()//「11」が代入される
  
    const dayOfWeek = '日月火水木金土'.charAt(newDate.getDay());//「水」が代入される
  
    const hour = (`0` + (newDate.getHours())).slice(-2)//「22」が代入される
    const minute = (`0` + (newDate.getMinutes())).slice(-2)//「38」が代入される
    return `${year}/${month}/${day} (${dayOfWeek}) ${hour}:${minute}`;
}

function App(){
    const[schedule,setSchedule] = useState([]);
    const [filters,setFilters] = useState([]);
    const [matches,setMatches] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(url,config);
            setSchedule(response.data);
            setFilters(response.data.filters);
            setMatches(response.data.matches);
            return response.data.matches;
        }
        fetchData();
    },[])

    return (
        <>
        <div>{schedule.count}</div>
        <div>{filters.status}</div>
        <div>{matchList(matches)}</div>
        </>
        
    )
}

export default App;