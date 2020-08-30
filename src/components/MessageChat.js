import React, { Component } from 'react'
import '../MessageChat.css'
import fir from '../Config'

class MessageChat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:[],
             messages:[],
             count:0
        }
    }
    
    

    handlemessagechange = (e) =>{   
        this.setState({message:e.target.value})
       
    }
    scrollToBottom = () =>{

       let scroll =  document.getElementById('mess');
 
      scroll.scrollTop = scroll.scrollHeight;

    }
      
    
    foo =  ()=> {
       
     
     fir
     .database()
     .ref(`/${fir.auth().currentUser.uid}/dialogs/${this.props.id}`)
     .push(this.state.message  + ' ').then( this.setState({
        count:this.count+1,
        message:[],
        
    }))

     fir
     .database()
     .ref(`/${this.props.id}/dialogs/${fir.auth().currentUser.uid}`)
     .push(this.state.message).then( this.setState({
        message:[],
        count:this.count+1,
        
        
    } ) ) 

   
    fir
    .database()
    .ref(`/${fir.auth().currentUser.uid}/dialogs/${this.props.id}`)
    .on("value", ()=> {
       fir.database().ref('/UserIp/count').once('value').then((snapshot) => {let obj = snapshot.val();fir.database().ref('/UserIp/count').set(obj+1)})
    }) 
     
     
     fir
        .database()
        .ref(`/${fir.auth().currentUser.uid}/dialogs/${this.props.id}`)
        .once("value")
        .then((snapshot) => { 
            let obj = snapshot.val();
            
             let n = Object.values(obj);
             this.setState({
                 messages:n
             })
             this.scrollToBottom()
        }) 
        var frm = document.getElementById('input')
         frm.value = ''
    }
    
    
    componentDidMount() {
      
        
       
        
       
        this.scrollToBottom()
        fir
        .database()
        .ref(`/${fir.auth().currentUser.uid}/dialogs/${this.props.id}`)
        .on("value",(snapshot) =>{ 
            let obj = snapshot.val();
            let n;
             if (obj && true) {n = Object.values(obj)};
             
             this.setState({
                 messages:n
             })
             
             this.scrollToBottom()
        
        })
       
      
        
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    render() {
       const  mystyle = {marginLeft:'90%'}
       
        return (
            <div id = 'masschat'>
               
                   <div id = 'mess'> {this.state.messages && true  ? this.state.messages.map((message,i) => 
                    (message  !== ' ')? 
                    (message[message.length-1] == ' ') ? 
                   <h3 className = 'smspost' key = {i}> {message} <svg height="18" width="18"  style = {mystyle} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill="none">
                       <path d="M0 0h16v16H0z"></path>
                   <path d="M8 16A8 8 0 118 0a8 8 0 010 16zM6.8 8.836L5.257 7.293a1 1 0 00-1.414 1.414l2.25 2.25a1 1 0 001.414 0l4.25-4.25a1 1 0 10-1.414-1.414L6.8 8.836z"
                    fill="rgba(134, 142, 153, 0.5)"></path></g></svg></h3>:<h3 className = 'smsget' key = {i}>{message}</h3>:null):null}
                   
                   </div>

                    <input id = 'input' placeholder = 'Write' onChange = {this.handlemessagechange}></input>
                    <button onClick = {this.foo} >Send</button>
                    
            </div>
        )
    }
}

export default MessageChat
