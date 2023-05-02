import React from 'react'
import Record from './RecordTable'
import RecordTable from './RecordTable'

export default function Player( {player} ) {
    /*{player.records[0].recordType}
        {player.records.map(record => {
            return <Record record={record} />
        })}*/
        var tdStyle = {
            "border": "1px solid black"
         };
  return (
    <>
    <tr>
        <td style={tdStyle}> {player.id}号 </td>
        <td style={tdStyle}>信誉：{player.score}</td>
        <td style={tdStyle}>状态：{player.status}</td>
    </tr>
    <tr>
        <td style={tdStyle}></td>
        <td style={tdStyle}> 记录:</td>
        <td style={tdStyle}> 
            <RecordTable records={player.records} /> 
        </td>
    </tr>
    </>
  )
}