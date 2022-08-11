import SingUpForm from '../../components/sign-up-form/sign-up-form.component';
import SingInForm from '../../components/sign-in-form/sign-in-form.component';
import '../../routes/authentication/autentication.styles.scss'
const Authentication = () => {



    return (
        <div className='authentication-container'>
            <SingInForm />
            <SingUpForm />
        </div>
    )
}

export default Authentication