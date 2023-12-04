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
    styleUrls: ['./save.component.scss'],
})
export class SaveComponent implements OnInit {
    saveForm: FormGroup;
    equipments: Equipments[] = []
    cols = TABLE_SEARCH
    query: any;

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private msags: MessageService
    ) {
        this.onInitForm();
    }

    ngOnInit(): void {
        this.queryTable()
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

    onSearch() {
        this.query = {};

        if (this.saveForm.get('equipmentId').value != null) {
            this.query.equipmentId = this.saveForm.get('equipmentId').value;
        }

        if (this.saveForm.get('equipmentName').value != null) {
            this.query.equipmentName =
                this.saveForm.get('equipmentName').value;
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
        this.query = null
        this.queryTable()
    }
}
