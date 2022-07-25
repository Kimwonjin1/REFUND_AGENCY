import React, { useContext, useState, useEffect } from 'react'
import {GlobalState} from '../../GlobalState'
import '../../App.css'
import './Home.css'
import HeroSection from '../HeroSection/HeroSection.js'
import Card from '../util/card/Cards'
import Slider from '../util/Slider/Slider'
import Footer from '../Footer/Footer'

function Home() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const homeProductSlice = products.slice(0, 4)
    
 

    return (
        <>
            <HeroSection/>
            <Slider/>
            <div className="card">
            <div className="cards_title">환불후기</div>
            <div className="cards">
            {   
                homeProductSlice.map(product => {
                    return <Card key={product._id} product={product}/>
                }) 
            }
            </div>
            </div>
            <Footer/>
            
          
        </>
    );
}

export default Home
