
//when the window loads function
window.onload = function() {

//hinds the screen with the questions
$("#secondScreen").hide();
//hinds the last screen
$("#finalScreen").hide();
//when the start button is pressed the startgame function starts
$("#start").click(triviagame.startGame);
//when the done button is pressed the checkanswer function starts
$("#doneButton").click(triviagame.checkAnswer);

};

//global variables
var intervalId;

var clockRunning = false; 

var rightAnswers = 0;

var wrongAnswers = 0; 

var unanswerd = 0;

var gameQuestions = [];


//the questions are organized in and array with each question being an object.
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


//The game object
var triviagame = {

	//timer 
	time: 30, 


	
	checkAnswer: function() {
		//stops the timer
		triviagame.stopTimer();
		//hides the screen with the questions
		$("#secondScreen").hide();

		rightAnswers = 0;
		wrongAnswers = 0;
		unanswerd = 0;

		//goes through the array with the index numbers
		for (i=1; i <= gameQuestions.length; i++) {
			
			var questionIndex = gameQuestions[i-1];

			var answerd = false;	

			var answerCorrect = false;		
			//a loop that loops 4 times. The number of possible answers
			for (j=0; j < 4; j++) {
				//black magic from the interent that checks if a button has been pressed
				 if  ($("#a-btn-"+i+"-"+j + " > input").is(':checked')) {

				 	answerd = true;
				 	//if j equals the correct answers of current question answerCorrect becoms true
				 	if (j == questions[questionIndex].correctAnswer) {

				 		answerCorrect = true;

				 	
				 	}
				 } 

				 
				
			} 
			//if an answer has been selected checks if answer is correct or not
			if (answerd === true) {

				if (answerCorrect === true) {
				//increments the rightAnswers	
					rightAnswers++;
				//increments the wrongAnswers	
				} else {
					wrongAnswers++;
				}
			//if a question is not answerd we increment unanswerd
			} else {
				unanswerd++;
			}
		}


		//updates the screen with the rightAnswers var
		$("#correctAnswers").html(rightAnswers);
		//updates the screen with the wrongAnswers var
		$("#incorrectAnswers").html(wrongAnswers);
		//updates the screen with the unanswerd var
		$("#unanswerd").html(unanswerd);
		//shows the final screen
		$("#finalScreen").show();
		
	},





	startGame: function() {
		//sets the interval at 1 second
		intervalId = setInterval(triviagame.count, 1000);
		//shows the screen with the questions
		$("#secondScreen").show();
		//hids the first screen
		$("#firstScreen").hide();
		gameQuestions = [];
		
		//loops 4 times
		for (i = 0; i < 4;) {
			//generates a random bumber between 0 and the number of question the game has. 0 would be the position of the first question in our array of questions
			randomQuestion = Math.floor(Math.random() * questions.length);
			//only if the array number is not already in the gameQuestion array the number is added
			if (!gameQuestions.includes(randomQuestion)) {

				gameQuestions.push(randomQuestion);
			//only if the number is added we increment	
				i++;
			} 

		}

		//looping depends on the number of question and how many items we have in our gameQuestions array
		for (i=1; i <= gameQuestions.length; i++) {
			//the question in the html are question1 question2 etc. so I had to start incrementing at 1 so that I could
			//assign the questions to the right elements. or something like that...
			var questionIndex = gameQuestions[i-1];
			//the html question elements gets assigned a question depending on the i which loops from 1 to the length of the questions array
			//the the question from the questions array at the questionsIndex number is assigned
			$("#question"+i).html(questions[questionIndex].question);
			//goes through the answers property of the selected question in the questions array
			for (j=0; j < questions[questionIndex].answers.length; j++) {
				//some more black magic from the internet that assignes the answers to the buttons
				$("#a-btn-"+i+"-"+j).html('<input type="radio" name="group'+i+'">'+questions[questionIndex].answers[j]);
			}
		}


	},

	count: function() {

		triviagame.time--;

		var currentTime = triviagame.timeConverter(triviagame.time);
		//if the time runs out we start the checkAnswer function
		if (triviagame.time === 0) {
			
			triviagame.checkAnswer();
		}

		$("#timer").html(currentTime);
	},

	//function to stop the timer
	stopTimer: function() {

		clearInterval(intervalId);
	},


	//I took this function from the Stopwatch we worked on in class
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



