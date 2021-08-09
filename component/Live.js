import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Live() {
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
    const [liveData,setLiveData] =useState([])
    useEffect(() => {
        axios.get('https://api.bdcrictime.com/score/matches?status=3')
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
            
            axios.get('https://api.bdcrictime.com/score/matches?status=3')
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
        <div className="live">
                <div className="live__details">
                {liveData.map((item)=>{
                return (
                    <div key={item.id} className="live__container">
                        <div className="live__text" key={item.match_id}>
                        <p className={`${item.status_str==="Live"?"livered":""}`}>{item.status_str}</p>
                        <h1 className="live__Title">{item.title}</h1>
                        <h3 className="live__shortTitle">{item.short_title}</h3>
                        <p>{item.subtitle}</p>
                        <p>{item.toss.text}</p>
                        <p>{item.live}</p>
                        <p>{item.result}</p>
                        <p>{item.venue.name}</p>
                        <p>{timeConverter(item.timestamp_start)}</p>
                        <p className="score" hidden={item.teama.scores_full ===""}>{item.teama.name} {item.teama.scores_full}</p>
                        {/* <p>{item.teama.name} {item.teama.scores}</p> */}

                        {/* <p>{item.teamb.name}{item.teamb.scores}{item.teamb.overs}</p> */}
                        <p className="score" hidden={item.teamb.scores_full ===""}>{item.teamb.name} {item.teamb.scores_full}</p>

                        <Link className="seeLive" href={"/live/"+item.match_id}>See Live!</Link>
                        
                    </div>
                    <div className="teamImage">
                    
                    
                        <img className="live_card_image" src={item.teama.logo_url}/>vs<img className="live_card_image" src={item.teamb.logo_url}/>
                     
                </div>
                    </div>
                    
                )
                })}
                    
                </div>
                
            </div>
    )
}

export default Live
