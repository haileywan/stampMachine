import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { NgForm } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  items = [
    {name: "Tea"},
    {name: "Coffee"},
    {name: "Pastry"},
    {name: "*Redeem Item*"}
  ]
  user: User;
  transactions: Observable<Transaction[]>;
  scannedCode = null;
  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private authService: AuthService,
    private tranService: TransactionService,
    private alertService: AlertService,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
  
  ) {  
    /**http.get('http://127.0.0.1:8000/api/transactions').subscribe(console.log)*/
  }
  startScanning(){
  this.barcodeScanner.scan().then(
    barcodeData => {
    this.scannedCode = JSON.parse(barcodeData.text);
    console.log('Barcode data', this.scannedCode);
   }).catch(err => {
       console.log('Error', err);
   });
  }


  transaction(form: NgForm){
    this.tranService.store(form.value.ownerid, form.value.ownername, form.value.userid, form.value.qty, form.value.item).subscribe(
      data =>{
        this.alertService.presentToast('Sent!');
      },
      error => {
        console.log(error);
        this.alertService.presentToast("Please fill in all information");
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
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
      });
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
