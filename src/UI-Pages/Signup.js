import React, {Component} from 'react';
import { Container,TextField,Box,Typography,Button,CircularProgress,Snackbar,
    FormControlLabel,Switch
} from '@mui/material';
import {Link} from 'react-router-dom';
import Logo from '../media/logos/mainlogo.svg';
import { firebaseAuth } from '../firebase';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}


class Signup extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 snakbar:false,
			 email:"",
			 password:"",
			 confirm_Password:"",
			 user_name:"",
             signup:"signup",
             email_error:null,
             password_error:null,
             confirm_Password:null,
             name_error:null
		}
	}

	handleChange = (e) =>{		
		this.setState({
			[e.target.name]:e.target.value,
		})
        this.setState({
            password_error:null,
            confirm_password_error:null,
            name_error:null,
            email_error:null,
        })
	}

	formSubmitted=()=>{
		let validData=true;

        this.setState({
            password_error:null,
            confirm_password_error:null,
            name_error:null,
            email_error:null,
        })
	   

		if (this.state.email === "") {
			this.setState({email_error:"Requried"});
			validData=false;
            return;			
		}

        if(!validateEmail(this.state.email)){
            this.setState({email_error:"invalid"});
			validData=false;
            return;		
        }
        
        if (this.state.user_name==="") {
			this.setState({name_error:"required"});
			validData=false;
            return;
		}

		if (this.state.user_name.length>0 && this.state.user_name.length<2) {
			this.setState({name_error:"invalid"});
			validData=false;
            return;
		}

		if (this.state.user_name.length>54) {
			this.setState({name_error:"invalid"});
			validData=false;
            return;
		}

		if (this.state.password === "") {
            this.setState({password_error:"Requried"});
			validData=false;
            return;	
		}

        if (!checkPassword(this.state.password)) {
            this.setState({password_error:"week password"});
			validData=false;
            return;			
		}

		if (this.state.confirm_Password !== this.state.password) {
            this.setState({confirm_password_error:"password mismatch"});
			validData=false;
            return;
		}

		

		if(validData){
            console.log("err");
            this.setState({
                signup:"loading..."
            })

            firebaseAuth.createUserWithEmailAndPassword(this.state.email,this.state.password).then((res)=>{
                console.log("Sign up success");
				firebaseAuth.currentUser.sendEmailVerification().then(()=>{
					console.log("email verification sent");
				}).catch(e=>{
					console.log("error in sending email verification");
				})
                this.props.loginsuccess();
            }).catch((e)=>{
                console.log("err");
				this.setState({
					signup:"sign up",
					email_error:"already in use"
				})
                console.log(e.message);
            })
        }
	}


	render() {
		return (
			<div>
			<h1 className="headingd">Curriculum Cache</h1>
		    <Container 
		    maxWidth="xs" 
		    style={{
		    textAlign:"center"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 textAlign="center" 
			 p="24px" 
			 mt="20px" 
			 borderRadius="13px">
			 <img 
			 src={Logo} 
			 alt="logo" 
			 height="70px" 
			 width="70px"/>
			 <br/>
			 <Typography 
			 style={{color:"#371a8a"}}
			 variant="h4" 
			 color="secondary">
             SIGN UP 
             </Typography>
             
	          
	          <br/><br/>
			  <TextField
	          label="Email"
	          fullWidth
	          error={this.state.email_error!=null}
	          helperText={this.state.email_error}
	          type="email"
	          onChange={this.handleChange}
	          name="email"
	          variant="outlined"
	          size="small"
	          />
              
              <br/><br/>
	          <TextField
	          label="User name"
	          fullWidth
	          error={this.state.name_error!=null}
	          helperText={this.state.name_error}
	          type="text"
	          onChange={this.handleChange}
	          name="user_name"
	          variant="outlined"
	          size="small"
	          />
	         
	          <br/><br/>
	          <TextField
	          label="Password"
	          error={this.state.password_error!=null}
	          helperText={this.state.password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="password"
	          fullWidth
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="confirm Password"
	          error={this.state.confirm_password_error!=null}
	          helperText={this.state.confirm_password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="confirm_Password"
	          fullWidth
	          variant="outlined"
	          size="small"
	          />
			  <br/><br/>
	          
	          <Button 
			  style={{
				backgroundColor: "blueviolet"}}
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              {this.state.signup}
              </Button>

              <br/><br/>
              <Typography>
              Already have an account ?  
              <Link to="/Login" >
               Sign In
              </Link>
              </Typography>

              <Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snakbar}
		        autoHideDuration={1000}
		        onClose={e=>this.setState({
		          snakbar:false
		        })}
		        message={this.state.snackbar_error}
		        
        	/>
			 </Box>
			 <br/><br/>
			 <br/><br/>
			 
			</Container>
			</div>
		)
	}
}

export default Signup;