import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Subscription } from 'rxjs';
import { IQuery } from '../../interfaces/query.interface';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  query: IQuery = { quantity: 50, page: 1, search: '', sort: null }
  contacts: IContact[] = []
  length!: number
  searchStr = ''
  showModal = false

  private sub: Subscription[] = []

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.getContactsSub()
  }

  ngOnDestroy(): void {
    this.sub.forEach(item => item.unsubscribe())
  }

  getContactsSub() {
    this.sub.push(
      this.contactsService.getContacts(this.query).subscribe(data => {
        this.contacts = data.users
        this.length = data.length
      })
    )
  }

  search() {
    let capitalize = ''
    if (this.searchStr.length !== 0) {
      capitalize = this.searchStr.charAt(0).toUpperCase() + this.searchStr.slice(1)
    }
    this.query.search = capitalize
    this.getContactsSub()
  }

  cleanSearchField() {
    this.searchStr = ''
    this.query.search = ''
    this.getContactsSub()
  }

  sort(direction: string) {
    this.query.sort = direction
    this.getContactsSub()
  }

  delete(id: number) {
    this.contactsService.deleteContact(id)
    setTimeout(() => {
      this.getContactsSub()
    }, 50)
  }
}
