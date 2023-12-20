import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { Equipments } from 'src/app/components/equipment/models/equipments';
import { MessageService } from 'primeng/api';
import { TABLE_SEARCH } from '../../constants/table-option.equipment';

@Component({
    selector: 'app-save',
    templateUrl: './save.component.html',
    // styleUrls: ['./save.component.scss'],
})
export class SaveComponent implements OnInit {
    saveForm: FormGroup;
    dialogForm: FormGroup;
    equipments: Equipments[] = [];
    equipmentType: any

    cols = TABLE_SEARCH;
    query: any;
    visible: any;

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private msgs: MessageService
    ) {
        this.onInitForm();
    }

    ngOnInit(): void {
        this.queryTable();
        this.onDisable()
        this.equipmentType = [
            { name: 'เมาส์' },
            { name: 'คีบอร์ด' },
            { name: 'จอคอมพิวเตอร์' },
            { name: 'ซีพียู' },
        ]
    }

    queryTable() {
        this.service.getEquipment(this.query).subscribe((res: any) => {
            this.equipments = res.results.map((item: any) => {
                item.image = this.sharedService.getImagePath(item.image);
                return item;
            });
        });
    }

    onInitForm() {
        this.saveForm = this.fb.group({
            equipmentId: [null, [Validators.required]],
            equipmentName: [null],
            locationName: [null],
            branchInfo: [null],
            roomNumber: [null],
            budgetYear: [null],
        });

        // dialogForm
        this.dialogForm = this.fb.group({
            equipmentId: [null, [Validators.required]],
            equipmentName: [null],
            locationName: [null],
            branchInfo: [null],
            roomNumber: [null],
            budgetYear: [null],
            description: [null, [Validators.required]],
            equipmentType: [null, [Validators.required]]
        });
    }

    onSearch() {
        this.query = {};

        if (this.saveForm.get('equipmentId').value != null) {
            this.query.equipmentId = this.saveForm.get('equipmentId').value;
        }

        if (this.saveForm.get('equipmentName').value != null) {
            this.query.equipmentName = this.saveForm.get('equipmentName').value;
        }

        if (this.saveForm.get('locationName').value != null) {
            this.query.locationName = this.saveForm.get('locationName').value;
        }

        if (this.saveForm.get('branchInfo').value != null) {
            this.query.branchInfo = this.saveForm.get('branchInfo').value;
        }

        if (this.saveForm.get('roomNumber').value != null) {
            this.query.roomNumber = this.saveForm.get('roomNumber').value;
        }

        if (this.saveForm.get('budgetYear').value != null) {
            const newDate = new Date(this.saveForm.get('budgetYear').value);
            this.query.budgetYear = newDate.toISOString(); // ให้ Angular ส่ง ISO 8601 format
        }

        this.service.getEquipment(this.query).subscribe((res: any) => {
            this.equipments = res.results.map((item: any) => {
                item.image = this.sharedService.getImagePath(item.image);
                return item;
            });
        });
    }

    onClear() {
        this.saveForm.reset();
        this.query = null;
        this.queryTable();
    }

    onDisable() {
        this.dialogForm.get('equipmentId').disable()
        this.dialogForm.get('equipmentName').disable()
        this.dialogForm.get('locationName').disable()
        this.dialogForm.get('branchInfo').disable()
        this.dialogForm.get('roomNumber').disable()
        this.dialogForm.get('budgetYear').disable()
    }

    onOpen(e: any) {
        this.visible = e.e;
        const id = e.id;
        this.service.equipmentId$.next(id);

        this.service.getEquipmentForPrm(id).subscribe((res: any) => {
            this.dialogForm.patchValue({
                equipmentId: res['results'].equipment_id,
                equipmentName: res['results'].equipment_name,
                locationName: res['results']['Location'].location_name,
                branchInfo: res['results']['Location'].branch_info,
                roomNumber: res['results']['Location'].room_number,
                budgetYear: new Date(res['results'].budget_year),
            });
        });

    }

    // แก้ต้องส่งแบบ formdata
    onSave() {
        const id = this.service.equipmentId$.value

        if(this.dialogForm.get('description')?.value && this.dialogForm.get('equipmentType')?.value != null) {
            
            const paylaod = this.dialogForm.get('description')?.value + ` ( ${this.dialogForm.get('equipmentType')?.value.name} )`;
            const newPaylode = new FormData();
            newPaylode.append("description", paylaod) 
            
            this.service.addRepairs(newPaylode, id).subscribe((res: any) => {
                this.msgs.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' })
            })
            this.onClose();
        } else {
            this.msgs.add({ severity: 'warn', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกเงื่อนไขให้ถูกต้อง' })
        }
    }

    onClose() {
        this.visible = false
    }
}
