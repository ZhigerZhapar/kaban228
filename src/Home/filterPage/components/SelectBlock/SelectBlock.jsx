import React from 'react';
import cl from './SelectBlock.module.css'
import MySelector from "../UI/MySelector/MySelector.jsx";
import MyLine from "../UI/MyLine/MyLine.jsx";

import Categories from "../Categories/Categories.jsx";
import Places from "../Places/Places.jsx";
import MyBigButton from "../UI/MyBigButton/MyBigButton.jsx";

const SelectBlock = ({activeCategory,handleFilterPageClose}) => {
    return (
        <>
            <Categories handleFilterPageClose={handleFilterPageClose} activeCategory={activeCategory}/>

        </>
    );
};

export default SelectBlock;