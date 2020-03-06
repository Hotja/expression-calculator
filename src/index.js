function eval() {
    // Do not use eval!!!
    return;
  }
  
  let  fnum = "(-?[\\d.]+(e(\\+|-)\\d+)?)",
         fsign = ["([/*])", "([+-])"],

  doublemin = expr => expr
    .replace(/(\d)(--)(\d)/g, "$1+$3").replace(/(\d)(-)(\d)/g, "$1+-$3"),

  act = {
    "+": (a, b) => +(a) + +(b),
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (!+(b)) throw new Error("TypeError: Division by zero.")
      return a / b
    }
  }

 exports.expressionCalculator = expr => {

   

expr = expr.replace(/\s*/g, "")
let bracket = expr.match(/\(|\)/g)
if (bracket) {
  let count = 0
  for (let char of bracket) {
    if (char === "(") count++
    else count--
    if (count<0) throw new Error("ExpressionError: Brackets must be paired")
  }
  if (count>0) throw new Error("ExpressionError: Brackets must be paired")
  while (true) {
    let subbracket = expr.match(/\([^()]+\)/)
    if (!subbracket) break
    expr = expr.replace(subbracket[0], calc(subbracket[0].slice(1, -1)))
  }
  
}
return calc(expr)
}
                                                  
function calc(expr) {
for (let sign of fsign) {
  while (true) {
    expr = doublemin(expr)
    let nextToCalc = expr.match(new RegExp(fnum + sign + fnum))
    if (!nextToCalc) break
    let [subbracket, left, , , sgn, right] = nextToCalc
    expr = expr.replace(subbracket, act[sgn](left, right))
  }
}
return +expr
}
  
