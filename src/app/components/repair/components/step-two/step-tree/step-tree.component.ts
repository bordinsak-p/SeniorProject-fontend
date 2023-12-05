import { Component, OnInit } from '@angular/core';
import { RepairService } from '../../../services/repair.service';

@Component({
    selector: 'app-step-tree',
    templateUrl: './step-tree.component.html',
    // styleUrls: ['./step-tree.component.scss']
})
export class StepTreeComponent implements OnInit {
    
    constructor(private service: RepairService) {}

    ngOnInit(): void {
        this.service.status$.next(true)
    }
}
