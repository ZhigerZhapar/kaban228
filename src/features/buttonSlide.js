import { createSlice } from '@reduxjs/toolkit';

export const buttonSlice = createSlice({
    name: 'button',
    initialState: {
        buttons: {}, // Изначально пустой объект
    },
    reducers: {
        setButtonPressed: (state, action) => {
            const { buttonId } = action.payload;
            state.buttons = {
                ...state.buttons,
                [buttonId]: { isPressed: true },
            };
        },
        resetButton: (state, action) => {
            const { buttonId } = action.payload;
            state.buttons = {
                ...state.buttons,
                    [buttonId]: { isPressed: false },
            };

        },
        setButtons: (state, action) => {
            state.buttons = {...action.payload};
        },
    },
});

export const { setButtonPressed, resetButton, setButtons } = buttonSlice.actions;

export default buttonSlice.reducer;