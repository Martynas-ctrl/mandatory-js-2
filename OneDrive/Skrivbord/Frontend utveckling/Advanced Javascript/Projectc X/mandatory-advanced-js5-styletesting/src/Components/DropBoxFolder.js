import React, { Component } from 'react'

import { Dropbox } from "dropbox";

import { Link } from 'react-router-dom';

import '../Css/nav.css'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            folders: []
        }
    }

    componentDidMount() {
      let path = this.props.id;
      console.log(path);

      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesListFolder({ path: `/${path}` })
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
                          <div>
                              <td>{folder.name}</td>
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
            <Link to="/main">
                <p className="return">To The Main Page</p>
            </Link>
            </div>
          </main>
        </div>
    </div>
      )
    }
}

export default Main
