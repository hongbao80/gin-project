import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactMethod = [
    { id: 1, name: 'Email' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Address' },
    { id: 4, name: 'Facebook' },
  ]
  constructor() { }

  log(x) {
    console.log(x)
  }

  comment(cmt) {
    console.log("Comment:", cmt)
  }

  submit(f) {
    console.log(f.value)
  }
}
