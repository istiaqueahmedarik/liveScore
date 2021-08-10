import axios from 'axios';
import React, { useEffect, useState } from 'react';
function Details() {
    const [live,setLive] = useState([])
    const [liveTwo,setLiveTwo] = useState([])
    const [commentary,setCommentary] = useState([])
    const [lastEvent,setLastEvent] = useState("");
    useEffect(() => {
    
        

        if(commentary.length!==0) {
            console.log(lastEvent)
            if(commentary[0].score==="w"){
                if(lastEvent!==commentary[0].over.toString()+commentary[0].ball.toString()){
                    const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1135-deduction.ogg");
                    audio.play();

                    setLastEvent(commentary[0].over.toString()+commentary[0].ball.toString())
                }else{
                    console.log("d")
                }
            }
            if(commentary[0].score===6){
                if(lastEvent!==commentary[0].over.toString()+commentary[0].ball.toString()){
                    const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1135-deduction.ogg");
                    audio.play();

                    setLastEvent(commentary[0].over.toString()+commentary[0].ball.toString())

                }else{
                    console.log("d")

                }
            }
            if(commentary[0].score===4){
                if(lastEvent!==commentary[0].over.toString()+commentary[0].ball.toString()){
                    const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1135-deduction.ogg");
                    audio.play();

                    setLastEvent(commentary[0].over.toString()+commentary[0].ball.toString())

                }else{
                    console.log("d")

                }
            }
            
        }
    },[commentary])
    useEffect(() => {
        
        const uid = window?.location?.pathname.split("/")[2]
            // console.log(router.query)
            let url = "https://api.bdcrictime.com/score/matches/"+uid+"/live"
            let urlTwo = "https://api.bdcrictime.com/score/matches/"+uid+"/scorecard"
        axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.response);
                setLive(response.data.response)
                setCommentary(response.data.response.commentaries.reverse())

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            axios.get(urlTwo)
            .then(function (response) {
                // handle success
                console.log(response.data.response);
                setLiveTwo(response.data.response)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    
        const Timer = setInterval(() => {
            
            // const { id } = router.query
            
            axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data.response);
                setLive(response.data.response)
                setCommentary(response.data.response.commentaries.reverse())


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            axios.get(urlTwo)
            .then(function (response) {
                // handle success
                console.log(response.data.response);
                setLiveTwo(response.data.response)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
          }, 5000);
        
          return () => clearInterval(Timer);
    },[])
    
    
    return (
        <div className="Details">
            
            <div className="summury">
                <div className="title">
                    <h1>{liveTwo.title}</h1>
                    <p>{liveTwo.subtitle} | {liveTwo.live} | {liveTwo.venue?.name}</p>
                </div>
                <div className="middle">
                    <div className="summuryLeft">
                        <p><img src={liveTwo.teama?.logo_url}/>  {liveTwo.teama?.name}  {liveTwo.teama?.scores_full}</p>
                        <p><img src={liveTwo.teamb?.logo_url}/>  {liveTwo.teamb?.name}  {liveTwo.teamb?.scores_full}</p>
                    </div>
                    <div className="summuryRight">
                        <p>Target -{live.live_score?.target}</p>
                        <p>Run rate -{live.live_score?.runrate}</p>
                        <p>Required Run rate -{live.live_score?.required_runrate}</p>
                        <p>Last Five Overs - {live.live_inning?.last_five_overs}</p>
                        <p>Last Ten Overs - {live.live_inning?.last_ten_overs}</p>
                        
                    </div>
                </div>
            </div>
            <div className="bat">
                <p>{live.team_batting} in batting.</p>
                    <table  cellSpacing="50" >
                        <tr><th>Name</th><th>Runs</th><th>Ball</th><th>4</th><th>6</th><th>SR</th></tr>
                        {live.batsmen?.map((item)=>{
                    return(
                        <tr key>
                            
                            <td>{item.name}</td>
                            <td>{item.runs}</td>
                            <td>{item.balls_faced}</td>
                            <td>{item.fours}</td>
                            <td>{item.sixes}</td>
                            <td>{item.strike_rate}</td>

                        </tr>
                    )
                })}      
                     </table>
                
               
            </div>
            <div className="bat">
                <p>{live.team_bowling} in bowling.</p>
                    <table  cellSpacing="50" >
                        <tr><th>Name</th><th>Overs</th><th>Runs</th><th>W</th><th>M</th><th>Ec.</th></tr>
                        {live.bowlers?.map((item)=>{
                    return(
                        <tr key>
                            
                            <td>{item.name}</td>
                            <td>{item.overs}</td>
                            <td>{item.runs_conceded}</td>
                            <td>{item.wickets}</td>
                            <td>{item.maidens}</td>
                            <td>{item.econ}</td>

                        </tr>
                    )
                })}      
                     </table>
                
               
            </div>
            <div className="recent">
               Recent- {live.live_inning?.recent_scores}
            </div>
            <div className="commentry">
                <h1 style={{textAlign: 'center'}}>Live commentary</h1>
                {commentary?.map((i)=>{
                    if(typeof i.score==='string'){
                        if(i.score==='w'){
                        console.log(i.score)

                            return(
                                <p className="wicket">{i.over}.{i.ball}-Wicket!!{i.how_out}</p>
                            )
                        }else{
                            return(
                                <p className="finish">{i.over}.{i.ball}-{i.commentary}</p>
                            )
                        }
                        
                    }
                    if(typeof i.score==='number'){
                        return(
                            <p className={`${i.score===6||i.score===4?"six":""}`}>{i.over}.{i.ball}-{i.commentary}</p>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Details
