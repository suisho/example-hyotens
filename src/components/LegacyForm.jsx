import React from "react";
import Immutable from "immutable";

class LegacyInput extends React.Component{
  render(){
    const {value, name, debug} = this.props
    var debugElm = debug ? (<span>{name} = {value}</span>) : false
    return (
      <div>
        {debugElm}
        <input type="hidden"
          name={name}
          value={value} />
      </div>
    )
  }
}

export default class LegacyForm extends React.Component{
  render(){
    const {debug, children} = this.props
    const inputElm = Immutable.Map(this.props.data).map((item, key) => {
      return (
        <LegacyInput key={key} name={key} value={item} debug={debug}/>
      )
    }).toArray();
    return (
      <form>
        {inputElm}
        {children}
      </form>
    );
  }
}