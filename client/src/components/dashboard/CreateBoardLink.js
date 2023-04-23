import React from 'react'
import '../../css/dashboard/boardLink.css';
import CreateBoard from '../dashboard/CreateBoard';

function CreateBoardLink(props) {
  return (
    <div className='board-link-wrapper'>
      <p className='board-link-title'>Create New Board</p>
      <CreateBoard/>
    </div>
  )
}

export default CreateBoardLink
