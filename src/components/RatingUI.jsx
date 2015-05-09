import React from "react";
import Immutable from "immutable";
import {StarIcon, CircleIcon, CancelIcon} from './Icons.jsx'

export class StarRating extends React.Component{
  getLabels(level){
    return [
      "わからない",
      "あてはまらない",
      "あまりあてはまらない",
      "どちらともいえない",
      "あてはまる",
      "とてもあてはまる"
    ]
  }
  render(){
    return <RatingSelector
      {...this.props}
      labels={this.getLabels()}
      mode="star" />
  }
}

export class VectorRating extends React.Component{
  getLabels(){
    return [
      "わからない",
      this.props.leftLabel,
      "やや" + this.props.leftLabel,
      "どちらともいえない",
      "やや" + this.props.rightLabel,
      this.props.rightLabel
    ]
  }
  render(){
    return <RatingSelector
      {...this.props}
      labels={this.getLabels()}
      mode="circle" />
  }
}

export class BinaryRating extends React.Component{
  getLabels(){
    return [
      "あてはまらない",
      "わからない",
      "あてはまる"
    ]
  }
  render(){
    return <RatingSelector
      {...this.props}
      labels={this.getLabels()}
      cancelLevel={1}
      mode="binary" />
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
class CircleInterface extends React.Component{
  render(){
    const {level} = this.props
    var elm = Immutable.Range(0, 5).map((i) => {
      var elmLevel = i + 1
      return <CircleIcon
        key={elmLevel}
        value={elmLevel}
        active={elmLevel === level}
        {...this.props}
      />
    }).toArray()
    return <span>{elm}</span>
  }
}

class BinaryInterface extends React.Component{
  render(){
    const {level} = this.props
    var elm = [0, 2].map((elmLevel) => {
      return <CircleIcon
        key={elmLevel}
        value={elmLevel}
        active={elmLevel === level}
        {...this.props}
      />
    })
    return <span>{elm}</span>
  }
}

class RatingSelector extends React.Component{
  constructor(){
    super();
    this.state = {
      temporaryLevel: 0
    };
    ["fixedLevel", "hoverLevel", "resetLevel"].map((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }
  componentWillMount(){
    this.state = {
      temporaryLevel: this.defaultLevel()
    }
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
        return <CircleInterface {...props} level={level} />
      case "binary":
        return <BinaryInterface {...props} level={level} />
    }
    return null
  }
  defaultLevel(){
    return this.props.cancelLevel || 0
  }
  cancelIconElm(level){
    let props = this.interfaceProps()
    return <CancelInterface {...props}
      value={this.defaultLevel()}
      level={level}
    />
  }
  render(){
    const { temporaryLevel } = this.state
    const { nameLabel, children, mode} = this.props
    const label = this.props.labels[temporaryLevel]
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
