import React from 'react'
import '../../css/dashboard/boardLinksCard.css';
import BoardLink from './BoardLink.js';
import CreateBoard from './CreateBoard';

function BoardLinksCard({currentUserName, currentUserBoards}) {


  if (currentUserBoards.length > 0) {
    return (
      <div className='board-links-card-wrapper'>
        <div className='board-links-card'>
        
            <div className='board-links-card-header'>
              <p className='board-links-card-name'>{currentUserName}'s Savings Boards</p>
              <div className='board-links-create-board'>
                <CreateBoard currentUserName={currentUserName}/>
              </div>
              
            </div>
          <div className='board-links'>
          {currentUserBoards.map(board => {
                        return <BoardLink boardName={board.boardName} boardId={board.boardID}/>
                      })}
          </div>
            
            {/* <CreateBoardLink/> */}
        </div>
      </div>
    )
  } else {
    return (
      <div className='board-links-card-wrapper'>
        <div className='board-links-card'>
        
            <div className='board-links-card-header'>
              <p className='board-links-card-name'>{currentUserName}'s Savings Boards</p>
              <div className='board-links-create-board'>
                <CreateBoard currentUserName={currentUserName}/>
              </div>
            </div>
            <p>no boards found</p>
        </div>
      </div>
    )
  }

}

export default BoardLinksCard