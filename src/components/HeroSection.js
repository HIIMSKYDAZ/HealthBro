import React from 'react'
import './HeroSection.css'
import { Button } from './Button'

export default function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='../videos/herobg.mp4' autoPlay loop muted/>
      <h1>HEALTH BRO</h1>
      <p>Egy Egészséges jövőért!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Belépés <i class="fa-solid fa-dumbbell"></i>
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          Regisztráció <i class="fa-solid fa-key"></i>
        </Button>
      </div>
    </div>
  )
}
