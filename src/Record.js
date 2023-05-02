import React from 'react'

export default function Record(record) {
  return (
    <label>
        轮次：{record.record.round} 记录: {record.record.recordType} 
        <input type="checkbox" checked={record.deleted}/>
        <br></br>
    </label>
  )
}
