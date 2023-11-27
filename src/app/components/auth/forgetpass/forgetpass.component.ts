import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { passwordMatchValidator } from './validator.component';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {
  forgetform : FormGroup;

  @Input() visible: boolean = false;

    showDialog() {
        this.visible = false;
    }

    constructor(
      private fb: FormBuilder,
      private service: UsersService,
      private mesg: MessageService,
  ) {}


    ngOnInit(): void {
    this.onInitForm();
}

    onInitForm() {
      this.forgetform = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(5)]],
        confirmPassword: [null, [Validators.required]]
      }, {
        validator: passwordMatchValidator
      });
    }

    onClose() {
      this.forgetform.reset()
      this.forgetform.clearValidators()
      this.visible = false
  }

}
