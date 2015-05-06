import Immutable from "immutable"
import { flatten } from "flat"

function toBlacketKey(key){
  var splited = key.split(".")
  var head = splited.shift()
  return [head].concat(splited.map((item) => {
    return "[" + item + "]"
  })).join("")

}
export default function(input){
  var data = flatten(input)
    var item = Immutable.Map(data).flatMap((value, key) => {
      return Immutable.Map().set(
        toBlacketKey(key), value
      )
    }
  )
  return item.toJS()
}