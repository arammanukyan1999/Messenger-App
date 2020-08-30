import React, { Component, Fragment } from 'react'
import Chat from './Chat'

import fir from  '../Config'
import '../loggedin.css'


 class Loggedin extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              userName:[],
              onlineuser:'',
              useremail:[],
              index:null
         }
     }
     
    componentDidMount () {  
        // let lastSignTime = fir.auth().currentUser.metadata.lastSignInTime 
        //  this.setState({
        //    lastSignIn:lastSignTime
        //  })
        fir.auth().onAuthStateChanged((user) => {
            if (user) {
            this.props.name()  
           
            localStorage.setItem("user", user.uid);
              this.setState({
                useremail:user.email
              })
              return;} 
          })
          fir
          .database()
          .ref("/")
          .once("value")
          .then((snapshot) => {
               let obj = Object.entries(snapshot.val())
               obj.map((elem,i)=> { if (elem[0] == 'UserIp')  obj.splice(i,1)})
                
               let nameanduid = []
                let onlineuseruid = fir.auth().currentUser.uid;
                 
                 obj.map((elem,i)=> { 
                 nameanduid.push([elem[0],elem[1].username])
                  if (elem[0].indexOf(onlineuseruid) >=0) {this.setState({index:i}) }
                })
                 this.setState({userName:nameanduid})
                

                  this.setState({
                    onlineuser:this.state.userName[this.state.index][1]
                  })
              })
        }

          

          logOut = ()=>{
            fir.auth().signOut();
            this.props.change();
          }

          foo = () =>{
            { this.props.element.id = 'Sign'
                  
        }
          }
    render() {

       

        return (

            <Fragment>
             
          <div id = 'login'>{this.state.userName.map((user,i) => {  if (i !== this.state.index) return  <Chat el = {this.state.userName} nameuser = {user[1]}id={user[0]} key = {i}></Chat>})}</div>  

                 <div id = 'logout'> <h3>Welcome { this.state.onlineuser }</h3> <button onClick = {this.logOut }>Log Out</button> </div> 
            </Fragment>
            
            
        )
    }
}

export default Loggedin
