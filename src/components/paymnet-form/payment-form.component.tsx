import {CardElement,useStripe, useElements } from '@stripe/react-stripe-js'
import {BUTTON_TYPES_CLASSES} from '../button/button.component'
import {PaymantFormContainer , FromContainer , PaymentButton} from './payment-form.styles'
import { useState, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'


const PaymentForm = () =>{
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const CurrentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProccessingPaymant] = useState(false);


    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if(!stripe || !elements){
            return;
        }

        setIsProccessingPaymant(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({amount:amount*100})
        }).then( res => res.json());




        const {paymentIntent: {client_secret}} = response

        const CardDetails = elements.getElement(CardElement);

        if(CardDetails === null) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret , {
            payment_method: {
                card: CardDetails,
                billing_details : {
                    name: CurrentUser? CurrentUser.displayName : "Guest",
                }
            }
        })

        setIsProccessingPaymant(false);
        if(paymentResult.error){
            alert(paymentResult.error.message);

        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Success')
            }
        }
    }

    
   


return(

    <PaymantFormContainer>
        <FromContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
         isLoading={isProcessingPayment}
         buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay Now!</PaymentButton>
        </FromContainer>
    </PaymantFormContainer>

)}

export default PaymentForm