import React, { useEffect, useRef, useState } from "react";
import cl from "../Home/categoryPage/categoryPage.module.css";
import heart from "../Home/categoryPage/imgs/main/section__publications/icons/heart.svg";
import useFetch from "./hooks/useFetch.js";
import Loader from "./UI/Loader/Loader.jsx";
import yellow_heart from "../Home/categoryPage/imgs/main/section__publications/icons/yellow_heart.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import {useFetchPupsik} from "./hooks/useFetchPupsik.js";

const MyComponent = () => {
    const pageSize = 7;
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState([]);
    const { data, loading, error } = useFetch(
        `https://places-test-api.danya.tech/api/posts?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort[0]=createdAt:desc`
    );
    const lastPostRef = useRef(null);

    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueData = data.filter(
                (newPost) =>
                    !allData.some((existingPost) => existingPost.id === newPost.id)
            );
            setAllData((prevData) => [...prevData, ...uniqueData]);
        }
    }, [data]);

    useEffect(() => {
        if (lastPostRef.current) {
            lastPostRef.current.scrollTo({ behavior: "smooth", block: "end" });
        }
    }, [allData]);

    useEffect(() => {
        // При монтировании компонента, загрузите состояние лайков из локального хранилища
        const localStorageLikes = JSON.parse(localStorage.getItem("likes")) || {};
        setLikes(localStorageLikes);
    }, []);

    const [likes, setLikes] = useState({});
    useEffect(() => {
        // При монтировании компонента, загрузите состояние лайков из локального хранилища
        const localStorageLikes = JSON.parse(localStorage.getItem("likes")) || {};
        const filteredLikes = Object.keys(localStorageLikes).reduce((acc, postId) => {
            // Проверяем, присутствует ли postId в текущем наборе данных allData
            if (allData.some(post => post.id === postId)) {
                acc[postId] = localStorageLikes[postId];
            }
            return acc;
        }, {});
        setLikes(filteredLikes);
    }, [allData]);

    const handleButtonClick = async (buttonId, postId) => {
        try {
            if (!buttonId || !postId) {
                console.error("Invalid buttonId or postId");
                return;
            }

            const response = await axios.get(
                `https://places-test-api.danya.tech/api/like?uid=1295257412&postId=${postId}`
            );

            if (response.data.success) {
                const newDatas = { ...datas };
                const likedPosts = newDatas.user?.liked || [];

                // Проверяем, есть ли уже лайк у данного поста
                const existingIndex = likedPosts.findIndex(item => item.id === postId);
                if (existingIndex !== -1) {
                    // Удалить лайк, если он уже есть
                    likedPosts.splice(existingIndex, 1);
                } else {
                    // Добавить лайк, если его нет
                    likedPosts.push({ id: postId });
                }

                // Обновить состояние лайков в datas
                newDatas.user.liked = likedPosts;

                // Обновить состояние datas
                setDatas(newDatas);
            } else {
                console.error("Failed to toggle like status");
            }
        } catch (error) {
            console.error("Error during API request:", error);
        }
    };


    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    console.log(allData);
    const [datas, setDatas] = useState({});



    const [fetching, isDataLoadingPupsik, errorPupsik] = useFetchPupsik(async () => {
        const response = await axios.get(
            "https://places-test-api.danya.tech/api/getUser?uid=1295257412"
        );
        console.log(response)
        setDatas(response.data || {});
        return response;
    });

    useEffect(() => {
        fetching();
    }, []);

    // Проверяем, есть ли в массиве liked пост с данным id


    return (
        <section className={cl.section__publications}>
            <div className={`${cl.section__publications__container} ${cl._container}`}>
                <h2 className={cl.section__publications__header}>
                    Последние публикации
                </h2>

                <div
                    className={`${cl.section__publications__card__block} ${cl.card__block}`}
                >
                    {allData &&
                        allData.map((post, index) => (
                            <div
                                key={`${post.id}-${index}`} // Assuming 'id' is unique for each post
                                ref={index === allData.length - 1 ? lastPostRef : null}
                                className={`${cl.card__block__item} ${cl.block__item} ${
                                    index % 5 === 4 ? cl.spanned : ""
                                }`}
                            >
                                <div className={cl.block__item__icons}>
                                    <button
                                        onClick={() => handleButtonClick(post.id, post.id)}
                                        className={cl.block__item__button}
                                    >
                                        <img
                                            src={(datas?.user?.liked || []).some(item => item.id === post.id) ? yellow_heart : heart}
                                            className={cl.block__item__icon}
                                            alt=""
                                        />


                                    </button>
                                </div>
                                {post.attributes.images &&
                                    post.attributes.images.data.length > 0 && (
                                        <Link
                                            to={`/previewPage/${post.id}?categoryId=${
                                                post?.attributes?.category?.data?.id
                                            }`}
                                        >
                                            <img
                                                className={cl.block__item__img}
                                                style={
                                                    index % 5 === 4
                                                        ? { height: 240 }
                                                        : { fontFamily: "Inter" }
                                                }
                                                src={`https://places-test-api.danya.tech${
                                                    post.attributes.images.data[0].attributes.url
                                                }`}
                                                alt=""
                                            />
                                        </Link>
                                    )}
                                <div
                                    className={`${cl.block__item__text} ${
                                        index % 5 === 4 ? cl.block__item__text__spanned : ""
                                    }`}
                                >
                                    <p
                                        className={`${cl.block__item__paragraph} ${
                                            index % 5 === 4
                                                ? cl.block__item__text__spanned__paragraph
                                                : ""
                                        }`}
                                    >
                                        {post?.attributes?.subsubcategory.data?.attributes?.title
                                            ? post?.attributes?.subsubcategory?.data?.attributes
                                                ?.title
                                            : post?.attributes?.subcategory.data?.attributes?.title
                                                ? post?.attributes?.subcategory?.data?.attributes?.title
                                                : post?.attributes?.category?.data?.attributes?.title}
                                    </p>
                                    <h4
                                        className={`${cl.block__item__header} ${
                                            index % 5 === 4
                                                ? cl.block__item__text__spanned__header
                                                : ""
                                        }`}
                                    >
                                        {post.attributes.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={cl.section__publications__button}>
                    {loading ? (
                        <Loader />
                    ) : (
                        data &&
                        data.length > 0 &&
                        data.length % pageSize === 0 && (
                            <button
                                className={cl.section__publications__btn}
                                onClick={handleLoadMore}
                            >
                                Загрузить еще
                            </button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyComponent;
