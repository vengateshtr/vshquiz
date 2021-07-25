

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

		vmQC.Questions_with_Options = window['Questions_with_Options'];
		vmQC.userSelectedOptions = {};

		vmQC.Callbacks = {};
		vmQC.Callbacks.onTickRadioButton = onTickRadioButton;
		vmQC.Callbacks.onTickCheckBox = onTickCheckBox;
		vmQC.Callbacks.verifyOptions = verifyOptions;

		vmQC.Questions_with_Options.forEach(
			function(questionItem, questionIndex, questionArray){

				if(
					questionItem.type === 'radiobutton'
				){

					questionArray[questionIndex].selectedOptions = [];

				}
				else if(
					questionItem.type === 'checkbox'
				){

					questionArray[questionIndex].selectedOptions = {};

				}

			}
		);

	}

	function verifyOptions(){

		var totalPoints = 0,
			optionPoint,
			checkBoxQuestionAllPoints,
			checkBoxQuestionUserPoints;

		vmQC.Questions_with_Options.forEach(
			function(questionItem, questionIndex, questionArray){

				var userSelectedOptions;

				if(
					questionItem.type === 'radiobutton'
				){
					userSelectedOptions = vmQC.userSelectedOptions[questionIndex] || [];

					if(
						userSelectedOptions.length > 0
					){

						optionPoint = questionItem.options[userSelectedOptions[0]].point;

						if(
							optionPoint > 0
						){
							questionArray[questionIndex].options[userSelectedOptions[0]].userPickedOption_correct = true;
						}
						else{
							questionArray[questionIndex].options[userSelectedOptions[0]].userPickedOption_incorrect = true;
						}


						totalPoints += optionPoint;
					}

				}
				else if(
					questionItem.type === 'checkbox'
				){

					checkBoxQuestionAllPoints = 0;
					checkBoxQuestionUserPoints = 0;

					userSelectedOptions = vmQC.userSelectedOptions[questionIndex] || [];


					questionItem.options.forEach(
						function(QOItem, QOIndex, QOArray){

							checkBoxQuestionAllPoints += QOItem.point;

					});

					userSelectedOptions.forEach(
						function(USOItem, USOIndex, USOArray){

							optionPoint = questionItem.options[USOItem].point;

							if(
								optionPoint > 0
							){

								questionArray[questionIndex].options[USOItem].userPickedOption_correct = true;

							}
							else{
								questionArray[questionIndex].options[USOItem].userPickedOption_incorrect = true;
							}

							checkBoxQuestionUserPoints += optionPoint;

						}
					);

						// AND condition -> only if all options are selected, given mark. Otherwise, ZERO only
					if(
						checkBoxQuestionAllPoints === checkBoxQuestionUserPoints
					){
						totalPoints += 1;
					}

				}

			}
		);



	}

	function onTickRadioButton(questionIndex, optionIndex){

		vmQC.userSelectedOptions = vmQC.userSelectedOptions || {};

		vmQC.userSelectedOptions[questionIndex] = [
			optionIndex.toString()
		];

	}

	function onTickCheckBox(questionIndex, optionIndex, that){

		var unselectedOptionIndex;

		vmQC.userSelectedOptions = vmQC.userSelectedOptions || {};

		vmQC.userSelectedOptions[questionIndex] = vmQC.userSelectedOptions[questionIndex] || [];

		if(
			vmQC.Questions_with_Options[questionIndex].selectedOptions[optionIndex]
		){

			unselectedOptionIndex = vmQC.userSelectedOptions[questionIndex].indexOf(optionIndex.toString());

			vmQC.userSelectedOptions[questionIndex].splice(unselectedOptionIndex, 1);
		}
		else{
			vmQC.userSelectedOptions[questionIndex].push(optionIndex.toString());

		}

	}


}
