import React from "react";
import Immutable from "immutable";
import {StarIcon, CircleIcon, CancelIcon} from './Icons.jsx'


export class Stars extends React.Component{
  render(){
    const {activeLevel, currentLevel} = this.props
    const active = activeLevel <= currentLevel
    return Immutable.Range(0, 5).map((i) => {
      return <StarIcon
        {...generateIconProps(currentLevel, active)}
      />
    }).toArray()
  }
}

export class StarRating extends React.Component{
  getLabelFunc(level){
    switch(level){
      case 0: return "わからない"
      case 5: return "あてはまらない"
      case 4: return "あまりあてはまらない"
      case 3: return "どちらともいえない"
      case 2: return "あまりあてはまらない"
      case 1: return "あてはまらない"
    }
    return " " //blank;
  }
  selectorElm(level, generateIconProps){
    return Immutable.Range(0, 5).map((i) => {
      return <StarIcon
        {...generateIconProps(i + 1, i < level)}
      />
    }).toArray()
  }
  render(){
    const {level} = this.props
    const label = this.getLabelFunc(level)
    const selectElms = this.selectorElm(level)
    return <RatingSelector
      {...this.props}
      label={this.getLabelFunc}>
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
    ["fixedLevel", "hoverLevel", "resetLevel"].map((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }
  hoverLevel(level){
    this.setState({ displayLevel : level })
  }
  fixedLevel(level){
    this.setState({ displayLevel : level })
    this.props.onChangeLevel(this.props.name, level)
  }
  resetLevel(e){
    this.hoverLevel(this.props.level)
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
      onFixed: this.fixedLevel,
      onHover: this.hoverLevel
    };
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
  cancelIconElm(level){
    return <CancelIcon
      { ...this.generateIconProps(0, 0 === level)}
    />
  }

  render(){
    const { displayLevel } = this.state
    const { nameLabel, children} = this.props
    const label = this.getLabel(displayLevel)
    const cancelElms = this.cancelIconElm(displayLevel)
    const selectElms = this.interfaceElm(displayLevel, "star")

    return (
      <div onMouseOut={this.resetLevel}>
        <div>{nameLabel}:{label}</div>
        <div className="evaluation-rating-star">
          {selectElms}
          {cancelElms}
        </div>
      </div>
    );
  }
}

StarRating.PropTypes = {
  level: React.PropTypes.number,
  name: React.PropTypes.string,
  onChangeLevel : React.PropTypes.func
};
