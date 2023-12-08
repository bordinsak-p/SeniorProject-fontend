import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TABLE_SEARCH } from '../../constants/table-options';
import { Repairs } from '../../models/repairs.interface';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

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
    visible: any;
    roleOptions = [
        'Admin',
        'User'
      ];

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private cfs: ConfirmationService,
        private msags: MessageService,
        private dateFormat: DatePipe 
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
        this.onInitViewForm();
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
            email: [null],
            username: [null],
            role: [null],
            createAt: [null],
            created_at: [null]
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

    onDelete(id: any) {
        this.cfs.confirm({ 
            message: 'คุณต้องการลบข้อมูลหรือไม่',
            header: 'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept:() => {
                this.service.delUser(id).subscribe(( res ) => {
                    console.log(res);
                    
                    this.msags.add({ 
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'ลบข้อมูลสำเร็จ',
                    });
                    this.queryTable();
                });
            }
        });
    }

    onSelectCheckBox(dataEvent: any[]) {
        if (dataEvent === undefined || dataEvent.length == 0) {
            
            this.msags.add({
                severity: 'info',
                summary: 'แจ้งเตือน',
                detail: 'กรุณาเลือกข้อมูลที่ท่านต้องการลบ',
            });
            return;
        }

        let userId = dataEvent.map(( item ) => item.id )

        this.cfs.confirm({ 
            message: 'คุณต้องการลบข้อมูลหรือไม่',
            header:'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delUsers(userId).subscribe(( res: any ) => {
                    console.log(res);
                    
                    this.msags.add({ 
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'ลบข้อมูลสำเร็จ',
                    });
                    this.queryTable();
                });
            }
        });
    }

    onDisableViewForm() {
        this.viewForm.get('firstname').disable();
        this.viewForm.get('lastname').disable();
        this.viewForm.get('email').disable();
        this.viewForm.get('username').disable();
        this.viewForm.get('role').disable();
        this.viewForm.get('created_at').disable();
    }

    onOpenDialog(e: any) {
        this.visible = e.e;
        this.onDisableViewForm();
        this.service.getUsersById(e.id).subscribe(( res: any ) => {
            const setForm = {
                firstname: res.results.firstname,
                lastname: res.results.lastname,
                email: res.results.email,
                username: res.results.username,
                role: res.results.role,
                created_at: this.dateFormat.transform( res.results.created_at, 'dd/MM/yyyy')
            }
            this.viewForm.patchValue(setForm)
            console.log(setForm);
            
        })
    }
    
}
