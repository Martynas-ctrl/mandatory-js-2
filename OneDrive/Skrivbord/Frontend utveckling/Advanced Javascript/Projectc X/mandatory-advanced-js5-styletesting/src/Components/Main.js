import React, { Component } from 'react'
import { Dropbox } from "dropbox";

import { Link } from 'react-router-dom'

import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: []
        }
    }

    componentDidMount() {
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({ path: "" })
        .then((res) => {
          this.setState({ folders: res.entries });
        });
    }

    render() {
      const { folders } = this.state;

        return (
          <div className="App">
            
        <div className="sideLeft">
          <div className="Logo">
            Logo
          </div>
          <ul>
            <li> Start </li>
            <br/>
            <li> Filter </li>
            <br/>
            <li> Paper </li>
            <br/>
            <li> Transfer </li>
          </ul>
        </div>

        <div className={"bigBox"}>
          <header>
            <h1>Project X</h1>
              <input placeholder="Search" type="text" />
              <button>Log out</button>
          </header>

          <main>
          
          <div className="files">
                <table>
                    <thead>
                      <tr>
                        <th>Folder/file name</th>
                      </tr>
                  </thead>

                  <tbody>
                    
                    {folders.map(folder => {
                      return (
                        <tr>
                          <div className="testing">
                            <Link to={`/folder${folder.path_display}`} className="linktest">
                              <td>{folder.name}</td>
                            </Link>
                          </div>
                        
                        </tr>
                      )
                    })}

                </tbody>
                </table>
                
            </div>

            <div className="sidebarRight">
            <ul>
                <li> Upload File </li>
                <br />
                <li> Upload Map </li>
                <br />
                <li> New Map </li>
                <br />
                <li> New Shared Map </li>
                
            </ul>
            <p className="sideText">Choose your option</p>
            </div>
          </main>
        </div>
    </div>
      )
    }
}

export default Main
