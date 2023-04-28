import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';
import CreateBoard from './CreateBoard';

function BoardLinksCard({currentUserName, currentUserBoards}) {

  return (
    <div className='board-links-card-wrapper'>
      <div className='board-links-card'>
      
          <div className='board-links-card-header'>
            <p className='board-links-card-name'>{currentUserName}'s Savings Boards</p>
            <div className='board-links-create-board'>
              <CreateBoard currentUserName={currentUserName}/>
            </div>
            
          </div>
        
          {currentUserBoards.map(board => {
            return <BoardLink boardName={board.boardName} boardId={board.boardID}/>
          })}
          {/* <CreateBoardLink/> */}
      </div>
    </div>
  )
}

export default BoardLinksCard