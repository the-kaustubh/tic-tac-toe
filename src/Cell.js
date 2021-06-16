import React from 'react'
import './App.css'

export default function Cell({value, row, col, toggleBlock}) {
  function flip() {
    toggleBlock(row, col)
  }

  return (
    <button className='cell' onClick={flip}>
      {value}
    </button>
  )
}
