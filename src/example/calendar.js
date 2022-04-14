import React, { useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import axios from "axios";
import CalendarComponent from '../component/CalendarComponent';


const url = "https://api.football-data.org/v2/teams/66/matches?status=SCHEDULED"
const config = {
    headers:{
        'X-Auth-Token' : 'a4fac023ffb841cd9bb0e7cd38581145',
    }
}

const getTileCotnent = (matches,view) => {
    if (view === 'month') {
        return(
            <p>test</p>
        )
    }
    
}

function MyApp() {
    const [value, onChange] = useState(new Date());
    const [matches,setMatches] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(url,config);
            setMatches(response.data.matches);
            return response.data.matches;
        }
        fetchData();
    },[])

//   function onChange(nextValue) {
//     setValue(nextValue);
//   }

  return (
    // <Calendar
    // locale={"ja-JP"}
    // calendarType={"US"}
    // onChange={onChange}
    // value={value}
    // tileContent={getTileCotnent(matches,"month")}
    // />
    <CalendarComponent view="month"/>
  );
}

export default MyApp;