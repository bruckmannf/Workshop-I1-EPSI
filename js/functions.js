var quiz = [];
quiz[0] = new Question(
  "Vous trouvez une clé USB, que faites-vous avec ?",
  "Ramener la clé aux objets perdus", // Cliquer sur le bouton; Score: +1
  "Ignorer la clé USB", // Cliquer sur un bouton ignorer; Score: +0
  "Regarder son contenu" // Cliquer sur l'image clé USB; Score: -1
);
quiz[1] = new Question(
  "Vous voulez prendre votre pause café ...",
  "Mettre en veille votre poste puis, partir en pause", // Cliquer sur le bouton veille puis café OU veille; Score: +1
  "Ne pas partir en pause", // Cliquer sur le bouton ignorer; Score: +0
  "Partir directement en pause" // Cliquer sur le bouton café; Score: -1
);
quiz[2] = new Question(
  "Vous recevez un mail de votre patron demandant de lui verser 2000 euros de toute urgence en vous envoyant un lien",
  "Appeler le patron pour demander confirmation", // Cliquer sur le téléphone; Score: +1
  "Ignorer l'email", // Cliquer sur le bouton ignorer; Score: +0
  "Cliquer sur le lien et verser l'argent demandé" // Cliquer sur le lien du mail; Score: -1
);
quiz[3] = new Question(
  "Une collègue vous demande d'acheter des fournitures en lignes en vous fournissant un lien:",
  "Aller chercher ces fournitures en ligne par vos propre moyens",
  "Ne pas acheter les fournitures",
  "Utiliser le lien fourni pour acheter les fourniture"
);

var mail = [];
mail[0] = new Mail(
  "fake.patron@mail.fr",
  "Virement urgent!!!",
  "J'aurai besoin que vous me fassié un virement de 2000€ au plus vite, veuiller cliquer sur se lien pour le faire!",
  "www.ce-lien-n-est-pas-frauduleux.cpadlol"
);
mail[1] = new Mail(
  "sylvie.officielle@mail.fr",
  "Achat de fourniture",
  "Bonjour, j'aurai besoin que vous vous occupiez de renouveler le stock de crayon.<br>Ci-joint un lien où j'ai trouvé de quoi remplir nos stocks à bon prix!",
  "www.not-the-real-amazoun.urss"
);

var randomQuestion;
var answers = [];
var currentScore = 0;
var questions = 0;

document.addEventListener("DOMContentLoaded", function (event) {
  btnProvideQuestion();
});

function Question(question, rightAnswer, wrongAnswer1, wrongAnswer2) {
  this.question = question;
  this.rightAnswer = rightAnswer;
  this.wrongAnswer1 = wrongAnswer1;
  this.wrongAnswer2 = wrongAnswer2;
  this.alreadyAsked = false;
}

function Mail(expediteur, objet, contenue, lien) {
  this.expediteur = expediteur;
  this.objet = objet;
  this.contenue = contenue;
  this.lien = lien;
}

function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

function isGameFinished() {
  var cpt = 0;
  quiz.forEach((Question) => {
    if (Question.alreadyAsked == true) {
      cpt += 1;
    }
  });
  if (cpt == quiz.length) {
    return true;
  }
  return false;
}

function gameReset() {
  quiz.forEach((Question) => {
    Question.alreadyAsked = false;
  });
  currentScore = 0;
}

function btnProvideQuestion() {
  if (isGameFinished()) {
    var form = document.getElementById("endgameData");
    document.getElementById("score").value=currentScore;
    document.getElementById("nbQuestions").value=questions;
    gameReset();
    form.submit();
  }

  var randomNumber = Math.floor(Math.random() * quiz.length);
  randomQuestion = quiz[randomNumber];
  while (randomQuestion.alreadyAsked == true) {
    randomNumber = Math.floor(Math.random() * quiz.length);
    randomQuestion = quiz[randomNumber];
  }
  answers = [
    randomQuestion.rightAnswer,
    randomQuestion.wrongAnswer1,
    randomQuestion.wrongAnswer2,
  ];
  switch (randomNumber) {
    case 0:
      showButton("cleUSB");
      showButton("objetTrouve");
      hideButton("coffee");
      hideButton("portable");
      hideButton("lienFourni");
      break;
    case 1:
      showButton("coffee");
      hideButton("cleUSB");
      hideButton("portable");
      hideButton("objetTrouve");
      hideButton("lienFourni");
      break;
    case 2:
      showButton("portable");
      hideButton("coffee");
      hideButton("cleUSB");
      hideButton("objetTrouve");
      hideButton("lienFourni");
      break;
    case 3:
      showButton("lienFourni");
      hideButton("coffee");
      hideButton("cleUSB");
      hideButton("portable");
      hideButton("objetTrouve");
      break;
    default:
      hideButton("coffee");
      hideButton("lienFourni");
      hideButton("cleUSB");
      hideButton("portable");
      hideButton("objetTrouve");
      break;
  }
  // shuffle(answers);

  document.getElementById("current-mission").innerHTML =
    randomQuestion.question;
  document.getElementById("current-mission").value = randomQuestion.question;
  document.getElementById("first-answer").innerHTML = answers[0];
  document.getElementById("second-answer").innerHTML = answers[1];
  document.getElementById("third-answer").innerHTML = answers[2];

  document.getElementById("question").innerHTML = randomQuestion.question;
  document.getElementById("answerA").value = answers[0];
  document.getElementById("answerA").innerHTML = answers[0];
  document.getElementById("answerB").value = answers[1];
  document.getElementById("answerB").innerHTML = answers[1];
  document.getElementById("answerC").value = answers[2];
  document.getElementById("answerC").innerHTML = answers[2];

  quiz[randomNumber].alreadyAsked = true;
}

function answerA_clicked() {
  var answerA = document.getElementById("answerA").value;
  checkAnswer(answerA);
}
function answerB_clicked() {
  var answerB = document.getElementById("answerB").value;
  checkAnswer(answerB);
}
function answerC_clicked() {
  var answerC = document.getElementById("answerC").value;
  checkAnswer(answerC);
}

function adjustScore(value) {
  currentScore += value;
  document.getElementById("score").innerHTML = currentScore;
}

function checkAnswer(answer) {
  questions++;
  addQuestionInputs(answer);
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(1);
    btnProvideQuestion();
  } else if (answer == randomQuestion.wrongAnswer1) {
    adjustScore(0);
    btnProvideQuestion();
  } else {
    adjustScore(-1);
    btnProvideQuestion();
  }
}

function addQuestionInputs(answer){
  var form = document.getElementById("endgameData");
  document.getElementById("endgameData").innerHTML += "<input type='text' name='question"+questions+"' value='"+randomQuestion.question+"'>";
  document.getElementById("endgameData").innerHTML += "<input type='text' name='rightanswer"+questions+"' value='"+randomQuestion.rightAnswer+"'>";
  document.getElementById("endgameData").innerHTML += "<input type='text' name='neutralanswer"+questions+"' value='"+randomQuestion.wrongAnswer1+"'>";
  document.getElementById("endgameData").innerHTML += "<input type='text' name='wronganswer"+questions+"' value='"+randomQuestion.wrongAnswer2+"'>";
  document.getElementById("endgameData").innerHTML += "<input type='text' name='answer"+questions+"' value='"+answer+"'>";
}

function hideWindow(divToHide) {
  document.getElementById(divToHide).hidden = true;
}

function showWindow(divToShow) {
  var element = document.getElementById(divToShow);
  if (element.hidden != true) {
    element.hidden = true;
  } else {
    element.hidden = false;
  }
}

function hideButton(buttonToHide) {
  document.getElementById(buttonToHide).hidden = true;
}

function showButton(buttonToShow) {
  document.getElementById(buttonToShow).hidden = false;
}

function sleep(onOrOff) {
  if (onOrOff == "on") {
    document.getElementById("sleepscreen-button").hidden = false;
  } else if (onOrOff == "off") {
    document.getElementById("sleepscreen-button").hidden = true;
  }
}

function disableButton(buttonToDisable) {
  document.getElementById(buttonToDisable).disabled = true;
}

function enableButton(buttonToEnable) {
  document.getElementById(buttonToEnable).disabled = false;
}

function patronMail() {
  document.getElementById("expediteurValue").innerHTML = mail[0].expediteur;
  document.getElementById("objetValue").innerHTML = mail[0].objet;
  document.getElementById("contenue").innerHTML = mail[0].contenue;
  document.getElementById("lien").innerHTML = mail[0].lien;
}

function sylvieMail() {
  document.getElementById("expediteurValue").innerHTML = mail[1].expediteur;
  document.getElementById("objetValue").innerHTML = mail[1].objet;
  document.getElementById("contenue").innerHTML = mail[1].contenue;
  document.getElementById("lien").innerHTML = mail[1].lien;
}
