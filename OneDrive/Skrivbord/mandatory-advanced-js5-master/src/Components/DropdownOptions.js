import React, { Component, PureComponent } from 'react'
import '../Css/Options.css'
import ClickedOutsideRemover from './ClickedOutsideRemover'
import DeleteWindow from './DeleteWindow'

class DropdownOptions extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      deleteButtonClicked: false
    }
  }

  // Shows the window asking the user if they want to delete
  onDeleteButtonClicked = () =>{
    this.setState({deleteButtonClicked: true})
  }
  // closes the delete window if you click avbryt or X
  onCloseDeleteWindow = () =>{
    this.setState({deleteButtonClicked: false})
  }

  render(){
  const{onDelete,path,name} = this.props
  const{deleteButtonClicked} = this.state
  return(
  <div>
  <div className="dropdown">
  <span>...</span>
  <ClickedOutsideRemover>
    <div className="dropdown-content">
    <div className="dropdown-list" onClick={this.onDeleteButtonClicked}>delete</div>
    <div className="dropdown-list">ladda upp</div>
    </div>

  </ClickedOutsideRemover>
  {deleteButtonClicked ?
   <DeleteWindow onCloseDeleteWindow={this.onCloseDeleteWindow} path={path} onDelete={onDelete} name={name}/>
   : null}
  </div>
  </div>

)}}



export default DropdownOptions
