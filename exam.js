const questions = {
    physics: [
        {
            question: "What is the unit of force?",
            options: ["Watt", "Newton", "Pascal", "Joule"],
            answer: "Newton"
        },
        {
            question: "Which law explains action and reaction?",
            options: ["Newton's 1st", "Newton's 2nd", "Newton's 3rd", "Law of Gravitation"],
            answer: "Newton's 3rd"
        }
    ],
    chemistry: [
        {
            question: "What is the symbol for Sodium?",
            options: ["S", "Na", "N", "Sn"],
            answer: "Na"
        },
        {
            question: "Which is a noble gas?",
            options: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"],
            answer: "Argon"
        }
    ]
};

let currentQuestions = [];

function startExam() {
    const subject = document.getElementById("subjectSelect").value;

    // Check if subject is selected and exists in the questions object
    if (!subject || !questions[subject]) {
        alert("Please select a valid subject.");
        return;
    }

    // Load questions for selected subject
    currentQuestions = questions[subject];

    const container = document.getElementById("questionContainer");
    container.innerHTML = ''; // Clear previous questions if any

    // Create and append each question
    currentQuestions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question-block");
        div.innerHTML = `
            <p><strong>Q${index + 1}: ${q.question}</strong></p>
            ${q.options.map(opt => `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label><br>
            `).join('')}
        `;
        container.appendChild(div);
    });

    // Show exam box and hide result
    document.getElementById("examBox").classList.remove("hidden");
    document.getElementById("resultBox").classList.add("hidden");
}

function submitExam() {
    let score = 0;

    // Calculate score based on selected answers
    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    // Show result
    document.getElementById("scoreText").innerText = `You scored ${score} out of ${currentQuestions.length}`;
    document.getElementById("resultBox").classList.remove("hidden");
}
