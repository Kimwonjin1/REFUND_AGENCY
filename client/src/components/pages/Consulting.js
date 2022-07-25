import React, { useEffect, useState, useContext } from "react";
import "./Consulting.css";
import VanillaTilt from "vanilla-tilt"

function Consulting() {
  useEffect(() => {
    // 에러 처리
    try {
      window.Kakao.init(`${process.env.REACT_APP_KAKAO_API}`);
    } catch (e) {}
    // Kakao Channel 추가 버튼 생성
    window.Kakao.Channel.createChatButton({
      container: "#kakao-talk-channel-chat-button",
      channelPublicId: "_djjXb", // Kakao Channel 홈 URL에 명시된 id로 설정
      title: "consult",
      size: "small",
      color: "yellow",
      shape: "pc",
      supportMultipleDensities: true,
    });
    // Script 사용을 위하여 추가

    VanillaTilt.init(document.querySelectorAll(".consulting-card"), {
    });
  }, []);



  return (
    <div>
       <div className="calling-back"><img src={require("../../images/consulting-img.jpg").default} alt="" /></div>
      <div className="calling-container">
        <div className="consulting-card">
          <div className="card-img"><img src={require("../../images/calling-card.jpg").default} alt="" /></div>
          <div className="card-content">
          <div className="text"><h3>전화상담 </h3>070-8065-2639</div>
          </div>
          
        </div>

        <div className="consulting-card">
          <div className="card-img"><img src={require("../../images/kakao-card.png").default} alt=""/></div>
          <div className="card-content">
          <div className="text"><h3>카카오 상담</h3></div>
        <div id="kakao-talk-channel-chat-button"></div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Consulting;
