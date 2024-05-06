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

let question1 = new Question("Qu'est ce qu'un entrepreneur ? ", ["L’entrepreneur est une personne qui mobilise ou gère des ressources financières humaine et matériel pour créer, développer et implanter des entreprises.", "L’entrepreneur est une personne qui mobilise ou gère des ressources financières humaine et matériel pour punir, donner des ordres et pour soi-même.", "L’entrepreneur est une personne qui mobilise ou gère des ressources financières humaine et matériel pour créer, s'approprier et ainsi devenir le nouveau responsable."], [1]);
quiz.addQuestion(question1);

let question2 = new Question("Quelles sont les caractéristiques / capacités que doit avoir un entrepreneur ? ", ["Se faire discret", "Etre autonome", "La passion", "Manipuler", "Prendre des initiatives", "Avoir de l'ambition", "Géger les responsabilités", "Etre compulsif"], [2,3,5,6,7]);
quiz.addQuestion(question2);

let question3 = new Question("Qu'est ce qu'est l'entrepreneuriat ? ", ["L’entrepreneuriat est un processus qui consiste à investir des moyens pour mener un projet dans le but de réaliser assez d'argent sur le moment pour se faire plaisir et s'amuser.", "L’entrepreneuriat est un processus qui consiste à investir peu de moyens pour mener un projet pas très risqué dans le but de ne pas avoir peur d'être submerger par la pression et d'avoir peu de responsabilité des profits et espérer la survie de l’entreprise sur le long terme.", "L’entrepreneuriat est un processus qui consiste à investir des moyens pour mener un projet économique dans le but de réaliser des profits et d’assurer la survie de l’entreprise sur le long terme."], [3]);
quiz.addQuestion(question3);

let question4 = new Question("Quelles sont les différentes façons pour créer son entreprise ?", ["Voler le point de vente d'une personne et ainsi se l'approprier", "La créaton pure de A à Z", "La franchise", "L'essaimage", "La reprise"], [2,3,4,5]);
quiz.addQuestion(question4);

let question5 = new Question("Qu'est ce que la franchise ? ", ["Reprendre une entreprise déjà existante pour la développer", "Créer une entreprise qui va faire partie d'un réseau d'entreprise", "Quand un entrepreneur a une idée de créer son entreprise"], [2]);
quiz.addQuestion(question5);

let question6 = new Question("Qu'est ce que l'essaimage ? ", ["Permet aux salariés d'une entreprise de créer sa propre entreprise avec le soutien de son employeur", "permet aux salariés d'une entreprise d'assiéger l'entreprise voisine pour se l'approprier", "Permet de reprendre une entreprise déjà existante pour la développer"], [1]);
quiz.addQuestion(question6);

let question7 = new Question("Qu'est ce que la création pure ? ", ["De l'antimatière", "Quand un entrepreneur a une idée de créer et développer son entreprise"], [2]);
quiz.addQuestion(question7);

let question8 = new Question("Qu'est ce que le management ? ", ["Le management consiste à définir des règles et des ordres et à pas hésiter à les faire respecter  de manière punitive si les efforts des membres d'un groupe ne conrespondent pas aux objectifs fixés", "Le management consiste à définir des punitions adaptées et à appuyer sur les erreurs des membres d'un groupe pour pouvoir montrer l'exemple aux autres ", "Le management consiste à définir des buts et des objectifs et à coordonner les efforts des membres d’un groupe pour pouvoir atteindre les objectifs fixées."], [3]);
quiz.addQuestion(question8);

let question9 = new Question("Que doit faire un(e) manageur(euse) ? ", ["Prévoir", "Organiser", "Coordonner", "Insulter", "Commander", "Engueuler", "Punir", "Improviser", "Contrôler"], [1,2,3,5,9]);
quiz.addQuestion(question9);

let question10 = new Question("Qu'est ce qu'est le management stratégique ? ", ["Ensemble de décisions qui relève de la direction de l'entreprise pour définir la stratégie sur le long terme comme explorer de nouveau marché internationaux ", "Ensemble de décision qui relève de la direction de l'entreprise pour définir la stratégie sur le court terme comme la planification des horaires de travail", "Ensemble des décisions qui relève de la hiérarchie intermédiaire pour gérer les activités quotidiennes à long terme comme la planification de la gestion de stocks "], [1]);
quiz.addQuestion(question10);

let question11 = new Question("Qu'est ce qu'est le management opérationnel ? ", ["Ensemble de décision qui relève de la hérarchie intérmédiaire pour planifier son avenir à long terme ", "Ensemble de décision qui relève de la hérarchie intermédiaire pour gérer les activités quotidiennes à court terme comme la planification des horaires de travail des employés", "Ensemble de décision qui relève de la direction de l'entreprise sur le long terme comme développer de nouveaux produits innovants"], [2]);
quiz.addQuestion(question11);


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
