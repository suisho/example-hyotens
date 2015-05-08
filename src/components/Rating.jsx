import React from 'react';
import Immutable from 'immutable';
import {StarRating, VectorRating, BinaryRating} from './RatingUI.jsx';
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

var flagsLabels = function(){
  var evaluate = {
    club: "クラブ活動"
  }
  return Immutable.Map(evaluate).map(function(item, key){
    return {
      name: key,
      label: item,
    }
  }).valueSeq().toArray();
}

export default class Rating extends React.Component{
  constructor(){
    super()
    this.starLabels = starLabels()
    this.vectorLabels = vectorLabels()
    this.flagsLabels = flagsLabels()
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
  elmsProps(item, data){
    return {
      key: item.name,
      name: item.name,
      nameLabel: item.label,
      level: data.evaluate[item.name],
      onChangeLevel: this.onChangeEvalueate
    }
  }
  generateStarRatingElm(data){
    return this.starLabels.map((item) => {
      var props = this.elmsProps(item, data)
      return <StarRating {...props} />;
    })
  }
  generateVectorRatingElm(data){
    return this.vectorLabels.map((item) => {
      var props = this.elmsProps(item, data)
      return <VectorRating {...props}
        leftLabel={item.left}
        rightLabel={item.right}
        />;
    })
  }
  generateBinaryRatingElm(data){
    return this.flagsLabels.map((item) => {
      var props = this.elmsProps(item, data)
      return <BinaryRating {...props} />;
    })
  }
  render(){
    const {data} = this.state
    const legacyData = bracketer(data)
    return (
      <div>
        {this.generateStarRatingElm(data)}
        {this.generateVectorRatingElm(data)}
        {this.generateBinaryRatingElm(data)}
        <LegacyForm data={legacyData} debug={true}>
          <button>submit</button>
        </LegacyForm>
      </div>
    )
  }
}

