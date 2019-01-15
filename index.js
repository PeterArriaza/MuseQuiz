let questionNumber = 0;
let score = 0;

function buildQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
    <div class='questionTitle'>
    <h1>${STORE[questionNumber].question}</h2>
    </div>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(10)
    }
}

function changeQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);

}

function changeScore() {
    score++;
}

function startQuiz() {
    $('.quizStart').on('click', '.startButton', function (event) {
        $('.quizStart').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);

        renderNextQuestion();
    });
}

function renderQuestion() {
    $('.questionAnswerForm').html(buildQuestion());
}

function userSelectAnswer() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        $('.submitButton').remove();
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            ifAnswerIsCorrect();
        } else {
            selected.parent().addClass('wrong');
            ifAnswerIsWrong();
        }
    });
}

function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    updateScore();
}

function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.correct').html(`<p><b>You got it right!</b></p>`);
    $('.questionAnswerForm').append(`<button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    let correctAnswerIndex = 0;
    for (let i = 0; i < 4; i++) {
        if (`${STORE[questionNumber].answers[i]}` === correctAnswer) {
            correctAnswerIndex = i;
        } else;
    }

    $('.wrong').html(`<p><b>Sorry!</b> The correct answer is <span>"${correctAnswer}"</span></p>`);
    $('.questionAnswerForm').append(`<button type=button class="nextButton">Next</button></div>`);
}

function updateScore() {
    changeScore();
    $('.score').text(score);
}

function renderResults() {
    if (score >= 5) {
        $('.questionAnswerForm').html(`<div class="results correctFeedback"><h1>Wicked mate!</h1><img src="https://media.tenor.com/images/6025a156693a0d29acf23bbb61bb88fc/tenor.gif" alt="Matt Bellamy thumbs up"/><p>You got ${score} / 7!</p><p>You sure know a lot about Muse!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else if (score < 5 && score >= 2) {
        $('.questionAnswerForm').html(`<div class="results correctFeedback"><h1>Groovy!</h1><img src="https://media2.giphy.com/media/Ep8kUCWzqNOJq/giphy.gif?cid=3640f6095bc3b48354587248418047d5" alt="Matt Bellamy thumbs up"/><p>You got ${score} / 7.</p><button class="restartButton">Restart Quiz</button></div>`);
    } else {
        $('.questionAnswerForm').html(`<div class="results correctFeedback"><h1>Bollocks!</h1><img src="https://media1.tenor.com/images/2992f81fd54779e693e5121c96f27d8c/tenor.gif?itemid=4818392" alt="Confused Matt Bellamy"/><p>You got ${score} / 7...</p><button class="restartButton">Restart Quiz</button></div>`);
    }
}

function renderNextQuestion() {
    $('main').on('click', '.nextButton', function (event) {
        changeQuestionNumber();
        renderQuestion();
        userSelectAnswer();
    });
}

function restartQuiz() {
    $('main').on('click', '.restartButton', function (event) {
        location.reload();
    });
}

function createQuiz() {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
}

$(createQuiz);


// for testing results
// let score = 7;
// let score = 4;
// let score =1;

// $(startQuiz);

// function renderResults () {
//   if (score >= 5) {
//     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Wicked mate!</h3><img src="https://media.tenor.com/images/6025a156693a0d29acf23bbb61bb88fc/tenor.gif" alt="Matt Bellamy really excitedly dancing"/><p>You got ${score} / 7!</p><button class="restartButton">Restart Quiz</button></div>`);
//   } else if (score < 5 && score >= 2) {
//     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Groovy!</h3><img src="https://media1.tenor.com/images/403c35222ba8e4594f4d0eb1c42ac914/tenor.gif?itemid=5226375" alt="Band thumbs up"/><p>You got ${score} / 7.</p><button class="restartButton">Restart Quiz</button></div>`);
//   } else {
//     $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Bollocks!</h3><img src="https://media1.tenor.com/images/2992f81fd54779e693e5121c96f27d8c/tenor.gif?itemid=4818392" alt="Confused Matt Bellamy"/><p>You got ${score} / 7...</p><button class="restartButton">Restart Quiz</button></div>`);
//   }
// }

//  function startQuiz () {
//   $('.quizStart').on('click', '.startButton', function (event) {
//     $('.quizStart').remove();
//     $('.questionAnswerForm').css('display', 'block');
//     $('.questionNumber').text(1);

//   renderResults();
// });
// }
