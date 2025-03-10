const quizData = [
  {
      question: "Combien de jeux sont présentés sur Gamely ?",
      a: "4",
      b: "6",
      c: "8",
      d: "10",
      correct: "b",
      type: "choice"
  },
  {
      question: "Le site Gamely est-il gratuit ?",
      correct: "true",
      type: "true-false"
  },
  {
      question: "Quel jeu est basé sur la mémoire ?",
      a: "Legilimens",
      b: "Memory Cards",
      c: "SpeedyVerse",
      d: "AI Chess",
      correct: "b",
      type: "choice"
  },
  {
      question: "Quel est le concept de SpeedyVerse ?",
      keywords: ["course", "voiture"],
      type: "text",
      placeholder: "****** de ******"
  },
  {
      question: "Quel est le jeux qui se joue avec un échiquier ?",
      keywords: ["chess", "chessai", "chess-ai", "chess ai", "aichess", "ai chess", "ai-chess"],
      type: "text",
      placeholder: "*******"
  }
];
  /**
   * Vérifie si la réponse texte contient les mots-clés attendus.
   * Ignore les majuscules et les espaces inutiles.
   * @param {string} userAnswer - La réponse donnée par l'utilisateur.
   * @param {string[]} keywords - Les mots-clés attendus.
   * @returns {boolean} - Retourne true si au moins un mot-clé est trouvé, sinon false.
   */
  function checkTextAnswer(userAnswer, keywords) {
    const answer = userAnswer.toLowerCase().trim();  // Convertit la réponse en minuscule et supprime les espaces inutiles
    return keywords.some(keyword => answer.includes(keyword.toLowerCase()));  // Compare sans se soucier des majuscules
  }

  const quiz = document.getElementById('quiz');
  const answerEls = document.querySelectorAll('.answer');
  const questionEl = document.getElementById('question');
  const a_text = document.getElementById('a_text');
  const b_text = document.getElementById('b_text');
  const c_text = document.getElementById('c_text');
  const d_text = document.getElementById('d_text');
  const submitBtn = document.getElementById('submit');
  const textInput = document.getElementById("text-input");

  // ✅ Permet de soumettre avec la touche "Entrée"
  textInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          event.preventDefault();
          submitBtn.click();
      }
  });

  
  let currentQuiz = 0;
  let score = 0;
  
  loadQuiz();
  
  function loadQuiz() {
    deselectAnswers();
    
    // Animation GSAP pour apparition question
    gsap.fromTo(quiz, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    
    const currentQuizData = quizData[currentQuiz];
    const textInput = document.getElementById("text-input");
    const trueFalseOptions = document.getElementById("true-false-options");
    const choicesContainer = document.getElementById("choices");

    // Cache tous les types de questions par défaut
    textInput.style.display = "none";
    trueFalseOptions.style.display = "none";
    choicesContainer.style.display = "none";

    questionEl.innerText = currentQuizData.question;

    if (currentQuizData.type === "choice") {
        choicesContainer.style.display = "block";
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    } else if (currentQuizData.type === "text") {
        textInput.value = "";
        textInput.style.display = "block";
        textInput.placeholder = currentQuizData.placeholder || "Votre réponse ici...";
    } else if (currentQuizData.type === "true-false") {
        trueFalseOptions.style.display = "block";
    }
}
  
  function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
  }
  
  function getSelected() {
    const currentQuizData = quizData[currentQuiz];
    
    if (currentQuizData.type === "choice") {
        let answer;
        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });
        return answer;
    } 
    
    else if (currentQuizData.type === "text") {
        const textInput = document.getElementById("text-input");
        const userAnswer = textInput.value.trim();

        // Vérifie si la réponse contient au moins un des mots-clés
        if (userAnswer.length > 0 && checkTextAnswer(userAnswer, currentQuizData.keywords)) {
            return "correct";
        } else if (userAnswer.length > 0) {
            return "incorrect";
        }
    } 
    
    else if (currentQuizData.type === "true-false") {
        const selectedBtn = document.querySelector(".true-false-btn.selected");
        return selectedBtn ? selectedBtn.getAttribute("data-value") : undefined;
    }
  }

  
  submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
      if (
        answer === "correct" ||
        answer === quizData[currentQuiz].correct
    ) {
        score++;
    }    
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        gsap.to(quiz, { opacity: 0, y: -20, duration: 0.5, onComplete: showResult });
      }
    }
  });
  
  
  // 🌟 Gérer les boutons vrai ou faux
  const trueFalseButtons = document.querySelectorAll(".true-false-btn");
  trueFalseButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
          trueFalseButtons.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
      });
  });

  function showResult() {
    quiz.innerHTML = `
      <h2 style="text-align: center; color: #ff4081; text-shadow: 0 0 5px #ff4081, 0 0 10px #ff4081;">
        Vous avez répondu correctement à ${score}/${quizData.length} questions.
      </h2>
      <button class="submit-btn" onclick="location.reload()">Recommencer</button>
    `;
    gsap.fromTo(quiz, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
  }
  
  // Animation intro
  document.addEventListener("DOMContentLoaded", function () {
    const logoIntro = document.querySelector(".intro-screen .quiz-logo");
    const logoFixed = document.querySelector(".quiz-logo-hidden");
    const startBtn = document.querySelector(".start-btn");
    const introScreen = document.querySelector(".intro-screen");
    const quizContainer = document.getElementById("quiz");

    // 🟢 Étape 1 : Effet fade-in du logo d’intro
    gsap.to(logoIntro, { opacity: 1, duration: 1 });

    // 🟢 Étape 2 : Slide-up du logo
    gsap.to(logoIntro, { y: -30, duration: 0.7, delay: 1, ease: "power2.out" });

    // 🟢 Étape 3 : Apparition du bouton avec un effet fade-up
    gsap.fromTo(startBtn, 
        { opacity: 0, y: 20 },  
        { opacity: 1, y: 0, duration: 1.0, delay: 2.7, ease: "power2.out" }
    );

    // 🎯 Quand on clique sur "Commencer le Quiz"
    startBtn.addEventListener("click", function () {
      gsap.to(logoIntro, {
          opacity: 0,
          y: -50,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: function () {
              const logoContainer = document.querySelector(".quiz-logo-container");
              const logoFixed = document.querySelector(".quiz-logo-fixed");
  
              logoContainer.classList.remove("hidden");
              logoFixed.classList.add("quiz-logo-visible");
              gsap.to(logoContainer, { opacity: 1, visibility: "visible", duration: 0.8 });
  
              // ✅ Réduction progressive taille du logo après l'intro
              gsap.to(logoFixed, { width: "250px", duration: 0.8 });
  
              // ✅ Ajuste l'espacement (réduit) entre logo et quiz
              gsap.to(quizContainer, { marginTop: "-20px", duration: 0.5 });
          }
      });
  
      gsap.to(introScreen, {
          opacity: 0,
          duration: 0.8,
          onComplete: function () {
              introScreen.style.display = "none";
              quizContainer.classList.remove("hidden");
              gsap.from(quizContainer, { opacity: 0, y: 30, duration: 0.5 });
            }
      });
  });    
});


