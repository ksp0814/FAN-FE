import React from 'react';
import HeroImg from '../assets/hero2.jpg';
import './Home.css';


const Home = () => {
  return (
    <div className='hero'>
      <img src={HeroImg} alt="히어로 이미지" className='hero-image' />
      <div className='hero-content'>
        <h1>경일이엔지</h1>
        <p>우리와 함께 성장하세요</p>
      </div>
    </div>
  );
};


export default Home;
