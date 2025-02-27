const questions = [
    { question: "Pregunta 1", options: ["Opción 1", "Opción 2", "Opción 3"], correct: 0, solution: "La respuesta correcta es Opción 1" },
    { question: "Pregunta 2", options: ["Opción A", "Opción B", "Opción C"], correct: 1, solution: "La respuesta correcta es Opción B" },
    { question: "Pregunta 3", options: ["Opción X", "Opción Y", "Opción Z"], correct: 2, solution: "La respuesta correcta es Opción Z" },
    // ... (Hasta 60)
];

let currentIndex = 0;
let answers = [];
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultContainer = document.getElementById('result-container');

function loadQuestions(startIndex) {
    questionContainer.innerHTML = '';
    const endIndex = Math.min(startIndex + 20, questions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p>${questions[i].question}</p>
            ${questions[i].options.map((option, index) => 
                `<input type="radio" name="question${i}" value="${index}"> ${option}<br>`
            ).join('')}
        `;
        questionContainer.appendChild(questionElement);
    }
}

function checkAnswers() {
    let incorrectAnswers = [];
    for (let i = 0; i < questions.length; i++) {
        const selectedAnswer = document.querySelector(`input[name="question${i}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) !== questions[i].correct) {
            incorrectAnswers.push(`Pregunta: ${questions[i].question} - ${questions[i].solution}`);
        }
    }
    if (incorrectAnswers.length > 0) {
        resultContainer.innerHTML = `<h3>Respuestas Incorrectas:</h3><ul>${incorrectAnswers.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else {
        resultContainer.innerHTML = "<h3>¡Todas las respuestas son correctas!</h3>";
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex += 20;
    if (currentIndex < questions.length) {
        loadQuestions(currentIndex);
    } else {
        checkAnswers();
        nextBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    }
});

restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    answers = [];
    resultContainer.innerHTML = '';
    loadQuestions(currentIndex);
    nextBtn.style.display = 'block';
    restartBtn.style.display = 'none';
});

// Cargar las primeras 20 preguntas al inicio
loadQuestions(0);