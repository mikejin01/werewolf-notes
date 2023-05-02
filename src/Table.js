import React, {useState} from 'react'
import Player from './Player'

export default function Table ({ players }) {
    return (
      players.map(player => {
        return <Player key={player.id} player={player} />
      })
  )
}
