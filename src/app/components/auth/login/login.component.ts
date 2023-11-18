import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    userForm: FormGroup;
    token: any
    open = false

    @Output() openDialog = new EventEmitter()

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private services: AuthService,
        private fb: FormBuilder,
        private mesg: MessageService
    ) { }

    ngOnInit(): void {
        this.onInitForm()
    }

    onInitForm() {
        this.userForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    onLogin() {
        const paylode = this.userForm.getRawValue();
        this.services.login(paylode).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                
                if (error.status === 401) {
                    this.mesg.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                    if(error.error.message == 'รหัสผ่านไม่ถูกต้อง') {
                        this.userForm.get('password').reset()
                    }
                    if(error.error.message == 'อีเมลหรือรหัสผ่านไม่ถูกต้อง') {
                        this.userForm.reset()
                    }
                }
                return throwError('Login failed');
            })
        ).subscribe(res => {
            this.token = res.token
            console.clear()
            this.router.navigate(['/']);
        })
    }

    onOpenDialog(event: any) {
        this.open = event
    }
}
