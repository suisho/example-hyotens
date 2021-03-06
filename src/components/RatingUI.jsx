import React from "react";
import Immutable from "immutable";
import {StarIcon, CircleIcon, CancelIcon} from "./Icons.jsx"
import {LabelButton} from "./LabelButton.jsx"

export class StarRating extends React.Component{
  getLabels(){
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
    // <span className="left">{this.props.leftLabel}</span>
    // <span className="right">{this.props.rightLabel}</span>
    return <div>
      <RatingSelector
      {...this.props}
      labels={this.getLabels()}
      mode="circle" />
    </div>
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
      mode="binary" />
  }
}
// 
// class CancelInterface extends React.Component{
//   render(){
//     const {level, value} = this.props
//     return <CancelIcon
//       { ...this.props}
//       value={value}
//       active={value === level}
//     />
//   }
// }

class StarInterface extends React.Component{
  render(){
    const {level, currentLevel} = this.props
    var elm = Immutable.Range(0, 5).map((i) => {
      var elmLevel = i + 1
      return <StarIcon
        key={elmLevel}
        value={elmLevel}
        active={elmLevel <= level}
        currentActive={elmLevel <= currentLevel}
        {...this.props}
      />
    }).toArray()
    return <span className="evaluation-rating rating-star">{elm}</span>
  }
}

class CircleInterface extends React.Component{
  render(){
    const {level, currentLevel} = this.props
    var elm = Immutable.Range(0, 5).map((i) => {
      var elmLevel = i + 1
      return <CircleIcon
        key={elmLevel}
        value={elmLevel}
        active={elmLevel === level}
        currentActive={elmLevel === currentLevel}
        {...this.props}
      />
    }).toArray()
    return <span className="evaluation-rating rating-circle">{elm}</span>
  }
}

class BinaryInterface extends React.Component{
  render(){
    const {level, currentLevel, labels} = this.props
    var elm = [0, 2].map((elmLevel) => {
      return <LabelButton
        key={elmLevel}
        value={elmLevel}
        active={elmLevel === level}
        currentActive={elmLevel === currentLevel}
        label={labels[elmLevel]}
        {...this.props}
      />
    })
    return <div className="evaluation-rating rating-binary">{elm}</div>
  }
}

class RatingSelector extends React.Component{
  constructor(){
    super();
    this.state = {
      temporaryLevel: 0
    };
  }
  componentWillMount(){
    this.state = {
      temporaryLevel: this.defaultLevel()
    }
  }
  hoverLevel(level){
    this.setState({ temporaryLevel: level })
  }
  fixedLevel(level){
    this.setState({ temporaryLevel: level })
    this.props.onChangeLevel(this.props.name, level)
  }
  resetLevel(){
    this.hoverLevel(this.props.level)
  }
  interfaceProps(){
    return {
      onFixed: this.fixedLevel.bind(this),
      onHover: this.hoverLevel.bind(this),
      currentLevel: this.props.level,
      labels: this.props.labels
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
  render(){
    const { temporaryLevel } = this.state
    const { nameLabel, mode} = this.props
    const label = this.props.labels[temporaryLevel]
    // const cancelElms = this.cancelIconElm(temporaryLevel)
    const interfaceElm = this.interfaceElm(temporaryLevel, mode)

    return (
      <div onMouseOut={this.resetLevel.bind(this)} className="evaluate-rating-item">
        <div>{nameLabel}:{label}</div>
        {interfaceElm}
      </div>
    );
  }
}

RatingSelector.PropTypes = {
  level: React.PropTypes.number,
  onChangeLevel: React.PropTypes.func,
  labelFunc: React.PropTypes.func,
  mode: React.PropTypes.oneOf(["star", "circle", "binary"])
};
