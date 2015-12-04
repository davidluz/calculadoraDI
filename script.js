
var app = angular.module('CalcDi', []).controller('RecursosCtrl', ['$scope', '$http', function ($scope, $http) { 
$scope.recursos = [];
$scope.recursosSelecionados = [];

//Corrige o erro do Apply (atualizar scope)
function CheckScopeBeforeApply() {
    if(!$scope.$$phase) {
         $scope.$apply();
    }
};

//Função que remove item do Array
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
 recursoSelecionado.quantidade = 1;	
 $scope.recursosSelecionados.push(recursoSelecionado);
 CheckScopeBeforeApply();
}


});






$("#estimar").click(function(event){
$("#relatorio-conteudo").fadeIn("slow");		
$("#home").fadeOut("fast");	
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
var horasTotais = 0;
var laudasTotais = 0;
var imagensTotais = 0;
var storyboardsTotais = 0;
var servicosTotais = 'Nenhum,';

for(i=0; i<$scope.recursosSelecionados.length; i++){

// Faz o cálculo da quantidade de recursos 	
recursosTotais = parseInt($scope.recursosSelecionados[i].quantidade)+ recursosTotais;

// Faz o cálculo das horas	
horasTotais = parseInt($scope.recursosSelecionados[i].tempo_de_producao)+ horasTotais;

// Faz o cálculo do número de Storyboards	
horasTotais = parseInt($scope.recursosSelecionados[i].tempo_de_producao)+ horasTotais;


}
$("#relatorio").append('<p>Número de produtos: '+recursosTotais+'</p>');
$("#relatorio").append('<p>Horas estimadas de produção: '+recursosTotais+'</p>');
$("#relatorio").append('<p>Número de Laudas estimadas: '+recursosTotais+'</p>');
$("#relatorio").append('<p>Número de Storyboards: '+recursosTotais+'</p>');
$("#relatorio").append('<p>Número de imagens: '+recursosTotais+'</p>');

}



}]) // Fim de Scope








$(document).ready(function() {


    
});



