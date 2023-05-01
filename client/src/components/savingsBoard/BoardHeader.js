import React from 'react';
import '../../css/savingsBoard/boardHeader.css';
import DeleteBoard from '../dashboard/DeleteBoard';
import { useParams } from 'react-router';

function BoardHeader(props) {

  // get board parameter from the URL
  const boardId = useParams();

  return (
    <div className='board-header-wrapper'>
      <div className='board-header-title-delete-wrapper'>
        <p className='board-header-title'>{ props.boardTitle }</p>
        <div className='board-header-delete'>
          <DeleteBoard boardId={boardId.boardId} />
        </div>
      </div>
        <p className='board-header-description'>{ props.boardDescription }</p>
        <p className='board-header-remaining-budget'>Weekly Budget: ${ props.weeklyBudget }</p>
        <p className='board-header-remaining-budget'>Remaining Budget: ${ props.remainingBudget }</p>
        
    </div>
  )
}

export default BoardHeader