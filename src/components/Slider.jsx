import cl from "../Home/categoryPage/categoryPage.module.css";
import useFetch from "./hooks/useFetch.js";
import arrowUpRight from '../Home/categoryPage/imgs/main/section__slider/icons/arrow-up-right.svg'
import pic from '../Home/categoryPage/imgs/main/section__slider/pic.png'

const MyComponent = () => {
    const { data, loading, error } = useFetch(
        `https://places-test-api.danya.tech/api/banners?populate=*`
    );

    console.log(data)

    return (
            <section className={cl.section__slider}>
                <div className={`${cl.section__slider__container} ${cl._container}`}>
                    <div className={`${cl.section__slider__images} ${cl.slider__images}`}>
                        {data && data.map((slide) => (
                            <a target="_blank" href={slide.attributes.link}>
                            <div key={slide.id} className={cl.slider__images__1}>
                                <div className={cl.section__slider__arrow}>
                                    <img className={cl.slider__arrow} src={arrowUpRight} alt=""/>
                                </div>
                                <div className={`${cl.section__slider__text} ${cl.slider__text}`}>
                                    <p className={cl.slider__text__paragraph}>{slide.category}</p>
                                    <h2 className={cl.slider__text__nt}>{slide.attributes.title}</h2>
                                    <h2 className={cl.slider__text__header}>{slide.attributes.subtitle}</h2>
                                </div>
                                <img className={cl.section__slider__img__1} src={`https://places-test-api.danya.tech${slide.attributes.image.data.attributes.url}`} alt=""/>
                            </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
    );
};

export default MyComponent;
