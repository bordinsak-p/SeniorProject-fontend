import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-options';
import { Repairs } from '../../models/repairs.interface';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    // styleUrls: ['./search.component.scss']
    providers: [MessageService]
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    user: any[];
    cols = TABLE_SEARCH;
    users: Repairs[] = [];
    query: any;
    viewForm: any;

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private cfs: ConfirmationService,
        private msags: MessageService
    ) {
        this.queryTable();
        service.mode$.next('add');
    }

    queryTable() {
        this.service.getUsers(this.query).subscribe((res: any) => {
            this.users = res.results;
            // console.log(res.results);
        });
    }

    ngOnInit(): void {
        this.onInitForm();
    }

    onInitForm() {
        this.searchForm = this.fb.group({
            firstname: [null],
            lastname: [null],
            email: [null],
            username: [null],
            role: [null],
            createdAt: [null],
        });
    }

    onInitViewForm() {
        this.viewForm = this.fb.group({
            firstname: [null],
            lastname: [null],
            mail: [null],
            username: [null],
            role: [null],
            createAt: [null],
        });
    }

    onSearch() {
        this.query = {};

        const checkNull = this.searchForm.getRawValue();

        // เช็ค null แต่ถ้าใส่ value ตัวใดตัวนึงมาก็แสดงว่าไม่ null
        if (Object.values(checkNull).every((value) => value === null)) {
            this.msags.add({
                severity: 'info',
                summary: 'แจ้งเตือน',
                detail: 'กรุณากรอกข้อมูลที่ท่านต้องการค้นหา',
            });
            return;
        }
           
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

            if (this.searchForm.get('createdAt').value != null) {
                const newDate = new Date(this.searchForm.get('createdAt').value);
                this.query.createdAt = newDate.toISOString(); // ให้ Angular ส่ง ISO 8601 format
            }

            this.service.getUsers(this.query).subscribe((res: any) => {
                this.users = res.results;
                // console.log(res.results);
                
            })
    }

    onClear() {
        this.searchForm.reset();
        this.query = null;
        this.queryTable();
    }

}
