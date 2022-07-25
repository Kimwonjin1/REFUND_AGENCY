import React from 'react'
import {Button} from '../util/Button/Button'
import './Footer.css'
import icon from '../../images/logo.svg'

function Footer() {
    return (
        <div className="footer-container">
            
             <div className="title">Refund Agency</div>
           <div className="description">상호 : REFUND AGENCY | 대표 : 윤정한
           <br />운영시간 : 24시간 연중무휴 | 고객센터 내 번호
            <br />전화 상담 AM 09:00 ~ PM 22:00 | 카톡상담 24시간
           </div>
           <div className="icons">
           <i className="fab fa-facebook"></i>
           <i className="fab fa-instagram"></i>
           <i className="fab fa-youtube"></i>
           </div>
           
        </div>
    )
}

export default Footer
