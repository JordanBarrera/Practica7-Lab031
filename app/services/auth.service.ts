import { Injectable } from '@angular/core';
import { User } from '../shared/user.class';
import {AngularFireAuth} from  'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoged : any = false;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => this.isLoged= user);
  }

  // login
  async onLogin(user: User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    catch(error){
      console.log('Error en login user',error);
      return error;
    }
  }

  // register
  async onRegister( user: User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }
    catch(error){
      console.log('Error en register user',error);
      return error;
    }
  }
}