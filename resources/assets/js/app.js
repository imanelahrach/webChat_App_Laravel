
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

let onlineUsersLength = 0;
window.Echo.join(`online`)
    .here((users) => {
        onlineUsersLength = users.length;
        onlineUsersLength++;
        if(users.length>1){
            $('#no-online-users').css('display','none');
        }

        let userId = $('meta[name=user-id]').attr('content');

        users.forEach(function(user)
        {
            if(userId==user.id){return;}
            $('#online-users').append(`<li class="list-group-item"><span class="icon icon-circle text-success">${user.name}</li>`)
        
        })
    })
    .joining((user) => {
        onlineUsersLength++;
        $('#no-online-users').css('display','none');
        $('#online-users').append(`<li class="list-group-item"><span class="icon icon-circle text-success">${user.name}</li>`);
    })
    .leaving((user) => {
        onlineUsersLength--;
        if(onlineUsersLength==1)
        {
            $('#no-online-users').css('display','block');
        }
        $('#user-' + user.id).remove();

    });

        $('#chat-text').keypress(function(e)
        {
            if(e.which == 13)
            {
                e.preventDefault();
            
    
     let body=$(this).val();
     let url=$(this).data('url');
     console.log(e);
            let data = {
                '_token':$('meta[name=csrf-token]').attr('content'),
                'body':body
            }
            $(this).val('');

            $('#chat').append(`
            <div class="pull-right bg-primary"  style="margin-top:5px;width:auto;min-width:20%;max-width:50%;padding:4px;min-height:25px; color:white;border-radius: 7px;" >
      
        <p style="margin:10px;" > ${body} </p>
        </div>
        <div class="clearfix">
    </div>`);
            $.ajax({
                url:url,
                method: 'post',
                data:data
                
             });
        }
        

    })

    window.Echo.channel('chat-group').listen('MessageDelivred',(e)=>{
        let userName=$('meta[name=user-name]').attr('content');
        $('#chat').append(`
        <div class="pull-left bg-primary"  style="margin-top:5px;width:auto;min-width:20%;max-width:50%;padding:4px;min-height:25px; color:white;border-radius: 7px;" >
        <p style="margin:10px;color:black;font-size: 10px;" > ${userName} </p>
        <p style="margin:10px;" > ${e.message.body} </p>
    </div>
    <div class="clearfix">
</div>`);
    })