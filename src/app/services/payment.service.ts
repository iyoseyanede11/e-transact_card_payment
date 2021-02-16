import { Injectable } from "@angular/core";
import { HttpClient,} from '@angular/common/http';
import { CardDetails } from 'src/app/store/models/card-detail.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(public http: HttpClient) { }

    makePayment = (resource: CardDetails) => this.http.post('http://602aa4106c995100176eeb53.mockapi.io/api/v1/make_payment', resource);
}