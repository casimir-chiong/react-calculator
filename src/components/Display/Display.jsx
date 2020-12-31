import React, { Component } from "react";

class Display extends Component {
  getNumberWithCommas = (str) => {
    let parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  render() {
    const { value } = this.props.display;

    return (
      <div className="app__display">
        <div className="app__display__text_wrapper">
          <h1 className="app__display__text_wrapper__text">
            {this.getNumberWithCommas(value)}
          </h1>
        </div>
      </div>
    );
  }
}

export default Display;
