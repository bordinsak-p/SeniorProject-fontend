import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit{  

  saveForm: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onInitform()
  }

  onInitform() {
    this.saveForm = this.fb.group({
      equipmentid: [null],
      equipmentname: [null],
      locationname: [null],
      branchinfo: [null],
      roomnumber: [null],
      description: [null],
      image: [null]
    })
  }

  onSave() {
    const paylaod = this.saveForm.getRawValue()
    console.log(paylaod);
    
  }
  
  onClear() {
    this.saveForm.reset()
  }

}
