let currentQuestions = [];
let currentIndex = 0;

async function loadQuiz() {
    try {
        const response = await fetch('questions.json');
        currentQuestions = await response.json();
        showQuestion();
    } catch (error) {
        document.getElementById('question').innerText = "Error loading quiz data.";
    }
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
    
    const nextBtn = document.getElementById('next-btn');
    if (currentIndex < currentQuestions.length - 1) {
        nextBtn.innerText = "Next Question";
    } else {
        nextBtn.innerText = "Finish Quiz";
    }
    nextBtn.classList.remove('hidden');
}

document.getElementById('next-btn').onclick = () => {
    currentIndex++;
    if(currentIndex < currentQuestions.length) {
        showQuestion();
        document.getElementById('next-btn').classList.add('hidden');
    } else {
        document.getElementById('quiz').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>Quiz Complete!</h2>
                <p>Great job on the ISC review.</p>
                <button onclick="location.reload()" class="option-btn" style="margin: 20px auto; background: #38bdf8; color: #0f172a; font-weight: bold; border: none;">
                    Try Again
                </button>
            </div>
        `;
        document.getElementById('next-btn').style.display = 'none';
    }
};

loadQuiz();
