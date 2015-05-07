import React from 'react'
import cx from 'classnames';

class Icon extends React.Component{
  constructor(){
    super();
    this.changeDisplayLevel = this.changeDisplayLevel.bind(this);
    this.clickLevel = this.clickLevel.bind(this);
  }
  changeDisplayLevel(){
    this.props.onHover(this.props.value);
  }
  clickLevel(){
    this.props.onFixed(this.props.value);
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
  onHover: React.PropTypes.func,
  onFixed: React.PropTypes.func
}

export class StarIcon extends React.Component{
  render(){
    var cls = this.props.active ? ["fa-star", "active"] : ["fa-star-o"]
    var classNames = ["star"].concat(cls)
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

export class CircleIcon extends React.Component{
  render(){
    var cls = this.props.active ? ["fa-circle", "active"] : ["fa-circle-thin"]
    var classNames = ["circle"].concat(cls)
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}

export class CancelIcon extends React.Component{
  render(){
    var classNames = ["fa-close","question"]
    if(!this.props.active){
      classNames.push("icon-disabled")
    }
    return (<Icon { ...this.props } classNames={classNames} />)
  }
}
