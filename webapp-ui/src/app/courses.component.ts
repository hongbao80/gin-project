import { CoursesService } from './courses.service';
import {Component} from '@angular/core'
@Component({
    selector: '.courses', // <div class ="courses"> ".courses" or <div id ="courses"> "#courses" or <courses></courses>
    templateUrl: './courses.component.html'
})
export class CoursesComponent {
    title = "List of courses";
    imageUrl = "https://picsum.photos/id/237/200/300";
    colSpan = 2;
    isActive = false;

    onTest($event) {
        $event.stopPropagation(); // stop bubble up event
        console.log($event);
    }

    onDivClick() {
        console.log("Div was clicked");
    }

    onKeyUp($event) {
        if ($event.keyCode === 13) 
            console.log("Enter was pressed ", $event.target.value)
    }

    onKeyUpEmail(email) {
        console.log("Hi, your email is: ", email)
    }
}