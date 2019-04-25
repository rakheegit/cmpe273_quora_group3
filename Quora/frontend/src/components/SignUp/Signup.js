import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form"
import { signUp } from "../../actions";

//Define a Login Component
class Signup extends Component{

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <input className="form-control" pattern={field.pattern} type={field.type}{...field.input} placeholder={field.label} required/>
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.signup_msg !== this.props.signup_msg;
  }
   
      onSubmit(values) {
        console.log(values);
        this.props.signUp(values, () => {
            if(cookie.load('cookie_user')){
                this.props.history.push("/main/home");
          }
        });
      }

    render() {
        const { handleSubmit } = this.props;
        if(this.props.authFlag){
            this.props.history.push("/main/home");
        }
         return(
             <div>
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                     <h2>Canvas App</h2>
                     <p id='msg'>{this.props.signup_msg}</p>
                             </div>
                             <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                             <Field
                            label="Username"
                            name="username"  
                            type="text"         
                            component={this.renderField}/>
                            <Field
                            label="Email"
                            name="email_id"  
                            type="email"         
                            component={this.renderField}/>
                           <Field
                            label="Password"
                            name="password"  
                            type="password"         
                            component={this.renderField}/>

                                 <button onClick={this.submitLogin} class="btn btn-primary">Sign Up</button> 
                                 </form>     
                            <br></br>
                            <br></br>
                            <a href='\login'>Login</a> if already registered
                     </div>
                </div>
                 </div>
                 </div>
        )
    }
}


  
  function mapStateToProps(state) {
    return {
      signup_msg: state.signup_msg,
      initialValues: { role: '1' },
      authFlag:state.authFlag
    }
  }
  
export default reduxForm({
    form: "SignUpForm",
    enableReinitialize:true
  })(connect(mapStateToProps, { signUp })(Signup));