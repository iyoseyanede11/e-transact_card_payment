import { from } from "rxjs";
import { Action } from '@ngrx/store';
import { CardDetails } from '../models/card-detail.model';

export enum CardPaymentActionTypes {
    MAKE_PAYMENT = '[CARD] Make Payment'
}

export class MakePaymentAction implements Action {
    readonly type = CardPaymentActionTypes.MAKE_PAYMENT

    constructor(public payload: CardDetails) {}   
}

export type PaymentAction = MakePaymentAction