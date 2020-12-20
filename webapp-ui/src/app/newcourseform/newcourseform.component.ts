import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'newcourseform',
  templateUrl: './newcourseform.component.html',
  styleUrls: ['./newcourseform.component.css']
})
export class NewCourseFormComponent {

  form = new FormGroup({
    topics: new FormArray([

    ])
  })

  addTopic(topic) {
    (this.form.get('topics') as FormArray).push(new FormControl(topic.value))
    topic.value = ''
  }
}
