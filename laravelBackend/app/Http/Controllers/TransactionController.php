<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;


class TransactionController extends Controller
{
    public function index(){
        $transactions = Transaction::all();
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $request->validate([
           'ownerid' => 'required|string',
           'ownername' =>'required|string',
            'userid' => 'required|string',
            'item' => 'required|string',
            'qty' => 'required|string',
           
        ]);

        $transaction = Transaction::create([
            'ownerid' => $request->ownerid,
            'ownername' => $request->ownername,
            'userid' => $request->userid,
            'item' => $request->item,
            'qty' => $request->qty, 
            
            
        ]);
        return response()->json($transaction);
    }
  
}