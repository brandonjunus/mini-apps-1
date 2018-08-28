import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      gameMatrix : [
        [[1, 0],[2, 0], [3, 0]],
        [[4, 0],[5, 0], [6, 0]],
        [[7, 0],[8, 0], [9, 0]]
      ],
      currentPlayer : "x",
      isGameComplete: false,
      wins:{
        x: 0,
        o: 0
      },
      players: {
        x: 'brandon',
        o: 'eddie'
      }
    }

  this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    target
    console.log(e.target.id);
  }

  render() {
    var cellStyle = {
      height: "150px"
    }
    return (
    <div className="container">
      <div className="container h1 text-center">Tic Tac Toe</div>
      <div className="h6 text-center">Note: Loser goes first</div>
      <br/>
      <div className="row">
        <div id='xwins' className="col text-center h3">X's Wins: 0</div>
        <div id='owins' className="col text-center h3">O's Wins: 0</div>
      </div>
      <br/>
      <div id="row1" className="row">
        <div id="cell1" className="cell col border-right border-bottom border-dark" style={cellStyle} onClick={(e) => this.handleClick(e)}></div>
        <div id="cell2" className="cell col border-right border-bottom border-dark" style={cellStyle}></div>
        <div id="cell3" className="cell col border-bottom border-dark" style={cellStyle}></div>
      </div>
      <div id="row2" className="row">
        <div id="cell4" className="cell col border-bottom border-right border-dark text-center" style={cellStyle}></div>
        <div id="cell5" className="cell col border-bottom border-right border-dark text-center" style={cellStyle}></div>
        <div id="cell6" className="cell col border-bottom border-dark text-center" style={cellStyle}></div>
      </div>
      <div id="row3" className="row">
        <div id="cell7" className="cell col border-right border-dark text-center" style={cellStyle}></div>
        <div id="cell8" className="cell col border-right border-dark text-center" style={cellStyle}></div>
        <div id="cell9" className="cell col border-dark text-center" style={cellStyle}></div>
      </div>
      <br />
      <div className="row">
        <button id="reset" type="button" className="col text-center" style={{ visibility: 'visable' }}>Reset?</button>
      </div>
    </div>

    )
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage/>, mountNode);
