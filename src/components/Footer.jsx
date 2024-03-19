import React from 'react';
import cl from "../Home/categoryPage/categoryPage.module.css";
import telega from "../Home/categoryPage/imgs/footer/icons/telega.svg";
import instagram from "../Home/categoryPage/imgs/footer/icons/instagram.svg";
import globe from "../Home/categoryPage/imgs/footer/icons/globe.svg";
import useFetch from "./hooks/useFetch.js";

const Footer = () => {
    const { data, loading, error } = useFetch(
        `https://places-test-api.danya.tech/api/config`
    );

    const socialMediaLinks = [
        { platform: 'Instagram', icon: instagram, link: data?.attributes?.instagramLink },
        { platform: 'Telegram', icon: telega, link: data?.attributes?.telegramLink },
        { platform: 'Website', icon: globe, link: data?.attributes?.siteLink },
    ];

    return (
        <footer className={cl.footer}>
            <div className={`${cl.footer__container} ${cl._container}`}>
                <h2 className={cl.footer__header}>связаться с нами</h2>

                <div className={cl.footer__cards}>
                    {socialMediaLinks.map((item, index) => (
                        <div key={index} className={cl.footer__cards__item}>
                            <a target="_blank" href={item.link}>
                                <img className={cl.footer__cards__img} src={item.icon} alt={`${item.platform} Icon`} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
