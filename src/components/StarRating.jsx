import React from "react";
import Immutable from "immutable";
import cx from 'classnames';

class Icon extends React.Component{
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

Icon.PropTypes = {
  clssName: React.PropTypes.arrayOf(React.PropTypes.string),
  key: React.PropTypes.string,
  hoverStarLevel: React.PropTypes.func,
  fixedStarLevel: React.PropTypes.func
}

class StarIcon extends React.Component{
  render(){
    var classNames = ["star"]
    var cls = this.props.active ? "fa-star" : "fa-star-o"
    classNames.push(cls)
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

class NoneIcon extends React.Component{
  render(){
    var classNames = ["fa-close","question"]
    if(!this.props.active){
      classNames.push("icon-disabled")
    }
    return (<Icon { ...this.props } classNames={classNames} />)
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
    return "&nbsp;" //blank;
  }
  generateIconElm(level){
    const starElms = Immutable.Range(0, 5).map((i) => {
      const starLevel = i + 1
      const active = (starLevel <= level)
      return <StarIcon
        key={starLevel}
        value={starLevel}
        active={active}
        fixedStarLevel={this.fixedStarLevel}
        hoverStarLevel={this.hoverStarLevel}
      />
    });
    const noneElm = (
      <NoneIcon
        key={0}
        value={0}
        active={0 === level}
        fixedStarLevel={this.fixedStarLevel}
        hoverStarLevel={this.hoverStarLevel}
      />
    )
    return (
      <div>
        {starElms}
        {noneElm}
      </div>
    );
  }
  render(){
    const { displayLevel } = this.state
    const { label } = this.props
    const levelLabel = this.getLabel(displayLevel)
    const elms = this.generateIconElm(displayLevel)
    return (
      <div onMouseOut={this.resetLevel}>
        <div>{label}:{levelLabel}</div>
        <div className="evaluation-rating-star">
          {elms}
        </div>
      </div>
    );
  }
}

StarRating.PropTypes = {
  level: React.PropTypes.number,
  name: React.PropTypes.string,
  onChangeLevel : React.PropTypes.func
}