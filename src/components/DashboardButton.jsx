import React, { Component } from "react";

class DashboardButton extends Component {
  getClass = (className) => `app__dashboard__${className}`;

  render() {
    const { id, buttonStyle, display, onClick } = this.props;

    return (
      <button className={this.getClass(buttonStyle)} onClick={() => onClick(id)}>
        {id !=="clear" ? id : (display  ? "C" : "AC")}
      </button>
    );
  }
}

export default DashboardButton;
