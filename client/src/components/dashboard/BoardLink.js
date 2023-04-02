import React from 'react'
import '../../css/dashboard/boardLink.css';
import { Link } from 'react-router-dom';

function BoardLink(props) {
  return (
    <div className='board-link-wrapper'>
      <p className='board-link-title'>{props.boardName}</p>
      <Link to="/savings-board/id">
        <button className='board-link-button'>Go to board</button>
      </Link>
    </div>
  )
}

export default BoardLink
