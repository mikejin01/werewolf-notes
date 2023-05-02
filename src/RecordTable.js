import React from 'react'
import Record from './Record'

export default function RecordTable ( {records} ) {
    return (
      records.map(record => {
        return <Record  record={record} />
      })
    )
}