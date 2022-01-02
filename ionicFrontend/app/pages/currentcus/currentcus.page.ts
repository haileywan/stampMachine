import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Platform, NavController } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-currentcus',
  templateUrl: './currentcus.page.html',
  styleUrls: ['./currentcus.page.scss'],

})
export class CurrentcusPage implements OnInit {
  user: User;
  /**transactions: Observable<Transaction[]>;*/
  data : MatTableDataSource<any>;
  columnsToDisplay: String[] = ['userid','item','created_at'];

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    private authService: AuthService,
    private tranService: TransactionService,
    private router: Router,
  ) { 
    this.tranService.getTransaction().subscribe(x => {
      this.data = new MatTableDataSource<Transaction>(x);
      this.data.sort = this.sort;
    });
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

  ngOnInit() {
}

  applyFilter(filterValue: any){
    this.data.filter = filterValue.trim().toLowerCase().toString();
    this.data.filterPredicate = function(data, filter: string): boolean {
      return data.userid.toLowerCase().includes(filter);
  };
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      });
    }
}

