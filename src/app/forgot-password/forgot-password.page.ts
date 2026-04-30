import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage implements OnInit {
  username = '';
  newPassword = '';
  confirmPassword = '';
  step: 'find' | 'reset' = 'find';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async onFindAccount() {
    if (!this.username) {
      this.showToast('Harap masukkan username', 'warning');
      return;
    }

    const users = this.authService.getRegisteredUsers();
    const user = users.find(u => u.username === this.username);

    if (user) {
      this.step = 'reset';
    } else {
      this.showToast('Username tidak ditemukan', 'danger');
    }
  }

  async onResetPassword() {
    if (this.newPassword.length < 6) {
      this.showToast('Password baru minimal 6 angka/karakter', 'danger');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showToast('Konfirmasi password tidak cocok', 'danger');
      return;
    }

    this.authService.updateProfile({ username: this.username, password: this.newPassword });
    this.showToast('Password berhasil diperbarui!', 'success');
    this.router.navigate(['/login']);
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
