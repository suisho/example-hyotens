import React from "react";
import Immutable from "immutable";
export default class LegacyForm extends React.Component{
  render(){
    const {data} = this.props;
    const inputElm = Immutable.Map(data).map((item, key) => {
      return (
        <input type="hidden"
          name={key}
          value={item} />
      )
    });
    return (
      <form>
        {inputElm}
      </form>
    )
  }
}