import React, { Component } from "react";

import "../css/notfound.css";

export default class Navbar extends Component {
    render() {
        return (
            <div className="flex-center position-r full-height">
                <div className="code">404 </div>

                <div className="message">NOT FOUND </div>
            </div>
        );
    }
}
