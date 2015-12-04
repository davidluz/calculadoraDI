
var app = angular.module('CalcDi', []).controller('RecursosCtrl', ['$scope', '$http', function ($scope, $http) { 
$scope.recursos = [];
$scope.recursosSelecionados = [];

//Corrige o erro do Apply (atualizar scope)
function CheckScopeBeforeApply() {
    if(!$scope.$$phase) {
         $scope.$apply();
    }
};

// Função que remove item do Array de Objetos Selecionados
$scope.remover = function(idRecebido){

for(var i = 0; i < $scope.recursosSelecionados.length; i++) {

    var a = parseInt($scope.recursosSelecionados[i].id);
    var b = idRecebido;

	if(a == b){
		$scope.recursosSelecionados.splice(i, 1);
	}
}




CheckScopeBeforeApply();

}

$http.get("data.json").then(function(response){
$scope.recursos = response.data.recursos;



/* Somente dentro deste escopo os objetos são acessados. */
//Pega todos os objetos do Array recursos e coloca na lista
for(var i=0; i<$scope.recursos.length; i++){
$('#lista-de-recursos').append('<option value="'+ $scope.recursos[i].id+'">'+ $scope.recursos[i].nome+'</option>');
$('select').material_select();
}


//Actions dos botões
$('#escolher').click(function(event) {
  // Pega o ID do recurso selecionado e busca um recurso na lista de recursos para atualizar
var idDoRecursoSelecionado = parseInt(($('#lista-de-recursos').val())-1);
var recursoSelecionado = $scope.recursos[idDoRecursoSelecionado];
 //Guarda o ID do recurso selecionado no array recursos Selecioandos

if(existeNoArray(recursoSelecionado.id)){
recursoSelecionado.quantidade = recursoSelecionado.quantidade +1;
CheckScopeBeforeApply();
}
else{
 $scope.recursosSelecionados.push(recursoSelecionado);
CheckScopeBeforeApply();
}


});






$("#estimar").click(function(event){
$("#home").fadeOut();	
$("#relatorio").fadeIn();	
realizarEstimativa();
});

});


// Funções Utilitárias e Estáticas 

// Retorna True se elemento já existe no Array
function existeNoArray(idprocurado){
var existe = false;  
for(i=0; i<$scope.recursosSelecionados.length; i++){

if(idprocurado==$scope.recursosSelecionados[i].id){
var existe = true; 
}

}
return existe;
}




function realizarEstimativa(){
var recursosTotais = 0;
for(i=0; i<$scope.recursosSelecionados.length; i++){

var recursosTotais = parseInt($scope.recursosSelecionados[i].quantidade)+ recursosTotais;
console.log(recursosTotais);
}

}



}]) // Fim de Scope








$(document).ready(function() {


    
});



