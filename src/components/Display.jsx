import React, { Component } from "react";

class Display extends Component {
  getNumberWithCommas = (str) => {
    let parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    const { text } = this.props;

    return (
      <div className="app__display">
        <div className="app__display__text_wrapper">
          <h1 className="app__display__text_wrapper__text">
            {this.getNumberWithCommas(text ? text : "0")}
          </h1>
        </div>
      </div>
    );
  }
}

export default Display;
