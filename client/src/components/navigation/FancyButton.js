import React from 'react'
import '../../css/navigation/fancyButton.css';

function FancyButton(props, ...buttonProps) {
  return (
    <div className='fancy-button-wrapper' {...buttonProps}>
        <button className='fancy-button'>{props.buttonText}</button>
    </div>
  )
}

export default FancyButton