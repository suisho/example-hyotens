import bracketer from '../src/lib/bracketer'
import assert from "assert"
describe("bracketer", function(){
  it("to legacy bracket path", function(){
    var result = bracketer({
      a: {
        b: 10,
        d : {
          e : "f"
        }
      },
      c: [1,2,3]
    })
    var expect = {
      "a[b]": 10,
      "a[d][e]": "f",
      "c[0]": 1,
      "c[1]": 2,
      "c[2]": 3
    }
    assert.deepEqual(result, expect)
  })
})
