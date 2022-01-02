import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  user: User;
  /** QR code*/
  value:any = '';
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  scale = 20;


  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private router: Router,

 


  ) { }
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

  ngOnInit() { 
   
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        let qrdata = [this.user.id];
        /**let qrdata = [this.user.id,this.user.username ,this.user.typeofuser];*/
        this.value = JSON.stringify(qrdata);
      }
      );
  }


}
