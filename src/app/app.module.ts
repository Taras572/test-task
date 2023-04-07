import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './pages/product-list/product-list.component';


import { environment } from '../environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { getApp, initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

import { provideStorage } from '@angular/fire/storage';
import { provideDatabase } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.backApi)),
    provideStorage(() => getStorage(getApp(), 'anotherBucket')),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
