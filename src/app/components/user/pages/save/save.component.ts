import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/components/auth/service/users.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  // styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit{
    saveForm: FormGroup;


    constructor(
      private fb: FormBuilder,
      private service: UsersService,
    ) {}

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
        createdAt: [null],
    })
  }

}
