import { Injectable } from '@angular/core';

export interface MaintenanceLog {
  id: string;
  type: string; // e.g., 'Ganti Ban', 'Cek Tekanan', 'Servis Rutin'
  date: string;
  odometer: number;
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private STORAGE_KEY = 'banfitku_maintenance_logs';

  constructor() { }

  getLogs(): MaintenanceLog[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addLog(log: Omit<MaintenanceLog, 'id'>) {
    const logs = this.getLogs();
    const newLog = {
      ...log,
      id: Date.now().toString()
    };
    logs.unshift(newLog); // Add to the beginning
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
    return newLog;
  }

  deleteLog(id: string) {
    const logs = this.getLogs();
    const updated = logs.filter(l => l.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  getTireHealth(): number {
    const logs = this.getLogs();
    const lastChange = logs.find(l => l.type === 'Ganti Ban');
    if (!lastChange) return 100; // Assume new if no log

    const latest = logs[0];
    const distanceTraveled = latest.odometer - lastChange.odometer;
    const maxDistance = 15000; // Standard tire life in KM

    const health = 100 - (distanceTraveled / maxDistance * 100);
    return Math.max(0, Math.min(100, Math.round(health)));
  }

  getPressureStatus(): { days: number, urgent: boolean } {
    const logs = this.getLogs();
    const lastCheck = logs.find(l => l.type === 'Cek Tekanan');
    if (!lastCheck) return { days: 99, urgent: true };

    const lastDate = new Date(lastCheck.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      days: diffDays,
      urgent: diffDays > 14
    };
  }
}
