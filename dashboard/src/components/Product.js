import React, { Component } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
    <tr>
        <td>{props.product.title}</td>
        <td>{props.product.description}</td>
        <td>{props.product.option}</td>
        <td>{props.product.createdAt.substring(0, 10)}</td>
        <td>
            <a href={"/product/" + props.product._id}>edit</a> |{" "}
            <a
                href="#"
                onClick={() => {
                    props.deleteProduct(props.product._id);
                }}
            >
                delete
            </a>
        </td>
    </tr>
);

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);

        this.onChangeOptionValue = this.onChangeOptionValue.bind(this);
        this.onChangeColorValue = this.onChangeColorValue.bind(this);
        this.onChangePriceValue = this.onChangePriceValue.bind(this);
        this.onChangeImageValue = this.onChangeImageValue.bind(this);

        this.state = {
            products: [],
            title: "",
            description: "",
            option: "",
            detailes: [],
            options: [],
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeOption(e) {
        this.setState({
            option: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
    }

    editProduct() {
        let options = [];
        let optionpushed = {};
        for (const [, elem] of this.state.options.entries()) {
            let op = false;
            for (const [, el] of options.entries()) {
                if (elem[1] === el[0]) {
                    op = true;
                }
            }
            if (op) {
                options[optionpushed[elem[1]]][1].push({
                    color: elem[2],
                    price: elem[3],
                    image: elem[4],
                });
            } else {
                optionpushed[elem[1]] = options.length;
                options.push([
                    elem[1],
                    [{ color: elem[2], price: elem[3], image: elem[4] }],
                ]);
            }
        }
        const product = {
            title: this.state.title,
            description: this.state.description,
            option: this.state.option,
            detailes: options,
        };
        axios
            .post(
                "http://192.168.1.23:5000/product/update/" +
                    this.props.match.params.id,
                product
            )
            .then((res) => console.log(res.data));
    }

    addProduct() {
        let options = [];
        let optionpushed = {};
        for (const [, elem] of this.state.options.entries()) {
            let op = false;
            for (const [, el] of options.entries()) {
                if (elem[1] === el[0]) {
                    op = true;
                }
            }
            if (op) {
                options[optionpushed[elem[1]]][1].push({
                    color: elem[2],
                    price: elem[3],
                    image: elem[4],
                });
            } else {
                optionpushed[elem[1]] = options.length;
                options.push([
                    elem[1],
                    [{ color: elem[2], price: elem[3], image: elem[4] }],
                ]);
            }
        }
        const product = {
            title: this.state.title,
            description: this.state.description,
            option: this.state.option,
            detailes: options,
        };
        axios
            .post("http://192.168.1.23:5000/product/add", product)
            .then((res) => console.log(res.data));
    }

    componentDidMount() {
        if (this.props.match.params.id === "add") {
            this.setState({
                options: [[0, "", "", "", ""]],
            });
        } else if (this.props.match.params.id) {
            axios
                .get(
                    "http://192.168.1.23:5000/product/" +
                        this.props.match.params.id
                )
                .then((response) => {
                    this.setState({
                        title: response.data.title,
                        description: response.data.description,
                        option: response.data.option,
                        detailes: response.data.detailes,
                    });
                    this.setState({ options: this.getOptions() });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios
                .get("http://192.168.1.23:5000/product/")
                .then((response) => {
                    this.setState({ products: response.data });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    deleteProduct(id) {
        axios
            .delete("http://192.168.1.23:5000/product/" + id)
            .then((response) => {
                console.log(response.data);
            });

        this.setState({
            products: this.state.products.filter((el) => el._id !== id),
        });
    }

    productList() {
        return this.state.products.map((currentProduct) => {
            return (
                <Exercise
                    product={currentProduct}
                    deleteProduct={this.deleteProduct}
                    key={currentProduct._id}
                />
            );
        });
    }

    cancelEdit() {
        window.location.assign("/product");
    }

    componentButton() {
        if (this.props.match.params.id === "add") {
            return (
                <button
                    style={{ marginRight: "15px" }}
                    className="btn btn-primary"
                    onClick={this.addProduct.bind(this)}
                >
                    Add Product
                </button>
            );
        } else {
            return (
                <button
                    className="btn btn-primary"
                    onClick={this.editProduct.bind(this)}
                >
                    Edit Product
                </button>
            );
        }
    }

    getOptions() {
        let option = [];
        let count = 0;
        for (const [, elem] of this.state.detailes.entries()) {
            for (const [, el] of elem[1].entries()) {
                option.push([count++, elem[0], el.color, el.price, el.image]);
            }
        }
        return option;
    }

    onChangeOptionValue(e) {
        let newOptions = this.state.options;
        newOptions[e.target.id][1] = e.target.value;
        this.setState({ options: newOptions });
    }
    onChangeColorValue(e) {
        let newOptions = this.state.options;
        newOptions[e.target.id][2] = e.target.value;
        this.setState({ options: newOptions });
    }
    onChangePriceValue(e) {
        let newOptions = this.state.options;
        newOptions[e.target.id][3] = e.target.value;
        this.setState({ options: newOptions });
    }
    onChangeImageValue(e) {
        let newOptions = this.state.options;
        newOptions[e.target.id][4] = e.target.value;
        this.setState({ options: newOptions });
    }
    dropOption(id) {
        this.setState((prevState) => ({
            options: prevState.options.filter((el) => el[0] !== id),
        }));
    }
    addOption() {
        this.setState({
            options: this.state.options.concat([
                [this.state.options[this.state.options.length - 1][0] + 1, ""],
            ]),
        });
    }

    componentOption() {
        return this.state.options.map((currentoption) => {
            return (
                <div
                    key={currentoption[0]}
                    className="form-group"
                    style={{ display: "flex" }}
                >
                    <input
                        className="form-control"
                        style={{ marginRight: "15px" }}
                        type="text"
                        name="option"
                        id={currentoption[0]}
                        onChange={this.onChangeOptionValue}
                        defaultValue={currentoption[1]}
                        title="Enter Size or Letter (ex : A, ex : S)"
                        placeholder="Size or Letter"
                    />
                    <input
                        className="form-control"
                        style={{ marginRight: "15px" }}
                        type="text"
                        name="color"
                        id={currentoption[0]}
                        onChange={this.onChangeColorValue}
                        defaultValue={currentoption[2]}
                        title="Enter color if this of have othervise make it empty"
                        placeholder="Color"
                    />
                    <input
                        className="form-control"
                        style={{ marginRight: "15px" }}
                        type="text"
                        name="price"
                        id={currentoption[0]}
                        onChange={this.onChangePriceValue}
                        defaultValue={currentoption[3]}
                        title="Enter Price of this option"
                        placeholder="Price"
                    />
                    <input
                        className="form-control"
                        style={{ marginRight: "15px" }}
                        type="text"
                        id={currentoption[0]}
                        defaultValue={currentoption[4]}
                        name="image"
                        onChange={this.onChangeImageValue}
                        title="Enter Image name"
                        placeholder="Image"
                    />
                    <button
                        className="btn"
                        style={{ marginRight: "15px" }}
                        onClick={this.addOption.bind(this)}
                    >
                        <i className="fa fa-plus"></i>
                    </button>
                    <button
                        className="btn"
                        onClick={this.dropOption.bind(this, currentoption[0])}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            );
        });
    }

    render() {
        if (this.props.match.params.id) {
            return (
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Title : </label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description : </label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Option Name (Letter or Size): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.option}
                            onChange={this.onChangeOption}
                        />
                    </div>
                    <div className="form-group">
                        <label>(Letter or Size), color, price, image : </label>
                    </div>
                    {this.componentOption()}
                    <div className="form-group">
                        {this.componentButton()}
                        <button
                            className="btn btn-primary"
                            onClick={this.cancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            );
        } else
            return (
                <div>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Option</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{this.productList()}</tbody>
                    </table>
                </div>
            );
    }
}
