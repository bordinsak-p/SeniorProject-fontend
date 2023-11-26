import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { TABLE_SEARCH } from '../../constants/table-option';
import { SharedService } from 'src/shared/shared.service';
import { Equipments } from '../../models/equipments';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    // styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    cols = TABLE_SEARCH;
    equipments: Equipments[] = [];
    query: any;
    selectInRow: any

    constructor(
        private fb: FormBuilder,
        private service: EquipmentService,
        private sharedService: SharedService,
        private dateFormat: DatePipe,
        private router: Router,
        private route: ActivatedRoute,
        private cfs: ConfirmationService,
        private msags: MessageService
    ) {
        this.queryTable();
        service.mode$.next('add')
        // console.log(service.mode$.value);
        
    }

    queryTable() {
        this.service.getEquipment(this.query).subscribe((res: any) => {
            this.equipments = res.results.map((item: any) => {
                item.image = this.sharedService.getImagePath(item.image);
                return item;
            });
        });
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

        const checkNull = this.searchForm.getRawValue()

        // เช็ค null แต่ถ้าใส่ value ตัวใดตัวนึงมาก็แสดงว่าไม่ null
        if(Object.values(checkNull).every(value => value === null)) {
            this.msags.add({ severity: 'info', summary: 'แจ้งเตือน', detail: 'กรุณาเลือกข้อมูลที่ท่านต้องการลบ' });
            return;
        }

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
        
        if (this.searchForm.get('budgetYear').value != null) {
            const newDate = new Date(this.searchForm.get('budgetYear').value);
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
        this.searchForm.reset();
        this.searchForm.clearValidators();
        this.query = null;
        this.queryTable();
    }

    onDelete(id: any) {
        this.cfs.confirm({
            message: 'คุณต้องการลบข้อมูลหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delEquipment(id).subscribe((res) => {
                    this.msags.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบข้อมูลสำเร็จ' });
                    this.queryTable()
                })
            }
        });
    }
    
    onEdit(id: any) {
        this.service.equipmentId$.next(id)
        this.service.mode$.next('edit')
        this.router.navigate(['save'], { relativeTo: this.route})
    }

    onSelectCheckBox(dataEvent: any[]) {
        if(dataEvent === undefined || dataEvent.length == 0) {
            this.msags.add({ severity: 'info', summary: 'แจ้งเตือน', detail: 'กรุณาเลือกข้อมูลที่ท่านต้องการลบ' });
            return;
        }

        let equipmentIds = dataEvent.map( item => item.id); 
       
        this.cfs.confirm({
            message: 'คุณต้องการลบข้อมูลหรือไม่?',
            header: 'ยืนยัน',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delEquipments(equipmentIds).subscribe((res: any) => {
                    this.msags.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบข้อมูลสำเร็จ' });
                    this.queryTable()
                })
            }
        });
    }
}
