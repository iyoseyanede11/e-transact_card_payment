import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPageRoutingModule } from './card-page-routing.module';
import { CardPageComponent } from './card-page.component';
import { CardInputsComponent } from 'src/app/components/card-inputs/card-inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CardPageComponent, CardInputsComponent],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CardPageModule { }
