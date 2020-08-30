import React, { Component } from 'react'
 import axios from  'axios'

export default class UploadFile extends Component {
    constructor(props){
        super(props)
        this.state = {
            file:''
        }

        }

        chooseFile = (e)=>{
            this.setState({
                file:e.target.files[0]
            })
            console.log(e.target.files[0])
        }
        fileUpload = () =>{
           axios.post('')}

    
    render() {
        return (
            <div>
                 <input type = 'file' name = 'file' onChange = {this.chooseFile}/>
                          <button onClick = {this.fileUpload}>Upload</button>
            </div>
        )
    }}

