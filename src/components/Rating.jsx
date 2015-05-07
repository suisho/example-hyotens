import React from 'react';
import StarRating from './StarRating.jsx';
import LegacyForm from './LegacyForm.jsx';
import bracketer from '../lib/bracketer';
var evaluateLabels = {
  income: "給与水準",
  growth: "成長性"
}

export default class Rating extends React.Component{
  constructor(){
    super()
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
  render(){
    const {data} = this.state
    const legacyData = bracketer(data)
    return (
      <div>
        <StarRating
          label={evaluateLabels["income"]}
          level={data.evaluate.income}
          onChangeLevel={this.onChangeEvalueate} />
        <LegacyForm data={legacyData}>
          <button>submit</button>
        </LegacyForm>
      </div>
    )
  }
}