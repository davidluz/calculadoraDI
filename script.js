
var app = angular.module('CalcDi', []).controller('RecursosCtrl', ['$scope', '$http', function ($scope, $http) { 
$scope.recursos = [];
$scope.recursosSelecionados = [];

//Corrige o erro do Apply (atualizar scope)
function CheckScopeBeforeApply() {
    if(!$scope.$$phase) {
         $scope.$apply();
    }
};

$scope.remover = function(idRecebido){
$scope.recursosSelecionados.splice((parseInt(idRecebido)),1);
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
 existeNoArray(recursoSelecionado.id);
$scope.recursosSelecionados.push(recursoSelecionado);


CheckScopeBeforeApply();



});






$("#estimar").click(function(event){
realizarEstimativa();
console.log("estimar");
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
console.log(existe);
}



}]) // Fim de Scope



function realizarEstimativa(){
console.log('fimDaEstimativa');
} 

$(document).ready(function() {


    
});



