import React from 'react';
import StartRating from './StarRating';
import LegacyForm from './LegacyForm';

class EvaluationSchema{
  constructor(){
    this.labels = Immutable.Map({
      evaluate: {
        income: "給与水準",
        growth: "成長性"
      }
    })
  }
  asLegacySchema(){
    this.labels.map(function(){
      
    })
  }
}

export default class Rating extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {}
    }
  }
  render(){
    return (
      <div>
      </div>
    )
  }
}