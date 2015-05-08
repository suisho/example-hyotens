import React from 'react';
import Immutable from 'immutable';
import {StarRating, VectorRating} from './RatingUI.jsx';
import LegacyForm from './LegacyForm.jsx';
import bracketer from '../lib/bracketer';

var starLabels = function(){
  let evaluate = {
    income: "給与水準",
    growth: "成長性"
  }
  return Immutable.Map(evaluate).map(function(item, key){
    return {
      name: key,
      label: item
    }
  }).valueSeq().toArray()
}
var vectorLabels = function(){
  var evaluate = {
    gender: ["性別の傾向", "女性中心", "男性中心"]
  }
  return Immutable.Map(evaluate).map(function(item, key){
    return {
      name: key,
      label: item[0],
      left: item[1],
      right: item[2]
    }
  }).valueSeq().toArray();
}

export default class Rating extends React.Component{
  constructor(){
    super()
    this.starLabels = starLabels()
    this.vectorLabels = vectorLabels()
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
    return this.starLabels.map((item) => {
      return <StarRating
        key={item.name}
        name={item.name}
        nameLabel={item.label}
        level={data.evaluate[item.name]}
        onChangeLevel={this.onChangeEvalueate} />;
    })
  }
  generateVectorRatingElm(data){
    return this.vectorLabels.map((item) => {
      return <VectorRating
        key={item.name}
        name={item.name}
        nameLabel={item.label}
        level={data.evaluate[item.name]}
        onChangeLevel={this.onChangeEvalueate}
        leftLabel={item.left}
        rightLabel={item.right}
        />;
    })
  }
  render(){
    const {data} = this.state
    const legacyData = bracketer(data)
    return (
      <div>
        {this.generateStarRatingElm(data)}
        {this.generateVectorRatingElm(data)}
        <LegacyForm data={legacyData} debug={true}>
          <button>submit</button>
        </LegacyForm>
      </div>
    )
  }
}

