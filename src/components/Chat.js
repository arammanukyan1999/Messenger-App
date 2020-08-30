import React, { Component, Fragment,useEffect } from 'react'
import MessageChat from './MessageChat'
import  '../chat.css'
import SignUp from './SignUp'
import fir from '../Config'



export class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             openchat:false,
            //  count:-1,
             name:'',
             
             
        }
    }
        
   
   
   

 
    
    

    foo = () =>{
        
        this.setState({
            openchat:!this.state.openchat,
            
            
        }) 

        // if (this.state.openchat) {
        //     // fir.database().ref('/UserIp/count').set(0)
        //     // this.setState({count:0})
        // }
        // fir
        // .database()
        // .ref(`/${this.props.id}`)
        // .once("value")
        // .then((snapshot) => { 
        //     let obj = snapshot.val();
            
            
        //      this.setState({name:obj.username})
             
        //         console.log(this.state.name)
        // })

        
        
        
    }
    // componentDidMount() {      
    //     fir
    //     .database()
    //     .ref(`/${this.props.id}/dialogs/${fir.auth().currentUser.uid}`)
    //     .on("value", ()=> {
    //        fir.database().ref('/UserIp/count').once('value').then((snapshot) => {let obj = snapshot.val();fir.database().ref('/UserIp/count').set(obj+1)})
    //     })  
       
    // }

    // componentDidMount (){
    //     fir.database().ref('/UserIp/count').once('value').then((snapshot) => {let obj = snapshot.val(); this.setState({count:obj})})
       
    // }

    
    
    
    render() {
        return (
           

            <Fragment>
                 
                
                <div onClick = {()=>this.foo()} id = 'chat'>
                {/* this.props.nameuser == this.state.name ?  (this.state.openchat || this.state.count == 0) ? null: */}
               <div  className = 'usersinchat'> {this.props.nameuser}  </div>
               
           </div>
             { this.state.openchat ? ( <MessageChat  id={this.props.id} uidAndName= {this.props.el} index = {this.state.index}></MessageChat> ):null}
                 
            </Fragment>
           
         
        )
    }
}

export default Chat
