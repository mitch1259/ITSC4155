import React from 'react'
import SavingsBoardBucket from '../components/savingsBoard/SavingsBoardBucket';
import '../css/savingsBoard/savingsBoard.css';

const styles = {
    backgroundColor: 'green',
    height: '50vh',
    width: '13vw',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
}

function SavingsBoard() {
  return (
    <div className='savings-board-wrapper'>
      <div className='savings-board-buckets'>
        <SavingsBoardBucket styles={styles} backgroundColor="red"/>
        <SavingsBoardBucket styles={styles}/>
        <SavingsBoardBucket styles={styles}/>
        <SavingsBoardBucket styles={styles}/>
        <SavingsBoardBucket styles={styles}/>
        <SavingsBoardBucket styles={styles}/>
        <SavingsBoardBucket styles={styles}/>
      </div>
      <div className='savings-board-buckets-timeline' />
    </div>
  )
}

export default SavingsBoard
