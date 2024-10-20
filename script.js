let questions = [];
let currentQuestion = 0;
const totalQuestions = 10;
let score = 0;

function generateQuestions() {
    for (let i = 0; i < totalQuestions; i++) {
        let num1 = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) + 1;
        let answer = num1 + num2;
        let options = [answer];

        while (options.length < 4) {
            let randomOption = Math.floor(Math.random() * 200) + 1;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        options.sort(() => Math.random() - 0.5);
        questions.push({ question: `ما هو ناتج ${num1} + ${num2}؟`, options: options, answer: answer });
    }
}

function loadQuestion() {
    document.getElementById('question').innerText = questions[currentQuestion].question;
    let options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
        options[i].innerText = questions[currentQuestion].options[i];
    }
    updateProgressBar();
}

function checkAnswer(selectedOption) {
    let resultElement = document.getElementById('result');
    let selectedValue = parseInt(selectedOption.innerText);
    if (selectedValue === questions[currentQuestion].answer) {
        resultElement.innerText = "إجابة صحيحة!";
        resultElement.className = "result correct";
        playSound('C:/Users/bloma/Desktop/math/sounds/correct.mp3');
        score++;
        updateScore();
    } else {
        resultElement.innerText = "إجابة خاطئة!";
        resultElement.className = "result wrong";
        playSound('C:/Users/bloma/Desktop/math/sounds/wrong.mp3');
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        loadQuestion();
        document.getElementById('result').innerText = "";
        document.getElementById('result').className = "result";
    } else {
        document.getElementById('question').innerText = "لقد انتهيت من جميع الأسئلة!";
        document.getElementById('result').innerText = `نقاطك: ${score} من ${totalQuestions}`;
        document.getElementById('nextButton').style.display = 'none';
    }
}

function playSound(soundFile) {
    let audio = new Audio(soundFile);
    audio.play();
}

function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let progress = (currentQuestion / totalQuestions) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
}

function updateScore() {
    document.getElementById('score').innerText = `النقاط: ${score}`;
}

generateQuestions();
loadQuestion();
updateScore();
