import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>歡迎來到我的網站</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>最近在做什麼？</h2>
        <p>這裡可以放置你最近的動態、正在進行的專案，或是想要特別展示的內容。</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>精選文章</h2>
        <p>可以在這裡放一些精選的文章連結</p>
        <Link to="/posts">查看所有文章 →</Link>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>關於我</h2>
        <p>簡短的自我介紹，詳細內容可以連到 <Link to="/whoami">whoami</Link> 頁面</p>
      </section>
    </div>
  );
};

export default HomePage;