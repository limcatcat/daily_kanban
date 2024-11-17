import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(<h1>Quokka Princess</h1>)
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);