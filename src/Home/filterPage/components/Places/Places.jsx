// Places.jsx
import React, { useEffect, useState } from 'react';
import cl from './Places.module.css';
import MySelectedButton from '../UI/MySelectedButton/MySelectedButton.jsx';
import { useFetch } from '../../../../components/hooks/useFetchB.js';
import axios from 'axios';
import MyLine from "../UI/MyLine/MyLine.jsx";
import SubPlaces from "../SubPlaces/SubPlaces.jsx";
import { useDispatch } from "react-redux";
import { setSelectedSubcategory } from "../../../../actions.js";
import MyUguButton from "../UI/MyUguButton/MyUguButton.jsx";

// ... (ваш импорт)

const Places = ({ selectedSubcategory, activeCategory, onSubcategorySelect }) => {
    const [selectedButtons, setSelectedButtons] = useState({});
    const [categoriesData, setCategoriesData] = useState({});
    const [data, setData] = useState({});
    const [fetching, isDataLoading, dataError] = useFetch(async () => {
        const response = await axios.get(
            `https://places-test-api.danya.tech/api/categories/${activeCategory}?populate=sub-sub-categories,image,subcategories,subcategories.image,subsubcategories.image`
        );
        setData(response.data || {});
        return response;
    });
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

    useEffect(() => {
        fetching();
    }, [activeCategory]);

    const dispatch = useDispatch();
    console.log(selectedSubcategoryId)
    if (!selectedSubcategoryId){
        dispatch(setSelectedSubcategory(null));

    }
    const handleButtonClick = (subcategory, index) => {
        const currentSelectedButtons = { ...selectedButtons };
        setSelectedSubcategoryId(subcategory);

        if (currentSelectedButtons[activeCategory] === index) {
            // Если кнопка уже активна, снимаем активность
            currentSelectedButtons[activeCategory] = null;
            dispatch(setSelectedSubcategory(null));
            localStorage.removeItem('selectedSubcategory');
        } else {
            // В противном случае делаем активной
            currentSelectedButtons[activeCategory] = index;
            dispatch(setSelectedSubcategory(subcategory));
        }

        setSelectedButtons(currentSelectedButtons);

        if (onSubcategorySelect) {
            onSubcategorySelect(subcategory);
        }
    };
    useEffect(() => {
        setSelectedButtons({}); // Сбросить выбранные подкатегории при изменении активной категории
        setSelectedSubcategoryId(null);
    }, [activeCategory]);

    return (
        <>
            <div className={cl.button__select}>
                <div className={cl.button__select__row}>
                    {Array.isArray(data?.data?.attributes?.subcategories?.data) &&
                        data?.data?.attributes?.subcategories?.data.map((subcategory, index) => (
                            <MyUguButton
                                isRed={selectedButtons[activeCategory] === index}
                                onClick={() => handleButtonClick(subcategory?.id, index)}
                                key={index + 1}
                            >
                                <img
                                    className={cl.button__image}
                                    src={`https://places-test-api.danya.tech${subcategory?.attributes?.image?.data?.attributes?.url}`}
                                    alt={`Изображение ${index}`}
                                />
                                {subcategory?.attributes?.title}
                            </MyUguButton>
                        ))}
                </div>
            </div>

            {selectedButtons[activeCategory] !== null && (
                <SubPlaces
                    classname={cl.sintol}
                    activeCategory={activeCategory}
                    subcategoryId={selectedSubcategoryId}
                />
            )}

        </>
    );
};

export default Places;
