import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairService } from '../../services/repair.service';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    //   styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {
    constructor(
        private router: Router,
        private activatRout: ActivatedRoute,
        private service: RepairService
    ) {
        console.log("step-one: ", this.service.repairId$.value, " ",this.service.repairStatus$.value);
    }

    onNextStep() {
        this.router.navigate(['step2'], { relativeTo: this.activatRout });
    }
}
