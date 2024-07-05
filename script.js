let score = 0;
let timer = 0;
let correctAnswer;
let timerInterval;

function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = `Tiempo: ${timer}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
    let question;

    switch (operator) {
        case '+':
            question = `${num1} ${operator} ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} ${operator} ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case '×':
            question = `${num1} ${operator} ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case '÷':
            num2 = Math.floor(Math.random() * 5) + 1; // Ensure division is whole number
            question = `${num1 * num2} ${operator} ${num2}`;
            correctAnswer = num1;
            break;
        default:
            break;
    }

    document.getElementById('question').textContent = `¿Cuánto es ${question}?`;

    generateOptions(correctAnswer);
}

function generateOptions(correctAnswer) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options

    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        const randomOption = Math.floor(Math.random() * 20) - 10; // Generate random options
        options.add(randomOption);
    }

    // Shuffle options
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
        document.getElementById('feedback').textContent = '¡Correcto!';
        score++;
    } else {
        document.getElementById('feedback').textContent = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
    }

    document.getElementById('score').textContent = `Puntuación: ${score}`;
    generateQuestion(); // Generate a new question
}

// Iniciar el juego cuando se carga la página
startTimer();
generateQuestion();
