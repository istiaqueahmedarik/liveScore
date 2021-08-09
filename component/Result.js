import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Result({url}) {
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
    //   console.log(timeConverter(0));
    const [liveData,setLiveData] =useState([])
    useEffect(() => {
        axios.get(url)
                .then(function (response) {
                    // handle success
                    console.log(response.data.response.items);
                    setLiveData(response.data.response.items)

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        
        const timer = setInterval(() => {
            axios.get(url)
                .then(function (response) {
                    // handle success
                    console.log(response.data.response.items);
                    setLiveData(response.data.response.items)

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

          }, 5000);
        return () => clearInterval(timer);
        
    },[])
    return (
        <div className="result">
                <div className="result__details result__card">
                {liveData.map((item)=>{
                    var timestamp = 1607110465663
                    var date = new Date(timestamp);
                    console.log(date.getTime())
                return (
                    <div  key={item.match_id}>
                        <div className="result__container">
                        <img src={item.teama.logo_url}/>vs<img src={item.teamb.logo_url}/>

                        {/* <p>{item.status_str}</p> */}
                        <h2 className="live__Title">{item.title}</h2>
                        <h3 className="live__shortTitle">{item.short_title} </h3>
                        <p>{item.subtitle} of {item.competition.title} {item.competition.type}</p>

                        <p>{item.result}</p>
                        <p>{item.venue.name}</p>
                        <p>{item.status_note}</p>
                        {/* <p>{date}</p> */}
                        <p>{timeConverter(item.timestamp_start)}</p>

                        </div>
                        
                    </div>
                    
                )
                })}
                    
                </div>
                
            </div>
    )
}

export default Result
