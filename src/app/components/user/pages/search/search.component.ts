import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-options';
import { Repairs } from '../../models/repairs.interface';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { DatePipe } from '@angular/common';
import { co } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    // styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
    searchForm: FormGroup;
    user: any[]
    cols = TABLE_SEARCH;
    users: Repairs[]= [];
    query: any;
    viewForm: any;

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
    ) {
        this.queryTable
    }

    queryTable() {
        this.service.getUsers(this.query).subscribe((res: any) => {
            console.log(res);
        }
        )
    }

    ngOnInit(): void {
        this.onInitForm()
    }

    onInitForm() {
        this.searchForm = this.fb.group({
            firstname: [null],
            lastname: [null],
            email: [null],
            username: [null],
            role: [null],
            createdAt: [null]
        })
    }

    onInitViewForm() {
        this.viewForm = this.fb.group({
            firstname: [null],
            lastname: [null],
            mail: [null],
            username: [null],
            role: [null],
            createAt: [null]
        });
    }

    onSearch() {
        this.query = {};

        const checkNull = this.searchForm.getRawValue();

        if (this.searchForm.get('firstname').value != null) {
            this.query.firstname = this.searchForm.get('firstname').value;
        }

        if (this.searchForm.get('lastname').value != null) {
            this.query.lastname =
                this.searchForm.get('lastname').value;
        }

        if (this.searchForm.get('email').value != null) {
            this.query.email = this.searchForm.get('email').value;
        }

        if (this.searchForm.get('username').value != null) {
            this.query.username = this.searchForm.get('username').value;
        }

        if (this.searchForm.get('role').value != null) {
            this.query.role = this.searchForm.get('role').value;
        }

        if (this.searchForm.get('createAt').value != null) {
            const newDate = new Date(this.searchForm.get('createAt').value);
            this.query.createAt = newDate.toISOString(); // ให้ Angular ส่ง ISO 8601 format
        }

        this.service.getUsers(this.query).subscribe((res: any) => {
            console.log(res);
        }
      )
    }

    onClear() {}
}
