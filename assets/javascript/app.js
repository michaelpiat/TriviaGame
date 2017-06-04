
window.onload = function() {

$("#secondScreen").hide();
$("#finalScreen").hide();
$("#start").click(triviagame.startGame);
$("#doneButton").click(triviagame.checkAnswer);

};
var intervalId;

var clockRunning = false; 

var rightAnswers = 0;

var wrongAnswers = 0; 

var unanswerd = 0;

var gameQuestions = [];



var questions = [

	{
	question: "The first human-made object to land on the moon was launched by what country?",
	answers: ["The Soviet Union", "Japan", "China", "The United States of America"],
	correctAnswer: 0
	},
	{
	question: "Who was the Prime Minister of Italy during WWII?",
	answers: ["Georgio Armani", "Benito Mussolin", "Francesco Totti", "Silvio Berlusconi"],
	correctAnswer: 1
	},
	{
	question: "The use of chopsticks originated in what country?",
	answers: ["Japan", "Italy", "China", "The United States of America"],
	correctAnswer: 2
	},
	{
	question: "What was the name of the U.S. research and development project to create the nuclear wepons in WWII?",	
	answers: ["Manhattan Project", "Area 51", "X-Files", "Project Almanac"],
	correctAnswer: 0
	},
	{
	question: "Brazil was once a colony of which European country?",
	answers: ["Great Britain", "Portugal", "Spain", "Germany"],
	correctAnswer: 1
	}];



var triviagame = {

	time: 5, 


	
	checkAnswer: function() {

		triviagame.stopTimer();
		$("#secondScreen").hide();

		rightAnswers = 0;
		wrongAnswers = 0;
		unanswerd = 0;

		
		for (i=1; i <= gameQuestions.length; i++) {
			
			var questionIndex = gameQuestions[i-1];

			var answerd = false;	

			var answerCorrect = false;		

			for (j=0; j < 4; j++) {

				 if  ($("#a-btn-"+i+"-"+j + " > input").is(':checked')) {

				 	answerd = true;

				 	if (j == questions[questionIndex].correctAnswer) {

				 		answerCorrect = true;

				 	
				 	}
				 } 

				 
				
			} 

			if (answerd === true) {

				if (answerCorrect === true) {

					rightAnswers++;
					$("#correctAnswer").html("<p>Correct Answers:"+rightAnswers);
				} else {
					wrongAnswers++;
				}
			} else {
				unanswerd++;
			}
		}




		$("#finalScreen").show();
		// $("#correctAnswer").html("<p>Correct Answers:"+rightAnswers);
	},





	startGame: function() {

		intervalId = setInterval(triviagame.count, 1000);
		$("#secondScreen").show();
		$("#firstScreen").hide();
		gameQuestions = [];
		
		for (i = 0; i < 4;) {
			
			randomQuestion = Math.floor(Math.random() * questions.length);

			if (!gameQuestions.includes(randomQuestion)) {

				gameQuestions.push(randomQuestion);

				i++;
			} 

		}

		
		for (i=1; i <= gameQuestions.length; i++) {
			
			var questionIndex = gameQuestions[i-1];

			$("#question"+i).html(questions[questionIndex].question);

			for (j=0; j < questions[questionIndex].answers.length; j++) {

				$("#a-btn-"+i+"-"+j).html('<input type="radio" name="group'+i+'">'+questions[questionIndex].answers[j]);
			}
		}


	},

	count: function() {

		triviagame.time--;

		var currentTime = triviagame.timeConverter(triviagame.time);

		if (triviagame.time === 0) {
			
			triviagame.checkAnswer();
		}

		$("#timer").html(currentTime);
	},


	stopTimer: function() {

		clearInterval(intervalId);
	},



  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }




};



