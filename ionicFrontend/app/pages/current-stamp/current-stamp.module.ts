import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentStampPageRoutingModule } from './current-stamp-routing.module';

import { CurrentStampPage } from './current-stamp.page';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    CurrentStampPageRoutingModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  declarations: [CurrentStampPage]
})
export class CurrentStampPageModule {}
