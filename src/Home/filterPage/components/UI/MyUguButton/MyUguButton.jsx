import React, { useState } from 'react';
import cl from './MyUguButton.module.css';

const MyUguButton = ({ children, isRed, onClick, ...props }) => {
    const buttonStyle = {
        background: isRed ? '#FB527B' : 'white',
        color: isRed ? 'white' : 'black',
    };


    return (
        <div className={cl.button__block}>
            <button {...props} style={buttonStyle} className={cl.myBtn} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default MyUguButton;