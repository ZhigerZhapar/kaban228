import React, { useState, useEffect } from "react";
import cl from "./input.module.css";
import loop from "../../Home/categoryPage/imgs/header/loop.svg";
import arrowLeft from "../../Home/page3/img/arrow-left.svg";
import home from "./img/icons.svg";
import { Link } from "react-router-dom";
import yellow_heart from "../../Home/categoryPage/imgs/main/section__publications/icons/yellow_heart.svg";
import heart from "../../Home/page2/img/food/heart.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  resetButton,
  setButtonPressed,
  setButtons,
} from "../../features/buttonSlide.js";
import useFetch from "../hooks/useFetch.js";
import { useDispatch, useSelector } from "react-redux";
import sun1 from "./img/sun.svg";
import yellow_like from "../../Home/categoryPage/imgs/main/section__publications/icons/yellow_heart.svg";
const Input = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pageSize = 4; // или любое другое значение, которое вам нужно
  const [totalPosts, setTotalPosts] = useState(0);

  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { buttons } = useSelector((state) => state.button);
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const [loadedPostIds, setLoadedPostIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, eloading, error } = useFetch(
      `https://places-test-api.danya.tech/api/posts?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort[0]=createdAt:desc`
  );

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryId = queryParams.get("categoryId");

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  // ...

  useEffect(() => {
    // При изменении searchResults.data устанавливаем первые 4 поста
    setDisplayedPosts(searchResults.data?.slice(0, pageSize));

    // Проверяем, нужно ли показывать кнопку "Загрузить еще"
    setShowLoadMoreButton(searchResults.data?.length > pageSize);
  }, [searchResults]);


  console.log(categoryId)

  const handleInputClick = () => {
    setIsFullscreen(true);
  };
  const processSearchResults = (prevResults, newData) => {
    const uniqueData = newData.data.filter((newPost) => {
      return !prevResults?.data?.some(
          (existingPost) => existingPost.id === newPost.id
      );
    });

    return {
      data: [...(prevResults?.data || []), ...uniqueData],
    };
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiUrl = "https://places-test-api.danya.tech/api/posts";
      const queryParams = new URLSearchParams({
        "sort[0]": "createdAt:desc",
        populate: "*",
        "pagination[pageSize]": pageSize,
        "pagination[page]": page,
        "filters[title][$containsi]": searchQuery,
      });
      const fullUrl = `${apiUrl}?${queryParams.toString()}`;

      console.log(fullUrl)
      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);

      setTotalPosts(data.total); // Устанавливаем общее количество постов

      setSearchResults((prevResults) => processSearchResults(null, data));


      const newPostIds = data.data.map((post) => post.id);
      setLoadedPostIds((prevIds) => [...prevIds, ...newPostIds]);
      setSearchResults((prevResults) =>
          processSearchResults(prevResults, data)
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim().length > 2) {
      setPage(1);
      handleSearch();
    }
  };

  const handleLoadMore = async () => {
    if (searchQuery.trim().length > 2) {
    try {
      setLoading(true);
      const apiUrl = "https://places-test-api.danya.tech/api/posts";
      const queryParams = new URLSearchParams({
        "sort[0]": "createdAt:desc",
        populate: "*",
        "filters[title][$containsi]": searchQuery,
        "pagination[pageSize]": pageSize,
        "pagination[page]": 1,
      });
      const fullUrl = `${apiUrl}?${queryParams.toString()}`;

      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);

      setLoadedPostIds((prevIds) => {
        const newPostIds = data.data.map((post) => post.id);
        return [...prevIds, ...newPostIds];
      });

      setSearchResults((prevResults) => {
        const uniqueData = data.data.filter((newPost) => {
          return !loadedPostIds.includes(newPost.id);
        });

        return {
          data: [...prevResults.data, ...uniqueData],
        };
      });
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);

      // Скрываем кнопку, если загружены все посты
      if (data.data.length < pageSize) {
        setShowLoadMoreButton(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
    }
  };




  const handleKeyUp = (e) => {
    if (e.key === "Backspace") {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
      }
    }
  };

  const handleButtonClick = async (buttonId, postId) => {
    try {
      const response = await axios.get(
          `https://places-test-api.danya.tech/api/like?uid=1295257412&postId=${postId}`
      );

      if (response.data.success) {
        const isPressed = buttons[buttonId]?.isPressed;

        dispatch(
            isPressed ? resetButton({ buttonId }) : setButtonPressed({ buttonId })
        );

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
        return !loadedPostIds.includes(newPost.id);
      });

      setAllData((prevData) => [...prevData, ...uniqueData]);
    }
  }, [data, loadedPostIds]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setPage(1);
      handleSearch();
    } else {
      // Добавьте код для очистки результатов поиска, если запрос слишком короткий
      setSearchResults([]);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (searchResults.data && searchResults.data.length > 0) {
      console.log("Loading...");
    }
  }, [searchResults]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Оставляем пробелы в значении
    setSearchQuery(inputValue);

  };

  return (
      <div className={cl.asd}>
      <div className={cl.container}>
        <div className={cl.block}>
          <Link to="/" className={cl.back}>
            <img src={arrowLeft} alt="" />
          </Link>
          <Link to="/" className={cl.home}>
            <img src={home} alt="" />
          </Link>
        </div>

        <div className={cl.fullscreen_input_container}>
          <h1 className={cl.screen_title}>Поиск</h1>
          <div className={cl.img_container}>
            <img src={loop} alt="" className={cl.loop_img} />
            <input
                type="text"
                placeholder="Поиск мест и событий"
                className={cl.fullscreen_input}
                onFocus={handleInputClick}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className={cl.postsContainer}>
          <div className={cl.card}>
            {searchResults?.data?.map((result, index) => (
                <div key={`${result.id}-${index}`} className={cl.searchResult}>
                  <button
                      onClick={() => handleButtonClick(result.id, result.id)}
                      className={cl.main_like}
                  >
                    <img
                        src={buttons[result.id]?.isPressed ? yellow_heart : heart}
                        alt=""
                    />
                  </button>
                  <Link to={`/searchPage/previewPage/${result.id}?categoryId=${result?.attributes?.category?.data?.id}`}>
                    <img
                        src={`https://places-test-api.danya.tech${result.attributes.images.data[0].attributes.url}`}
                        alt={result.attributes.title}
                        className={cl.searchResultPhoto}
                    />
                  </Link>
                  <h2 className={cl.searchResultSubtitle}>
                    {result?.attributes?.subsubcategory.data?.attributes?.title
                        ? result?.attributes?.subsubcategory?.data?.attributes?.title
                        : result?.attributes?.subcategory.data?.attributes?.title
                            ? result?.attributes?.subcategory?.data?.attributes?.title
                            : result?.attributes?.category?.data?.attributes?.title
                    }
                  </h2>
                  <p className={cl.searchResultTitle}>
                    {result?.attributes?.title}
                  </p>
                </div>
            ))}
          </div>
          {loading && (
              <div className={cl.loadingSpinner}>
                <img className={cl.loader} src={sun1} alt="Loading"/>
              </div>
          )}
          {showLoadMoreButton && searchResults.data?.length >= 4  && (
              <div className={cl.section__places__button}>
                <button
                    className={cl.section__places__btn}
                    onClick={handleLoadMore}
                >
                  Загрузить еще
                </button>
              </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default Input;
