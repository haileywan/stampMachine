import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  transactions: Observable<Transaction[]>;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private router: Router,
    private tranService: TransactionService,
    ) { 

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


  
  async ngOnInit() {
    this.transactions = this.tranService.getTransaction().pipe(
      tap((transactions)=>{
        return transactions;
      })
    );
    
  }
  

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    );
  }
}