import React, { Component } from "react";

class DashboardButton extends Component {
  getClass = (className) => `app__dashboard__${className}`;

  render() {
    const { id, label, grey, orange, wide, display, onClick } = this.props;

    if (id === "clear") {
      return (
        <button className={this.getClass()} onClick={() => onClick()}>
          {display === "0" ? label : "C"}
        </button>
      );
    }

    return (
      <button className={this.getClass(grey || orange || wide)} onClick={() => onClick()}>
        {label}
      </button>
    );
  }
}

export default DashboardButton;
