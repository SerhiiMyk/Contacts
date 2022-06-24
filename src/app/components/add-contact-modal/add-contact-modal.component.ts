import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { IContact } from '../../interfaces/contact.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.scss']
})
export class AddContactModalComponent implements OnChanges {
  @Input() modal = true
  @Input() contact!: IContact
  @Output() modalEmit: EventEmitter<any> = new EventEmitter()
  @Input() numberOfPhoneInputs: number = 1

  title = 'Create new contact'
  btnName = 'Create'

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumbers: new FormArray([], [Validators.required, this.phoneValidator])
  })
  phoneNumbersArr: FormArray = this.form.get('phoneNumbers') as FormArray

  constructor(private contactsService: ContactsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnChanges(): void {
    if (this.contact.phoneNumbers) {
      this.title = 'Edit contact'
      this.btnName = 'Edit'
      this.form.controls['name'].setValue(this.contact.name)
      let inputArr = document.getElementsByClassName('phone')
      for (let i = 0; i < inputArr.length; i++) {
        (inputArr[i] as HTMLInputElement).value = this.contact.phoneNumbers[i]
      }
    }
  }

  submitForm() {
    let newContact = { ...this.form.value }
    newContact.name = newContact.name.charAt(0).toUpperCase() + newContact.name.slice(1)
    if (this.modal) {
      this.contactsService.addContact(newContact)
      this.modalEmit.emit(true)
    } else {
      const id = +this.activatedRoute.snapshot.params['id']
      this.contactsService.updateContact(id, newContact)
      this.router.navigate(['contacts'])
    }
  }

  closeModal() {
    this.modalEmit.emit(false)
  }

  pushToArr(event: Event, ind: number) {
    this.phoneNumbersArr.removeAt(ind)
    this.phoneNumbersArr.insert(ind, new FormControl((event.target as HTMLInputElement).value))
  }

  removeLastPhone(ind: number) {
    this.phoneNumbersArr.removeAt(ind)
    this.numberOfPhoneInputs -= 1;
  }

  phoneValidator(array: FormArray) {
    let res = null
    for (const control of array.value) {
      const regex = /(?=.*[a-zA-z])|(?=.*[#$@!%&*?])/.test(control)
      if (control.length !== 13 || !control.includes('+380') || regex) {
        res = { lengthError: true }
        break
      }
    }
    return res
  }

  addPhoneField() {
    if (this.numberOfPhoneInputs < 3) {
      this.phoneNumbersArr.insert(this.numberOfPhoneInputs, new FormControl(''))
      this.numberOfPhoneInputs += 1;
    }
  }

  goBack() {
    this.router.navigate(['contacts'])
  }
}
