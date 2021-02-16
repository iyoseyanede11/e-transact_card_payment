import { CardPaymentActionTypes, PaymentAction } from "../actions/payment.actions"
import { CardDetails } from "../models/card-detail.model"

const initialState: CardDetails = {
    cardNumber: '',
    cardHolder: '',
    amount: 0,
    expirationDate: '',
    cvv: ''
}

export function PaymentReducer(state: CardDetails = initialState, action: PaymentAction ){
    switch (action.type){
        case CardPaymentActionTypes.MAKE_PAYMENT:
            return action.payload;
        default:
            return state;
    }
}