import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairService } from '../../services/repair.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
    stepOneForm: FormGroup;
    showImage: any;
    payload: Object;
    status: string
    statusBtn: boolean

    constructor(
        private router: Router,
        private activatRout: ActivatedRoute,
        private service: RepairService,
        private location: Location,
        private fb: FormBuilder,
        private cfs: ConfirmationService,
        private msags: MessageService
    ) {
        const id = this.service.repairEquipment_pk$.value;
        if (id != null) {
            service.getEquipmentForPrm(id).subscribe((res: any) => {
                console.log(res);
                this.payload = {
                    equipmentId: res['results'].equipment_id,
                    equipmentName: res['results'].equipment_name,
                    location: res['results']['Location'].location_name,
                    branchInfo: res['results']['Location'].branch_info,
                    roomNumber: res['results']['Location'].room_number,
                    budgetYear: new Date(res['results'].budget_year),
                };
                this.stepOneForm.patchValue(this.payload);
                this.stepOneForm.disable();
            });
        } else {
            location.back();
        }
    }

    ngOnInit(): void {
        this.onInitForm();
        this.status = this.service.repairStatus$.value
        if(this.status == 'ดำเนินการ' || this.status == 'สำเร็จ') {
            this.statusBtn = true;
        }

    }

    onInitForm() {
        this.stepOneForm = this.fb.group({
            equipmentId: [null],
            equipmentName: [null],
            location: [null],
            branchInfo: [null],
            roomNumber: [null],
            budgetYear: [null],
        });
    }

    onAcceptStatus() {
        const id = this.service.repairId$.value
        const paylode = {
            status: 'ดำเนินการ'
        }

        this.cfs.confirm({
            message: 'คุณต้องการดำเนินการรับเรื่องหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-wrench',
            accept: () => {
                this.service.editRepairs(paylode, id).subscribe((res: any) => {
                    this.msags.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' })
                })
            },
        });
    }

    onBack() {
        this.location.back();
    }
}
