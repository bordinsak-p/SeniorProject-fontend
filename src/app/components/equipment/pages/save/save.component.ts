import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-save',
    templateUrl: './save.component.html',
    // styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
    saveForm: FormGroup;
    showImage: any;
    fileEvent: any;

    constructor(
        private fb: FormBuilder,
        private serivce: EquipmentService,
        private msgs: MessageService
    ) {}

    ngOnInit(): void {
        this.onInitform();
    }

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

    onSave(e: any) {
        const paylaod = this.saveForm.getRawValue();

        const newPaylode = new FormData();
        newPaylode.append('equipmentid', paylaod.equipmentid);
        newPaylode.append('equipmentname', paylaod.equipmentname);
        newPaylode.append('locationname', paylaod.locationname);
        newPaylode.append('branchinfo', paylaod.branchinfo);
        newPaylode.append('roomnumber', paylaod.roomnumber);
        newPaylode.append('description', paylaod.description);
        newPaylode.append('image', this.fileEvent);        
        
        this.serivce.addEquipment(newPaylode).subscribe((res: any) => {
            this.msgs.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' })
        });
        this.saveForm.reset()
        this.showImage = e
    }

    onClear(e: any) {
        this.saveForm.reset();
        this.showImage = e;
    }
}
