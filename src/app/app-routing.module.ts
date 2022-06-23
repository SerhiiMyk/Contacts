import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { ContactDetailsPageComponent } from './components/contact-details-page/contact-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsPageComponent },
  { path: 'contacts/:id', component: ContactDetailsPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
