import React, { Component } from "react";

class Calculator extends Component {
  state = {
    initialCount: "0",
    output: 0,
    formula: "",
    decimalRegex: /\./gim,
    lastOperator: "",
    lastNum: "",
    currentNum: "",
  };

  handleNum = () => {};

  handleButton = (input) => {
    var numRegex = /[1-9]/g;
    if (input.match(numRegex)) {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else if (
        this.state.initialCount === "+" ||
        this.state.initialCount === "-" ||
        this.state.initialCount === "/" ||
        this.state.initialCount === "x"
      ) {
        this.setState({
          initialCount: input,
          formula: "" + this.state.formula + input,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } /* else if (input === "2") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "3") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "4") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "5") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "6") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "7") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "8") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === "9") {
      if (this.state.initialCount === "0") {
        this.setState({ initialCount: input, formula: input });
      } else if (this.state.lastOperator === "=") {
        this.setState({
          initialCount: input,
          formula: input,
          lastOperator: "",
          output: 0,
        });
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    }*/
    //0 and . work slightly differently
    else if (input === "0") {
      if (this.state.initialCount === "0") {
      } else {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "" + this.state.formula + input,
        });
      }
    } else if (input === ".") {
      if (this.state.initialCount === "0") {
        this.setState({
          initialCount: "" + this.state.initialCount + input,
          formula: "0" + input,
        });
      } else if (!this.state.initialCount.match(this.state.decimalRegex)) {
        this.setState({
          initialCount: this.state.initialCount + input,
          formula: this.state.formula + input,
        });
      }
    }

    //special operators
    else if (input === "clear") {
      this.setState({
        initialCount: "0",
        formula: "",
        output: 0,
        lastNum: "",
        lastOperator: "",
      });
    }

    //Math operators
    else if (input === "+") {
      if (this.state.initialCount === "0") {
        this.setState({
          initialCount: input,
          formula: input,
        });
      } else if (
        this.state.initialCount === "+" ||
        this.state.initialCount === "-" ||
        this.state.initialCount === "/" ||
        this.state.initialCount === "x"
      ) {
        this.setState({
          initialCount: input,
        });
      } else {
        this.setState({
          output: this.state.output + parseFloat(this.state.initialCount),
          initialCount: input,
          formula: this.state.formula + input,
          lastOperator: input,
        });
      }
    }
    //sub newest test subject
    else if (input === "-") {
      if (this.state.initialCount === "0") {
        this.setState({
          initialCount: input,
          formula: input,
        });
      } else if (
        this.state.initialCount === "+" ||
        this.state.initialCount === "-" ||
        this.state.initialCount === "/" ||
        this.state.initialCount === "x"
      ) {
        this.setState({
          initialCount: input,
        });
      } else {
        //currently if you do 1+1+1-? it tries to - the 1 before the - from the current output... shit.
        this.setState({
          output: this.state.output - parseFloat(this.state.initialCount),
          initialCount: input,
          formula: this.state.formula + input,
          lastOperator: input,
        });
      }
      console.log(this.state.output);
    }

    //equals operator
    //make a lastNum var and combine with the lastOperator var
    else if (input === "=") {
      if (this.state.lastOperator === "+") {
        this.setState({
          initialCount: this.state.output + parseFloat(this.state.initialCount),
          lastOperator: input,
        });
      } else if (this.state.lastOperator === "-") {
        this.setState({
          initialCount: this.state.output - parseFloat(this.state.initialCount),
          lastOperator: input,
        });
      }
    }
  };

  //rendered code java above
  render() {
    return (
      <div id="calculator">
        <div id="formula"> {this.state.formula} </div>
        <div id="display">{this.state.initialCount} </div>

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
