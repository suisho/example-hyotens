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
    var cls = this.props.active ? ["fa-star", "active"] : ["fa-star-o"]
    var classNames = ["star"].concat(cls)
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

class CircleIcon extends React.Component{
  render(){
    var cls = this.props.active ? ["fa-circle", "active"] : ["fa-circle-thin"]
    var classNames = ["circle"].concat(cls)
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

class CancelIcon extends React.Component{
  render(){
    var classNames = ["fa-close","question"]
    if(!this.props.active){
      classNames.push("icon-disabled")
    }
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

function generateIconProps(level, active){
  return {
    key: level,
    value: level,
    active: active,
    fixedStarLevel: this.fixedStarLevel,
    hoverStarLevel: this.hoverStarLevel
  };
}


export class StarRating extends React.Component{
  getLabel(level){
    switch(level){
      case 0: return "わからない"
      case 5: return "あてはまらない"
      case 4: return "あまりあてはまらない"
      case 3: return "どちらともいえない"
      case 2: return "あまりあてはまらない"
      case 1: return "あてはまらない"
    }
    return "" //blank;
  }
  starIconElms(level){
    return Immutable.Range(0, 5).map((i) => {
      return <StarIcon
        {...generateIconProps(i + 1, i < level)}
      />
    }).toArray()
  }
  render(){
    const levelLabel = this.getLabel(level, mode)
    const selectElms = this.selectorElm(level, mode)
    return <RatingSelector>
      {selectElms}
    </RatingSelector>
  }

}
export class RatingSelector extends React.Component{
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
    return "" //blank;
  }
  generateIconProps(level, active){
    return {
      key: level,
      value: level,
      active: active,
      fixedStarLevel: this.fixedStarLevel,
      hoverStarLevel: this.hoverStarLevel
    };
  }
  cancelIconElm(level){
    return <CancelIcon
      { ...this.generateIconProps(0, 0 === level)}
    />
  }
  starIconElms(level){
    return Immutable.Range(0, 5).map((i) => {
      return <StarIcon
        {...this.generateIconProps(i + 1, i < level)}
      />
    }).toArray()
  }
  circleIconElms(level){
    return Immutable.Range(0, 5).map((i) => {
      return <CircleIcon
        {...this.generateIconProps(i + 1, i + 1 === level)}
      />
    }).toArray()
  }
  interfaceElm(level, mode){
    switch(mode){
      case "star":
        return this.starIconElms(level)
      case "circle":
      default:
        return this.circleIconElms(level)
    }
    return null
  }
  selectorElm(level, mode){
    var selectElms = this.interfaceElm(level, mode)
    const cancelElms = this.cancelIconElm(level)
    return (<div>
      {selectElms}
      {cancelElms}
    </div>)
  }
  render(){
    const { displayLevel } = this.state
    const level = displayLevel
    const { nameLabel, mode } = this.props
    const levelLabel = this.getLabel(level, mode)
    const selectElms = this.selectorElm(level, mode)
    return (
      <div onMouseOut={this.resetLevel}>
        <div>{nameLabel}:{levelLabel}</div>
        <div className="evaluation-rating-star">
          {selectElms}
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