import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairService } from '../../services/repair.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
    stepTwoForm: FormGroup
    repairForm: FormGroup
    showImage: any
    payload: Object;
    payloadRepiar: Object;
    status: string;
    statusBtn: boolean;

    constructor(
        private router: Router,
        private activatRout: ActivatedRoute,
        public service: RepairService,
        public fb: FormBuilder,
        private cfs: ConfirmationService,
        private msags: MessageService,
    ) {
        const id = this.service.repairEquipment_pk$.value;
        const repairId = this.service.repairId$.value;

        if (id != null && repairId != null) {
            this.service.getEquipmentForPrm(id).subscribe((res: any) => {
                this.payload = {
                    equipmentId: res['results'].equipment_id,
                    equipmentName: res['results'].equipment_name,
                    location: res['results']['Location'].location_name,
                    branchInfo: res['results']['Location'].branch_info,
                    roomNumber: res['results']['Location'].room_number,
                    budgetYear: new Date(res['results'].budget_year),
                };
                this.stepTwoForm.patchValue(this.payload);
                this.stepTwoForm.disable();
            });

            this.service.getRepairsForPms(repairId).subscribe((res: any) => {
                this.payloadRepiar = {
                    fullname: `${res['resutls']['users'].firstname} ${res['resutls']['users'].lastname}`,
                    description: res['resutls'].description,
                    role: res['resutls']['users'].role == 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน',
                };
                this.repairForm.patchValue(this.payloadRepiar);
                this.repairForm.disable();
            });
        } else {
            router.navigate(['/repair']);
        }
    }

    ngOnInit(): void {
        // this.service.status$.next(false)
        this.onInitForm()
    }

    onInitForm() {
        this.stepTwoForm = this.fb.group({
            equipmentId: [null],
            equipmentName: [null],
            location: [null],
            branchInfo: [null],
            roomNumber: [null],
            budgetYear: [null],
        });

        this.repairForm = this.fb.group({
            fullname: [null],
            description: [null],
            role: [null],
        });
    }

    onProgressStatus() {
        const id = this.service.repairId$.value;
        const paylode = {
            status: 'สำเร็จ',
        };

        this.cfs.confirm({
            message: 'คุณต้องการดำเนินการรับเรื่องหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-wrench',
            accept: () => {
                this.service.editRepairs(paylode, id).subscribe((res: any) => {
                    this.msags.add({
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'บันทึกข้อมูลสำเร็จ',
                    });
                    // this.router.navigate(['step3'], { relativeTo: this.activatRout })
                    this.router.navigate(['/repair/status/step3']);
                });
            },
        });
    }
    
    onBack() {
        this.router.navigate(['/repair'])
    }
}
