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

    cols = TABLE_SEARCH;
    query: any;
    visible: any;

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private msags: MessageService
    ) {
        this.onInitForm();
        this.onInitDialogForm();
    }

    ngOnInit(): void {
        this.queryTable();
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
    }

    onInitDialogForm() {
        this.dialogForm = this.fb.group({
            description: [null],
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
        this.dialogForm.get('description').disable()
    }

    onOpen(e: any) {
        this.visible = e.e;
        const id = e.id;

        this.service.getEquipmentForPrm(id).subscribe((res: any) => {
            this.dialogForm.patchValue({
                description: `
                รหัสครุภัณฑ์: ${res['results'].equipment_id} 
                
                ชื่อครุภัณฑ์: ${res['results'].equipment_name}
                
                สถานที่: ${res['results']['Location'].location_name} 
                
                สาขา: ${res['results']['Location'].branch_info} 
                
                ห้อง: ${res['results']['Location'].room_number}
                `,
            });
        });

        this.onDisable()
    }

    onSave() {
        console.log("Hello");
        
    }

    onClose() {
        this.visible = false
    }
}
