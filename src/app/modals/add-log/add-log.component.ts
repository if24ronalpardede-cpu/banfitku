import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-log',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Tambah Riwayat</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Tutup</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="form-container">
        <ion-item lines="none" class="custom-input">
          <ion-label position="stacked">Jenis Perawatan</ion-label>
          <ion-select [(ngModel)]="log.type" placeholder="Pilih jenis">
            <ion-select-option value="Ganti Ban">Ganti Ban</ion-select-option>
            <ion-select-option value="Cek Tekanan">Cek Tekanan Angin</ion-select-option>
            <ion-select-option value="Servis Rutin">Servis Rutin</ion-select-option>
            <ion-select-option value="Lainnya">Lainnya</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="none" class="custom-input">
          <ion-label position="stacked">Odometer (KM)</ion-label>
          <ion-input type="number" [(ngModel)]="log.odometer" placeholder="Contoh: 12000"></ion-input>
        </ion-item>

        <ion-item lines="none" class="custom-input">
          <ion-label position="stacked">Tanggal</ion-label>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal [keepContentsMounted]="true">
            <ng-template>
              <ion-datetime id="datetime" presentation="date" [(ngModel)]="log.date"></ion-datetime>
            </ng-template>
          </ion-modal>
        </ion-item>

        <ion-item lines="none" class="custom-input">
          <ion-label position="stacked">Catatan (Opsional)</ion-label>
          <ion-textarea [(ngModel)]="log.note" placeholder="Tambahkan catatan khusus..."></ion-textarea>
        </ion-item>

        <ion-button expand="block" class="submit-btn" (click)="save()">SIMPAN RIWAYAT</ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    .form-container {
      padding-top: 10px;
    }
    .custom-input {
      --background: #10141e;
      --border-radius: 15px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      
      ion-label {
        color: #00d2ff !important;
        font-weight: bold;
        margin-bottom: 8px;
      }
      
      ion-input, ion-select, ion-textarea {
        --color: white;
      }
    }
    .submit-btn {
      --background: #00d2ff;
      --color: black;
      --border-radius: 15px;
      height: 55px;
      font-weight: 800;
      margin-top: 20px;
    }
  `],
  standalone: false
})
export class AddLogModal {
  log = {
    type: 'Cek Tekanan',
    odometer: null,
    date: new Date().toISOString(),
    note: ''
  };

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (!this.log.odometer) return;
    this.modalCtrl.dismiss(this.log);
  }
}
