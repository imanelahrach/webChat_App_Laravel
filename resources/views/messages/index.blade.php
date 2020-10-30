@extends('layouts.app')


@section('content')

<div class="container" >

<div class="row">

    <div class="col-md-3">
        <h3> Online Members</h3>
        <hr>

        <h5 id="no-online-users"> No online member</h5>
        <ul class="list-group" id="online-users">
        
        </ul><!-- end of list group -->

    </div><!-- end of col -->

    <div class="col-md-9 d-flex flex-column background-color:white;" style="height: 80vh;" >
            <div class="h-100" id="chat" style="height: 80vh;overflow-y:scroll;margin-bottom:5px; padding:5px;margin-top:7%;" >

            @foreach ($messages as $message)

                <div class=" {{auth()-> user()->id == $message->user_id ? 'pull-right bg-primary':'pull-left bg-primary'}}" 
                    id="chat" style="margin-top:5px;width:auto;min-width:20%;max-width:50%;padding:4px;min-height:25px; color:white;border-radius: 7px;" >
                  @if(auth()-> user()->id != $message->user_id )  <p style="margin:10px;color:black;font-size:10px;" > {{$message->user->name}} </p>@endif
                    <p style="margin:10px;" > {{$message->body}} </p>
                </div>

                <div class="clearfix">

</div>
            @endforeach
             </div>
    

             <form action="" class="d-flex">
<input type="text" name="" data-url="{{ route('messages.store') }}" class="form-control" style="margin-right:10px;width:90%" id="chat-text" >
<button type="button" class="btn btn-primary btn-lg">Send </button>
</form>
        <!-- <form action="{{ route('messages.store') }}" method="POST" class="d-flex">
        {{ csrf_field() }}
            <input type="text" name="body" class="form-control" style="margin-right:10px;width:90%" id="chat-text" >
            <button id ="btn_send"  type="submit" class="btn btn-primary btn-lg form-control">Send </button>

        </form> -->
      
    </div>
</div><!-- end of row -->


</div><!-- end of containrer -->
@endsection