import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async onLogin() {
    if (!this.username || !this.password) {
      this.showToast('Harap isi username dan password', 'warning');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password harus minimal 6 karakter', 'danger');
      return;
    }

    const user = this.authService.login(this.username, this.password);
    if (user) {
      this.showToast(`Selamat datang, ${user.fullname}!`, 'success');
      this.router.navigate(['/home']);
    } else {
      this.showToast('Username atau password salah', 'danger');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgot() {
    this.router.navigate(['/forgot-password']);
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
