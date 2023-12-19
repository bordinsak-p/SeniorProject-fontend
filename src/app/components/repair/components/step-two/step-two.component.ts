import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairService } from '../../services/repair.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
    stepTwoForm: FormGroup
    showImage: any

    constructor(
        private router: Router,
        private activatRout: ActivatedRoute,
        public service: RepairService
    ) {}

    ngOnInit(): void {
        // this.service.status$.next(false)
    }

    onProgressStatus() {
        this.router.navigate(['/repair/status/step3']);
    }
    
    onBack() {}
}
