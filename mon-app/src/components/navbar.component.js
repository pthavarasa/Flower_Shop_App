import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/navbar.css";

import logo from "../images/icons/logo.png";
import icart from "../images/icons/logo.png";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { cartItems: 0 };
    }

    componentDidMount() {
        if (localStorage.getItem("cartItems")) {
            this.setState({
                cartItems: JSON.parse(localStorage.getItem("cartItems")).length,
            });
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="menu">
                    <div className="left-menu">
                        {/*<a href="index.html">*/}
                        <Link to="/">
                            <img src={logo} alt="Your Flowers Logo" />
                        </Link>
                        {/*</a>*/}
                    </div>
                    <div className="right-menu">
                        <ul>
                            <li>
                                <Link className="tools-icon" to="/panier">
                                    <img
                                        src="/images/icons/shopping.png"
                                        alt="Shopping cart icon"
                                    />
                                    <span className="shop-cart-count">
                                        {this.state.cartItems}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                {/*<a href="cards.html">Boutique</a>*/}
                                <Link to="/boutique">boutique</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
