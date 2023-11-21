import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, take, takeUntil } from 'rxjs';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent { 
    countDown$ = interval(1000);
    number: number = 5
    private destroy$ = new Subject<void>();
    
    constructor(private router: Router) {
      this.countDown$
        .pipe(
          take(5), // ส่งข้อมูลเฉพาะ 5 ครั้ง
          takeUntil(this.destroy$) // หยุด Observable เมื่อ destroy$ ถูกเรียก
        )
        .subscribe((next) => {
          this.number -= 1;
          if (next === 4) {
            this.destroy$.next();
            this.destroy$.complete();
            this.router.navigate(['/']);
          }
        });
    }
  
    ngOnDestroy() {
      // ใน ngOnDestroy เรียก next ใน destroy$ เพื่อหยุด Observable ในกรณีที่ component ถูก destroy
      this.destroy$.next();
      this.destroy$.complete();
    }
}