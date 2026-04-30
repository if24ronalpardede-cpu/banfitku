import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TireDetailsModal } from '../modals/tire-details/tire-details.component';
import { AddLogModal } from '../modals/add-log/add-log.component';
import { MotorSelectModal } from '../modals/motor-select/motor-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TireDetailsModal,
    MotorSelectModal
  ],
  declarations: [HomePage, AddLogModal]
})
export class HomePageModule {}
