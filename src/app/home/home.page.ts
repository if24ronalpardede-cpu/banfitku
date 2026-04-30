import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TireService, Tire } from '../services/tire.service';
import { MotorService, Motorbike } from '../services/motor.service';
import { LanguageService, Language } from '../services/language.service';
import { TireDetailsModal } from '../modals/tire-details/tire-details.component';
import { AddLogModal } from '../modals/add-log/add-log.component';
import { MaintenanceService, MaintenanceLog } from '../services/maintenance.service';
import { MotorSelectModal } from '../modals/motor-select/motor-select.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  activeCategory: 'Harian' | 'Balap' | 'Offroad' = 'Harian';
  recommendedTires: Tire[] = [];
  categories: ('Harian' | 'Balap' | 'Offroad')[] = ['Harian', 'Balap', 'Offroad'];
  tireHealth: number = 100;
  currentTab: 'home' | 'rawat' | 'profil' | 'recommendations' | 'panduan' | 'notif' = 'home';
  maintenanceLogs: MaintenanceLog[] = [];
  pressureStatus: { days: number, urgent: boolean } = { days: 0, urgent: false };
  motorcycles: Motorbike[] = [];
  brands: string[] = ['Semua'];
  selectedBrand: string = 'Semua';
  selectedSort: string = 'Rekomendasi';
  userSession: any = null;
  searchText: string = '';
  comparisonList: Tire[] = [];

  // Maintenance Tasks
  maintenanceTasks = [
    { id: 'pressure', title: 'CHECK_PRESSURE', note: 'CHECK_PRESSURE_NOTE', icon: 'water-outline', color: 'primary', completed: true },
    { id: 'rotation', title: 'TIRE_ROTATION', note: 'TIRE_ROTATION_NOTE', icon: 'sync-outline', color: 'success', completed: false },
    { id: 'twi', title: 'CHECK_TWI', note: 'CHECK_TWI_NOTE', icon: 'alert-circle-outline', color: 'warning', completed: false }
  ];

  // Mock Notifications
  notifications = [
    { id: 1, title: 'Tekanan Ban Rendah', body: 'Tekanan ban depan Anda mungkin rendah. Cek sekarang!', time: '10m ago', unread: true },
    { id: 2, title: 'Waktunya Rotasi', body: 'Ban Anda sudah mencapai 5.000 KM. Saatnya rotasi!', time: '2h ago', unread: false },
    { id: 3, title: 'Promo Michelin', body: 'Diskon 20% untuk ban Michelin City Grip 2.', time: '1d ago', unread: false }
  ];

  // Pressure Calculator Variables
  riderWeight: number = 50;
  loadType: 'Sendiri' | 'Berdua' = 'Sendiri';
  frontPressure: number = 28;
  rearPressure: number = 32;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tireService: TireService,
    public langService: LanguageService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private maintenanceService: MaintenanceService,
    private motorService: MotorService
  ) {}

  t(key: string) { return this.langService.t(key); }

  setLanguage(lang: Language) {
    this.langService.setLanguage(lang);
  }

  ngOnInit() {
    this.refreshData();
    this.loadLogs();
    this.motorcycles = this.motorService.getAllMotors();
  }

  ionViewWillEnter() {
    this.refreshData();
  }

  refreshData() {
    this.userSession = this.authService.getSession();
    this.loadTires();
    this.calculatePressure();
    this.loadLogs();
    this.tireHealth = this.maintenanceService.getTireHealth();
    this.pressureStatus = this.maintenanceService.getPressureStatus();
  }

  setTab(tab: 'home' | 'rawat' | 'profil' | 'recommendations' | 'panduan' | 'notif') {
    this.currentTab = tab;
  }

  async toggleTask(task: any) {
    if (task.completed) {
      this.showToast(`${task.title} selesai!`, 'success');
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.authService.updateProfile({ profilePic: base64String });
        this.refreshData();
        this.showToast('Foto profil diperbarui!', 'success');
      };
      reader.readAsDataURL(file);
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color,
      position: 'top'
    });
    toast.present();
  }

  loadTires() {
    const rimSize = this.userSession?.rimSize || '14';
    let results = this.tireService.filterTires(
      this.activeCategory,
      rimSize,
      this.selectedBrand,
      this.selectedSort
    );
    this.brands = this.tireService.getBrands(this.activeCategory, rimSize);

    if (this.searchText) {
      results = results.filter((t: Tire) => 
        t.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
        t.brand.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.recommendedTires = results;
  }

  updateFilters() {
    this.loadTires();
  }

  onSearch(event: any) {
    this.searchText = event.target.value;
    this.loadTires();
  }

  toggleComparison(tire: Tire) {
    const index = this.comparisonList.findIndex(t => t.id === tire.id);
    if (index > -1) {
      this.comparisonList.splice(index, 1);
    } else if (this.comparisonList.length < 2) {
      this.comparisonList.push(tire);
    } else {
      this.showToast('Maksimal perbandingan 2 ban', 'warning');
    }
  }

  isInComparison(tire: Tire): boolean {
    return this.comparisonList.some(t => t.id === tire.id);
  }

  calculatePressure() {
    // Determine base pressure based on CC or Rim Size if motor type is unknown
    let baseFront = 28;
    let baseRear = 32;

    const cc = parseInt(this.userSession?.motorCC || '110');
    
    if (cc > 200) {
      baseFront = 30;
      baseRear = 34;
    } else if (cc > 125) {
      baseFront = 29;
      baseRear = 33;
    }

    // Weight adjustment (reference 60kg)
    const weightFactor = (this.riderWeight - 60) / 20;
    baseFront += weightFactor;
    baseRear += weightFactor;

    // Load type adjustment
    if (this.loadType === 'Berdua') {
      baseFront += 1;
      baseRear += 3;
    }

    this.frontPressure = Math.round(baseFront);
    this.rearPressure = Math.round(baseRear);
  }

  async logout() {
    this.authService.logout();
    this.showToast('Berhasil keluar', 'success');
    this.router.navigate(['/login']);
  }

  async deleteAccount() {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Akun?',
      message: 'Semua data Anda akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.authService.deleteAccount(this.userSession.username);
            this.showToast('Akun berhasil dihapus', 'danger');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  setCategory(category: 'Harian' | 'Balap' | 'Offroad') {
    this.activeCategory = category;
    this.loadTires();
  }

  async openDetails(tire: Tire) {
    const modal = await this.modalCtrl.create({
      component: TireDetailsModal,
      componentProps: { tire }
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.selected) {
        this.activateMaintenance(result.data.tire);
      }
    });

    return await modal.present();
  }

  activateMaintenance(tire: Tire) {
    // 1. Update Profile
    this.authService.updateProfile({
      currentTire: `${tire.brand} ${tire.name}`
    });

    // 2. Initialize Maintenance Tasks
    this.maintenanceTasks = [
      { id: 'pressure', title: 'CHECK_PRESSURE', note: 'CHECK_PRESSURE_NOTE', icon: 'water-outline', color: 'primary', completed: false },
      { id: 'rotation', title: 'TIRE_ROTATION', note: 'TIRE_ROTATION_NOTE', icon: 'sync-outline', color: 'success', completed: false },
      { id: 'twi', title: 'CHECK_TWI', note: 'CHECK_TWI_NOTE', icon: 'alert-circle-outline', color: 'warning', completed: false }
    ];

    // 3. Set Dynamic Notifications
    this.notifications = [
      { 
        id: Date.now(), 
        title: 'Ban Baru Terpasang!', 
        body: `Selamat! ${tire.brand} ${tire.name} telah terdaftar. Jadwal perawatan otomatis telah dibuat.`, 
        time: 'Baru saja', 
        unread: true 
      },
      { 
        id: Date.now() + 1, 
        title: 'Pengingat Tekanan', 
        body: `Jangan lupa cek tekanan ban setiap minggu untuk menjaga keawetan ${tire.name}.`, 
        time: 'Baru saja', 
        unread: true 
      }
    ];

    // 4. Reset Health for new tire
    this.tireHealth = 100;
    
    // 5. Navigate to Maintenance Tab
    this.currentTab = 'rawat';
    this.refreshData();
    
    this.showToast(`Ban ${tire.name} berhasil dipilih!`, 'success');
  }

  loadLogs() {
    this.maintenanceLogs = this.maintenanceService.getLogs();
  }

  async openAddLogModal() {
    const modal = await this.modalCtrl.create({
      component: AddLogModal
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.maintenanceService.addLog(result.data);
        this.loadLogs();
        this.showToast('Riwayat berhasil ditambahkan', 'success');
      }
    });

    return await modal.present();
  }

  async deleteLog(id: string) {
    this.maintenanceService.deleteLog(id);
    this.loadLogs();
    this.showToast('Riwayat dihapus', 'warning');
  }

  async openMotorSelect() {
    const modal = await this.modalCtrl.create({
      component: MotorSelectModal,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const motor = result.data;
        this.authService.updateProfile({
          motorType: motor.name,
          motorCC: motor.cc,
          rimSize: motor.rim
        });
        this.refreshData();
        this.showToast('Motor berhasil diperbarui', 'success');
      }
    });

    return await modal.present();
  }

  async quickCheck(type: string) {
    const log = {
      type: type,
      date: new Date().toISOString(),
      odometer: this.maintenanceLogs.length > 0 ? this.maintenanceLogs[0].odometer : 0,
      note: 'Quick check from dashboard'
    };
    this.maintenanceService.addLog(log);
    this.loadLogs();
    this.refreshData();
    this.showToast(`${type} berhasil dicatat!`, 'success');
  }
}
