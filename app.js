let currentQuestions = [];
let currentIndex = 0;

async function loadQuiz() {
    try {
        const response = await fetch('questions.json');
        currentQuestions = await response.json();
        showQuestion();
    } catch (error) {
        console.error("Error loading questions:", error);
        document.getElementById('question').innerText = "Failed to load quiz questions.";
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
    
    // Only show the Next button if there are more questions left
    document.getElementById('next-btn').classList.remove('hidden');
}

document.getElementById('next-btn').onclick = () => {
    currentIndex++;
    
    if(currentIndex < currentQuestions.length) {
        // Move to the next question and hide the button again
        showQuestion();
        document.getElementById('next-btn').classList.add('hidden');
    } else {
        // End of quiz: Show final message and HIDE the button permanently
        document.getElementById('quiz').innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>Quiz Complete!</h2>
                <p>Great job reviewing the ISC concepts.</p>
                <button onclick="location.reload()" class="option-btn" style="text-align: center; margin-top: 20px;">Restart Quiz</button>
            </div>
        `;
        document.getElementById('next-btn').classList.add('hidden');
    }
};

loadQuiz();
