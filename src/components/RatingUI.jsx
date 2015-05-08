import React from "react";
import Immutable from "immutable";
import {StarIcon, CircleIcon, CancelIcon} from './Icons.jsx'


// export class Stars extends React.Component{
//   render(){
//     const {activeLevel, currentLevel} = this.props
//     const active = activeLevel <= currentLevel
//     return Immutable.Range(0, 5).map((i) => {
//       return <StarIcon
//         {...generateIconProps(currentLevel, active)}
//       />
//     }).toArray()
//   }
// }
//
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
  render(){
    return <RatingSelector
      {...this.props}
      activeFunc={this.activeFunc}
      labelFunc={this.getLabel}
      mode="star" />
  }
}

class CancelInterface extends React.Component{
  render(){
    const {level, value} = this.props
    return <CancelIcon
      { ...this.props}
      value={value}
      active={value === level}
    />
  }
}

class StarInterface extends React.Component{
  render(){
    const {level} = this.props
    var elm = Immutable.Range(0, 5).map((i) => {
      var elmLevel = i + 1
      return <StarIcon
        key={elmLevel}
        value={elmLevel}
        active={elmLevel <= level}
        {...this.props}
      />
    }).toArray()
    return <span>{elm}</span>
  }
}

class RatingSelector extends React.Component{
  constructor(){
    super();
    this.state = {
      temporaryLevel : 0,
    };
    ["fixedLevel", "hoverLevel", "resetLevel"].map((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }
  hoverLevel(level){
    this.setState({ temporaryLevel : level })
  }
  fixedLevel(level){
    this.setState({ temporaryLevel : level })
    this.props.onChangeLevel(this.props.name, level)
  }
  resetLevel(e){
    this.hoverLevel(this.props.level)
  }
  // circleIconElms(level){
  //   return Immutable.Range(0, 5).map((i) => {
  //     return <CircleIcon
  //       {...this.generateIconProps(i + 1, i + 1 === level)}
  //     />
  //   }).toArray()
  // }
  interfaceProps(){
    return {
      onFixed: this.fixedLevel,
      onHover: this.hoverLevel
    };
  }
  interfaceElm(level, mode){
    let props = this.interfaceProps()
    switch(mode){
      case "star":
        return <StarInterface {...props} level={level} />
      case "circle":
      default:
        return this.circleIconElms(level)
    }
    return null
  }
  cancelIconElm(level){
    let props = this.interfaceProps()
    return <CancelInterface {...props}
      value={0}
      level={level}
    />
  }
  render(){
    const { temporaryLevel } = this.state
    const { nameLabel, children, mode} = this.props
    const label = this.props.labelFunc(temporaryLevel)
    const cancelElms = this.cancelIconElm(temporaryLevel)
    const interfaceElm = this.interfaceElm(temporaryLevel, mode)

    return (
      <div onMouseOut={this.resetLevel}>
        <div>{nameLabel}:{label}</div>
        <div className="evaluation-rating-star">
          {interfaceElm}
          {cancelElms}
        </div>
      </div>
    );
  }
}

RatingSelector.PropTypes = {
  level: React.PropTypes.number,
  onChangeLevel : React.PropTypes.func,
  labelFunc : React.PropTypes.func
};
