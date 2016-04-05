function chatController($scope){
	$scope.user = {nome: "User", avatar: "img/avatar.png"};
	$scope.user.nome = "User";
	$scope.mensagens = [];
	$scope.showAvatars = false;

	$scope.user.avatar = "img/avatar.png";

	var socket = io();

	$scope.verificarMensagem = function(){
		var cmd = $scope.msg.charAt(1);

		if(cmd == "@"){
			comando =/<@(.*)>/.exec($scope.msg);
			comando = comando[0].replace("<@", "");
			comando = comando.replace(">", "");
			
			switch(comando){
				case "nome" : ms = $scope.msg;
							   //$scope.enviarMensagem("Mudei meu nome para => " + ms.replace("<@nome>", ""));
							   alert("Nome alterado para " + ms.replace("<@nome>", ""));
							   $scope.user.nome = ms.replace("<@nome>", "");
							   $scope.msg = "";
				break;

				case "avatar" : $scope.user.avatar = $scope.msg.replace("<@avatar>", "");
								 $scope.msg = "";
				break;

				default : return false;
			}
		}
		else{
			$scope.enviarMensagem($scope.msg);
		}							
	}

	$scope.avatars = [
		{nome: "Batman", grupo: "Batman", url: "img/avatars/Batman.png"},
		{nome: "Joker", grupo: "Batman", url: "img/avatars/Batman-Joker.png"},
		{nome: "Captain America", grupo: "Avatars", url: "img/avatars/Captain-America.png"},
		{nome: "Captain Universe", grupo: "Avatars", url: "img/avatars/Captain-Universe.png"},
		{nome: "Dare Devil", grupo: "Avatars", url: "img/avatars/Dare-Devil.png"},
		{nome: "Dead Pool", grupo: "Avatars", url: "img/avatars/Dead-Pool.png"},
		
		{nome: "Johnny Blaze", grupo: "Fantastic Four", url: "img/avatars/FantasticFour-Johnny-Blaze.png"},
		{nome: "Thing", grupo: "Fantastic Four", url: "img/avatars/FantasticFour-Thing.png"},
		
		{nome: "Barret", grupo: "Final Fantasy", url: "img/avatars/FinalFantasy-Barret-Wallace.png"},
		{nome: "Ghost Rider", grupo: "Avatars", url: "img/avatars/Ghost-Rider.png"},
		{nome: "Hellboy", grupo: "Avatars", url: "img/avatars/Hellboy.png"},
		{nome: "Hero Striped", grupo: "Avatars", url: "img/avatars/Hero-Striped.png"},

		{nome: "Hulkling", grupo: "Hulk", url: "img/avatars/Hulk-Hulkling.png"},
		{nome: "Red Hulk", grupo: "Hulk", url: "img/avatars/Hulk-Red-Hulk.png"},

		{nome: "Iron Man", grupo: "Iron Man", url: "img/avatars/IronMan.png"},
		{nome: "Iron America", grupo: "Iron Man", url: "img/avatars/IronMan-Iron-America.png"},
		{nome: "Monger", grupo: "Iron Man", url: "img/avatars/IronMan-Monger.png"},
		{nome: "War Iron", grupo: "Iron Man", url: "img/avatars/IronMan-War-Iron.png"},
		{nome: "War Machine", grupo: "Iron Man", url: "img/avatars/IronMan-War-Machine.png"},

		{nome: "Agent Smith", grupo: "Avatars", url: "img/avatars/Matrix-Agent-Smith.png"},
		{nome: "Snake Eyes", grupo: "Avatars", url: "img/avatars/GiJoe-Snake-Eyes.png"},

		{nome: "Spider Man", grupo: "Spider Man", url: "img/avatars/Spiderman.png"},
		{nome: "Spider Man", grupo: "Spider Man", url: "img/avatars/Spiderman-Black.png"},
		{nome: "Green Goblin", grupo: "Spider Man", url: "img/avatars/Spiderman-Green-Goblin.png"},
		{nome: "Morales", grupo: "Spider Man", url: "img/avatars/Spiderman-Morales.png"},
		{nome: "Spider Woman", grupo: "Spider Man", url: "img/avatars/Spiderman-Spider-Woman.png"},

		{nome: "Akuma", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Akuma.png"},
		{nome: "Balrog", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Balrog.png"},
		{nome: "Blanka", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Blanka.png"},
		{nome: "Chun Li", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Chunli.png"},
		{nome: "Dark Hadou", grupo: "Street Fighter", url: "img/avatars/StreetFighter-DarkHadou.png"},
		{nome: "Dhalsim", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Dhalsim.png"},
		{nome: "Ken", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Ken.png"},
		{nome: "Makoto", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Makoto.png"},
		{nome: "Ryu", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Ryu.png"},
		{nome: "Sagat", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Sagat.png"},
		{nome: "Sakura Kasugano", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Sakura-Kasugano.png"},
		{nome: "Zangief", grupo: "Street Fighter", url: "img/avatars/StreetFighter-Zangief.png"},

		{nome: "Super Man", grupo: "Avatars", url: "img/avatars/Superman.png"},
		{nome: "Thor", grupo: "Avatars", url: "img/avatars/Thor.png"},

		{nome: "Colossus", grupo: "Xmen", url: "img/avatars/Xmen-Colossus.png"},
		{nome: "Magneto", grupo: "Xmen", url: "img/avatars/Xmen-Magneto.png"},
		{nome: "Shadow Cat", grupo: "Xmen", url: "img/avatars/Xmen-Shadow-Cat.png"}
	];

	$scope.mudaAvatar = function(novoAvatar){
		$scope.user.avatar = novoAvatar;
		$scope.showAvatars = false;
	}

	$scope.enviarMensagem = function(mens){
		socket.emit('chat message', {"nome": $scope.user.nome, "mensagem": mens.replace("<iframe",""), "avatar": $scope.user.avatar});
		$scope.msg = "";							
	}

	socket.on('chat message', function(msg){
		$scope.mensagens.push(msg);
		$scope.$apply();
		window.scrollTo(0,document.body.scrollHeight);
    });
}