import React, { createContext, useContext, useState } from 'react';

const CategoryPageContext = createContext();

export const CategoryPageProvider = ({ children }) => {
    const [loadPostsByCategory, setLoadPostsByCategory] = useState(() => () => {});

    return (
        <CategoryPageContext.Provider value={{ loadPostsByCategory, setLoadPostsByCategory }}>
            {children}
        </CategoryPageContext.Provider>
    );
};

export const useCategoryPage = () => {
    return useContext(CategoryPageContext);
};
