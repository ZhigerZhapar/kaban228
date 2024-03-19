import React, { useState } from 'react';
import cl from './MySelectedButton.module.css';
import {setActiveCategory} from "../../../../../actions.js";
import {useDispatch} from "react-redux";

const MySelectedButton = ({ className, children, isRed, onClick, ...props }) => {
    const dispatch = useDispatch()
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

export default MySelectedButton;