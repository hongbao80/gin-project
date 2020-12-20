import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent  {

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
