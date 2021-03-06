import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private autSvc: AuthService, private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async onLogin(){
    const user = await this.autSvc.onLogin(this.user);
    if(user!=null && user.code ==undefined){
      console.log('Successfully logged in!');
      this.router.navigate(['/home']);
    }
    else{
      if(user.code){
        if(user.code=='auth/wrong-password' || user.code =='auth/invalid-email' || user.code=='auth/argument-error'){
          this.openModal(user);
        }
      }
    }
  }

  async openModal(user: any){
    const modal = await this.modalCtrl.create({
      component: ModalErrorComponent,
      componentProps:{
        error: 'Ingres password y/o contraseña'
      }
    });
    return await modal.present();
  }

}