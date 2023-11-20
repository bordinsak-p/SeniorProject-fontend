import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    userForm: FormGroup;
    open = false

    @Output() openDialog = new EventEmitter()

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private fb: FormBuilder,
        private mesg: MessageService,
        private authService: AuthService
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
        
        this.authService.login(paylode).pipe(catchError(
            (err: HttpErrorResponse) => {                
                if(err.status == 401) {
                    if(err.error.message == 'รหัสผ่านไม่ถูกต้อง') {
                        this.mesg.add({ severity: 'error', summary: 'Unauthorized', detail: 'กรุณากรอกรหัสของท่านให้ถูกต้อง' })
                        this.userForm.get('password').reset()
                    } else {
                        this.mesg.add({ severity: 'error', summary: 'Unauthorized', detail: 'กรุณากรอกอีเมลหรือรหัสของท่านให้ถูกต้อง' })
                        this.userForm.reset()
                    }
                } 
                return throwError("เข้าสู่ระบบไม่สำเร็จ")
            }
        )).subscribe((res) => {
            this.router.navigate(['/']);
        });
    }

    onOpenDialog(event: any) {
        this.open = event
    }
}
