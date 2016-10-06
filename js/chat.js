function chat(){
	var time;
	var login_info;
	var boole=true;
	login();
	function login(){
		login_info=prompt('请输入你的昵称','');
		var data=[{
			name: 'new_info',
			value: login_info
		},{
			name: 'type',
			value: 'login'
		}];
		$.ajax({
			url: '../site/chatroom.php',
			type: 'post',
			dataType: 'json',
			data:  data,
			success: function(json){
				time=json-1;
				getinfo();
			},
			error: function(){}
		});
	};
				//console.log(time);
	$('#form').on('submit',function(e){
		e.preventDefault();
		var data=$('#form').serializeArray();
		data.push({
			name: 'type',
			value: 'add'
		},{
			name: 'username',
			value: login_info
		});
		$.ajax({
			url: "../site/chatroom.php",
			dataType: "json",
			type: "post",
			data: data,
			success: function(){
			}
		});
		$('textarea').val('');
	});

	function getinfo(){
		var data = [{
			name: 'time',
			value: time
		},{
			name: 'type',
			value: 'get'
		}];
		$.ajax({
			url: "../site/chatroom.php",
			type: 'post',
			data: data,
			dataType: 'json',
			success: function (json) {
				if(json){
					json=[].slice.call(json);
					json.forEach(function(n){
						if(n.username=='signin_out'){
							$('.history ul').append('<li>'+n.new_info+'</li>')
							time = n._time;
						}else{
							if(boole==true){
								$('.chat-window ul').append('<li>' + n.username + ': ' + n.new_info + '</li>');
								time = n._time;
								boole=false;
							}else{
								$('.chat-window ul').append('<li>' + n.new_info + ' :' + n.username + '</li>');
								time = n._time;
								boole=true;
							}
						}
					});
				};
				setTimeout(getinfo, 1000);
			},
			error: function () {
				setTimeout(getinfo, 1000);
			}
		});
	}
}