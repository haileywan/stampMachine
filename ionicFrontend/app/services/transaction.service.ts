import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { Transaction } from '../models/transaction';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
    ) {}
    getTransaction(): Observable<Transaction[]>{
      return this.http.get<Transaction[]>(this.env.API_URL + 'transactions');
    }

    store(ownerid: String, ownername:string, userid: String, qty: String, item: String) {
      return this.http.post<Transaction>(this.env.API_URL + 'transactions',
        {ownerid: ownerid,ownername: ownername, userid: userid, qty: qty, item: item}
      )
    }
}
