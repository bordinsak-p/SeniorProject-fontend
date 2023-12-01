import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { TABLE_SEARCH } from '../../constants/table-option';
import { Repair } from '../../models/repair';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    queryStr: any;
    repair: Repair[] = [];
    cols = TABLE_SEARCH

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.onInitForm();
        this.queryTable();
    }

    onInitForm() {
        this.searchForm = this.fb.group({
            equipmentId: [null],
            equipmentName: [null],
            status: [null],
            requestDate: [null],
            username: [null],
        });
    }

    queryTable() {
        this.service.getRepairs(this.queryStr).subscribe((res: any) => {
            this.repair = res.results.map((item: any) => {
                item.image = this.sharedService.getImagePath(item.image);
                return item;
            });
        });
    }

    onSearch() {
        this.queryStr = {};

        if (this.searchForm.get('requestDate').value != null) {
            const newDate = new Date(this.searchForm.get('requestDate').value);
            this.queryStr.requestdate = newDate.toISOString();
        }

        if (this.searchForm.get('username').value != null) {
            this.queryStr.username = this.searchForm.get('username').value;
        }

        if (this.searchForm.get('equipmentId').value != null) {
            this.queryStr.equipmentid = this.searchForm.get('equipmentId').value;
        }

        if (this.searchForm.get('equipmentName').value != null) {
            this.queryStr.equipmentName =
                this.searchForm.get('equipmentName').value;
        }

        if (this.searchForm.get('status').value != null) {
            this.queryStr.status = this.searchForm.get('status').value;
        }

        this.service.getRepairs(this.queryStr).subscribe((res: any) => {
            this.repair = res.results.map((item: any) => {
                item.image = this.sharedService.getImagePath(item.image);
                return item;
            });
        });
    }

    onClear() {
        this.searchForm.reset();
        this.queryTable();
    }
}
