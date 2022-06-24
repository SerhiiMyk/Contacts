import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss']
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  contactData = this.activatedRoute.snapshot.params['id']
  length = 2
  private sub!: Subscription


  constructor(private contactsService: ContactsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.sub = this.contactsService.getContactById(id).subscribe(data => {
      this.contactData = data
      this.length = data.phoneNumbers.length
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
