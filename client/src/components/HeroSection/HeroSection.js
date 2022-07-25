import React from 'react'
import '../../App.css'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import { Button } from '../util/Button/Button'
import HeroMain from '../../images/main.png'


function HeroSection() {
    return (
        <div className='hero-container'>    
               <img src={HeroMain} className="main-img" alt=""/>
               <h2>업계 최저 수수료</h2>
            <h1>REFUND AGENCY</h1> 
            <p>환불은 리펀드 에이전시에서</p>
            <div className="hero-btns"><Link to='/review'>
                <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>
                    환불사례
                </Button>
                </Link>
                <Link to='/consulting'>
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'>
                상담받기<i className='far fa-play-circle'/>
                </Button>
                </Link> 
            </div>
        </div>
    )
}

export default HeroSection
