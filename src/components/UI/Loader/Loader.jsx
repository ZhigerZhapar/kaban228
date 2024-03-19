import React from 'react'
import cl from './Loader.module.css'
import sun from './sun.svg'
const Loader = () => {
    return (
        <img className={cl.loader} src={sun} >

        </img>
    )
}

export default Loader
