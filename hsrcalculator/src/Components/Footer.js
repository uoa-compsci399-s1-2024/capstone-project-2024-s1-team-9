import React from 'react'
import './FooterStyles.css'
import gmail from '../Assets/gmail.svg'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='top'>
            <div>
                <h1>Health Star Calculator</h1>
                <p>Contact Us</p>
            </div>

            <div>
                <a href="#" target="_blank" >
                    <img src={""} alt="Gmail Icon" />
                </a>
                
                
                
            </div>
        </div>
        
    </div>
  )
}

export default Footer