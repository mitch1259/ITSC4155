import React from 'react'
import '../../css/dashboard/boardLink.css';
import { Link } from 'react-router-dom';

function BoardLink({boardName, boardId}) {

  return (
    <div className='board-link-wrapper'>
      <p className='board-link-title'>{boardName}</p>
      <Link to={"/savings-board/" + boardId}>
        <button className='board-link-button'>Go to board</button>
      </Link>
    </div>
  )
}

export default BoardLink;