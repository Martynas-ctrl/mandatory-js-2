import React, { Component } from 'react'

import '../Css/nav.css'
import DropBox from './DropBox'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }
    }

    render() {
        return (
          <div className="App">
        <div className="sideLeft">
          <div>
            Logo
          </div>
          <ul>
            <li> Link 1 </li>
            <li> Link 7 </li>
            <li> Link 3 </li>
            <li> Link 1 </li>
          </ul>
        </div>

        <div className={"bigBox"}>
          <header>
            <input placeholder="Search" type="text" />
            <button>Log out</button>
          </header>

          <main>
            {/* <Main /> */}
            <DropBox />
          </main>
        </div>
    </div>
        )
    }
}

export default Main
