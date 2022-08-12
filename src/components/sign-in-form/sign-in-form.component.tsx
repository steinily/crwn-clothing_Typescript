import { useState  , FormEvent, ChangeEvent} from "react";
import FormInput from "../form-imput/form-input.component";
import '../../components/sign-in-form/sign-in-form.styles.scss'
import Button ,{BUTTON_TYPES_CLASSES }from "../button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSingInStart } from "../../store/user/user.action";
import { AuthError} from "firebase/auth";

const defaultformFields ={
    email: '',
    password: '',
}



const SingInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email,password} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultformFields)
    }
    

    const signInWithGoogle = async () => {
        dispatch(googleSingInStart)
        
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            // eslint-disable-next-line
            dispatch(emailSignInStart(email,password))
            
            resetFormFields();
        }catch(error){
            switch((error as AuthError).code){
                case 'auth/wrong-password': 
                    alert('Incorect Email or password')
                    break;
                case 'auth/user-not-found':
                    alert('Incorect Email or password')
                    break;
                default:
                    console.log(error)
            }
         
        }

    }

    const handleChange= (event : ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target;
    setFormFields({...formFields,[name]: value})
    };


    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign up whit your email and password</span>
            <form onSubmit={handleSubmit}>
       

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
              

                <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
                </div>
            </form>

        </div>



    )
}

export default SingInForm;