import React, { useEffect, useState } from "react";
import cl from "./Filter.module.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import sun from "./imgs/Header/sun.svg"

const FilterPage = ({ handleFilterPageClose, activeCategory }) => {

    return (
        <div className={cl._container}>
            <div className={cl.overlay}></div>
            <div className={cl.wrapper} onClick={(e) => e.stopPropagation()}>
                <Main handleFilterPageClose={handleFilterPageClose} activeCategory={activeCategory} />
            </div>
        </div>
    );
};

export default FilterPage;