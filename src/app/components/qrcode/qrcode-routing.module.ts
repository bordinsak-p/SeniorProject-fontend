import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodeComponent } from './qrcode.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  {
    path: '',
    component: QrcodeComponent,
    children: [
        {
            path: '',
            component: SearchComponent,
        },
    ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrcodeRoutingModule { }
