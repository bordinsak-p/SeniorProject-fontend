import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-resgiter',
    templateUrl: './resgiter.component.html',
    styleUrls: ['./resgiter.component.scss'],
})
export class ResgiterComponent implements OnInit {
    userForm: FormGroup;

    @Input() visible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private service: AuthService,
        private mesg: MessageService
    ) {}

    ngOnInit(): void {
        this.onInitForm();
    }

    onInitForm() {
        this.userForm = this.fb.group({
            email: [null],
            username: [null],
            password: [null],
            firstname: [null],
            lastname: [null],
            role: [null],
        });
    }

    onRegister() {
        const payload = this.userForm.getRawValue();
        payload.role = "user"
        this.service.register(payload).subscribe((res) => {
            this.mesg.add({ severity: 'success', summary: '', detail: 'สมัครสมาชิกสำเร็จ' })
            this.userForm.reset();
            this.visible = false
        });
    }

    onClose() {
        this.userForm.reset()
        this.visible = false
    }
}
