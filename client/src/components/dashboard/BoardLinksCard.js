import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';
import CreateBoardLink from './CreateBoardLink.js'

function BoardLinksCard({currentUserName, currentUserBoards}) {

  return (
    <div className='board-links-card-wrapper'>
      <div className='board-links-card'>
        <p className='board-links-card-header'>{currentUserName}'s Savings Boards</p>
          {currentUserBoards.map(board => {
            return <BoardLink boardName={board.boardName} boardId={board.boardID}/>
          })}
          <CreateBoardLink/>
      </div>
    </div>
  )
}

export default BoardLinksCard