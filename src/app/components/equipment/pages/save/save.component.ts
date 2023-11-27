import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SharedService } from 'src/shared/shared.service';

@Component({
    selector: 'app-save',
    templateUrl: './save.component.html',
    // styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
    saveForm: FormGroup;
    showImage: any;
    fileEvent: any;
    setData: Object
    validMod: any

    constructor(
        private fb: FormBuilder,
        private serivce: EquipmentService,
        private msgs: MessageService,
        private router: Router,
        private sharedServic: SharedService
    ) {
      
    }

    ngOnInit(): void {
        this.onInitform();
        // if(this.serivce.equipmentId$.value == null && this.serivce.mode$.value != 'add') {
        //     this.router.navigate(['equipment'])
        // }
        if (this.serivce.mode$.value === 'edit') {
            this.serivce.getEquipmentForPrm(this.serivce.equipmentId$.value).subscribe((res: any) => {
                this.showImage = this.sharedServic.getImagePath(res['results'].image)
                this.setData = {
                    equipmentid: res.results.equipment_id,
                    equipmentname: res.results.equipment_name,
                    locationname: res.results['Location'].location_name,
                    branchinfo: res.results['Location'].branch_info,
                    roomnumber: res.results['Location'].room_number,
                    description: res.results.description,
                };
                this.saveForm.patchValue(this.setData);
                this.validMod = 'edit'
            });
        }
    }

    // ngAfterContentInit(): void {
    //     if(this.serivce.equipmentId$.value == null) {
    //         this.router.navigate(['equipment'])
    //         this.serivce.mode$.next('add')
    //     }
    // }

    onInitform() {
        this.saveForm = this.fb.group({
            equipmentid: [null],
            equipmentname: [null],
            locationname: [null],
            branchinfo: [null],
            roomnumber: [null],
            description: [null],
            image: [null],
        });
    }

    onGetFileFormSelected(e: any) {
        this.fileEvent = e;
    }

    setDataForSave() {
        const paylaod = this.saveForm.getRawValue();
        const newPaylode = new FormData();
        newPaylode.append('equipmentid', paylaod.equipmentid);
        newPaylode.append('equipmentname', paylaod.equipmentname);
        newPaylode.append('locationname', paylaod.locationname);
        newPaylode.append('branchinfo', paylaod.branchinfo);
        newPaylode.append('roomnumber', paylaod.roomnumber);
        newPaylode.append('description', paylaod.description);
        newPaylode.append('image', this.fileEvent);
        return newPaylode
    }

    onSave(e: any) {
        if(this.serivce.mode$.value != 'edit') {
            const newPaylode = this.setDataForSave()        
            this.serivce.addEquipment(newPaylode).subscribe((res: any) => {
                this.msgs.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' })
            });
            this.saveForm.reset()
            this.showImage = e
        } else {
            const newPaylode = this.setDataForSave()
            this.serivce.updateEquipment(this.serivce.equipmentId$.value, newPaylode).subscribe((res: any) => {
                this.msgs.add({ severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขข้อมูลสำเร็จ' })
            })
            this.serivce.mode$.next(null)
        }
    }

    onClear(e: any) {
        this.saveForm.reset();
        this.showImage = e;
    }
}
