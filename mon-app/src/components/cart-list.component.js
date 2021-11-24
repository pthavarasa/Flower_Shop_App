import React, { Component } from "react";

// TODO css conflit cart.css and product.css

import "../css/cart.css";

function Header(props) {
    const itemCount = props.products.reduce((quantity, product) => {
        return quantity + +product.quantity;
    }, 0);

    return (
        <header className="ccontainer">
            <h1>Panier</h1>

            <ul className="breadcrumb">
                <li>Accueil</li>
                <li>Panier</li>
            </ul>

            <span className="count">{itemCount} articles dans le panier</span>
        </header>
    );
}

function ProductList(props) {
    return (
        <section className="ccontainer">
            <ul className="products">
                {props.products.map((product, index) => {
                    return (
                        <li className="row" key={index}>
                            <div className="col left">
                                <div className="thumbnail">
                                    <a href="#">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </a>
                                </div>
                                <div className="detail">
                                    <div className="name">
                                        <a href="#">{product.name}</a>
                                    </div>
                                    <div className="description">
                                        {product.description}
                                    </div>
                                    <div className="description">
                                        {product.size
                                            ? product.color
                                                ? product.size +
                                                  ", " +
                                                  product.color
                                                : product.size
                                            : ""}
                                    </div>
                                    <div className="price">
                                        {formatCurrency(product.price)}
                                    </div>
                                </div>
                            </div>

                            <div className="col right">
                                <div className="quantity">
                                    <input
                                        type="text"
                                        className="quantity"
                                        step="1"
                                        value={product.quantity}
                                        onChange={props.onChangeProductQuantity.bind(
                                            this,
                                            index
                                        )}
                                    />
                                </div>

                                <div className="remove">
                                    <svg
                                        onClick={props.onRemoveProduct.bind(
                                            this,
                                            index
                                        )}
                                        version="1.1"
                                        className="close"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 60 60"
                                        enableBackground="new 0 0 60 60"
                                    >
                                        <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                                    </svg>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

function Summary(props) {
    const subTotal = props.products.reduce((total, product) => {
        return total + product.price * +product.quantity;
    }, 0);
    const discount = (subTotal * props.discount) / 100;
    const tax = props.tax;
    const total = subTotal - discount + tax;

    return (
        <section className="ccontainer">
            <div className="promotion">
                <label htmlFor="promo-code">
                    Avez vous un code de réduction?
                </label>
                <input type="text" onChange={props.onEnterPromoCode} />
                <button type="button" onClick={props.checkPromoCode} />
            </div>

            <div className="summary">
                <ul>
                    <li>
                        Sous-total <span>{formatCurrency(subTotal)}</span>
                    </li>
                    {discount > 0 && (
                        <li>
                            Remise <span>{formatCurrency(discount)}</span>
                        </li>
                    )}
                    <li>
                        Tax <span>{formatCurrency(tax)}</span>
                    </li>
                    <li className="total">
                        Total <span>{formatCurrency(total)}</span>
                    </li>
                </ul>
            </div>

            <div className="checkout">
                <button type="button">Check Out</button>
            </div>
        </section>
    );
}

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {
                    image: "/images/products/roses-sous-cloche.png",
                    name: "Coffret rose éternelle sous cloche",
                    description: "Description du produit.",
                    price: 5.99,
                    quantity: 2,
                },
                {
                    image: "/images/products/roses-sous-cloche.png",
                    name: "Coffret rose éternelle sous cloche",
                    description: "Description du produit",
                    price: 9.99,
                    quantity: 1,
                },
            ],
            tax: 5,
            promotions: [
                {
                    code: "SUMMER",
                    discount: "50%",
                },
                {
                    code: "AUTUMN",
                    discount: "40%",
                },
                {
                    code: "WINTER",
                    discount: "30%",
                },
            ],
            promoCode: "",
            discount: 0,
            itemCount: 0,
        };
    }

    onChangeProductQuantity = (index, event) => {
        const products = this.state.products;
        const value = event.target.value;
        const valueInt = parseInt(value);

        // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
        if (value === "") {
            products[index].quantity = value;
        } else if (valueInt > 0 && valueInt < 100) {
            products[index].quantity = valueInt;
        }

        this.setState({ products });
    };

    onRemoveProduct = (i) => {
        const products = this.state.products.filter((product, index) => {
            return index !== i;
        });

        this.setState({ products });
    };

    onEnterPromoCode = (event) => {
        this.setState({
            promoCode: event.target.value,
        });
    };

    checkPromoCode = () => {
        const promotions = this.state.promotions;

        for (var i = 0; i < promotions.length; i++) {
            if (this.state.promoCode === promotions[i].code) {
                this.setState({
                    discount: parseFloat(
                        promotions[i].discount.replace("%", "")
                    ),
                });
                return;
            }
        }

        alert("Sorry, the Promotional code you entered is not valid!");
    };

    componentDidMount() {
        let products = [];
        if (localStorage.getItem("cartItems")) {
            JSON.parse(localStorage.getItem("cartItems")).forEach((elem) => {
                if (
                    !products.some((el) => {
                        if (JSON.stringify(el.item) === JSON.stringify(elem)) {
                            el.count++;
                            return true;
                        } else return false;
                    })
                ) {
                    products.push({ item: elem, count: 1 });
                }
            });
        }
        //console.log(products);
        let newProducts = [];
        products.forEach((elem) => {
            newProducts.push({
                image: "/images/products/" + elem.item.detailes.image,
                name: elem.item.title,
                description: elem.item.description,
                price: elem.item.detailes.price,
                size: elem.item.detailes.size,
                color: elem.item.detailes.color,
                quantity: elem.count,
            });
        });
        //console.log("new ", newProducts);
        this.setState({ products: newProducts });
    }

    render() {
        const products = this.state.products;

        return (
            <div>
                <Header products={products} />

                {products.length > 0 ? (
                    <div>
                        <ProductList
                            products={products}
                            onChangeProductQuantity={
                                this.onChangeProductQuantity
                            }
                            onRemoveProduct={this.onRemoveProduct}
                        />

                        <Summary
                            products={products}
                            discount={this.state.discount}
                            tax={this.state.tax}
                            onEnterPromoCode={this.onEnterPromoCode}
                            checkPromoCode={this.checkPromoCode}
                        />
                    </div>
                ) : (
                    <div className="empty-product">
                        <h3>Il n'y a aucun produit dans votre panier.</h3>
                        <button>Acheter Maintenant</button>
                    </div>
                )}
            </div>
        );
    }
}

function formatCurrency(value) {
    return Number(value).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
    });
}
