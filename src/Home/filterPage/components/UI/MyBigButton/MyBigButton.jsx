import React, { useEffect, useState } from 'react';
import cl from "./MyBigButton.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory, setSelectedSubcategory } from "../../../../../actions.js";
import MyLine from "../MyLine/MyLine.jsx";

const MyBigButton = ({ catId, onSelectCategory, handleFilterPageClose, categoryId, onLoadPosts, children, ...props }) => {
    const navigate = useNavigate();
    const [dataChanged, setDataChanged] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const dispatch = useDispatch();
    const selectCurrentSubcategoryId = useSelector(state => state.title.currentSubcategoryId);

    const handleButtonClick = (e) => {
        e.preventDefault();
        setIsButtonClicked(true);
        console.log(selectCurrentSubcategoryId);
        if (categoryId) {
            if (onSelectCategory) {
                onSelectCategory({ categoryId });
            }
            handleFilterPageClose();
            navigate(`/page2/${categoryId}`);
            if (onLoadPosts) {
                onLoadPosts(categoryId);
                setDataChanged(!dataChanged);
            }
        } else {
            console.error('Invalid categoryId');
        }
    };

    return (
        <>
            <div className={cl.ntclown}>
            <div className={cl.myBtnWrapper}>
                <button {...props} className={cl.myBtn} onClick={handleButtonClick}>
                    {children}
                </button>
            </div>
        </div>
        </>
    );
};

export default MyBigButton;
