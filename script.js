
var app = angular.module('CalcDi', []).controller('RecursosCtrl', ['$scope', '$http', function ($scope, $http) { 
$scope.recursos = [];
$scope.recursosSelecionados = [];
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
//Guarda o ID do recurso selecionado no array recursos Selecioandos
$scope.recursosSelecionados.push($('#lista-de-recursos').val());
});

$("#estimar").click(function(event){
realizarEstimativa();
});


});

}]) 

function realizarEstimativa(){
console.log('fimDaEstimativa');
} 

$(document).ready(function() {
    
});

