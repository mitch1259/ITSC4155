import React from 'react'
import '../../css/navigation/fancyButton.css';

function FancyButton(props) {
  return (
    <div className='fancy-button-wrapper'>
        <button className='fancy-button'>{props.buttonText}</button>
    </div>
  )
}

export default FancyButton