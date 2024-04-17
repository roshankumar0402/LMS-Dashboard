import { FormControl, ValidationErrors } from '@angular/forms';
import { LoginService } from '../../services/login.service';
export class customValidator {
  // static _service: any;
  static users: any = [];
  constructor(private master: LoginService) {
    customValidator.users = master.users;
  }
  static usernameCheck(control: FormControl): ValidationErrors | null {
    if (
      !customValidator.users.find(
        (x: { username: string; password: string }) =>
          x.username == control.value
      )
    ) {
      return { usernameCheck: true };
    }
    return null;
  }
  static passwordCheck(control: FormControl): ValidationErrors | null {
    if (
      !customValidator.users.find(
        (x: { username: string; password: string }) =>
          x.password == control.value
      )
    ) {
      return { passwordCheck: true };
    }
    return null;
  }
}
