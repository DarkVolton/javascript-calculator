import React, { Component } from "react";

class Calculator extends Component {
  state = {
    display: "0",
    output: 0,
    formula: "",
    lastOperator: "",
    opperatorArr: ["+"],

    decimalRegex: /\./gim,
  };
  //#region
  //this is a collapsible region
  //#endregion
  doTheMath = (num1, operator, num2) => {
    //console.log("doTheMath" + num1 + " " + num2 + " " + operator);
    switch (operator) {
      case "+":
        return parseFloat(num1) + parseFloat(num2);
      case "-":
        return parseFloat(num1) - parseFloat(num2);
      case "x":
        return parseFloat(num1) * parseFloat(num2);
      case "/":
        return parseFloat(num1) / parseFloat(num2);
    }
  };

  equals = (numArr, opperatorArr) => {
    var result = numArr.reduce((prev, current, i) => {
      //console.log(prev, current);
      var answer = this.doTheMath(prev, opperatorArr[i], current);
      console.log(answer);
      return answer;
    }, 0);
    //console.log(result);

    return result;
  };

  componentDidMount = () => {
    console.log("________");
  };

  handleButton = (input) => {
    console.log(input);
    var numRegex = /[1-9]/g;
    if (input.match(numRegex)) {
      if (this.state.display === "0") {
        this.setState({
          display: input,
          formula: input,
        });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          display: input,
          formula: input,
          lastOperator: "",
          output: 0,
          opperatorArr: ["+"],
        });
      } else if (
        this.state.display === "+" ||
        this.state.display === "-" ||
        this.state.display === "/" ||
        this.state.display === "x"
      ) {
        this.setState((previousState) => ({
          display: input,
          formula: "" + previousState.formula + input,
        }));
      } else {
        this.setState((previousState) => ({
          display: "" + previousState.display + input,
          formula: "" + previousState.formula + input,
        }));
      }
    }
    //0 and . work slightly differently
    else if (input === "0") {
      if (this.state.display === "0") {
      } else {
        this.setState((previousState) => ({
          display: "" + previousState.display + input,
          formula: "" + previousState.formula + input,
        }));
      }
    } else if (input === ".") {
      if (this.state.display === "0") {
        this.setState((previousState) => ({
          display: "" + previousState.display + input,
          formula: "0" + input,
        }));
      } else if (
        this.state.display === "+" ||
        this.state.display === "-" ||
        this.state.display === "/" ||
        this.state.display === "x"
      ) {
        this.setState((previousState) => ({
          display: input,
          formula: "" + previousState.formula + input,
        }));
      } else if (!this.state.display.match(this.state.decimalRegex)) {
        this.setState((previousState) => ({
          display: previousState.display + input,
          formula: previousState.formula + input,
        }));
      }
    }

    //special operators
    else if (input === "clear") {
      this.setState({
        display: "0",
        formula: "",
        output: 0,
        opperatorArr: ["+"],
        lastOperator: "",
      });
    }

    //Math operators
    else if (input === "+" || input === "x" || input === "/") {
      if (this.state.display === "0") {
        this.setState({
          display: input,
          formula: input,
        });
      } else if (["+", "/", "x", "_"].includes(this.state.formula.slice(-1))) {
        this.setState((previousState) => {
          console.log("oppArr", previousState.opperatorArr);

          var lastOpp = previousState.opperatorArr.pop();
          var newOpperatorArr = previousState.opperatorArr;
          var pos = previousState.formula.lastIndexOf(lastOpp);
          var newFormula = previousState.formula;
          if (newFormula[pos + 1] === "_") {
            newFormula =
              newFormula.substring(0, pos + 1) + newFormula.substring(pos + 2);
          }
          newFormula =
            newFormula.substring(0, pos) +
            input +
            newFormula.substring(pos + 1);
          newOpperatorArr.push(input);
          return {
            formula: newFormula,
            opperatorArr: newOpperatorArr,
            display: input,
          };
        });
      } else {
        this.setState((previousState) => ({
          display: input,
          formula: previousState.formula + input,
          opperatorArr: [...previousState.opperatorArr, input],
          lastOperator: input,
        }));
        //console.log(this.state.formula);
      }
    } else if (input === "-") {
      if (this.state.display === "0") {
        this.setState({
          display: "-",
          formula: "_",
        });
      } else if (["+", "-", "/", "x"].includes(this.state.formula.slice(-1))) {
        this.setState((previousState) => ({
          display: "-",
          formula: previousState.formula + "_",
        }));
      } else {
        this.setState((previousState) => ({
          display: input,
          formula: previousState.formula + input,
          opperatorArr: [...previousState.opperatorArr, input],
          lastOperator: input,
        }));
      }
    }

    //equals operator
    else if (input === "=") {
      this.setState((previousState) => {
        var newNumArr = previousState.formula
          .replaceAll("+", "$")
          .replaceAll("-", "$")
          .replaceAll("x", "$")
          .replaceAll("/", "$")
          .replaceAll("_", "-")
          .split("$");
        var newOpperatorArr = previousState.opperatorArr;
        if (newNumArr.length + 1 === previousState.opperatorArr.length) {
          newOpperatorArr = previousState.opperatorArr -= 1;
        }
        var answer = this.equals(newNumArr, newOpperatorArr);
        var state = {
          display: answer,
          lastOperator: input,
        };
        console.log("test", previousState.opperatorArr);
        return state;
      });
    }
  };

  //rendered code, java above
  render() {
    return (
      <div id="calculator">
        <div id="formula"> {this.state.formula} </div>
        <div id="display">{this.state.display} </div>

        <button
          className="calcButton"
          id="clear"
          onClick={() => this.handleButton("clear")}
        >
          Clear
        </button>
        <button
          className="calcButton"
          id="divide"
          onClick={() => this.handleButton("/")}
        >
          /
        </button>
        <button
          className="calcButton"
          id="multiply"
          onClick={() => this.handleButton("x")}
        >
          x
        </button>
        <br />
        <button
          className="calcButton"
          id="seven"
          onClick={() => this.handleButton("7")}
        >
          7
        </button>
        <button
          className="calcButton"
          id="eight"
          onClick={() => this.handleButton("8")}
        >
          8
        </button>
        <button
          className="calcButton"
          id="nine"
          onClick={() => this.handleButton("9")}
        >
          9
        </button>
        <button
          className="calcButton"
          id="subtract"
          onClick={() => this.handleButton("-")}
        >
          -
        </button>
        <br />
        <button
          className="calcButton"
          id="four"
          onClick={() => this.handleButton("4")}
        >
          4
        </button>

        <button
          className="calcButton"
          id="five"
          onClick={() => this.handleButton("5")}
        >
          5
        </button>
        <button
          className="calcButton"
          id="six"
          onClick={() => this.handleButton("6")}
        >
          6
        </button>
        <button
          className="calcButton"
          id="add"
          onClick={() => this.handleButton("+")}
        >
          +
        </button>
        <br />
        <button
          className="calcButton"
          id="one"
          onClick={() => this.handleButton("1")}
        >
          1
        </button>

        <button
          className="calcButton"
          id="two"
          onClick={() => this.handleButton("2")}
        >
          2
        </button>
        <button
          className="calcButton"
          id="three"
          onClick={() => this.handleButton("3")}
        >
          3
        </button>
        <button
          className="calcButton"
          id="equals"
          onClick={() => this.handleButton("=")}
        >
          =
        </button>
        <br />
        <button
          className="calcButton"
          id="zero"
          onClick={() => this.handleButton("0")}
        >
          0
        </button>
        <button
          className="calcButton"
          id="decimal"
          onClick={() => this.handleButton(".")}
        >
          .
        </button>

        {/*copy these and change them*/}
      </div>
    );
  }
}

export default Calculator;
