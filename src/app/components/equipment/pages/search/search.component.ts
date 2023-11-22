import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { TABLE_SEARCH } from '../../constants/table-option';
import { SharedService } from 'src/shared/shared.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    cols = TABLE_SEARCH;
    equipments: any[] = []

    constructor(private fb: FormBuilder, private service: EquipmentService, private sharedService: SharedService) {
        this.service.getEquipment().subscribe((res: any) => {
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
        const payload = this.searchForm.getRawValue();
        this.service.getEquipment()
        console.log(payload);
    }

    onClear() {
        this.searchForm.reset();
        this.searchForm.clearValidators();
    }

    onDelete() {}

    onEdit() {}
}
