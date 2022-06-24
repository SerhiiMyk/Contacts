import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/contact.interface';
import { environment } from '../../environments/environment';
import { IQuery } from '../interfaces/query.interface';
import { IReceive } from '../interfaces/receive.interface';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) {
  }

  getContacts(queryParams: IQuery): Observable<IReceive> {
    let url = `${ environment.API }users?search=${ queryParams.search }&sort=${ queryParams.sort }&page=${ queryParams.page }&quantity=${ queryParams.quantity }`
    return this.httpClient.get<IReceive>(url)
  }

  getContactById(id: number): Observable<IContact> {
    return this.httpClient.get<IContact>(`${ environment.API }userbyid/${ id }`)
  }

  addContact(newContact: IContact): void {
    this.httpClient.post(`${ environment.API }adduser`, newContact)
      .subscribe(() => {
      }, (e) => console.log('add:', e.status))
  }

  updateContact(id: number, editContact: IContact): void {
    this.httpClient.put(`${ environment.API }updateuser/${ id }`, editContact)
      .subscribe(() => {
      }, (e) => console.log('update:', e.status))
  }

  deleteContact(id: number): void {
    this.httpClient.delete(`${ environment.API }deleteuser/${ id }`)
      .subscribe(() => {
      }, (e) => console.log('delete:', e.status))
  }
}
