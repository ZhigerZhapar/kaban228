// CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import darya from '../../Home/categoryPage/imgs/header/darya.svg';
import loop from '../../Home/categoryPage/imgs/header/loop.svg';
import saintPetersburg from '../../Home/categoryPage/imgs/main/section__places/saint-petersburg.svg';
import coffee from '../../Home/categoryPage/imgs/main/section__places/icons/coffee.png';
import circus from '../../Home/categoryPage/imgs/main/section__places/icons/circus.png';
import woman from '../../Home/categoryPage/imgs/main/section__places/icons/woman.png';
import castle from '../../Home/categoryPage/imgs/main/section__places/icons/castle.png';
import tree from '../../Home/categoryPage/imgs/main/section__places/icons/tree.png';
import loopp from '../../Home/categoryPage/imgs/main/section__places/icons/loop.png';
import Input from '../../components/Input/Input';
import useFetchB from '../../components/hooks/useFetch.js';
import {useFetch} from "../../components/hooks/useFetchB.js";
import Posts from '../../components/Posts.jsx';
import Slider from '../../components/Slider.jsx';
import Footer from '../../components/Footer.jsx';
import Loader from '../../components/UI/Loader/Loader.jsx';
import cl from './categoryPage.module.css';
import axios from "axios";
import Categories from "../filterPage/components/Categories/Categories.jsx";
import {useDispatch} from "react-redux";

const CategoryPage = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [base, setBase] = useState({})
  const [nt, setNt] = useState(false)

  const { data, loading, error } = useFetchB(
      'https://places-test-api.danya.tech/api/categories'
  );

  const [fetching, isDataLoading, dataError] = useFetch(async () => {
    const response = await axios.get(
        "https://places-test-api.danya.tech/api/getUser?uid=1295257412"
    );
    setBase(response.data || {});
    return response;
  });

  useEffect(() => {
    fetching();
  }, []);


  const handleLoopClick = () => {
    setIsInputOpen(true);
  };

  const [activeCategory, setActiveCategory] = useState(null);

  const { categoryId } = useParams();

  // Define a function to handle category click
  const handleCategoryClick = () => {
    // Remove active class from all tabs
    document.querySelectorAll(`.${cl.card__item}`).forEach((tab) => {
      tab.classList.remove(cl.active);
    });

    // Add active class to the clicked tab
    setActiveCategory(categoryId);
  };




  return (
      <>
        {loading ? (
            <div className={cl.loaderContainer}>
              <Loader />
            </div>
        ) : (
            <div className={cl.wrapper}>
              <header className={cl.header}>
                {!isInputOpen && (
                    <div className={`${cl.header__container} ${cl._container}`}>
                      <Link to={'/accountPage'}>
                        <div className={cl.header__block__1}>
                          <div className={cl.header__block__1__image__block}>
                            <img className={cl.img} src={`${base?.user?.photoBase64Url}`} alt="" />
                          </div>
                          <div className={cl.header__text}>
                            <div className={cl.header__block__1__name}>{`${base.user?.name}`}</div>
                            <div className={cl.header__block__1__saves}>{`${base.user?.liked?.length}`} сохранений</div>
                          </div>
                        </div>
                      </Link>

                      <div className={cl.header__block__2}>
                        <div className={cl.header__block__2__image__block}>
                          <Link to={'/searchPage'}>
                            <img
                                className={cl.header__block__2__img}
                                src={loop}
                                alt=""
                                onClick={handleLoopClick}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                )}
                {isInputOpen && <Input />}
              </header>

              <main className={cl.main}>
                <section className={cl.section__places}>
                  <div className={`${cl.section__places__container} ${cl._container}`}>
                    <h2 className={cl.section__places__header}>КУДА ПОЙДЕМ?</h2>

                    <div className={`${cl.section__places__image__block} ${cl.image__block}`}>
                      <img className={cl.image__block__img} src={saintPetersburg} alt="" />
                    </div>

                    <div className={`${cl.section__places__card__block} ${cl.card}`}>
                      <Link
                          to="/page2/1"
                          className={cl.card__item}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt} src={coffee} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Где поесть</p>
                      </Link>
                      <Link
                          to="/page2/2"
                          className={`${cl.card__item} ${activeCategory === 2 ? cl.active : ''}`}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt}  src={circus} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Интересные места</p>
                      </Link>
                      <Link
                          to="/page2/3"
                          className={cl.card__item}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt}  src={woman} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Развлечения</p>
                      </Link>
                      <Link
                          to="/page2/4"
                          className={cl.card__item}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt}  src={castle} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Музеи и выставки</p>
                      </Link>
                      <Link
                          to="/page2/5"
                          className={cl.card__item}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt}  src={tree} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Загородом</p>
                      </Link>
                      <Link
                          to="/page2/6"
                          className={cl.card__item}
                          onClick={() => handleCategoryClick()}
                      >
                        <div className={cl.card__item__img}>
                          <img className={cl.nt}  src={loopp} alt="" />
                        </div>
                        <p className={cl.card__item__paragraph}>Экскурсии</p>
                      </Link>
                    </div>
                    <Link to="/Near">
                    <div className={cl.section__places__button}>
                      <button className={cl.section__places__btn}>
                        Искать места рядом с вами
                      </button>
                    </div>
                    </Link>
                  </div>
                </section>
                <Slider />
                <Posts />
              </main>

              <Footer />
            </div>
        )}
      </>
  );
};

export default CategoryPage;
