import React, { Component } from "react";
//import { Link } from "react-router-dom";

import "../css/slideHome.css";

import yfCirclePacking from "../images/icons/yf_circle_packing.png";
import rosesSousCloche from "../images/slide/roses-sous-cloche.png";
import instagramIcon from "../images/icons/icons8-instagram-21.png";
import snapchatIcon from "../images/icons/icons8-snapchat-21.png";
import whatsappIcon from "../images/icons/icons8-whatsapp-21.png";

export default class Home extends Component {
    render() {
        return (
            <div className="content">
                <div className="carousel">
                    <div className="carousel-item">
                        <div className="carousel-item-container">
                            <div className="carousel-item-container-items">
                                <h2 className="title">Roses Sous Cloche</h2>
                                <img
                                    className="yf-circle"
                                    src={yfCirclePacking}
                                    alt="Your Flowers Circle Packing"
                                />
                                <img
                                    src={rosesSousCloche}
                                    alt="Roses Sous Cloche"
                                />
                                <div className="price-tag">45.00€</div>
                                <a
                                    className="button"
                                    href="boutique/5f315b5927f7ad0dc295a732"
                                >
                                    Acheter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <ol className="carousel-indicator">
                    <li className="active"></li>
                    <li></li>
                    <li></li>
                </ol>
                <ul className="social-media">
                    <li>
                        <a href="https://www.instagram.com/yourflowersparis/?hl=fr">
                            <img src={instagramIcon} alt="icons8-instagram" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/yourflowersparis/?hl=fr">
                            <img src={snapchatIcon} alt="icons8-snapchat" />
                        </a>
                    </li>
                    <li>
                        <a href="whatsapp://send?phone=3464478983">
                            <img src={whatsappIcon} alt="icons8-whatsapp" />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
