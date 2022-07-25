import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import './CardDetail.css'

import Card from '../util/card/Cards'
import CardImg from '../util/modal/Modal'

function CardItem() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [cards] = state.productsAPI.products
    const [cardDetail, setcardDetail] = useState([])
    const CardDetailSlice = cards.slice(0, 4)

    useEffect(() =>{
        if(params.id){

            cards.forEach(card => {
                if(card._id === params.id) setcardDetail(card)
            })
        }
    },[params.id, cards])

    if(cardDetail.length === 0) return null;
    function viwe(){
        <CardImg CardImg={cardDetail.images.url}/>
    }
    return (
        <>
            <div className="detail">
            <h2>{cardDetail.title}</h2>
            <div className="box-img">
            
            <div className="detail-main-img"> <img src={cardDetail.images.url} onClick={viwe} alt="" /></div>
            </div>
                <div className="box-detail">
                        {cardDetail.description}
                </div>
            </div>
            <div className="related_card">
                {
                    CardDetailSlice.map(card => {
                      return <Card key={card._id} product={card}/>
                    })
                }
            </div>
    
       </>
    )
}

export default CardItem
