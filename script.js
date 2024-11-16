// Sample quiz data
const quizData = [
    {
      question: "What is the normal range for adult blood pressure?",
      options: ["120/80 mmHg", "140/90 mmHg", "160/100 mmHg", "100/70 mmHg"],
      correct: 0, // Index of the correct answer
    },
    {
      question: "Which of the following is a priority nursing diagnosis for a patient with diabetes?",
      options: [
        "Risk for Infection",
        "Impaired Social Interaction",
        "Risk for Falls",
        "Chronic Low Self-Esteem",
      ],
      correct: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  
  // Start Quiz Function
  document.getElementById("start-quiz").addEventListener("click", () => {
    renderQuestion();
  });
  
  // Render Question
  function renderQuestion() {
    const quizSection = document.querySelector("main");
    const question = quizData[currentQuestionIndex];
    quizSection.innerHTML = `
      <div class="quiz-card bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-800">${question.question}</h2>
        <ul class="mt-4 space-y-2">
          ${question.options
            .map(
              (option, index) =>
                `<li>
                  <button onclick="checkAnswer(${index})" class="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition">
                    ${option}
                  </button>
                </li>`
            )
            .join("")}
        </ul>
      </div>
    `;
  }
  
  // Check Answer
  function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
  
    alert(isCorrect ? "Correct!" : "Incorrect.");
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      renderQuestion();
    } else {
      document.querySelector("main").innerHTML = `
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
          <p class="mt-4 text-gray-600">Thanks for taking the quiz. You did great!</p>
          <button onclick="location.reload()" class="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
            Restart Quiz
          </button>
        </div>
      `;
    }
  }
  