import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MotorService, Motorbike } from '../services/motor.service';
import { MotorSelectModal } from '../modals/motor-select/motor-select.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  fullname = '';
  username = '';
  password = '';
  confirmPassword = '';
  selectedMotor: Motorbike | null = null;
  motors: Motorbike[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private motorService: MotorService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.motors = this.motorService.getAllMotors();
  }

  async openMotorSelect() {
    const modal = await this.modalCtrl.create({
      component: MotorSelectModal,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedMotor = result.data;
      }
    });

    return await modal.present();
  }

  async onRegister() {
    if (!this.fullname || !this.username || !this.password || !this.selectedMotor) {
      this.showToast('Harap lengkapi semua data', 'warning');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password harus minimal 6 angka/karakter', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Konfirmasi password tidak cocok', 'danger');
      return;
    }

    const success = this.authService.register({
      fullname: this.fullname,
      username: this.username,
      password: this.password,
      motorType: this.selectedMotor.name,
      motorCC: this.selectedMotor.cc,
      rimSize: this.selectedMotor.rim
    });

    if (success) {
      this.showToast('Pendaftaran berhasil! Silakan masuk.', 'success');
      this.router.navigate(['/login']);
    } else {
      this.showToast('Username sudah digunakan', 'danger');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
