import Control from "./Control";
import {FaPlay,FaPauseCircle} from 'react-icons/fa';
import {VscDebugRestart} from 'react-icons/vsc';
import './App.css';
import { useEffect, useState } from "react";
function App() {
  const [start,setStart]=useState(false);
  const [onBreak,setOnBreak]=useState(false);
  const [starterTime,setStarterTime]=useState(25*60);
  const [breakTime,setBreakTime]=useState(5*60);
  const [sessionTime,setSessionTime]=useState(25*60);
  const [help,setHelp]=useState(false);
  const audio = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');
  const formatTime = (value) =>{
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    return (
      (minutes < 10?'0'+minutes:minutes)
      +
      ':'
      +
      (seconds < 10?'0'+seconds:seconds)
    )
  }
const playSound=()=>{
  audio.currentTime = 0;
  audio.play();
}
const changeTime = (amount, type)=>{
  if(type == 'break'){
    if(breakTime<=60 &&amount==-60){
      return
    }
    setBreakTime((prev)=>prev+amount);
  }
  if(type=='session'){
    if(sessionTime<=60 &&amount==-60){
      return
    }
    setSessionTime((prev)=>prev+amount);
    if(!start){
      setStarterTime((prev)=>prev+amount)
    }
  }
}
let onBreakVariable = onBreak;
const onActionClick=()=>{
  let second = 1000;
  let date = new Date().getTime();
  let nextDate = new Date().getTime() +second;
  if(!start){
    let interval=setInterval(()=>{
      date=new Date().getTime();
      if(date > nextDate){
        setStarterTime((prev)=>{
          if(prev < 1&&!onBreakVariable){
            playSound();
            setOnBreak(true);
            setHelp(true);
            return breakTime;
          } 
          if(prev<1 && onBreakVariable){
            playSound();
            setOnBreak(false);
            return sessionTime
          }
          return prev - 1;
        });
        console.log(onBreakVariable)
        nextDate+=second;
      }
    },30)
    localStorage.clear();
    localStorage.setItem('interval',interval)
  }

  if(start){
    clearInterval(localStorage.getItem('interval'));
  }
  setStart(!start);
}
useEffect(()=>{
    onBreakVariable = onBreak;
    if(help){
      onActionClick();
    }
},[onBreak]);
const onRestart=()=>{
  setSessionTime(25*60);
  setBreakTime(5*60);
  setStarterTime(25*60);
}
  return (
    <div className="App">
      <div className="timer">
        <h1>25+5 Clock</h1>
        <div className="time-control">
          <Control 
          title={'Break length'} 
          time={breakTime} 
          handleFunc={changeTime}
          func={formatTime}
          type='break'
          />
          <Control 
          title={'Session length'} 
          time={sessionTime} 
          handleFunc={changeTime}
          func={formatTime}
          type='session'
          />
        </div>
        <div className="counter">
          <h2>{onBreak?'Break':'Session'}</h2>
          <h1>{formatTime(starterTime)}</h1>
        </div>
        <div className="start-stop">
          <div onClick={onActionClick}>
            {start?<FaPauseCircle />:<FaPlay />}
          </div>
          <div onClick={onRestart}>
            <VscDebugRestart />
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
