import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-imput/form-input.component";
import '../../components/sign-up-form/sign-up-form.styles.scss'
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";

const defaultformFields ={
    displayname: '',
    email: '',
    password: '',
    confirmpassword: ''
}



const SingUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayname,email,password,confirmpassword} = formFields;
    const dispatch= useDispatch()
  

    const resetFormFields = () => {
        setFormFields(defaultformFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmpassword){
            alert("Passoword do not match!")
        }

        try{
            dispatch(signUpStart(email,password,displayname))
            resetFormFields()

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }else{
            console.log('user creation encountered an error',error)}
        }

    }

    const handleChange= (event) => {
        const {name , value} = event.target;
    setFormFields({...formFields,[name]: value})
    };


    return(
        <div className="sign-up-container">
            <h2>Don't have an accont?</h2>
            <span> Sign up whit your email and password</span>
            <form onSubmit={handleSubmit}>
       
               <FormInput
                    label='Display name'
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayname' 
                    value={displayname}/> 
       

               <FormInput 
                    label='email'
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}/> 
             

               <FormInput 
                    label='Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}/> 
              

               <FormInput 
                    label='Confirm Password'
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='confirmpassword' 
                    value={confirmpassword}/> 
                <Button type='submit'>Sign Up</Button>
            </form>

        </div>



    )
}

export default SingUpForm;