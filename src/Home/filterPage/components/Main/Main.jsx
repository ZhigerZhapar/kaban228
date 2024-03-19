import React from 'react';
import cl from './Main.module.css'
import SelectBlock from "../SelectBlock/SelectBlock.jsx";

const Main = ({activeCategory,handleFilterPageClose}) => {
    return (
        <div className={`${cl._container} ${cl.main__container}`}>
            <SelectBlock handleFilterPageClose={handleFilterPageClose} activeCategory={activeCategory} />

        </div>
    );
};

export default Main;