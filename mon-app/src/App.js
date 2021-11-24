import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Product from "./components/product.component";
import Cart from "./components/cart-list.component";
//import NotFoundPage from "./components/notfoundpage.component";

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <Route path="/" exact component={Home} />
            <Route path="/boutique/:id?" exact component={Product} />
            <Route path="/panier" exact component={Cart} />
            {/*<Route component={NotFoundPage} />*/}
        </Router>
    );
}

export default App;
