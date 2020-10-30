<?php

namespace App\Http\Controllers;

use App\Events\MessageDelivred;
use Illuminate\Http\Request;
use App\Message;
class MessageController extends Controller
{
    public function __constuctor()
    {

        $this->middleware(['auth']);
    }
    
public function index()
{

    $messages = Message::all();
    return view('messages.index',compact('messages'));

}//end of index


public function store(Request $request)
{
    
     $message = auth()->user()->messages()->create($request->all());
broadcast(new MessageDelivred($message->load('user')))->toOthers(); 

}//end of store
}
