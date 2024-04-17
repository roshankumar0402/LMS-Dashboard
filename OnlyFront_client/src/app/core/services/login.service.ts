import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  users: any[] = [
    { username: 'rosh', password: 'rosh' },
    { username: 'admin', password: 'admin' },
    { username: 'rku', password: 'rku' },
  ];
  login(username: string, password: string) {
    if (
      this.users.find((x) => x.username === username && x.password === password)
    ) {
      localStorage.setItem('isLogged', 'true');
      const currUser = { name: username, email: username + '@gmail.com' };
      localStorage.setItem('currUser', JSON.stringify(currUser));
      // this.router.navigateByUrl('home');
      return true;
    } else {
      let mess = '';
      if (!this.users.find((x) => x.username === username)) {
        mess = '*Wrong Username';
      }
      if (mess == '' && !this.users.find((x) => x.password === password)) {
        mess = '*Wrong Password';
      }
      return mess;
    }
  }
  router = inject(Router);
  check() {
    const localData = localStorage.getItem('isLogged');
    if (localData != null) {
      const converted = JSON.parse(localData);
      if (converted == true) {
        this.router.navigateByUrl('home');
      }
    }
  }
  getCurrUser() {
    const localData = localStorage.getItem('currUser');
    if (localData != null) {
      const converted = JSON.parse(localData);
      return converted;
    }
  }
  signOut() {
    localStorage.setItem('isLogged', 'false');
    localStorage.removeItem('currUser');
    this.router.navigateByUrl('login');
  }
}
