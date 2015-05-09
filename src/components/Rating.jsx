import React from 'react';
import Immutable from 'immutable';
import {StarRating, VectorRating, BinaryRating} from './RatingUI.jsx';
import LegacyForm from './LegacyForm.jsx';
import bracketer from '../lib/bracketer';



var starLabels = function(){
  let evaluate = {
    income: "給与水準",
    stability: "安定性",
    growth: "成長性、将来性",
    worth: "やりがい、面白さ",
    policy: "理念と浸透性",
    brand: "ブランドイメージ",
    mood: "雰囲気",
    difficulty: "難易度",
    welfare: "福利厚生",
    educate: "教育、研修制度",
    evaluate: "この会社で働きたい"
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
    gender: ["性別の傾向", "女性中心", "男性中心"],
    age: ["年齢層", "若い人が多い","年配者が多い"],
    work:["仕事量","仕事が多い","仕事が少ない"],
    personnel:["評価軸","実力主義","年功序列"],
    business:["経営体制","トップダウン経営","ボトムアップ経営"],
    grouping:["体質","体育会系","頭脳系"],
    climate:["社風","堅実な社風","挑戦的な社風"],
    important:["重視項目","成果に厳しい","過程を評価"],
    compliance:["準拠", "論理・規則に従う","感情・調和に従う"],
    teamwork:["チームワーク","チームプレー重視","個人プレー重視"]
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
    club: "クラブ活動",
    party: "合コン",
    event: "イベント",
    handsome: "美男",
    beauty: "美女",
    organization: "風通しが良い",
    love: "社内恋愛",
    child_and_family_care: "育児休暇",
    tenure: "長く働ける",
    cleanly: "綺麗",
    entrepreneur: "起業",
    english: "英語",
    fashion: "オシャレ"
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
    var entry = []
    entry = entry.concat(this.starLabels.map((item) => { return item.name}))
    entry = entry.concat(this.vectorLabels.map((item) => { return item.name}))
    entry = entry.concat(this.flagsLabels.map((item) => { return item.name}))

    var defaultData = {}
    entry.forEach((name) => {
      defaultData[name] = 0
    })
    console.log(entry)
    this.state = {
      data: {
        evaluate: defaultData
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
        <LegacyForm data={legacyData} debug={false}>
          <button>submit</button>
        </LegacyForm>
      </div>
    )
  }
}

