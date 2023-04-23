import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';

function BoardLinksCard({currentUserName, currentUserBoards}) {

  return (
    <div className='board-links-card-wrapper'>
      <div className='board-links-card'>
        <p className='board-links-card-header'>{currentUserName}'s Savings Boards</p>
          {/* <BoardLink
              boardName={"Example Board 1"}
          /> */}
          {currentUserBoards.map(board => {
            return <BoardLink boardName={board.boardName} boardId={board.boardID}/>
          })}
      </div>
    </div>
  )
}

export default BoardLinksCard
