import React, { Component } from "react";
import DashboardButton from "./DashboardButton";

class Dashboard extends Component {
  getButtons = () => {
    const buttons = [];
    this.props.dashboard.forEach((line) => {
      line.forEach(({ id, type, label }) => {
        buttons.push(
          <DashboardButton
            key={id}
            id={id}
            display={this.props.display}
            type={type}
            label={label}
            onClick={this.props.onClick}
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
