import React, { Component, Fragment } from 'react'
import Loggedin from './Loggedin'
import '../Style/SignUp.css'
import fir from  '../Config'
 



 class SignUp extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              name : [],
              email:[],
              password:[],
              isSignUp:true,
              isValid:true,
              isok:false,
              registred:false,
              
         }

         
         
        
     }
     componentDidMount () {
       
          
        fir.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({isok:true})
           
            localStorage.setItem("user", user.uid);
             
              return;} else localStorage.removeItem("user");
           
          })}

     changename = ()=>{
         this.setState({
             isok:true
         })
     }
     

     handleUserNameChange = (e) => {
         this.setState ( {
            inputname: e.target.value   
            
         }) 
     }
     handleUserEmailChange = (e) =>{
        
        this.setState ( {
            inputemail: e.target.value
            
         })
     }
     handleUserPasswordChange = (e) => {
        this.setState ( {
            inputpassword: e.target.value
            
         })
     }
     reccuringData = (e,arr) =>{
        if (arr.indexOf(e) == -1) {
        return true } else return false
     }
     handleUseremailsignin = (e) =>{
        this.setState({
            useremail :e.target.value,
            userid:1
        })
     }
     handleUserpasswordsignin = (e)=>{
         this.setState({
             userpassword:e.target.value
         })
     }
     
       
     handleUsersignin = () =>{
        
        let x = this.state.useremail;
        let y = this.state.userpassword;
        if (x&&y) {
        fir.auth().signInWithEmailAndPassword(x,y).then(cred =>  {           
           this.setState({
                         isok:true
                    })  }      
                    
                    ).catch((err)=> this.setState({
                                 isok:false,
                                 registred:true
                             }) )} else this.setState({
                                 isok:false,
                                registred:true
                            })

                          
                          
     }

     changetype = () =>{
        this.setState({
            isok:false
        })
        fir.auth().signOut().then()
        window.location.reload(false)
    }
    // returnSignup = ()=>{
    //      this.setState ({isSignUp:false,isValid:true})
    //      window.location.reload(false)
        
    // }
    
    logOutt = ()=>{
        fir.auth().signOut();
        this.setState ({isSignUp:false,isValid:true});
      }


      
       
     handleSubmit = () =>{
        let x = this.state.inputname;
        let y = this.state.inputemail;
        let z = this.state.inputpassword;
         if (x && y && z && true &&  this.reccuringData(y,this.state.email) && this.reccuringData(z,this.state.password)){
            fir.auth().createUserWithEmailAndPassword(y,z).then(cred => { 
                this.setState ({
                         isSignUp:true
                     }) 
                     
                     let name = {email:y,username:x,dialogs:{1:'hi'}};
                     fir
                     .database()
                     .ref(`/${fir.auth().currentUser.uid}`)
                     .set(name)

                                     
                    //  window.location.reload( this.logOutt())
                    } ).catch( function (error) {
                var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
              alert('Email already in use.');
            } else {
              alert(errorMessage);         
            }
            
            
        }); 

    } else this.setState({
        isValid:false
     })
    }
     
    render() {
        return (
            <div className = 'sign'>

                  
               { !this.state.isok ? <div id = 'SigninLogin'> 
                      {this.state.isSignUp ? <Fragment><p>Sign Up Successfully End</p>  <button  onClick = {this.logOutt}  >SIGN UP</button></Fragment> :null}
                    <h1>Welcome Back</h1>
                    <p>To keep conecting</p>
                    
                     <input type = 'email' placeholder = 'Email' onChange = {this.handleUseremailsignin}/>   
                     <br/>      
                     <input type = 'password' placeholder = 'Password' onChange = {this.handleUserpasswordsignin} /> 
                     <br/>
                    <button onClick = {this.handleUsersignin} > SIGN IN </button>
                    {this.state.registred? <h1>Please Sign Up</h1>:null}
                     <h1 style={{color: "blue"}}>You can use the demo version.</h1>
                     <h3 style={{color: "blue"}}>Email : messdemo@gmail.com </h3>
                     <h3 style={{color: "blue"}}>Password : demo123</h3>

        </div>:<Loggedin   name = {this.changename} change = {this.changetype} element = {document.getElementsByClassName('sign')[0]}> </Loggedin>}
              
               {((!this.state.isSignUp) && (!this.state.isok ))?  <div  id = 'SignupLogin'> 
                    <h1>Create Account</h1>
                    <div>bla </div>
                    <p>or use your email for registration</p>
                       <form>
                        <input  type = 'text' placeholder = 'Name' onChange = {this.handleUserNameChange}></input>
                        <br/>
                        <input type = 'email' placeholder = 'Email' onChange = {this.handleUserEmailChange}></input>
                        <br/>
                        <input type = 'password' placeholder = 'Password' onChange = {this.handleUserPasswordChange}></input>
                        <br/>
                        
                         
                        </form>
                        <button  onClick = {this.handleSubmit} >SIGN UP</button>
                        {!this.state.isValid ? <p>Please write data</p>:null}
                             
                      
                </div>:null } 
            </div>
        )
    }
}

export default SignUp
