function chatController($scope){
	$scope.nome = "Avatar";
	$scope.mensagens = []

	$scope.avatar = "img/avatar.png";

	var socket = io();

	$scope.verificarMensagem = function(){
		var cmd = $scope.msg.charAt(1);

		if(cmd == "@"){
			comando =/<@(.*)>/.exec($scope.msg);
			comando = comando[0].replace("<@", "");
			comando = comando.replace(">", "");
			
			switch(comando){
				case "nome" : ms = $scope.msg;
							   $scope.enviarMensagem("Mudei meu nome para => " + ms.replace("<@nome>", ""));
							   $scope.nome = ms.replace("<@nome>", "");
				break;

				case "avatar" : $scope.avatar = $scope.msg.replace("<@avatar>", "");
								 $scope.msg = "";
				break;

				default : return false;
			}
		}
		else{
			$scope.enviarMensagem($scope.msg);
		}							
	}

	$scope.enviarMensagem = function(mens){
		socket.emit('chat message', {"nome": $scope.nome, "mensagem": mens.replace("<iframe",""), "avatar": $scope.avatar});
		$scope.msg = "";							
	}

	socket.on('chat message', function(msg){
		$scope.mensagens.push(msg);
		$scope.$apply();
		window.scrollTo(0,document.body.scrollHeight);
    });
}