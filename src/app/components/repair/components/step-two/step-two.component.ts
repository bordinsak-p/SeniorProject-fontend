import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairService } from '../../services/repair.service';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    //   styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
    constructor(
        private router: Router,
        private activatRout: ActivatedRoute,
        public service: RepairService
    ) {}

    ngOnInit(): void {
        // this.service.status$.next(false)
    }

    onNextStep() {
        this.router.navigate(['/repair/status/step3']);
    }
}
