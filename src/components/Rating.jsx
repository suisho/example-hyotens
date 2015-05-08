import React from 'react';
import Immutable from 'immutable';
import {StarRating} from './RatingUI.jsx';
import LegacyForm from './LegacyForm.jsx';
import bracketer from '../lib/bracketer';

var labels = function(){
  let evaluate = {
    income: "給与水準",
    growth: "成長性"
  }
  let vectors = {
    gender: ["男性が多い", "女性が多い"]
  }

  return Immutable.Map(evaluate).map(function(item, key){
    return {
      name: key,
      label: item
    }
  }).valueSeq().toArray()
}
export default class Rating extends React.Component{
  constructor(){
    super()
    this.evaluateLabels = labels()
    this.state = {
      data: {
        evaluate: {
          income: 0,
          growth: 0
        }
      }
    }
    this.onChangeEvalueate = this.onChangeEvalueate.bind(this)
  }
  onChangeEvalueate(name, level){
    var newData = this.state.data
    newData.evaluate[name] = level
    this.setState({
      data: newData
    })
  }
  generateStarRatingElm(data){
    return this.evaluateLabels.map((item) => {
      return <StarRating
        key={item.name}
        name={item.name}
        nameLabel={item.label}
        level={data.evaluate[item.name]}
        onChangeLevel={this.onChangeEvalueate} />;
    })
  }
  render(){
    const {data} = this.state
    const legacyData = bracketer(data)
    return (
      <div>
        {this.generateStarRatingElm(data)}
        <LegacyForm data={legacyData} debug={true}>
          <button>submit</button>
        </LegacyForm>
      </div>
    )
  }
}

