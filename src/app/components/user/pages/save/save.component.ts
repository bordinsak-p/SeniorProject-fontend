import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  // styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit{
    saveForm: FormGroup;
    setData: object;
    roleOptions = [
      'Admin',
      'User'
    ];
    validMod: any;
    setMode: any;

    constructor(
      private fb: FormBuilder,
      private service: RepairService,
      private msgs: MessageService,
      private router: Router,
    ) {
      this.onInitform()
    }

  ngOnInit(): void {
    this.onInitform();
    if (this.service.mode$.value === 'edit') {
        this.setMode = true;
        this.saveForm.get("role").disable();
        this.service.getUsersById(this.service.userId$.value).subscribe(( res: any) => {
          this.setData = {
            firstname: res.results.firstname,
            lastname: res.results.lastname,
            email: res.results.email,
            username: res.results.username,
            role: res.results.role,
          }
          this.saveForm.patchValue(this.setData);
          this.validMod ='edit'
        })
    }
  }


  onInitform() {
    this.saveForm = this.fb.group({
        firstname: [null],
        lastname: [null],
        email: [null],
        username: [null],
        password: [null],
        role: [null],
    });
  }


  onSave() {
    if (this.service.mode$.value === 'edit') {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  setDataForSave() {
    const paylaod = this.saveForm.getRawValue();
    const newPaylode = {
        firstname: paylaod.firstname,
        lastname: paylaod.lastname,
        email: paylaod.email,
        username: paylaod.username,
    }
    return newPaylode
}

addUser() {
  this.service.addUser(this.saveForm.value).subscribe(( res ) => {
    this.msgs.add({ 
      severity: 'success', 
      summary: 'สำเร็จ', 
      detail: 'บันทึกข้อมูลสำเร็จ' 
    })
    this.saveForm.reset()
    
  })
}

updateUser() {
  const paylaod = this.setDataForSave()
  this.service.updateUser(this.service.userId$.value, paylaod).subscribe((res) => {
    this.msgs.add({
      severity: 'success',
      summary: 'สำเร็จ',
      detail: 'แก้ไขข้อมูลสำเร็จ',
    });
  });
}


onClear() {
  this.saveForm.reset();
  this.msgs.add({ 
    severity: 'info', 
    summary:'สำเร็จ', 
    detail: 'เคลียร์ฟอร์มเรียบร้อย' 
  })
}

}
