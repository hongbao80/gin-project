import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'newcourseform',
  templateUrl: './newcourseform.component.html',
  styleUrls: ['./newcourseform.component.css']
})
export class NewCourseFormComponent {

  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: [, Validators.required],
      contact: fb.group({
          email: [],
          phone: []
      }), 
      topic: fb.array([])
    })
  }

  addTopic(topic) {
    (this.form.get('topics') as FormArray).push(new FormControl(topic.value))
    topic.value = ''
  }
}
