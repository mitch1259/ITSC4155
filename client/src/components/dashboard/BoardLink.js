import React from 'react'
import '../../css/dashboard/boardLink.css';

function BoardLink(props) {
  return (
    <div className='board-link-wrapper'>
      <p className='board-link-title'>{props.boardName}</p>
      <button className='board-link-button'>Go to board</button>
    </div>
  )
}

export default BoardLink
