
// variáveis globais
var imagetico = 0;
var textual = 0;


  google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Característica', 'Porcentagem'],
          ['Textual',  textual],
          ['Imagetico', imagetico],
          
        ]);

        var options = {
          title: 'Características dos conteúdos'
        };


         var data2 = google.visualization.arrayToDataTable([
          ['Característica', 'Porcentagem'],
          ['Textual',  textual],
          ['Imagetico', imagetico],
          
        ]);

        var options2 = {
          title: 'Índices de complexidade'
        };





        var chart = new google.visualization.PieChart(document.getElementById('grafico1'));
        chart.draw(data, options);

         /*var chart2 = new google.visualization.PieChart(document.getElementById('grafico2'));
        chart2.draw(data2, options2);*/



      }



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
CheckScopeBeforeApply();
realizarEstimativa();
drawChart();
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
var imagensTotais = 0;
var briefingsTotais = 0;
var roteirosTotais = 0;
var storyboardsTotais = 0;
var videosTotais = 0;
var videosEditados = 0;
var videosNEditados = 0;
var numeroDeDis = 0;
var horasTotaisDI = 0;


var servicosTotais = 'Nenhum,';

for(i=0; i<$scope.recursosSelecionados.length; i++){


recursosTotais = parseInt($scope.recursosSelecionados[i].quantidade)+ recursosTotais;

horasDeReuniao = parseInt($scope.recursosSelecionados[i].tempo_analise)*$scope.recursosSelecionados[i].quantidade + horasDeReuniao;

horasDeProducao1= parseInt($scope.recursosSelecionados[i].tempo_design)*$scope.recursosSelecionados[i].quantidade + horasDeProducao1;

horasDeProducao2 = parseInt($scope.recursosSelecionados[i].tempo_desenvolvimento)*$scope.recursosSelecionados[i].quantidade + horasDeProducao2;

horasHomologacao = parseInt($scope.recursosSelecionados[i].tempo_implementacao)*$scope.recursosSelecionados[i].quantidade + horasHomologacao;

laudasTotais = parseInt($scope.recursosSelecionados[i].nm_laudas)*$scope.recursosSelecionados[i].quantidade + laudasTotais;

caracteresTotais = parseInt($scope.recursosSelecionados[i].nm_laudas*1800)*$scope.recursosSelecionados[i].quantidade + caracteresTotais;

imagensTotais = parseInt($scope.recursosSelecionados[i].nm_imagens)*$scope.recursosSelecionados[i].quantidade + imagensTotais;

briefingsTotais = parseInt($scope.recursosSelecionados[i].nm_briefings)*$scope.recursosSelecionados[i].quantidade + briefingsTotais;

roteirosTotais = parseInt($scope.recursosSelecionados[i].nm_roteiros)*$scope.recursosSelecionados[i].quantidade + roteirosTotais;

storyboardsTotais = parseInt($scope.recursosSelecionados[i].nm_storyboards)*$scope.recursosSelecionados[i].quantidade + storyboardsTotais;

videosTotais = parseInt($scope.recursosSelecionados[i].video_editado + $scope.recursosSelecionados[i].video_s_editado )*$scope.recursosSelecionados[i].quantidade + videosTotais;

videosEditados = parseInt($scope.recursosSelecionados[i].video_editado)*$scope.recursosSelecionados[i].quantidade + videosEditados;

videosNEditados = parseInt($scope.recursosSelecionados[i].video_s_editado)*$scope.recursosSelecionados[i].quantidade + videosNEditados;

horasTotaisDI = parseInt($scope.recursosSelecionados[i].tempo_total)*$scope.recursosSelecionados[i].quantidade + horasTotaisDI;

imagetico  = parseInt($scope.recursosSelecionados[i].atr_visual)*$scope.recursosSelecionados[i].quantidade + imagetico;

textual  = parseInt($scope.recursosSelecionados[i].atr_textual)*$scope.recursosSelecionados[i].quantidade + textual;

numeroDeDis = calculaNumeroDeDIs(horasTotaisDI, parseInt(document.getElementById("numeroDeSemanasLimite").value));


}

$("#relatorio-tb").append('<tr><td class="negrito">Número de produtos:</td><td>'+recursosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas de trabalho em reuniões de modelagem:</td><td>'+horasDeReuniao+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas na especificação:</td><td>'+horasDeProducao1+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas no desenvolvimento:</td><td>'+horasDeProducao2+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de horas de ajustes e homologações:</td><td>'+horasHomologacao+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de laudas:</td><td>'+laudasTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de caracteres:</td><td>'+caracteresTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número estimado de imagens:</td><td>'+imagensTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de Briefings estimados:</td><td>'+briefingsTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de roteiros estimados:</td><td>'+roteirosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número de Storyboards estimados:</td><td>'+storyboardsTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso: </td><td>'+videosTotais+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso (com edição): </td><td>'+videosEditados+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Total de minutos de todos os vídeos do curso (sem edição): </td><td>'+videosNEditados+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Horas estimadas totais de design instrucional:</td><td>'+horasTotaisDI+'</td></tr>');
$("#relatorio-tb").append('<tr><td class="negrito">Número mínimo de DIs para o prazo estipulado (FullTime):</td><td>'+numeroDeDis+'</td></tr>');

}

// Exemplos 600 horas em 3 Semana = tem que retorna 10 dis
function calculaNumeroDeDIs(horasDeCurso, numeroDeSemanaLimite){ 


var TempoDeumDI = Math.ceil(horasDeCurso / 40); // Retorna 15 Semanas
var x =  Math.ceil(TempoDeumDI/numeroDeSemanaLimite); // Divide 15 semanas 3;
return  x;


}



}]) // Fim de Scope








$(document).ready(function() {
$(".button-collapse").sideNav();

    
});



