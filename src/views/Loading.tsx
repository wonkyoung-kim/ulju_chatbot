import React from 'react';
import '../styles/common.css';

const Loading = () => {
    return (
        <div className="chatbot-loading">
            <section className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </section>
            <h2>로딩중</h2>
        </div>
    );
};

export default Loading;
