import React, { useState } from 'react';
import cl from './MyNtButton.module.css';
import {setActiveCategory} from "../../../../../actions.js";
import {useDispatch} from "react-redux";

const MyNtButton = ({ children, isRed, onClick, ...props }) => {
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

export default MyNtButton;