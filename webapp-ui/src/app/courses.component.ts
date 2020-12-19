import { CoursesService } from './courses.service';
import {Component} from '@angular/core'
@Component({
    selector: '.courses', // <div class ="courses"> ".courses" or <div id ="courses"> "#courses" or <courses></courses>
    templateUrl: './courses.component.html'
})
export class CoursesComponent {
    course = {
        title: "The complete angular course",
        rating: 4.9745,
        students: 30300,
        price: 190.99,
        releaseDate: new Date(2020, 12, 2)
    }
}