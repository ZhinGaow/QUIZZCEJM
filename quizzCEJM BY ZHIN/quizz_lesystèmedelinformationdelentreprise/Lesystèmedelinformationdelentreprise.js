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

let question1 = new Question("Qu'est-ce qu'un système d'information pour l'entreprise ? ", ["C'est un système qui permet de décrire le réseau de distribution des produits alimentaires ", "C'est un système qui permet d'organiser les ressources techniques, organisationnelles et humaines" ], [2]);
quiz.addQuestion(question1);

let question2 = new Question("Ce système d'information mobilise plusieurs ressources, lesquelles ?", ["Matériels", "Les fournisseurs", "Les clients", "Humaines"], [1,4]);
quiz.addQuestion(question2);

let question3 = new Question("Qui utilise le système d'information  ? ", ["Les fournisseurs", "L'expert comptable", "Les salariés", "Les responsables", "Les informaticiens", "Le web master"], [3,4,5]);
quiz.addQuestion(question3);

let question4 = new Question(" Que fait concraitement un SIE (système d'information d'entreprise) ?   ", ["Fournir des informations", "Commander à notre place", "Réaliser un bilan comptable", "Prévoir les tendances du marché", "Communiquer"], [1,5]);
quiz.addQuestion(question4);

let question5 = new Question(" De quoi est composé le SIE ?   ", ["De bases de données", "De graphiques sophistiqués sur le marché", "Des outils de gestion de la relation clients", "D'application métiers"], [1,4]);
quiz.addQuestion(question5);

let question6 = new Question(" C'est quoi une application métiers ? ", ["elle sert à créer des métiers comme son nom l'indique", "Elle sert à résoudre des problèmes psychologiques des employés", "Elle sert à optimiser les processus de travail", "A résoudre des problèmes"], [3,4]);
quiz.addQuestion(question6);

let question7 = new Question(" Les composants d'un SIE a permis de créer plusieurs technologies, lesquelles ? ", ["Progiciel", "techgiciel", "Des outils groupware", "Des outils de vidéo-surveillance","Des Hardware","Des malware","Du Cloud compluding", "Des sites internet", "Des sites intranet", "Des sites extranet" ], [1,3,7,8,9,10]);
quiz.addQuestion(question7);

let question8 = new Question(" Qu'est-ce qu'un Progiciel ? ", ["Un logiciel qui permet d'analyser tous les avis envers la société", "Permet en un clic, de partager un document à plusieurs personnes mais d'une seule même application "], [2]);
quiz.addQuestion(question8);

let question9 = new Question("Qu'est qu'un Cloud Compluding ? ", ["C'est un seul serveur qui relie tous les utilisateur et ordinateur sur un même réseau", "C'est un seul réseau qui relie tous les ordinateurs, utilisateurs et serveurs "], [2]);
quiz.addQuestion(question9);

let question10 = new Question("Quels sont les risques liés au SIE ? ", ["Un vol à main armée", "Des vols de données, pannes, virus et cyber attaques", "Du matériel de mauvaise qualité au fil du temps", "Des agendas partagés", "Des risques juridiques", "De fournir des informations", "Des risques financiers", "Des risques d'intrusion dans la vie privée"], [2,3,5,7,8]);
quiz.addQuestion(question10);

let question11 = new Question("Que fait l'entreprise pour assurer le bon fonctionnement du SIE ? ", ["Embaucher un informaticien pour qu'il s'occupe exclusivement du SIE", "Seul les responsables y ont accès", "L'entreprise externalise tout le SIE à un prestataire extérieur", "L'entreprise externalise toute ou une partie du SIE à un prestataire extérieur"], [4]);
quiz.addQuestion(question11);

let question12 = new Question(" Le SIE est un facteur d'amélioration de la perfermance et de la productivité de l'entreprise ? ", ["Non", "Oui"], [2]);
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
