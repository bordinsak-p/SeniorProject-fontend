import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { SharedService } from 'src/shared/shared.service';
import { TABLE_SEARCH } from '../../constants/table-option';
import { Repair } from '../../models/repair';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { STATUS } from '../../constants/status.constant';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    searchDialog: FormGroup;
    
    queryStr: any;
    visable: any;
    repair: Repair[] = [];
    
    cols = TABLE_SEARCH;
    status = STATUS
    

    constructor(
        private fb: FormBuilder,
        private service: RepairService,
        private sharedService: SharedService,
        private router: Router,
        private cfs: ConfirmationService,
        private msags: MessageService
    ) {
        this.onInitForm();
    }

    ngOnInit(): void {
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

    onInitFormDialog() {
        this.searchDialog = this.fb.group({
            
        })
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

        const checkNull = this.searchForm.getRawValue();
        if (Object.values(checkNull).every((value) => value === null)) {
            this.msags.add({
                severity: 'info',
                summary: 'แจ้งเตือน',
                detail: 'กรุณากรอกข้อมูลที่ต้องการค้นหา',
            });
            return;
        }

        if (this.searchForm.get('requestDate').value != null) {
            const newDate = new Date(this.searchForm.get('requestDate').value);
            this.queryStr.requestdate = newDate.toISOString();
        }

        if (this.searchForm.get('username').value != null) {
            this.queryStr.username = this.searchForm.get('username').value;
        }

        if (this.searchForm.get('equipmentId').value != null) {
            this.queryStr.equipmentid =
                this.searchForm.get('equipmentId').value;
        }

        if (this.searchForm.get('equipmentName').value != null) {
            this.queryStr.equipmentname =
                this.searchForm.get('equipmentName').value;
        }

        if (this.searchForm.get('status').value != null) {
            this.queryStr.status = this.searchForm.get('status').value.name;            
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
        this.queryStr = null;
        this.queryTable();
    }

    onEdit(e: any) {
        this.visable = e;
        console.log(e);
    }

    onDeleteInRow(id: number) {
        this.cfs.confirm({
            message: 'คุณต้องการลบข้อมูลหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delRepair(id).subscribe((res) => {
                    this.msags.add({
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'ลบข้อมูลสำเร็จ',
                    });
                    this.queryTable();
                });
            },
        });
    }

    onDeleteCheckBox(id: any[]) {
        if (id === undefined || id.length == 0) {
            this.msags.add({
                severity: 'info',
                summary: 'แจ้งเตือน',
                detail: 'กรุณาเลือกข้อมูลที่ท่านต้องการลบ',
            });
            return;
        }

        const ids = id.map((item) => item.id);

        this.cfs.confirm({
            message: 'คุณต้องการลบข้อมูลหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delRepairs(ids).subscribe((res) => {
                    this.msags.add({
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'ลบข้อมูลสำเร็จ',
                    });
                    this.queryTable();
                });
            },
        });
    }
}
