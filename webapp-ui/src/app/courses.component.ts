import { CoursesService } from './courses.service';
import {Component} from '@angular/core'
@Component({
    selector: '.courses', // <div class ="courses"> ".courses" or <div id ="courses"> "#courses" or <courses></courses>
    templateUrl: './courses.component.html'
})
export class CoursesComponent {
    text = "Xin chào, mình là vũ, nick facebook của mình là fb.com/HBTeamobi, rất hân hạnh được làm quen với tất cả các bạn"
}