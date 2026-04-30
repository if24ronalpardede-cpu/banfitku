import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { MotorService, Motorbike } from '../../services/motor.service';

@Component({
  selector: 'app-motor-select',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="dark">
        <ion-title>Pilih Motor</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar color="dark">
        <ion-searchbar 
          placeholder="Cari merk atau tipe motor..." 
          (ionInput)="filterMotors($event)"
          class="custom-searchbar">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list lines="none" class="transparent-list ion-padding">
        <ion-item 
          *ngFor="let motor of filteredMotors" 
          (click)="selectMotor(motor)"
          class="custom-item">
          <ion-icon name="motorcycle-outline" slot="start" color="primary"></ion-icon>
          <ion-label>
            <h2 class="motor-name">{{ motor.name }}</h2>
            <p class="motor-detail">{{ motor.cc }} CC • {{ motor.year }}</p>
          </ion-label>
          <ion-note slot="end" color="primary">Ring {{ motor.rim }}</ion-note>
        </ion-item>
      </ion-list>
      
      <div *ngIf="filteredMotors.length === 0" class="empty-state">
        <ion-icon name="search-outline"></ion-icon>
        <p>Motor tidak ditemukan</p>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-toolbar {
      --background: #080b12;
      --color: white;
    }
    ion-content {
      --background: #080b12;
    }
    .custom-searchbar {
      --background: #10141e;
      --color: white;
      --placeholder-color: rgba(255, 255, 255, 0.3);
      --icon-color: #00d2ff;
      --border-radius: 12px;
      padding: 0 16px 10px;
    }
    .transparent-list {
      background: transparent;
    }
    .custom-item {
      --background: #10141e;
      --border-radius: 16px;
      margin-bottom: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      --padding-start: 16px;
      
      .motor-name { color: white; font-weight: 700; font-size: 15px; margin: 0; }
      .motor-detail { color: rgba(255, 255, 255, 0.5); font-size: 11px; margin-top: 4px; }
      ion-note { font-size: 10px; font-weight: 800; }
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: rgba(255, 255, 255, 0.2);
      ion-icon { font-size: 64px; margin-bottom: 15px; }
      p { margin: 0; font-size: 14px; font-weight: 600; }
    }
  `],
  imports: [CommonModule, IonicModule],
  standalone: true
})
export class MotorSelectModal implements OnInit {
  allMotors: Motorbike[] = [];
  filteredMotors: Motorbike[] = [];

  constructor(
    private modalCtrl: ModalController,
    private motorService: MotorService
  ) { }

  ngOnInit() {
    try {
      this.allMotors = this.motorService.getAllMotors() || [];
      this.filteredMotors = [...this.allMotors];
    } catch (e) {
      console.error('Error loading motors:', e);
    }
  }

  filterMotors(event: any) {
    const query = (event.detail?.value || '').toLowerCase().trim();
    if (!query) {
      this.filteredMotors = [...this.allMotors];
      return;
    }
    this.filteredMotors = this.allMotors.filter(m => 
      m.name.toLowerCase().includes(query) || 
      m.cc.toString().toLowerCase().includes(query)
    );
  }

  selectMotor(motor: Motorbike) {
    this.modalCtrl.dismiss(motor);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
