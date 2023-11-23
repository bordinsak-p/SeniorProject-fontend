import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { TABLE_SEARCH } from '../../constants/table-option';
import { SharedService } from 'src/shared/shared.service';
import { Equipments } from '../../constants/equipments';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    cols = TABLE_SEARCH;
    equipments: Equipments[] = []
    query: any

    constructor(private fb: FormBuilder, private service: EquipmentService, private sharedService: SharedService) {
       this.queryTable()
    }

    queryTable() {
        this.service.getEquipment(this.query).subscribe((res: any) => {
            this.equipments = res.results.map((item: any) => {                
                item.image = this.sharedService.getProductImage(item.image);
                return item;
            });
        })
    }

    ngOnInit(): void {
        this.onInitForm();
    }

    onInitForm() {
        this.searchForm = this.fb.group({
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
    
        if (this.searchForm.get('equipmentId').value != null) {
            this.query.equipmentId = this.searchForm.get('equipmentId').value;
        }
    
        if (this.searchForm.get('equipmentName').value != null) {
            this.query.equipmentName = this.searchForm.get('equipmentName').value;
        }
    
        if (this.searchForm.get('locationName').value != null) {
            this.query.locationName = this.searchForm.get('locationName').value;
        }
    
        if (this.searchForm.get('branchInfo').value != null) {
            this.query.branchInfo = this.searchForm.get('branchInfo').value;
        }
    
        if (this.searchForm.get('roomNumber').value != null) {
            this.query.roomNumber = this.searchForm.get('roomNumber').value;
        }
    
        this.service.getEquipment(this.query).subscribe((res: any) => {
            this.equipments = res.results.map((item: any) => {
                item.image = this.sharedService.getProductImage(item.image);
                return item;
            });
        });
    }
    

    onClear() {
        this.searchForm.reset();
        this.searchForm.clearValidators();
        this.query = null
        this.queryTable()
    }

    onDelete() {}

    onEdit() {}
}
