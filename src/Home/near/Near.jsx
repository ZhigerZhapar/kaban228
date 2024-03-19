import React, {useEffect, useState} from 'react';
import cl from "./near.module.css"
import arrowLeft from "./arrow-left.svg"
import home from "./home.svg"
import { Link } from "react-router-dom";
import main1 from './img/pic.svg'
import main2 from './img/pic3.svg'
import main3 from './img/pic4.svg'
import main4 from './img/main4.svg'
import main5 from './img/pic5.svg'
import main6 from './img/pic6.svg'
import main7 from './img/pic7.svg'
import main8 from './img/pic8.svg'
import yellow_like from '../../Home/categoryPage/imgs/main/section__publications/icons/yellow_heart.svg'
import Footer from '../../components/Footer';
import axios from "axios";
import {resetButton, setButtonPressed, setButtons} from "../../features/buttonSlide.js";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../../components/hooks/useFetchB.js";
import yellow_heart from "../categoryPage/imgs/main/section__publications/icons/yellow_heart.svg";
import heart from "../page2/img/food/heart.svg";
const Near = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const { buttons } = useSelector(state => state.button);
    const [allData, setAllData] = useState([]);

    const [fetching, isDataLoading, dataError] = useFetch(async () => {
        const response = await axios.get(
            "https://places-test-api.danya.tech/api/getNearPlaces?uid=1295257412"
        );
        setData(response.data || {});
        return response;
    });

    useEffect(() => {
        fetching();
    }, []);
    console.log(data)

    const handleButtonClick = async (buttonId, postId) => {
        try {
            const response = await axios.get(
                `https://places-test-api.danya.tech/api/like?uid=1295257412&postId=${postId}`
            );

            if (response.data.success) {
                const isPressed = buttons[buttonId]?.isPressed;

                dispatch(isPressed ? resetButton({ buttonId }) : setButtonPressed({ buttonId }));


                if (response.data?.user?.liked) {
                    dispatch(setButtons(response.data.user.liked));
                }
            } else {
                console.error("Failed to toggle like status");
            }
        } catch (error) {
            console.error("Error during API request:", error);
        }

    };

    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueData = data.filter((newPost) => {
                return !allData.some((existingPost) => existingPost.id === newPost.id);
            });

            setAllData((prevData) => [...prevData, ...uniqueData]);
        }
    }, [data]);

    return (
        <div>
                <header className={cl.header}>
                <Link to="/">
                    <div className={`${cl.header__container} ${cl._container}`}>
                        <a href="#" className={cl.header__icon}>
                            <img src={arrowLeft} alt="" />
                        </a>
                        <a href="#" className={cl.header__icon}>
                            <img src={home} alt="" />
                        </a>
                    </div>
                </Link>
            </header>

            <div className={cl.main}>
                <div className={cl.title}>
                    Рядом с вами
                </div>

                <div className={cl.nearPlace}>
                    Чтобы приложение подсказало ближайшие места рядом с вами, поделитесь геолокацией с ботом в чате. <span style={{ color: 'red' }}>Смотри как это сделать тут</span>
                </div>


            <div className={cl.cards}>
                {data?.posts?.map((post, index) => (
                    <div className={cl.card} key={post.id}>
                        <Link to={`/Near/previewPage/${post.id}?categoryId=${post?.category?.id}`}>
                            <img src={`https://places-test-api.danya.tech${post?.images[0]?.url}`} alt="" className={cl.asd}/>
                        </Link>
                        <button onClick={() => handleButtonClick(post.id, post.id)} className={cl.mainLike}>
                            <img className={cl.img__button} src={buttons[post.id]?.isPressed ? yellow_like : heart} alt=""/>
                        </button>
                        <div className={cl.position}>
                            2.2 км
                        </div>
                        <div className={cl.mainMatin}>
                            <p className={cl.mainText}>Ресторан</p>
                            <p className={cl.mainSub}>Rene Cafe</p>
                        </div>
                    </div>
                ))}




            </div>

            </div>
            <Footer/>
        </div>
    );

}

export default Near;
