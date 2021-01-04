import React, { Component } from "react";
import DashboardButton from "./DashboardButton";

class Dashboard extends Component {
  render() {
    const { display, onClick } = this.props;

    return (
      <div className="app__dashboard">
        <DashboardButton
          id="clear"
          buttonStyle="grey"
          onClick={onClick}
          display={display}
        />
        <DashboardButton id="+/-" buttonStyle="grey" onClick={onClick} />
        <DashboardButton id="%" buttonStyle="grey" onClick={onClick} />
        <DashboardButton id="÷" buttonStyle="orange" onClick={onClick} />
        <DashboardButton id="7" onClick={onClick} />
        <DashboardButton id="8" onClick={onClick} />
        <DashboardButton id="9" onClick={onClick} />
        <DashboardButton id="x" buttonStyle="orange" onClick={onClick} />
        <DashboardButton id="4" onClick={onClick} />
        <DashboardButton id="5" onClick={onClick} />
        <DashboardButton id="6" onClick={onClick} />
        <DashboardButton id="-" buttonStyle="orange" onClick={onClick} />
        <DashboardButton id="1" onClick={onClick} />
        <DashboardButton id="2" onClick={onClick} />
        <DashboardButton id="3" onClick={onClick} />
        <DashboardButton id="+" buttonStyle="orange" onClick={onClick} />
        <DashboardButton id="0" buttonStyle="wide" onClick={onClick} />
        <DashboardButton id="." onClick={onClick} />
        <DashboardButton id="=" buttonStyle="orange" onClick={onClick} />
      </div>
    );
  }
}

export default Dashboard;
