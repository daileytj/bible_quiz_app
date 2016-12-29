var quiz = {
    questions: [{
            question: "Question 1: Who is the oldest person in the Bible?",
            choices: ["Adam", "Moses", "Methuselah", "Noah"],
            answerIndex: 2,
            answer: "Methuselah (Genesis 5:27)"
        },
        {
            question: "Question 2: When the Lord told Abraham that his wife would have a child, what was his reaction?",
            choices: ["He Fainted", "He Laughed", "He Cried", "He ran and told his wife"],
            answerIndex: 1,
            answer: "He laughed (Genesis 17:16-17)"
        },
        {
            question: "Question 3: With what did the Lord destroy Sodom and Gomorrah?",
            choices: ["A Flood", "An Eathquake", "Fire and Brimstone", "An Army of Canaanites"],
            answerIndex: 2,
            answer: "Fire and Brimstone (Genesis 19:24)"
        },
        {
            question: "Question 4: What did God put in the sky after the flood to tell Noah that He would never flood the earth again?",
            choices: ["A Swirly Cloud", "An Eagle", "An Ark", "A Rainbow"],
            answerIndex: 3,
            answer: "A Rainbow"
        },
        {
            question: "Question 5: Who replaced Moses in his position as leader of the children of Israel?",
            choices: ["Eleazer", "Joshua", "Aaron", "Caleb"],
            answerIndex: 1,
            answer: "Joshua (Numbers 27:22-23)"
        },
        {
            question: "Question 6: Abram was a descendant of which of Noah's sons?",
            choices: ["Ham", "Shem", "Japheth", "Peleg"],
            answerIndex: 1,
            answer: "Shem (Genesis 11:10-26)"
        },
        {
            question: "Question 7: Who was promised by the Holy Spirit that he wouldn't die until he saw the Messiah?",
            choices: ["John", "Saul", "Simeon", "Herod"],
            answerIndex: 2,
            answer: "Simeon (Luke 2:25-26)"
        },
        {
            question: "Question 8: How many books are in the New Testament?",
            choices: ["44", "66", "8", "27"],
            answerIndex: 3,
            answer: "27"
        },
        {
            question: "Question 9: What job did David have as an adult?",
            choices: ["Servant", "Musician", "Mail Carrier", "King"],
            answerIndex: 3,
            answer: "A King"
        },
        {
            question: "Question 10: Which of the following are NOT one of the first four books in the new testament?",
            choices: ["James", "Mark", "Matthew", "Luke"],
            answerIndex: 0,
            answer: "James"
        }
    ]
};

var score = 0;
var current_question = 0;

function renderQuestion(state, JQueryElement, questions_index) {
    var renderedHTML = "";
    renderedHTML += '<h2 class="question">' + quiz.questions[questions_index].question + '</h2>';
    renderedHTML += '<p>Choose One:</p>';
    renderedHTML += '<form class="choices">';
    renderedHTML += '<input type="radio" name="option" class="option" value="0"></input>' + quiz.questions[questions_index].choices[0] + '<br/>';
    renderedHTML += '<input type="radio" name="option" class="option" value="1"></input>' + quiz.questions[questions_index].choices[1] + '<br/>';
    renderedHTML += '<input type="radio" name="option" class="option" value="2"></input>' + quiz.questions[questions_index].choices[2] + '<br/>';
    renderedHTML += '<input type="radio" name="option" class="option" value="3"></input>' + quiz.questions[questions_index].choices[3] + '<br/>';
    renderedHTML += '</form>';
    renderedHTML += '<div class="question_counter">You are on question ' + (questions_index + 1) + ' of 10.</div>';

    //  console.log("rendered html: " + renderedHTML);
    JQueryElement.html(renderedHTML);
}

function renderScore(score, JQueryElement) {
    var renderedHTML = "You answered " + score + " out of 10 correctly!";
    JQueryElement.html(renderedHTML);
}

function renderResults(state, JQueryElement) {
    var renderedHTML = quiz.questions.map(function(questions) {
        var row = "";
        row += "<h3>" + questions.question + "</h3>";
        row += "<p>Answer: " + questions.answer + "</p>";
        row += "<br/>";
        return row;
    });
    //console.log("rendered results: " + renderedHTML);
    JQueryElement.html(renderedHTML);
}



$(document).ready(function() {
    // Test renderScore and renderResults
    //$(".quiz_section").addClass("hidden");
    //renderScore(score, $(".score"));
    //renderResults(quiz, $(".results_explained"), score);
    //$(".results").removeClass("hidden");

    // Begin button functionality
    $(".begin").on('click', function() {
        // Hide welcome section, rnder question, and reveal the quiz section
        $(".welcome_section").addClass("hidden");
        renderQuestion(quiz, $(".quiz_section"), 0);
        $(".quiz_section").removeClass("hidden");
    });
});



// Quiz functionality w/ scorekeeping
$(".quiz_section").on('click', ".option", function() {
    //console.log("choices option clicked");
    // var selected_answer = $(this).attr("option").val();
    //--->   ?  or  ?
    var selected_answer = $("input[name=option]:checked", ".choices").val();
    var correct_answer = quiz.questions[current_question].answerIndex;
    // Loop through quiz questions to find current question to compare answer to
    if (selected_answer == correct_answer) {
        score += 1;
    }
    //console.log("selected answer: " + selected_answer);
    //console.log("correct answer: " + correct_answer);
    //console.log("current score: " + score);

    // Test if questions are complete to reveal score and results
    if (current_question < quiz.questions.length - 1) {
        current_question += 1;
        renderQuestion(quiz, $(".quiz_section"), (current_question));
    } else {
        $(".quiz_section").addClass("hidden");
        renderScore(score, $(".score"));
        renderResults(quiz, $(".results_explained"), score);
        $(".results").removeClass("hidden");
    }
    //console.log("current question: " + current_question);
});

// Try again button functionality
$(".try_again").on('click', function() {
    score = 0;
    current_question = 0;
    $(".welcome_section").removeClass("hidden");
    $(".quiz_section").addClass("hidden");
    $(".results").addClass("hidden");
});
