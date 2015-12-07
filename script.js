


var app = angular.module('CalcDi', []).controller('RecursosCtrl', ['$scope', '$http', function ($scope, $http) { 
$scope.recursos = [];
$scope.recursosSelecionados = [];

$scope.refreshPage = function() {
   history.go(0);
}

$scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportavel').innerHTML], {
              type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };

    // Fim do plugin do excel


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
horasTotais = parseInt($scope.recursosSelecionados[i].tempo_total)+ horasTotais;

// Faz o cálculo do número de Storyboards	
horasTotais = parseInt($scope.recursosSelecionados[i].tempo_total)+ horasTotais;


}

$("#relatorio-tb").append('<tr><td class="negrito">Número de produtos:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de laudas:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de imagens:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de Caracteres:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas de design instrucional:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número mínimo de designers instrucionais:</td><td>'+recursosTotais+'</td></tr>');

}



}]) // Fim de Scope








$(document).ready(function() {


    
});



