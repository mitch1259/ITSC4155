import React from 'react'
import '../../css/dashboard/boardLink.css';
import { Link } from 'react-router-dom';
import DeleteBoard from '../dashboard/DeleteBoard';

function BoardLink(props) {
  return (
    <div className='board-link-wrapper'>
      <p className='board-link-title'>{props.boardName}</p>
      <Link to="/savings-board/id">
        <button className='board-link-button'>Go to board</button>
      </Link>
      <DeleteBoard /> {/* NEEDS PROPS FOR BOARD ID */}
    </div>
  )
}

export default BoardLink
