import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { ContactDetailsPageComponent } from './components/contact-details-page/contact-details-page.component';
import { AddContactModalComponent } from './components/add-contact-modal/add-contact-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    ContactDetailsPageComponent,
    AddContactModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
