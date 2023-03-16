import React from 'react';
import '../../css/savingsBoard/boardHeader.css';

function BoardHeader(props) {
  return (
    <div className='board-header-wrapper'>
        <p className='board-header-title'>{ props.boardTitle }</p>
        <p className='board-header-description'>{ props.boardDescription }</p>
        <p className='board-header-remaining-budget'>Remaining Budget: ${ props.remainingBudget }</p>
    </div>
  )
}

export default BoardHeader