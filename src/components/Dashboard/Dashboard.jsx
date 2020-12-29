import React, { Component } from "react";
import DashboardButton from "./DashboardButton";

class Dashboard extends Component {
  getClickFunc = (type, id) => {
    switch (type) {
      case "number":
        return this.props.onNumberClick;
      case "other":
        switch (id) {
          case "clear":
            return this.props.onClearClick;
          case "switch":
            return this.props.onSwitchClick;
          case "percentage":
            return this.props.onPercentageClick;
          default:
            return;
        }
      default:
        break;
    }
  };
  getButtons = () => {
    const buttons = [];
    this.props.dashboard.forEach((line) => {
      line.forEach(({ id, type, label }) => {
        buttons.push(
          <DashboardButton
            key={id}
            id={id}
            display={this.props.display}
            className={type}
            label={label}
            onClick={this.getClickFunc(type, id)}
          />
        );
      });
    });
    return buttons;
  };
  render() {
    return (
      <div className="app__dashboard">
        {this.getButtons().map((button) => button)}
      </div>
    );
  }
}

export default Dashboard;
