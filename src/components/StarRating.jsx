import React from "react";
import Immutable from "immutable";
import classNames from 'classnames';

class StarIcon extends React.Component{
  constructor(){
    super();
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(){
    this.props.changeStarLevel(this.props.starLevel);
  }
  render(){
    const {key, active} = this.props;
    const starClass = active ? "fa-star" : "fa-star-o";
    const starClasses = classNames("fa", starClass);
    return (<i
      key={key}
      className={starClasses}
      onMouseOver={this.changeLevel}
    />);
  }
}

export default class StarRating extends React.Component{
  constructor(){
    super();
    this.state = {
      level: 0,
      fixed: false
    };
    this.changeStarLevel = this.changeStarLevel.bind(this);
    this.resetLevel = this.resetLevel.bind(this);
  }
  changeStarLevel(level){
    this.setState({
      level: level
    });
  }
  resetLevel(e){
    this.changeStarLevel(0)
  }
  render(){
    const { level }= this.state;
    var starsElm = Immutable.Range(0, 5).map((i) => {
      const starLevel = i + 1
      const active = (starLevel <= level)
      return <StarIcon
        key={starLevel}
        starLevel={starLevel}
        active={active}
        changeStarLevel={this.changeStarLevel}
      />;
    });

    return (
      <div onMouseOut={this.resetLevel}>
        {starsElm}
      </div>
    );
  }
}
