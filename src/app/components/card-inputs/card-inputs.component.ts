import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, delay, first, retryWhen, take, tap } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment.service';
import { CardDetails } from 'src/app/store/models/card-detail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/app-state.model';
import { MakePaymentAction } from 'src/app/store/actions/payment.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-inputs',
  templateUrl: './card-inputs.component.html',
  styleUrls: ['./card-inputs.component.scss']
})
export class CardInputsComponent implements OnInit, OnDestroy {

  constructor(protected paymentService: PaymentService, protected store: Store<AppState>, protected router: Router) { }
 
  ngOnInit(): void {
    document.getElementById("greaterThanToday").setAttribute('min', this.today);
  }
  today = new Date().toISOString().split('T')[0];

  // initialization of card form
  cardDetailsForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9 ]*$')]),
    cardHolder: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.minLength(3), Validators.pattern('^[0-9]*$')]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')])
  })

  // cardDetailsForm getters
  get cardNumber(){ 
    return this.cardDetailsForm.get('cardNumber')
  }
  get cardHolder(){ 
    return this.cardDetailsForm.get('cardHolder')
  }
  get expirationDate(){ 
    return this.cardDetailsForm.get('expirationDate')
  }
  get cvv(){ 
    return this.cardDetailsForm.get('cvv')
  }
  get amount(){ 
    return this.cardDetailsForm.get('amount')
  }

  // method for auto spacing input
  formatInput = (e): void => {
    e.target.value = e.target.value.replace(/(\d{4})(\d+)/g, '$1 $2')
  }

  // method to make payment
  loading: boolean;
  paymentObservableSubscription: Subscription;
  successMessage: string;
  errorMessage: string;
  cardDetails:Observable<CardDetails>

  makePayment = () => {
    this.successMessage = null;
    this.errorMessage = null;
    this.loading = true;
    this.cardDetailsForm.disable();
    const requestPayload = this.cardDetailsForm.value;
    this.paymentObservableSubscription = this.paymentService.makePayment(requestPayload)
    .pipe(
      tap(object => console.log(object)),
      retryWhen(error => error.pipe(
        delay(4000),
        take(3)
      )),
      first(value => true),
      catchError((error: HttpErrorResponse) => {
        this.cardDetailsForm.enable();
        this.errorMessage = "Payment Not Successful";
        this.showToast();
        this.loading = false;
        return throwError(error)
      })
      )
      .subscribe(
      (res: any) => {
        this.cardDetailsForm.enable();
        this.loading = false;
        this.successMessage = "Payment Successful";
        this.showToast();
        this.cardDetailsForm.reset();
        this.store.dispatch(new MakePaymentAction(requestPayload));
        setTimeout(() => this.router.navigate(['/success']), 5000)
      },
    )
  }

  // method that shows toast
  showToast = () :void => {
    let toast = document.getElementById("snackbar");
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 4000);
  }
  
  // unsubscribe from observables when the component is destroyed to avoid memory leaks
  ngOnDestroy(): void{
    if(this.paymentObservableSubscription)
    this.paymentObservableSubscription.unsubscribe();
  }
}
