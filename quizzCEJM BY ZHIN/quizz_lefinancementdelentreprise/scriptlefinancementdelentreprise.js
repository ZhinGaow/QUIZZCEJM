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

let question1 = new Question(" Quels sont les principaux documents comptable ? ", ["Un Tableau de bord", "Un compte de résultat", "Un fichier excel complet", "Un bilan comptable" ], [2,4]);
quiz.addQuestion(question1);

let question2 = new Question(" C'est quoi un compte de résultat ?", ["Il résume l'origine et l'utilisation des capitaux et inestissement", "Il résume les composés des actifs et des passifs", "Il décrit l'activité de l'entreprise et le calcul du résultat sur une période"], [3]);
quiz.addQuestion(question2);

let question3 = new Question("C'est quoi un bilan comptable  ? ", ["Il rassemble le CA de la société", "Il résume l'origine et l'utilisation des capiaux et investissements de l'entreprise"], [2]);
quiz.addQuestion(question3);

let question4 = new Question(" Qu'est ce qu'un actif dans le bilan comptable ?   ", ["C'est l'ensemble des ressources qui ont permis d'obtenir les biens dont dispose l'entreprise", "C'est l'ensemble des biens détenus par l'entreprise ayant une valeur économique positive"], [2]);
quiz.addQuestion(question4);

let question5 = new Question("Sous quelle forme l'actif est-il représenté ? ", ["Les emprunts ", " Les charges salariales", "Les stocks", "Le fond de commerce", "Les machines"], [3,4,5]);
quiz.addQuestion(question5);

let question6 = new Question("Sous quelle forme le passif est-il représenté ? ", ["Les ressources humaines", "Les emprunts", "Les taux de marge"], [2]);
quiz.addQuestion(question6);

let question7 = new Question("Quels sont les besoins de financement des entreprises ? ", ["Les besoins liés à l'exploitation", "Les besoins liés à l'investissement", "Les besoins liés à la recherche", "Les besoins liés à l'emploi"], [1,2]);
quiz.addQuestion(question7);

let question8 = new Question(" Quels sont les besoins liés à l'exploitation ? ", ["Le BFR ", "Les stocks", "Les matières premières"], [1,2,3]);
quiz.addQuestion(question8);

let question9 = new Question(" Quels sont les besoins liés à l'investissement ? ", ["Permettre à l'entreprise de commencer son activté", "Permet à l'entreprise de démarcher les fournisseurs"], [1]);
quiz.addQuestion(question9);

let question10 = new Question("Les modalités de financement de l'entreprise sont externes ou internes ? ", ["Internes", "Externes", "Les deux"], [3]);
quiz.addQuestion(question10);

let question11 = new Question("Quelles sont les modalités externes ? ", ["Les actionnaires", "Les coopératives", "Les banques", "Le financement participatif"], [1,3,4]);
quiz.addQuestion(question11);

let question12 = new Question("Quelles sont les modalités internes ? ", ["Les banques", "Les coopératives", "l'autofinancement", "Le financement participatif", "Les actionnaires"], [2,3,5]);
quiz.addQuestion(question12);


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
