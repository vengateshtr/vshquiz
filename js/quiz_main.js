

angular
	.module('vsh-quiz', [])
	.controller('quiz-controller', quiz_controller);

quiz_controller.$inject = [
	'$scope'
];

function quiz_controller(
	$scope
){

	var vmQC = this;

	controllerInit_quiz();

	function controllerInit_quiz(){

		configureGlobalValues();

		configureScopeValues();

	}

	function configureGlobalValues(){
	}

	function configureScopeValues(){

		vmQC.Question_Answers = window['Question_Answers'];

		vmQC.Callbacks = {};
		vmQC.Callbacks.verifyAnswers = verifyAnswers;

	}

	function verifyAnswers(){

		debugger;

		vmQC.Question_Answers;

	}





}
