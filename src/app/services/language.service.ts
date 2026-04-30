import { Injectable } from '@angular/core';

export type Language = 'id' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang: Language = 'id';

  private dictionary: { [key in Language]: { [key: string]: string } } = {
    id: {
      'UTAMA': 'UTAMA',
      'RAWAT': 'RAWAT',
      'PROFIL': 'PROFIL',
      'FOR_YOU': 'Untuk Anda',
      'BEST_MATCH': 'Pilihan terbaik untuk',
      'TIRE_HEALTH': 'KESEHATAN BAN',
      'CALC_TITLE': 'Kalkulator Tekanan',
      'WEIGHT': 'Berat Rider (kg)',
      'LOAD_TYPE': 'Jenis Beban',
      'FRONT': 'Depan',
      'REAR': 'Belakang',
      'FILTER_PRIORITY': 'Prioritas Filter',
      'DETAILS': 'Detail',
      'MAINTENANCE_SCHEDULE': 'Jadwal Perawatan',
      'MY_MOTOR': 'Motor Saya',
      'LOGOUT': 'Keluar Aplikasi',
      'LANGUAGE': 'Bahasa',
      'SELECT_LANGUAGE': 'Pilih Bahasa',
      'RIM_SIZE': 'Ring Velg',
      'CHECK_PRESSURE': 'Cek Tekanan Ban',
      'CHECK_PRESSURE_NOTE': 'Disarankan setiap 2 minggu sekali',
      'TIRE_ROTATION': 'Rotasi Ban',
      'TIRE_ROTATION_NOTE': 'Setiap 5.000 KM',
      'CHECK_TWI': 'Cek Keausan (TWI)',
      'CHECK_TWI_NOTE': 'Periksa ketebalan alur ban',
      'LOW_PRESSURE_TITLE': 'Tekanan Ban Rendah?',
      'LOW_PRESSURE_NOTE': 'Periksa tekanan ban Anda hari ini.',
      'SOLO': 'Sendiri',
      'PILLION': 'Berdua',
      'PRODUCT_DETAILS': 'Detail Produk',
      'TIRE_SIZE': 'Ukuran Ban',
      'DURABILITY': 'Ketahanan',
      'DESCRIPTION': 'Deskripsi',
      'BUY_NOW': 'Beli Sekarang'
    },
    en: {
      'UTAMA': 'HOME',
      'RAWAT': 'MAINTAIN',
      'PROFIL': 'PROFILE',
      'FOR_YOU': 'For You',
      'BEST_MATCH': 'Best match for',
      'TIRE_HEALTH': 'TIRE HEALTH',
      'CALC_TITLE': 'Pressure Calculator',
      'WEIGHT': 'Rider Weight (kg)',
      'LOAD_TYPE': 'Load Type',
      'FRONT': 'Front',
      'REAR': 'Rear',
      'FILTER_PRIORITY': 'Filter Priority',
      'DETAILS': 'Details',
      'MAINTENANCE_SCHEDULE': 'Maintenance Schedule',
      'MY_MOTOR': 'My Motorcycle',
      'LOGOUT': 'Logout',
      'LANGUAGE': 'Language',
      'SELECT_LANGUAGE': 'Select Language',
      'RIM_SIZE': 'Rim Size',
      'CHECK_PRESSURE': 'Check Tire Pressure',
      'CHECK_PRESSURE_NOTE': 'Recommended every 2 weeks',
      'TIRE_ROTATION': 'Tire Rotation',
      'TIRE_ROTATION_NOTE': 'Every 5,000 KM',
      'CHECK_TWI': 'Wear Check (TWI)',
      'CHECK_TWI_NOTE': 'Check tread depth',
      'LOW_PRESSURE_TITLE': 'Low Tire Pressure?',
      'LOW_PRESSURE_NOTE': 'Check your tire pressure today.',
      'SOLO': 'Solo',
      'PILLION': 'Pillion',
      'PRODUCT_DETAILS': 'Product Details',
      'TIRE_SIZE': 'Tire Size',
      'DURABILITY': 'Durability',
      'DESCRIPTION': 'Description',
      'BUY_NOW': 'Buy Now'
    }
  };

  constructor() {
    const saved = localStorage.getItem('lang');
    if (saved) this.currentLang = saved as Language;
  }

  setLanguage(lang: Language) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  getLanguage(): Language {
    return this.currentLang;
  }

  t(key: string): string {
    return this.dictionary[this.currentLang][key] || key;
  }
}
