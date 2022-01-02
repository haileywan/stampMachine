import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Platform, NavController } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {
  user: User;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    private authService: AuthService,
    private tranService: TransactionService,
  ) { }

   ngOnInit() {

  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      })
    }
    logout() {
      this.authService.logout().subscribe(
        data => {
          this.alertService.presentToast(data['message']);        
        },
        error => {
          console.log(error);
        },
        () => {
          this.navCtrl.navigateRoot('/landing');
        }
      );
    }
    home(){
      this.router.navigate(['/dashboard']);
    }
  
    gotocurrentstamp(){
      this.router.navigate(['/current-stamp']);
    }
  
    gotoqrcode(){
      this.router.navigate(['/qrcode']);
    }
    gotoqrscanner(){
      this.router.navigate(['/scanner']);
    }
    gotocurrentcus(){
      this.router.navigate(['/currentcus']);
    }
    gotouserinfo(){
      this.router.navigate(['/userinfo']);
    }

}
