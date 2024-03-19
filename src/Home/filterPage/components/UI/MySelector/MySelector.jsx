import React, {useState} from 'react';
import cl from './MySelector.module.css'

const MySelector = ({children, ...props}) => {
    const [isRed, setIsRed] = useState(false);

    const onClick = () => {
        setIsRed((prevIsRed) => !prevIsRed);
    };

    const buttonStyle = {
        background: isRed ? '#FB527B' : 'white',
        color: isRed ? 'white' : 'black',
    };

    return (
        <button onClick={onClick} style={buttonStyle} {...props} className={cl.mySelect}>
            {children}
        </button>
    );
};

export default MySelector;