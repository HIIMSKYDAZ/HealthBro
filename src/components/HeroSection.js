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
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            linkTo="/login"
          >
            Bejelentkezés
          </Button>
          <Button
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            linkTo="/sign-up"
          >
            Regisztráció
          </Button>
      </div>
    </div>
  )
}
