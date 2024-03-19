import React, { useEffect, useState } from 'react';
import cl from './page3.module.css';
import yellow_heart from '../categoryPage/imgs/main/section__publications/icons/yellow_heart.svg';
import arrowLeft from './img/arrow-left.svg';
import heart from './img/heart.svg';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {resetButton, setButtonPressed, setButtons} from '../../features/buttonSlide.js';
import useFetch from '../../components/hooks/useFetch.js';
import Loader from "../../components/UI/Loader/Loader.jsx";
import axios from "axios";
import back from "./img/back.svg"
import forward from "./img/forward.svg"

const Page3 = () => {
  const { search } = useLocation();
  const categoryId = search.split('=')[1];

  const { data, loading, error } = useFetch(
      `https://places-test-api.danya.tech/api/categories/${categoryId}?populate=posts,posts.images,posts.category,posts.subcategory,posts.subsubcategory`
  );

  console.log(data)

  const [currentSlide, setCurrentSlide] = useState(() => {
    const storedSlide = sessionStorage.getItem('currentSlide');
    return storedSlide ? parseInt(storedSlide, 10) : 0;
  });
  const dispatch = useDispatch();
  const { buttons } = useSelector((state) => state.button);
  const [localData, setLocalData] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate()

  const handleButtonClicker = async (buttonId, postId) => {

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
  useEffect(() => {
    showSlide(currentSlide);
  }, [currentSlide]);

  const images = localData?.flatMap(post =>
      post?.attributes?.images?.data.map(image =>
          `https://places-test-api.danya.tech${image?.attributes?.url}`
      )
  );

  const handleGoBack = () => {
    const referer = document.referrer;

    if (window.location.pathname.includes("/searchPage")) {
      navigate("/searchPage");
    } else if (window.location.pathname.includes("/page2")) {
      navigate(`/page2/${categoryId}`);
    } else if (window.location.pathname.includes("/accountPage")) {
      navigate('/accountPage')
    } else if (window.location.pathname.includes("/Near")) {
      navigate("/Near")
    }
    else {
      navigate("/");
    }
  }

  const showSlide = (index) => {
    const slides = document.querySelectorAll(`.${cl.slide}`);
    const circles = document.querySelectorAll(`.${cl.circle}`);

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
      slide.classList.toggle(cl.active, i === index);
    });

    circles.forEach((circle, i) => {
      circle.classList.toggle(cl.active, i === index);
    });
  };

  const changeSlide = (direction) => {
    setCurrentSlide((prevSlide) => {
      let nextSlide = prevSlide + direction;
      if (nextSlide >= images.length) nextSlide = 0;
      if (nextSlide < images.length - images.length) nextSlide = 2;

      sessionStorage.setItem('currentSlide', nextSlide.toString());

      return nextSlide;
    });
  };
  const handleCircleClick = (index) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = (direction) => {
    changeSlide(direction);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    setCurrentSlide((prevSlide) => {
      let nextSlide = prevSlide - 1;
      if (nextSlide < 0) {
        nextSlide = images.length - 1;
      }

      sessionStorage.setItem('currentSlide', nextSlide.toString());

      return nextSlide;
    });
  };

  const parts = location.pathname.split("/");
  const postId = parts[parts.length - 1];

  useEffect(() => {
    if (!loading && !error && data) {
      const selectedPost = data.attributes.posts.data.find(post => String(post.id) === postId);

      if (selectedPost) {
        setLocalData([selectedPost]);
      }
    }
  }, [data, loading, error, categoryId, postId]);

  useEffect(() => {
    sessionStorage.removeItem('currentSlide');
  }, [postId]);
  useEffect(() => {
    setCurrentSlide(0);
  }, [postId]);

  return (
      <div className={cl.container}>
        {loading ? (
            <div className={cl.loaderContainer}>
              <Loader />
            </div>
        ) : (
            <div>
              <div className={cl.slider}>
                <div className={cl.header}>
                    <div onClick={() => handleGoBack()} className={cl.back}>
                      <img className={cl.img} src={arrowLeft} alt="" />
                    </div>
                  <div onClick={() => handleButtonClicker(postId, postId)} className={cl.back}>
                    <img className={cl.img} src={buttons[postId]?.isPressed ? yellow_heart : heart} alt="" />
                  </div>
                </div>
                <button className={`${cl.slide_btn} ${cl.left}`} onClick={() => handleBackClick(-1)}>
                  <img src={back} alt=""/>
                </button>

                <div className={cl.slides}>
                  {images.map((src, index) => (
                      <img key={index} src={src} className={`${cl.slide}`} alt={`slide-${index}`} />
                  ))}
                </div>
                <button className={`${cl.slide_btn} ${cl.right}`} onClick={() => handleButtonClick(1)}>
                  <img src={forward} alt=""/>
                </button>
                <div className={cl.slide_circles}>
                  {images.map((_, index) => (
                      <div
                          key={index}
                          className={`${cl.circle} ${index === currentSlide ? cl.active : ''}`}
                          onClick={() => handleCircleClick(index)}
                      ></div>
                  ))}
                </div>
              </div>

              <div className={cl.content}>
                {localData.length > 0 ? (
                    localData.map((post) => (
                        <div key={post.id}>
                          <div className={cl.menu}>
                            <div className={`${cl.bg} ${cl.first}`}>
                              <p>{post?.attributes?.category?.data?.attributes?.title}</p>
                            </div>
                            {post?.attributes?.subcategory?.data?.attributes?.title && (
                                <div className={`${cl.bg} `}>
                                  {post.attributes.subcategory.data.attributes.title}
                                </div>
                            )}
                            {post?.attributes?.subsubcategory?.data?.attributes?.title && (
                                <div className={`${cl.bg} ${cl.third}`}>
                                  {post.attributes.subsubcategory.data.attributes.title}
                                </div>
                            )}
                          </div>
                          <h1 className={cl.title}>{post?.attributes?.title}</h1>
                          {post?.attributes?.content && (
                              <div className={cl.text}>
                                {post.attributes.content.split('\n').map((paragraph, index) => (
                                    <React.Fragment key={index}>
                                      {paragraph}
                                      <br />
                                    </React.Fragment>
                                ))}
                              </div>
                          )}


                          {post?.attributes?.time && (
                              <div className={cl.time}>
                                <div>
                                  <p className={cl.work_time}>Часы работы</p>
                                  <p className={cl.day}>{post.attributes.time}</p>
                                </div>
                              </div>
                          )}
                          {post?.attributes?.additionalInfo && (
                              <div className={cl.more}>
                                <div>
                                  <p className={cl.work_time}>Дополнительно</p>
                                  <p className={cl.silka}>
                                    <a className={cl.a} href={post.attributes.additionalInfo}>
                                      {post.attributes.additionalInfo}
                                    </a>
                                  </p>
                                </div>
                              </div>
                          )}
                          {post?.attributes?.address && (
                              <div className={cl.adres}>
                                <div>
                                  <p className={cl.work_time}>Адрес</p>
                                  <p className={cl.day}>{post.attributes.address}</p>
                                </div>
                              </div>
                          )}
                          <div className={cl.btn}>
                            <p className={cl.btn_btn}>ПОКАЗАТЬ НА КАРТЕ</p>
                          </div>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
              </div>

              <div className={cl.main}>
                <h1 className={cl.qwe}>Похожие места</h1>
                <div className={cl.cards}>
                  {data?.attributes?.posts?.data
                      .filter(post => post.id !== localData[0]?.id) // Исключаем текущий пост
                      .map((post) => (
                          <div className={`${cl.card}`} key={post.id}>
                            <div className={cl.image__card}>
                              <Link to={`/page2/previewPage/${post.id}?categoryId=${categoryId}`}>
                                <img className={cl.asd}
                                     src={`https://places-test-api.danya.tech${post.attributes.images.data[0].attributes.url}`}
                                     alt=""/>
                              </Link>
                              <button onClick={() => handleButtonClicker(post.id, post.id)}
                                      className={`${cl.main_like}`}>
                                <img src={buttons[post.id]?.isPressed ? yellow_heart : heart} alt=""/>
                              </button>
                            </div>
                            <div className={cl.main_matin}>
                              <h2 className={`${cl.main_text}`}>{post?.attributes?.subsubcategory?.data?.attributes?.title
                                  ? post?.attributes?.subsubcategory?.data?.attributes?.title
                                  : post?.attributes?.subcategory?.data?.attributes?.title
                                      ? post?.attributes?.subcategory?.data?.attributes?.title
                                      : post?.attributes?.category?.data?.attributes?.title
                              }</h2>
                              <p className={`${cl.main_sub}`}>{post.attributes.title}</p>
                            </div>
                          </div>
                      ))}


                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Page3;