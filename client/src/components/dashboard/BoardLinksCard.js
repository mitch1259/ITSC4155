import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';

function BoardLinksCard(props) {
  return (
    <div className='board-links-card-wrapper'>
      <div className='board-links-card'>
<<<<<<< HEAD
        <p className='board-links-card-header'>Placeholder's Savings Boards</p>
        <BoardLink
            boardName={"Example Board 1"}
        />
        <BoardLink 
            boardName={"Example Board 2"}
        />
=======
        <p className='board-links-card-header'>{props.name}'s Savings Boards</p>
          <BoardLink
              boardName={"Example Board 1"}
          />
          <BoardLink 
              boardName={"Example Board 2"}
          />
>>>>>>> 4a9999915ae631fd88c09e66dfb814182c889509
      </div>
    </div>
  )
}

export default BoardLinksCard
