import React, { Component } from 'react'

import { Dropbox } from "dropbox";
import LogOut from './LogOut'
import DropdownOptions from './DropdownOptions'

import '../Css/icons.css'
import '../Css/mainFiles.css'
import '../Css/nav.css'
import '../Css/UlItems.css'
// import { updateToken , token } from './store'
import { updateToken , token } from './TokenStore'

import folderImg from '../Img/folder-img.png';
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
          folders: [],
          show: false,
          files: [],
          URL: null,
          checked: true,
          starArray: [],
  
          
        }
        console.log(this.state.starArray)
        this.myRef = React.createRef()
    }

    // delets files and closes delete window
    onDelete = (path_delete) =>{
      const{folders} = this.state
      const dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      dbx.filesDelete({path: path_delete})
      .then(response =>{
        let newFolder = folders.filter( folder => folder.name !== response.name)
        this.setState({folders: newFolder, deleteButtonClicked : false})
      })
    }

    componentDidMount() {
      // hämtar folders

      this.setState({
        starArray: JSON.parse(window.localStorage.getItem("favorites"))
      });

      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });
      this.dbx.filesListFolder({ path: "" })
        .then((res) => {
          console.log('HEJ2', res.entries);
          this.setState({ folders: res.entries });

        const entries = res.entries
          .filter(x => x[".tag"] === "file")
          .map((x) => ({ path: x.path_display }));
        return this.dbx.filesGetThumbnailBatch({
          entries: entries,
        });
        })
        .then((res) => {
          this.setState({ files: res.entries });
        });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.folders === this.state.folders && prevState.files === this.state.files) {
      this.dbx = new Dropbox({ accessToken: localStorage.getItem("token") });

      let path = this.props.location.pathname;
      path = path.slice(5);
      this.dbx.filesListFolder({ path: path })
      .then((res) => {
        this.setState({ folders: res.entries })

        const entries = res.entries
        .filter(x => x[".tag"] === "file")
        .map((x) => ({ path: x.path_display }));
      return this.dbx.filesGetThumbnailBatch({ entries });
      })
      .then((res) => {
        this.setState({ files: res.entries });
      });
  }
  }

  downloadFile = (file) => {
    this.dbx.filesGetThumbnail({"path": file})
      .then(res => {
        console.log('HEJ 3', res);
        let objURL = window.URL.createObjectURL(res.fileBlob);
        this.setState({ URL: objURL });
      });
  }

  

  starFile = (file) => {

        const { starArray } = this.state;
        let favorites = JSON.parse(localStorage.getItem('favorites'));

        

        console.log(file)

        const newStarArray = [...this.state.starArray, file];
        
        localStorage.setItem('favorites', JSON.stringify(newStarArray));

        this.setState({
          starArray: newStarArray
        })
        console.log(this.state.starArray);
  }
 
    render() {
      
      if(this.state.popup) {
        return <div className="popup"><input className="popupinput"></input></div>
      }
      
       let favFiles = this.state.starArray.map(favfile => {
        let fileName
        let datum
        let date_input
        let size
        let newSize
        let i

        fileName = favfile.metadata.name;
        size = favfile.metadata.size;
          i = Math.floor(Math.log(size) / Math.log(1024));
          newSize = (size / Math.pow(1024, i)).toFixed(2) * 1 + ""+['B', 'kB', 'MB', 'GB', 'TB'][i]

        date_input = new Date((favfile.metadata.client_modified));
        datum = new Date(date_input).toDateString();
         console.log(favfile);
          return (
          <a onClick={() => this.downloadFile(favfile.metadata.path_display)} href={this.state.URL} download={fileName} className="favfile" key={favfile.id}> <br /> {favfile.metadata.name} {" Latest change: " + datum} { " Filesize: " + newSize} </a>
          )
        })
      
      const { folders, files, URL } = this.state;
      
      let minaFiler = files.map(file => {
        console.log(file);
        let image = `data:image/jpeg;base64,${file.thumbnail}`;
        let fileName
        let date_input
        let datum
        let size
        let newSize
        let i
        if(file[".tag"] === "failure"){
          return null
        }
        else {

          fileName = file.metadata.name;
          date_input = new Date((file.metadata.client_modified));
          datum = new Date(date_input).toDateString();

          size = file.metadata.size;
          i = Math.floor(Math.log(size) / Math.log(1024));
          newSize = (size / Math.pow(1024, i)).toFixed(2) * 1 + ""+['B', 'kB', 'MB', 'GB', 'TB'][i]

        }
        return (
          <tr>
            <td className="li" ref={this.myRef} onClick={this.star}>
            <div style={{ display: 'flex' }} >
              <img src={image} style={{ height: '42px', width: '42px' }} alt=""/>
              <a onClick={() => this.downloadFile(file.metadata.path_display)} href={URL} download={fileName}>{fileName}</a>

              {" Latest change: " + datum}
              
              {" Filesize: " + newSize}

              <input className="checkbox" type="checkbox"  id={file.id} onChange={this.starFile.bind(this, file)} /> 
              {/* <button onClick={this.moveFiles}>Move</button> */}
            </div>
            </td>
          </tr>
        )
      })

      let minaFolders = folders.map(folder => {
        // render img icons to folders !

        const type = folder['.tag'];
        let folderThumbnail

        if (type === 'folder') {
          folderThumbnail = folderImg;
        return (
          <tr>
            <td>
            <div style={{ display: 'flex' }}>
            <img src={folderThumbnail} style={{ height: '42px', width: '42px' }} alt=""/>
                <Link to={`/main${folder.path_display}`}>
                  {folder.name}
                </Link>

                <td className="dropdownList">
                <DropdownOptions
                  onDelete={this.onDelete}
                  path={folder.path_display}
                  name={folder.name}
                  />
                  </td>
            </div>
            </td>
          </tr>
        )
      }
      })

        return (
          <div className="App" >
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
            <li>Transfer </li>
          </ul>
        </div>

        <div className={"bigBox"}>
          <header>
            <h1>Project X</h1>
              <input placeholder="Search" type="text" />
              <LogOut />
          </header>

          <main>

          <div className="files">
                <table className="table">
                    <thead>
                      <tr>
                        <th>Folder/file name</th>
                      </tr>
                  </thead>

                  <tbody>
                  <h2>Folders!</h2>
                    {minaFolders}

                  <h2 style={{ marginTop: '10%' }}>Files!</h2>
                    {minaFiler}
                  <h2 style={{ marginTop: '10%' }} >Favorites</h2>
                  {favFiles}
                  
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

 //  moveFiles = () => {

  //   const rename = {
  //     from_path: "/doglogo.png",
  //     to_path: "/get started with dropbox.pdf"
  //   };
  //   // this.state.files.filesMoveV2(rename);
  //   //  let currentpath = 'http://localhost:3000/main' + window.location.href;
  //   //  let newpath = 
  //     //  let  move = 
  //     //  {
  //     //    'path_from': currentpath,
  //     //   //  'path_to': newpath,
  //     //  }

  //     // this.setState({
  //     //   popup: true
  //     // })

  //     //  Dropbox.filestomovev2(move);
  //  }


 //  onChange = (e) => {
  //   this.setState({
  //     checked: e.target.checked,
  //   })
  //  }
    
//    star = (e) => {
//      let favorites = JSON.parse(localStorage.getItem('favorites'));
//     let id = e.target.id,
//   item = e.target,
//   index = favorites.indexOf(id);
  
// // return if target doesn't have an id 
// // if (!id) return;
// // // item is not favorite
// // if (index == -1) {
// // favorites.push(id);
// // item.className = 'fav';
// // // item is already favorite
// // } else {
// // favorites.splice(index, 1);
// // item.className = '';
// // }

// // localStorage.setItem('favorites', JSON.stringify(favorites));
// }