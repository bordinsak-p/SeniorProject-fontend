import { NgModule } from '@angular/core';
import {
    HashLocationStrategy,
    LocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, BreadcrumbModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
