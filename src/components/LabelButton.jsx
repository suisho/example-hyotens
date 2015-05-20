import React from "react"
import cx from "classnames"

export class LabelButton extends React.Component{
  changeDisplayLevel(){
    this.props.onHover(this.props.value);
  }
  clickLevel(){
    this.props.onFixed(this.props.value);
  }
  render(){
    const {label, active} = this.props
    var classes = ["label-button"]
    if(active){
      classes.push("active")
    }
    return (
      <div className={cx(classes)}
          onMouseOver={this.changeDisplayLevel.bind(this)}
          onClick={this.clickLevel.bind(this)} >
          {label}
      </div>
    )
  }
}
