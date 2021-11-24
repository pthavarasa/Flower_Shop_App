import React, { Component } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";

// TODO ( cookies : product add to cart && post data to user shopping cart)
// TODO if lot of options make like select option
// TODO add Letter option
// TODO image cdn

import "../css/product.css";

//import roseSousCloche from "../images/products/roses-sous-cloche.png";
import iconAddToCart from "../images/icons/icons8-cart-24.png";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = { products: [], active: [] };
        //this.togggleSize = this.togggleSize.bind(this);
        //this.togggleColor = this.togggleColor.bind(this);
    }

    getSize(currentproduct) {
        let sizes = [];
        currentproduct.detailes.forEach((element) => {
            sizes.push(element[0]);
        });
        return sizes;
    }

    getSizeLength(currentproduct) {
        let sizes = [];
        currentproduct.detailes.forEach((element) => {
            sizes.push(element[0]);
        });
        return sizes.length < sizes[0].length ? sizes[0].length : sizes.length;
    }

    isSize(id, size) {
        let active = false;
        this.state.active.forEach((e) => {
            if (e.id === id && e.detailes.size === size) {
                active = true;
            }
        });
        return active;
    }

    componentSize(currentproduct) {
        if (this.getSizeLength(currentproduct) <= 4) {
            return (
                <div className="product-size">
                    <h4>{currentproduct.option}</h4>
                    <ul className="ul-size">
                        {this.getSize(currentproduct).map((value, index) => {
                            return (
                                <li key={index}>
                                    <a
                                        className={
                                            this.isSize(
                                                currentproduct._id,
                                                value
                                            )
                                                ? "active"
                                                : "not_active"
                                        }
                                        onClick={() =>
                                            this.togggleSize(
                                                currentproduct,
                                                value
                                            )
                                        }
                                    >
                                        {value}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="product-size">
                    <h4>{currentproduct.option}</h4>
                    <div className="select">
                        <select
                            defaultValue={"DEFAULT"}
                            onChange={this.handleChange}
                        >
                            <option value="DEFAULT">Choise</option>
                            {this.getSize(currentproduct).map(
                                (value, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={
                                                currentproduct._id + "," + value
                                            }
                                        >
                                            {value}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </div>
                </div>
            );
        }
    }

    handleChange = (e) => {
        let selectedId = e.target.value.split(",")[0];
        let selectedValue = e.target.value.split(",")[1];
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i]._id === selectedId) {
                this.togggleSize(this.state.products[i], selectedValue);
                break;
            }
        }
    };

    togggleSize(currentproduct, size) {
        let NewDetailes = this.state.active;
        let acc = 0;
        let index;
        this.state.active.forEach((e) => {
            if (e.id === currentproduct._id) index = acc;
            acc += 1;
        });
        NewDetailes[index].detailes.size = size;
        let colors = this.getColor(currentproduct);
        NewDetailes[index].detailes.color =
            colors && colors[0] ? colors[0] : null;
        NewDetailes[index].detailes.price = this.updatePrice(
            currentproduct._id,
            index
        );
        this.setState({ active: NewDetailes });
    }

    getColor(currentproduct) {
        let colors = [];
        let acc = 0;
        let index = 0;
        this.state.active.forEach((e) => {
            if (e.id === currentproduct._id) index = acc;
            acc += 1;
        });
        if (this.state.active.length === this.state.products.length) {
            currentproduct.detailes.forEach((element) => {
                if (element[0] === this.state.active[index].detailes.size)
                    element[1].forEach((e) => {
                        colors.push(e.color);
                    });
            });
        }
        return colors;
    }

    isColor(id, color) {
        let active = false;
        this.state.active.forEach((e) => {
            if (e.id === id && e.detailes.color === color) {
                active = true;
            }
        });
        return active;
    }

    componentColor(currentproduct) {
        if (this.getColor(currentproduct)[0])
            return (
                <div className="product-color">
                    <h4>Colour</h4>
                    <ul className="ul-color">
                        {this.getColor(currentproduct).map((value, index) => {
                            return (
                                <li key={index}>
                                    <a
                                        className={
                                            this.isColor(
                                                currentproduct._id,
                                                value
                                            )
                                                ? value + " active"
                                                : value + " notActive"
                                        }
                                        onClick={() =>
                                            this.togggleColor(
                                                currentproduct._id,
                                                value
                                            )
                                        }
                                    ></a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
    }

    togggleColor(id, color) {
        let NewDetailes = this.state.active;
        let acc = 0;
        let index;
        this.state.active.forEach((e) => {
            if (e.id === id) index = acc;
            acc += 1;
        });
        NewDetailes[index].detailes.color = color;
        NewDetailes[index].detailes.price = this.updatePrice(id, index);
        this.setState({ active: NewDetailes });
    }

    getPrice(currentproduct) {
        let acc = 0;
        let index = 0;
        this.state.active.forEach((e) => {
            if (e.id === currentproduct._id) index = acc;
            acc += 1;
        });
        return this.state.active.length === this.state.products.length
            ? this.state.active[index].detailes.price
            : "";
    }

    updatePrice(id, index) {
        for (const [, elem] of this.state.products.entries()) {
            if (elem._id === id) {
                for (const [, el] of elem.detailes.entries()) {
                    if (el[0] === this.state.active[index].detailes.size) {
                        for (const [, e] of el[1].entries()) {
                            if (
                                e.color ===
                                this.state.active[index].detailes.color
                            ) {
                                return e.price;
                            } else if (!e.color) {
                                return e.price;
                            }
                        }
                    }
                }
            }
        }
        return "";
    }

    addToCart(id) {
        for (const [, elem] of this.state.active.entries()) {
            //localStorage.clear();
            if (elem.id === id) {
                if (localStorage.getItem("cartItems")) {
                    let cartItems = [];
                    cartItems.push(elem);
                    JSON.parse(localStorage.getItem("cartItems")).forEach(
                        (el) => {
                            cartItems.push(el);
                        }
                    );
                    localStorage.removeItem("cartItems");
                    localStorage.setItem(
                        "cartItems",
                        JSON.stringify(cartItems)
                    );
                } else {
                    localStorage.setItem("cartItems", JSON.stringify([elem]));
                }
                window.location.reload(false);
                //console.log(JSON.parse(localStorage.getItem("cartItems")));
            }
        }
    }

    componentDidMount() {
        axios
            .get("http://192.168.1.23:5000/product/")
            .then((response) => {
                if (this.props.match.params.id) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (
                            response.data[i]._id === this.props.match.params.id
                        ) {
                            this.setState({ products: [response.data[i]] });
                            break;
                        } else this.setState({ products: response.data });
                    }
                } else this.setState({ products: response.data });
                this.state.products.forEach((e) => {
                    this.setState({
                        active: this.state.active.concat({
                            id: e._id,
                            title: e.title,
                            description: e.description,
                            detailes: {
                                size: e.detailes[0][0],
                                color: e.detailes[0][1][0].color,
                                price: e.detailes[0][1][0].price,
                                image: e.detailes[0][1][0].image,
                            },
                        }),
                    });
                });
                //console.log("list :", this.state.active);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getImage(currentproduct) {
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i]._id === currentproduct._id) {
                if (this.state.active[i] !== undefined) {
                    return (
                        <img
                            className="card-head-img"
                            src={
                                "/images/products/" +
                                this.state.active[i].detailes.image
                            }
                            alt=""
                        />
                    );
                    //return this.state.active[i].image;
                }
            }
        }
        return "noet.png";
    }
    /*
    selectProduct(currentproduct) {
        this.setState({ products: [currentproduct], active: [] });
        this.productList();
    }
*/
    productList() {
        return this.state.products.map((currentproduct) => {
            return (
                <div className="card" key={currentproduct._id}>
                    <div className="card-head">
                        <a
                            href={"/boutique/" + currentproduct._id}
                            /*onClick={this.selectProduct.bind(
                                this,
                                currentproduct
                            )}*/
                        >
                            {this.getImage(currentproduct)}
                        </a>
                    </div>
                    <div className="card-body">
                        <h2 className="title">{currentproduct.title}</h2>
                        <p className="desc">{currentproduct.description}</p>

                        {this.componentSize(currentproduct)}

                        {this.componentColor(currentproduct)}
                        <div>
                            <a
                                className="product-cart"
                                onClick={() =>
                                    this.addToCart(currentproduct._id)
                                }
                            >
                                <img
                                    className="product-cart-icon"
                                    src={iconAddToCart}
                                    alt=""
                                />
                            </a>
                            <span className="product-price">
                                EUR<b>{this.getPrice(currentproduct)}</b>
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div className="container">{this.productList()}</div>;
    }
}
