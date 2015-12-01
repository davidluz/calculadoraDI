var recursosSelecionados = [];
var app = angular
  .module('MyApp', [
  ])
.controller('QuestionCtrl', ['$scope', '$http', function ($scope, $http) { 
  $scope.recursos = [];
  $http
    .get("data.json")
    .then(function(response){
      $scope.recursos = response.data.recursos;

    /* Somente dentro deste escopo os objetos são acessados. */

    //Pega todos os objetos do Array recursos e coloca na lista
    for(var i=0; i<$scope.recursos.length; i++){
    $('#lista-de-recursos').append('<option value="'+ $scope.recursos[i].id+'">'+ $scope.recursos[i].nome+'</option>');
    }


     
    });
       
       $(document).ready(function() {
         	
            
         	$('#escolher').click(function(event) {
         		//Guarda o ID do recurso selecionado no array recursos Selecioandos
         		recursosSelecionados.push($('#lista-de-recursos').val());
         		console.log(recursosSelecionados);
         		});



       });
     
 


}]) 


