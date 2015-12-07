


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
var horasDeReuniao = 0;
var horasDeProducao1 = 0;
var horasDeProducao2 = 0;
var horasHomologacao = 0; 
var laudasTotais = 0;
var caracteresTotais = 0;
var horasTotais = 0;
var imagensTotais = 0;
var storyboardsTotais = 0;
var servicosTotais = 'Nenhum,';

for(i=0; i<$scope.recursosSelecionados.length; i++){

/*Soma de todos os recursos*/ 
recursosTotais = parseInt($scope.recursosSelecionados[i].quantidade)+ recursosTotais;

/*Horas de reunião = Soma todas a horas de análise*/ 
horasDeReuniao = parseInt($scope.recursosSelecionados[i].tempo_analise)*$scope.recursosSelecionados[i].quantidade + horasDeReuniao;

/*Horas de produção = Soma todas a horas de design*/ 
horasDeProducao1= parseInt($scope.recursosSelecionados[i].tempo_design)*$scope.recursosSelecionados[i].quantidade + horasDeProducao1;

/*Horas de produção = Soma todas desenvolvimento*/ 
horasDeProducao2 = parseInt($scope.recursosSelecionados[i].tempo_desenvolvimento)*$scope.recursosSelecionados[i].quantidade + horasDeProducao2;

/*Horas de produção = Soma todas desenvolvimento*/ 
horasHomologacao = parseInt($scope.recursosSelecionados[i].tempo_implementacao)*$scope.recursosSelecionados[i].quantidade + horasHomologacao;

/*Número estimado de Laudas*/ 
laudasTotais = parseInt($scope.recursosSelecionados[i].nm_laudas)*$scope.recursosSelecionados[i].quantidade + laudasTotais;

/*Número estimado de Caracteres*/ 
caracteresTotais = parseInt($scope.recursosSelecionados[i].nm_laudas*1800)*$scope.recursosSelecionados[i].quantidade + caracteresTotais;


 


}

$("#relatorio-tb").append('<tr><td class="negrito">Número de produtos:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas de trabalho em reuniões de modelagem:</td><td>'+horasDeReuniao+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas na especificação:</td><td>'+horasDeProducao1+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas no desenvolvimento:</td><td>'+horasDeProducao2+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de horas de ajustes e homologações:</td><td>'+horasHomologacao+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de laudas:</td><td>'+laudasTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de caracteres:</td><td>'+caracteresTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de imagens:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de Briefings estimados:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de roteiros estimados:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de Storyboards estimados:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso: </td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso (com edição): </td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso (sem edição): </td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas totais de design instrucional:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número mínimo de DIs para o prazo estipulado (FullTime):</td><td>'+recursosTotais+'</td></tr>');

}



}]) // Fim de Scope








$(document).ready(function() {


    
});



