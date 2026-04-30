import { Injectable } from '@angular/core';

export interface User {
  fullname: string;
  email?: string;
  username: string;
  password?: string;
  profilePic?: string;
  motorType?: string;
  motorCC?: string;
  rimSize?: string;
  currentTire?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USERS_KEY = 'banfitku_users';
  private SESSION_KEY = 'banfitku_session';

  constructor() {
    this.initTesterAccount();
  }

  private initTesterAccount() {
    const users = this.getRegisteredUsers();
    const testerExists = users.find(u => u.username === 'tester');
    
    if (!testerExists) {
      const testerAccount: User = {
        fullname: 'Tester BanFitKu',
        username: 'tester',
        password: 'password123',
        email: 'tester@banfitku.com',
        motorType: 'Honda Vario 125',
        motorCC: '125',
        rimSize: '14',
        currentTire: 'Michelin City Grip 2'
      };
      users.push(testerAccount);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  getRegisteredUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  register(user: User): boolean {
    const users = this.getRegisteredUsers();
    if (users.find(u => u.username === user.username)) {
      return false;
    }
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  login(username: string, pass: string): User | null {
    const users = this.getRegisteredUsers();
    const user = users.find(u => u.username === username && u.password === pass);

    if (user) {
      const { password, ...userWithoutPass } = user;
      this.setSession(userWithoutPass);
      return userWithoutPass;
    }
    return null;
  }

  setSession(user: User) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): User | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    if (data) return JSON.parse(data);
    
    const guestUser: User = { fullname: 'Guest', username: 'guest', motorType: 'Matic', motorCC: '110', rimSize: '14' };
    this.setSession(guestUser);
    return guestUser;
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  updateProfile(data: any) {
    const session = this.getSession();
    if (!session) return;

    const users = this.getRegisteredUsers();
    const index = users.findIndex(u => u.username === session.username);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
    
    this.setSession({ ...session, ...data });
  }

  deleteAccount(username: string) {
    const users = this.getRegisteredUsers();
    const updatedUsers = users.filter(u => u.username !== username);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
    this.logout();
  }
}
