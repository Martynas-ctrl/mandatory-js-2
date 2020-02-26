import React, { Component } from 'react'
import './App.css';

import BoardCell from './BoardCell';

export class App extends Component{
  render() {
    const cells = [];
    // Enclose all of each row into a container
    for(let y = 5; y >= 0; y--) {
      const row = [];

      for(let x = 0; x < 7; x++) {
        //
        row.push(<BoardCell key={x} x={x} y={y} />);
      }
      cells.push(<div key={y} className='row'>{row}</div>)
    }

    return (
      <div>
        {cells}
      </div>
    )
  }
}

export default App