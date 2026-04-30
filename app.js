let currentQuestions = [];
let currentIndex = 0;

async function loadQuiz() {
    const response = await fetch('questions.json');
    currentQuestions = await response.json();
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('question').innerText = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(i, q.answer);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if(i === correct) btn.classList.add('correct');
        else if(i === selected) btn.classList.add('wrong');
    });
    document.getElementById('next-btn').classList.remove('hidden');
}

document.getElementById('next-btn').onclick = () => {
    currentIndex++;
    if(currentIndex < currentQuestions.length) {
        showQuestion();
        document.getElementById('next-btn').classList.add('hidden');
    } else {
        document.getElementById('quiz').innerHTML = "<h2>Quiz Complete!</h2>";
    }
};

loadQuiz();
