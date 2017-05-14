$(document).ready(function() {

	//questions object
	var questions = [
		{
			question: "1- How many speakers of Turkish are there worldwide?", 
			choices: ["80 million", "100 million", "20 million", "40 million"],
			answer: "80 million"
		},
		{
			question: "2- Where in Turkey was Santa Claus born?", 
			choices: ["Izmir", "Antalya", "Istanbul", "Ankara"],
			answer: "Antalya"
		},
		{
			question: "3- Istanbul was never the capital of which empire?", 
			choices: ["Ottoman Empire", "Roman Empire", "Byzantine Empire", "British Empire"],
			answer: "British Empire"
		},
		{
			question: "4- Which is a famous Turkish dessert?", 
			choices: ["Gulab Jamun", "Baklava", "Mochi", "Tiramisu"],
			answer: "Baklava"
		},
		{
			question: "5- Which of the following is a Nobel winning Turkish writer?", 
			choices: ["Edward Said", "Naguib Mahfouz", "Amin Maalouf", "Orhan Pamuk"],
			answer: "Orhan Pamuk"
		},
		{
			question: "6- According to legend, Noah's Ark landed on _____ in Eastern Turkey.", 
			choices: ["Mount Ararat", "Mount Nemrut", "Mount Everest", "None of the options"],
			answer: "Mount Ararat"
		},
		{
			question: "7- _____ is the only city in the world located on two continents.", 
			choices: ["Cairo", "Ankara", "Istanbul", "Athens"],
			answer: "Istanbul"
		},
		{
			question: "8- Which two colors are found on the Turkish flag?", 
			choices: ["White and Navy", "Red and White", "Blue and Yellow", "Red and Navy"],
			answer: "Red and White"
		},
		{
			question: "9- Turkey is the number 1 consumer of which drink in the world?", 
			choices: ["Coffee", "Beer", "Water", "Tea"],
			answer: "Tea"
		},
		{
			question: "10- The famous Trojan War took place in the Turkish city of _____.", 
			choices: ["Istanbul", "Aydin", "Canakkale", "Athens"],
			answer: "Canakkale"
		}];

	//global variables
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;
	var seconds = 121;

	//function that will submit the results and calculate the correct/wrong/unanswered questions
	function submit() {

		for(var i = 0; i < 10; i++) {
				var radios = document.getElementsByName("radio" + i);
				for(var j = 0; j < radios.length; j++) {
					var radio = radios[j];
					if (radio.value == questions[i].answer && radio.checked) {
						correct++;
					} else if (radio.value !== questions[i].answer && radio.checked) {
						wrong++;
					}
				}
			}

		//finding the unaswered questions
		unanswered = 10 - (correct + wrong);

		//update the first row with the counters.
		$(".row").html("<img src='assets/images/background8.png' alt='turkey'><br><br><h4>Correct answers: " + correct + "</h4><br><h4>Wrong answers: " + wrong + "</h4><br><h4>Unanswered: " + unanswered + "</h4><br><br>");

		//adding an image to the second row according to the number of correct answers.
		if (correct > 6) {
			$(".secondRow").html("<img src='assets/images/amazing.jpg' alt='amazing'><br>");
		} else if (correct >= 4) {
			$(".secondRow").html("<img src='assets/images/mediocre.jpg' alt='mediocre'><br>");
		} else if (correct < 4) {
			$(".secondRow").html("<img src='assets/images/terrible.jpg' alt='terrible'><br>");
		}

		//adding a play again button to the third row to reload the page when that button is clicked.
		$(".thirdRow").html("<div><br><br><button type='button' id='playAgain'>PLAY AGAIN</button><br><br><br></div>");
		$("#playAgain").on("click", function() {
			window.location.reload();
		});

		//stop the countdown timer
		clearInterval(intervalId);

	};

	//once the user clicks the start button, the contents div will be hidden and the countdown will start. Once it reaches 0, the results will automatically be submitted.
   	$("#start").on("click", function() {
   		
   		$("#content").hide();

		intervalId = setInterval(countdown, 1000);

		//the countdown function starts when the start button is clicked. The above setInterval() repeats this function every second. Once the seconds reach zero, the results are dynamically submitted.
		function countdown() {
			seconds--;
			$("#timer").html("<div><h4>You have " + seconds + " seconds left!</h4></div");
				if (seconds === 0) {
					submit();
				}
		};

		//for loop will dynamically create the question and the radio buttons.
		for (var i = 0; i < questions.length; i++) {
			$("#form").append("<br><br><br><p>" + questions[i].question + "</p><br>");
	      	for (var j = 0; j < questions[i].choices.length; j++) {
          		$("#form").append("<input type='radio' name='" + "radio" + [i] + "' value='" + questions[i].choices[j] + "' >" + questions[i].choices[j] + "</input>");
	      	}
      	}
   		
   		//a submit/done button will be added to the bottom of the quiz.
   		$("#submit").html("<div><br><br><button type='button'>DONE</button><br><br><br></div>");

   		//when the user clicks the submit button, the submit() function will be called.
   		$("#submit").on("click", submit);

	});

});
