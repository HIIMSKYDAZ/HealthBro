import React from 'react'
import CardItem from './CardItem.js'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
        <h1 style={{color: "black"}}>Vásárlók</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItem
                        src='images/user1.jpg'
                        text='Nagyon elégedett voltam!'
                        label='Vélemény'
                        path='/services'
                    />
                    <CardItem
                        src='images/user2.jpg'
                        text='A legjobb fitness app!'
                        label='Vélemény'
                        path='/services'
                    />
                    <CardItem
                        src='images/user3.jpg'
                        text='Megváltoztatta az életem!'
                        label='Vélemény'
                        path='/services'
                    />
                </ul>
                <ul className='cards__items'>
                    <CardItem
                        src='images/user1.jpg'
                        text='Nagyon elégedett voltam!'
                        label='Vélemény'
                        path='/services'
                    />
                    <CardItem
                        src='images/user2.jpg'
                        text='A legjobb fitness app!'
                        label='Vélemény'
                        path='/services'
                    />
                    <CardItem
                        src='images/user3.jpg'
                        text='Megváltoztatta az életem!'
                        label='Vélemény'
                        path='/services'
                    />
                    
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards