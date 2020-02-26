import React, { Component } from 'react'

import '../Css/nav.css';

class DropBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }
    }

    render() {
        return (
            <>
            <div className="files">
                <table>
                    <thead>
                      <tr>
                        <th>Folder/file name</th>
                      </tr>
                  </thead>

                  <tbody>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td onClick={this.clickMe}>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                        <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td >Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                      <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                    <tr>
                    <td>Folder name </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="sidebarRight">
            <ul>
                <li> Link 1 </li>
                <li> Link 1 </li>
                <li> Link 1 </li>
                <li> Link 1 </li>
            </ul>
            </div>
            </>
        )
    }
}

export default DropBox
