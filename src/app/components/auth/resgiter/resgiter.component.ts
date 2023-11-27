import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from '../service/users.service';

@Component({
    selector: 'app-resgiter',
    templateUrl: './resgiter.component.html',
    // styleUrls: ['./resgiter.component.scss'],
})
export class ResgiterComponent implements OnInit {
    userForm: FormGroup;

    @Input() visible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private service: UsersService,
        private mesg: MessageService
    ) {}

    ngOnInit(): void {
        this.onInitForm();
    }

    onInitForm() {
        this.userForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            username: [null, [Validators.required]],
            password: [null , [Validators.required]],
            confirmPassword: [null , [Validators.required]],
            firstname: [null , [Validators.required]],
            lastname: [null , [Validators.required]],
            role: [null],
        });
    }

    onRegister() {
        const payload = this.userForm.getRawValue();
        payload.role = "user"

        if(payload.password != payload.confirmPassword) {
            this.mesg.add({ severity: 'error', summary: 'รหัสไม่ถูกต้อง', detail: 'กรุณากรอกรหัสของท่านให้ถูกต้อง' })
        } else {
            this.service.register(payload).subscribe((res) => {
                this.mesg.add({ severity: 'success', summary: 'บักทึกสำเร็จ', detail: 'สมัครสมาชิกสำเร็จ' })
                this.userForm.reset();
                this.visible = false
            });
        }

    }

    onClose() {
        this.userForm.reset()
        this.userForm.clearValidators()
        this.visible = false
    }
}
