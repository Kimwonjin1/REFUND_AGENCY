import React from "react";
import "../../App.css";
import "./AboutUs.css";
import Footer from "../Footer/Footer";

export default function AboutUs() {
  return (
    <>
      <div className="aboutus">
      
        <div className="about-top">
        <img className="about-img"src={require('../../images/about.jpg').default} alt=''/>
        <div className="about-text">RERUND AGENCY <br/><div className="text-sub">최고의 결과로 보답해 드립니다</div></div>
        </div>
        <div className="about-middle">
          <div className="about-text">
          <div className='text-sub'><span>리펀드에이전시 </span>홈페이지를<br />
            방문해주신 고객 여러분 감사합니다.
            </div>
            <div className='text-sub2'>
              REFUND AGENCY의 수천 건 이상의 다양한 경험과 노하우를 통해
              빠른 시일 내에 환불을 받으실 수 있도록 최선을 다하겠습니다
            </div>
          </div>
          <img className="about-img" src={require('../../images/aboutus.jpg').default} alt=''/>
        </div>
            <div className="about-bottom">

        
        <div className="item1">
        <div className="bottom-title">상세서비스 내용</div>
        <div className="text">
        <br />
            정보 USB 값이 계약금의 95% 
            <br />
            무료6개월, 유료6개월
            <br />
            정상가~만원
            <br />
            해지 시 종목당 ~만원 차감
            <br />
            의무사용기간 ~개월
            <br />
            과도한 일일요금   <br />
        </div>
           
          </div>
      

        <div className="item2">
        <div className="bottom-title">사업자등록증</div>

        <img src={require("../../images/사업자등록.png").default} alt="" />
        </div>
       
        </div>
       
      </div>
    
      <Footer />
    </>
  );
}
