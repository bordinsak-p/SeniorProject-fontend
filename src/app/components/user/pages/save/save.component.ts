import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  // styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit{
    saveForm: FormGroup;

    roleOptions = [
      'Admin',
      'User'
    ];

    constructor(
      private fb: FormBuilder,
      private service: RepairService,
      private msgs: MessageService,
    ) {
      this.onInitform()
    }

  ngOnInit(): void {

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
  this.service.addUser(this.saveForm.value).subscribe(( res ) => {
    this.msgs.add({ severity: 'success', summary: 'สำเร็จ', detail: 'บันทึกข้อมูลสำเร็จ' })
    this.saveForm.reset()
    
  })

  // console.warn(this.saveForm.value);
  
}

}
