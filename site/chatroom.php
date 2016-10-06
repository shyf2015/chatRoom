<?php
	class Info{
		var $username;
		var $new_info;
		var $time; 
	};
	$Info=new Info();
	$myfile=fopen('info.txt','r');
	$json=fgets($myfile);
	fclose($myfile);
	$data=json_decode($json,true);	
	$type=$_POST['type'];
	if($type=='login'){
		$Info -> username='signin_out';
		if($_POST['new_info']){
			$Info -> new_info=$_POST['new_info'].'进入聊天室';
		}else{
			$Info -> new_info='未知用户进入聊天室';
		}
		$Info -> time=time();
		array_push($data,$Info);
		$data=json_encode($data);
		$myfile=fopen('info.txt','w');
		fputs($myfile,$data);
		fclose($myfile);
		echo $Info -> time;		
	}
	if($type=='add'){
		if ($_POST['username']) {
			$Info -> username=$_POST['username'];
		}else{
			$Info -> username='未知用户';
		}
		$Info -> new_info =$_POST['new_info'];
		$Info -> time =time();
		array_push($data,$Info);
		$data=json_encode($data);
		$myfile=fopen('info.txt','w');
		fputs($myfile,$data);
		fclose($myfile);
	}
	if($type=='get'){
		foreach ($data as $key => $value) {
			if($value['time']> $_POST['time']){
				$arr[]=array(
					'username'=>$value['username'],
					'new_info'=>$value['new_info'],
					'_time'=>$value['time']
				);	
			};
		};
		$arr=json_encode($arr);
		//$arr[]=$data[count($data)-1]['time'];
		echo $arr;
	}
?>