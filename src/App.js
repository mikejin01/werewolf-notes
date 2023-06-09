import React, {useState, useRef} from 'react'
import Table from "./Table"
import ig_logo from './ig.png';

function App() {
  const [players, setPlayers] = useState([])
  const myNumberRef = useRef()
  const playersCountRef = useRef()
  const newRecordTypeRef = useRef()
  const recordInitPlayerRef = useRef()
  const recordAffectedPlayerRef = useRef()
  const recordMultiPlayersRef = useRef()
  const recordContentRef = useRef()
  var newRecordType = "支持"
  var round = 1
  var updatedPlayers = []
  var playersCount = 0

  function handleReset(e) {
    const myNumber = myNumberRef.current.value
    playersCount = playersCountRef.current.value
    if (myNumber === "0") return
    console.log(myNumber)
    console.log(playersCount)

    for (let i = 0; i < playersCount; i++) {
      console.log("i = "+i)
      setPlayers(prevPlayers => {
        return [...prevPlayers, {
          id: i+1, 
          score: 0,
          status: "存活",
          records: [{recordType: "开始", round: 0}]
          //priceSold: parseFsloat(priceSoldRef.current.value),
          //qtySold: parseFloat(qtySoldRef.current.value)
        }]
      })
      console.log(players)
    } 
    document.getElementById('setting').hidden = true
    document.getElementById('myNumberSpan').innerHTML = myNumber
    document.getElementById('playersCountSpan').innerHTML = playersCount
    document.getElementById('roundSpan').innerHTML = round
    document.getElementById('status').hidden = false
    /**/
  }
  function handleRecordTypeChange(e) {
    newRecordType = newRecordTypeRef.current.value
    let newRecordTypeSpan = document.getElementById('newRecordTypeSpan');
    let recordMultiPlayersDiv = document.getElementById('recordMultiPlayersDiv');
    let recordInitPlayerDiv = document.getElementById('recordInitPlayerDiv');
    let recordAffectedPlayerDiv = document.getElementById('recordAffectedPlayerDiv');
    let recordContentDiv = document.getElementById('recordContentDiv');

    newRecordTypeSpan.hidden = false
    newRecordTypeSpan.innerHTML = newRecordTypeRef.current.value
    recordMultiPlayersDiv.hidden = true
    recordInitPlayerDiv.hidden = true
    recordContentDiv.hidden = true
    recordAffectedPlayerDiv.hidden = true

    console.log(newRecordType)
    if (newRecordType == "上警"){
      recordMultiPlayersDiv.hidden = false
    } else if (newRecordType == "出局") {
      recordMultiPlayersDiv.hidden = false
      recordAffectedPlayerDiv.hidden = false
    }  
    else if (newRecordType == "被击杀") {
      recordAffectedPlayerDiv.hidden = false
    } else if (newRecordType == "跳") {
      recordInitPlayerDiv.hidden = false
      recordContentDiv.hidden = false
    }else if (newRecordType == "备注") {
      recordInitPlayerDiv.hidden = false
      recordContentDiv.hidden = false
    } else {
      recordInitPlayerDiv.hidden = false
      recordAffectedPlayerDiv.hidden = false
    }
  }
  function handleNextRound(e) {
    round=round+1
    document.getElementById('roundSpan').innerHTML = round
  }

  function handleRestart(e) {
    window.location.reload();
  }
  function handleRecord(e) {
    console.log("first")
    round = document.getElementById('roundSpan').innerHTML
    //newRecordType = newRecordTypeRef.current.value
    const submittedRecordType = newRecordTypeRef.current.value
    const recordMultiPlayers = recordMultiPlayersRef.current.value.split(" ")
    const recordInitPlayer = parseInt(recordInitPlayerRef.current.value)
    const recordContent = recordContentRef.current.value
    const recordAffectedPlayer = parseInt(recordAffectedPlayerRef.current.value)
    
    //updatedPlayers = players
    const updatedPlayers = [...players]
    //updatedAreas[1].id = "pick"

    if (submittedRecordType == "上警"){
      for (let i = 0; i < recordMultiPlayers.length; i++) {
        console.log("now is: "+recordMultiPlayers[i])
        var tempPlayer = parseInt(recordMultiPlayers[i]-1)
        updatedPlayers[tempPlayer].records.push({recordType: "上警", round: round})
      }
    } else if (submittedRecordType == "出局") {
      for (let i = 0; i < recordMultiPlayers.length; i++) {
        console.log("now is: "+recordMultiPlayers[i])
        var tempPlayer = parseInt(recordMultiPlayers[i]-1)
        updatedPlayers[tempPlayer].records.push({recordType: "投死了"+recordAffectedPlayer+"号", round: round})
        
      }
      updatedPlayers[recordAffectedPlayer-1].status = "被"+recordMultiPlayersRef.current.value+"号投死出局"
      updatedPlayers[recordAffectedPlayer-1].records.push({recordType: "被出局", round: round})
    }  
    else if (submittedRecordType == "被击杀") {
      console.log("被击杀! at round "+document.getElementById('roundSpan').innerHTML)
      updatedPlayers[recordAffectedPlayer-1].status = "被击杀"
      updatedPlayers[recordAffectedPlayer-1].records.push({recordType: "被击杀", round: round})
    } else if (submittedRecordType == "支持"){
      updatedPlayers[recordInitPlayer-1].records.push({recordType: "支持"+recordAffectedPlayer+"号", round: round})
      updatedPlayers[recordAffectedPlayer-1].records.push({recordType: "被"+recordInitPlayer+"号"+"支持", round: round})
    }else if(submittedRecordType == "踩") {
      updatedPlayers[recordInitPlayer-1].records.push({recordType: "踩"+recordAffectedPlayer+"号", round: round})
      updatedPlayers[recordAffectedPlayer-1].records.push({recordType: "被"+recordInitPlayer+"号"+"踩", round: round})
    }else if(submittedRecordType == "跳") { 
      updatedPlayers[recordInitPlayer-1].records.push({recordType: "跳"+recordContent, round: round})

    }else if(submittedRecordType == "备注") { 
      updatedPlayers[recordInitPlayer-1].records.push({recordType: "备注:"+recordContent, round: round})

    }else { 

    }

    console.log(updatedPlayers)
    setPlayers(updatedPlayers)
    //setPlayers([])
  }
  var tableStyle = {
      "border": "1px solid black"
  };
  return (
    <div style={{justifyContent:'center', alignItems:'center'}}>
      <h4>jp狼人杀笔记 v1.0</h4>
      <h4>by m.j. <a href='https://www.instagram.com/ezzekmusic/'><img src={ig_logo} style={{ width: '15px'}} ></img>ezzekmusic</a></h4>
      <div id="setting">
        <span>我的号码</span>
        <input ref={myNumberRef} type="number" pattern="\d*" style={{ width: '30px'}} ></input>
        <br></br>
        <span>本局玩家人数</span>
        <input ref={playersCountRef} type="number" pattern="\d*" style={{ width: '30px'}} ></input>
        <br></br>
        <button onClick={handleReset}>开始</button>
      </div>
      <div id="status" hidden="true">
        我的号码: <span id="myNumberSpan" ></span>本局玩家人数:<span id="playersCountSpan" ></span>
        <br></br>
        轮次: <span id="roundSpan" ></span> <button onClick={handleNextRound}>下一轮</button>
        <button onClick={handleRestart}>重开</button>
      </div>
      <br></br>
      <span>选择记录类型</span>
      <select id="framework" defaultValue="0" ref={newRecordTypeRef} onChange={handleRecordTypeChange}>
          <option value="上警">请选择</option>
          <option value="上警">上警</option>
          <option value="支持">支持</option>
          <option value="踩">踩</option>
          <option value="出局">出局</option>
          <option value="被击杀">被击杀</option>
          <option value="跳">跳</option>
          <option value="备注">备注</option>
      </select>
      <br></br>
      {  newRecordType == "1" ? "hi" : null }
      <div id="recordMultiPlayersDiv" hidden="true"><span >参与玩家（空格分开）</span>
      <br></br>
      <input ref={recordMultiPlayersRef} type="string"  style={{ width: '50px'}}></input></div>
      <span id="recordInitPlayerDiv" hidden="true" >玩家 
      <input  ref={recordInitPlayerRef} type="number" pattern="\d*" style={{ width: '30px'}} ></input></span>
      <span id="newRecordTypeSpan" hidden="true" ></span>
      <br></br>
      <input id="recordContentDiv" hidden="true" ref={recordContentRef} type="string" style={{ width: '100px'}} ></input>
      <span id="recordAffectedPlayerDiv" hidden="true" >玩家 
      <input  ref={recordAffectedPlayerRef} type="number" pattern="\d*" style={{ width: '30px'}} ></input></span>
       
      
      <button onClick={handleRecord}>记录</button>
      <table style={tableStyle}>
        <Table players={players}/>
      </table>

      
    </div>
  );
}

export default App;
