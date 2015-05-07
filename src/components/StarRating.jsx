import React from "react";
import Immutable from "immutable";
import cx from 'classnames';

class LevelIcon extends React.Component{
  constructor(){
    super();
    this.changeDisplayLevel = this.changeDisplayLevel.bind(this);
    this.clickLevel = this.clickLevel.bind(this);
  }
  changeDisplayLevel(){
    this.props.hoverStarLevel(this.props.value);
  }
  clickLevel(){
    this.props.fixedStarLevel(this.props.value);
  }
  render(){
    var {key, classNames} = this.props;
    const classes = cx("fa", classNames);
    return (<i
      key={key}
      className={classes}
      onMouseOver={this.changeDisplayLevel}
      onClick={this.clickLevel}
    />);
  }
}
class StarIcon extends React.Component{
  activeClass(){
    return "fa-star"
  }
  inactiveClass(){
    return "fa-star-o"
  }
  render(){
    var classNames = this.props.active
      ? this.activeClass()
      : this.inactiveClass()
    return (<LevelIcon { ...this.props } classNames={classNames} />)
  }
}

class NoneIcon extends React.Component{
  activeClass(){
    return "fa-question"
  }
  inactiveClass(){
    return "fa-question icon-disabled"
  }
  render(){
    var classNames = this.props.active
      ? this.activeClass()
      : this.inactiveClass()
    return (<LevelIcon { ...this.props } classNames={classNames} />)
  }

}
export default class StarRating extends React.Component{
  constructor(){
    super();
    this.state = {
      displayLevel : 0,
    };
    ["fixedStarLevel", "hoverStarLevel", "resetLevel"].map((fn) => {
      this[fn] = this[fn].bind(this)
    })
    // this.fixedStarLevel = this.fixedStarLevel.bind(this);
    // this.hoverStarLevel = this.hoverStarLevel.bind(this);
    // this.resetLevel = this.resetLevel.bind(this);
  }
  hoverStarLevel(level){
    this.setState({
      displayLevel : level
    })
  }
  fixedStarLevel(level){
    this.setState({
      displayLevel : level,
    })
    this.props.onChangeLevel(this.props.name, level)
  }
  resetLevel(e){
    this.hoverStarLevel(this.props.level)
  }
  getLabel(level){
    switch(level){
      case 0: return "わからない"
      case 5: return "あてはまらない"
      case 4: return "あまりあてはまらない"
      case 3: return "どちらともいえない"
      case 2: return "あまりあてはまらない"
      case 1: return "あてはまらない"
    }
    return "&nbsp;"
  }
  render(){
    const { displayLevel } = this.state
    const starsElm = Immutable.Range(0, 5).map((i) => {
      const starLevel = i + 1
      const active = (starLevel <= displayLevel)
      return <StarIcon
        key={starLevel}
        value={starLevel}
        active={active}
        fixedStarLevel={this.fixedStarLevel}
        hoverStarLevel={this.hoverStarLevel}
      />;
    });
    const label = this.getLabel(displayLevel)

    return (
      <div onMouseOut={this.resetLevel}>
        <div className="evaluation-rating-star">
          {starsElm}
          <NoneIcon
            key={0}
            value={0}
            active={0 === displayLevel}
            fixedStarLevel={this.fixedStarLevel}
          />
        </div>
        <div>{label}</div>
      </div>
    );
  }
}

StarRating.PropTypes = {
  level: React.PropTypes.number,
  name: React.PropTypes.string,
  onChangeLevel : React.PropTypes.func
}