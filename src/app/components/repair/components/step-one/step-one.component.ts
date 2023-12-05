import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
//   styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {

    constructor(private router: Router, private activatRout: ActivatedRoute) {}

    onNextStep() {
        this.router.navigate(['step2'], { relativeTo: this.activatRout })
    }

    
}
