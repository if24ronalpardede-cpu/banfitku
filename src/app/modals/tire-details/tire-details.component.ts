import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tire } from '../../services/tire.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-tire-details',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="dismiss()">
            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ t('PRODUCT_DETAILS') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding details-content ion-padding-bottom">
      <div class="image-section">
        <img [src]="tire.image" [alt]="tire.name">
      </div>

      <div class="content-section">
        <div class="header-row">
          <div>
            <h2 class="brand">{{tire.brand}}</h2>
            <h1 class="name">{{tire.name}}</h1>
          </div>
          <div class="price">{{tire.price}}</div>
        </div>

        <div class="info-badges">
          <span class="badge match">{{tire.matchScore}}% Match</span>
          <span class="badge rating">
            <ion-icon name="star"></ion-icon>
            {{tire.rating}}
          </span>
        </div>

        <!-- NEW: Size and Durability Info -->
        <div class="quick-specs">
          <div class="spec-item">
            <ion-icon name="resize-outline"></ion-icon>
            <div class="spec-text">
              <span class="spec-label">{{ t('TIRE_SIZE') }}</span>
              <span class="spec-value">{{tire.size}}</span>
            </div>
          </div>
          <div class="spec-item">
            <ion-icon name="timer-outline"></ion-icon>
            <div class="spec-text">
              <span class="spec-label">{{ t('DURABILITY') }}</span>
              <span class="spec-value">{{tire.durability}}</span>
            </div>
          </div>
        </div>

        <div class="description-section">
          <h3>{{ t('DESCRIPTION') }}</h3>
          <p>{{tire.description}}</p>
        </div>

        <div class="specs-grid-section">
          <h3>{{ t('TECHNICAL_SPECS') || 'Technical Specs' }}</h3>
          <div class="specs-grid">
            <div class="grid-item">
              <span class="label">Compound</span>
              <span class="value">{{tire.compound || '-'}}</span>
            </div>
            <div class="grid-item">
              <span class="label">Load Index</span>
              <span class="value">{{tire.loadIndex || '-'}}</span>
            </div>
            <div class="grid-item">
              <span class="label">Speed Rating</span>
              <span class="value">{{tire.speedRating || '-'}}</span>
            </div>
            <div class="grid-item">
              <span class="label">Structure</span>
              <span class="value">{{tire.structure || '-'}}</span>
            </div>
          </div>
        </div>

    <ion-footer class="ion-no-border">
      <ion-toolbar class="footer-toolbar">
        <ion-button expand="block" class="use-tire-btn" (click)="selectTire()">
          {{ t('USE_THIS_TIRE') || 'Gunakan Ban Ini' }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [`
    .details-content {
      --background: #000000;
      color: white;
    }
    .footer-toolbar {
      --background: #000000;
      padding: 10px 20px 20px;
    }
    .use-tire-btn {
      --background: #00d2ff;
      --color: black;
      --border-radius: 15px;
      height: 55px;
      font-weight: 800;
      margin: 0;
      box-shadow: 0 10px 20px rgba(0, 210, 255, 0.2);
    }
    .image-section {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #111;
      border-radius: 20px;
      margin-bottom: 20px;
      img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      }
    }
    .brand {
      color: #00ffff;
      font-size: 1rem;
      margin: 0;
      font-weight: 700;
      text-transform: uppercase;
    }
    .name {
      font-size: 2rem;
      margin: 5px 0;
      font-weight: 800;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    .price {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
    }
    .info-badges {
      display: flex;
      gap: 10px;
      margin-bottom: 25px;
    }
    .badge {
      padding: 6px 12px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .match { background: rgba(0, 255, 255, 0.1); color: #00ffff; }
    .rating { background: rgba(241, 196, 15, 0.1); color: #f1c40f; }
    
    .quick-specs {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 15px;

      .spec-item {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;

        ion-icon {
          font-size: 24px;
          color: #00ffff;
        }

        .spec-text {
          display: flex;
          flex-direction: column;

          .spec-label {
            font-size: 0.75rem;
            color: #888;
            font-weight: 600;
          }
          .spec-value {
            font-size: 0.9rem;
            font-weight: 700;
            color: white;
          }
        }
      }
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 20px 0 10px;
      color: #888;
    }
    .specs-grid-section {
      margin-top: 25px;
      padding-bottom: 20px;
      
      .specs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;

        .grid-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;

          .label {
            font-size: 10px;
            font-weight: 800;
            color: #888;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .value {
            font-size: 14px;
            font-weight: 700;
            color: #00ffff;
          }
        }
      }
    }

    p {
      color: #bbb;
      line-height: 1.6;
    }
  `],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TireDetailsModal {
  @Input() tire!: Tire;

  constructor(
    private modalCtrl: ModalController,
    private langService: LanguageService
  ) {}

  t(key: string) { return this.langService.t(key); }

  selectTire() {
    this.modalCtrl.dismiss({
      tire: this.tire,
      selected: true
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
