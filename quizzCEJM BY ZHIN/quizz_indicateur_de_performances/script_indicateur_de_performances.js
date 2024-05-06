// Récupérer mes 3 blocks div HTML (le header, la div questions et la div result)
let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, correctAnswers) {
    this.title = title,
    this.answers = answers,
    this.correctAnswers = correctAnswers,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if (this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");
            quiz.nbrCorrects++;
        } else {
            answerSelect.classList.add("answersWrong");
            let RightAnswers = this.correctAnswers.map(index => document.getElementById(index));
            RightAnswers.forEach(RightAnswer => {
                RightAnswer.classList.add("answersCorrect");
            });
        }

        // Vérifiez si toutes les bonnes réponses ont été sélectionnées
        const allCorrectAnswersSelected = this.correctAnswers.every(index => {
            return document.getElementById(index).classList.contains("answersCorrect");
        });

        // Si toutes les bonnes réponses ont été sélectionnées, passez à la question suivante
        if (allCorrectAnswersSelected) {
            setTimeout(function() {
                questions_screen.textContent = '';
                quiz.indexCurrentQuestion++;
                quiz.displayCurrentQuestion();
            }, 1100);
        }
    }

    // Si la réponse choisit par le user est égale à la réponse correcte retourner True sinon False
    this.isCorrectAnswer = function(answerUser) {
        return this.correctAnswers.includes(parseInt(answerUser)); // Vérifie si la réponse est dans les réponses correctes
    }
};


// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Qu'est ce qu'est la performance ? ", ["Cela exprime le degrès d'erreur sur les objectifs poursuivis ", "Cela exprime le degrès d'accomplissement des objectifs poursuivis ", "Cela exprime le degrès d'abandon des objectifs poursuivis"], [2]);
quiz.addQuestion(question1);

let question2 = new Question("Que veut dire une entreprise efficace et efficiente ? ", [" Quand une entreprise atteint ses objectifs fixés en maximisant les moyens financiers et humains  ", "Quand une entreprise atteint ses objectifs mais qu'elle n'a pas minimisée les moyens financiers ou humains pour atteindre les objectifs", "Quand une entreprise atteint ses objectifs fixés en minisant les moyens au maximum"], [3]);
quiz.addQuestion(question2);

let question3 = new Question("Quelles sont les mesures à réaliser pour évaluer la performance d'une entreprise ? ", ["La performance économique", "La performance financière", "La performance sportive", "La performance organisationnelle", "La performance psychologique", "la performance sociale", "la performance automobile", "la performance sociétal"], [1,2,4,6,8]);
quiz.addQuestion(question3);

let question4 = new Question("Comment procédez-vous pour évaluer la performance économique ? ", ["Mesurer la compétitivité prix", "Mesurer la compétitivité hors prix", "Mesurer la rentabilité des capitaux"], [1,2]);
quiz.addQuestion(question4);

let question5 = new Question("Comment procédez-vous pour évaluer la performance financière  ? ", ["Mesurer la rentabilité des capitaux apportés par les propriétaires", "Mesurer les indicateurs sociaux", "Mesurer l'augmentation de la valeur des actions"], [1,2]);
quiz.addQuestion(question5);

let question6 = new Question("Comment procédez-vous pour évaluer la performance organisationnelle ? ", ["Mesurer la qualité de la flexibilité", "Mesurer la qualité de l'adaptabilité", "Mesurer la qualité culturelle", "Mesurer la qualité de la production"], [1,2,4]);
quiz.addQuestion(question6);

let question7 = new Question("Comment procédez-vous pour évaluer la performance sociale ? ", ["Nombre d'accidents du travail", "des avis négatifs", "Des maladies psychologiques personnelles","Montant des rémunérations" ], [1,4]);
quiz.addQuestion(question7);

let question8 = new Question("Comment procédez-vous pour évaluer la performance sociétale ? ", ["Les maladies professionnelles ", "Mesurer les domaines de l'humanitaire", "Mesurer les domaines culturels"], [2,3]);
quiz.addQuestion(question8);

let question9 = new Question("Qu'est-ce qu'un tableau de bord ? ", ["Le même qu'on retrouve sur toutes les voitures ", "Un récapitulatif de l'ensemble des faits et gestes des salariés", "Un récapitulatif de l'ensemble des critères retenus par l'entreprise pour évaluer ses performances"], [3]);
quiz.addQuestion(question9);

let question10 = new Question("quels sont les trois tableaux de bords principaux ? ", ["Tableau de bord budgetaire", "Tableau de bord stratégique","Tableau de bord marketing", "Tableau de bord informatique", "Tableau de bord opérationnel"], [1,2,5]);
quiz.addQuestion(question10);





// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);
