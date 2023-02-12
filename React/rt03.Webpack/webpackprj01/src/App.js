import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';

function App({ ...props }) {
  return (
    <div>
      <Header></Header>
      <section id="page1" data-role="page">
        <div className="content" data-role="content">
          컨텐츠
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default React.memo(App);
// React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
