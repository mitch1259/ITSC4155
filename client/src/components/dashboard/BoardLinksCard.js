import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';

function BoardLinksCard(props) {
  return (
    <div className='board-links-card-wrapper'>
      <div className='board-links-card'>
        <p className='board-links-card-header'>{props.name}'s Savings Boards</p>
          <BoardLink
              boardName={"Example Board 1"}
          />
          <BoardLink 
              boardName={"Example Board 2"}
          />
      </div>
    </div>
  )
}

export default BoardLinksCard
