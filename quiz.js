

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//coloque a questão na matriz availableQuestions
function setAvailableQuestions(){
  const totalQuestion =  quiz.length;
    for(let i=0; i<totalQuestion; i++){
    availableQuestions.push(quiz[i])
  }
}
// definir o número da pergunta, pergunta e opções
function getNewQuestion(){
  //definir o número da pergunta
  questionNumber.innerHTML = " Questão " + (questionCounter + 1) + " de " + quiz.length;

  //definir o texto da pergunta
  // obter pergunta aleatória
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  //obter a posição de 'questionIndex' das matrizes availableQuestion
  const index1 =  availableQuestions.indexOf(questionIndex);
  //remova o 'questionIndex' do array availableQuestio, para que a pergunta não se repita
  availableQuestions.splice(index1,1);

  // definir opções
  // obter o comprimento das opções
  const optionLen = currentQuestion.options.length
  // coloca as opções para o array availableOptions;
  for(let i=0; i<optionLen; i++){
    availableOptions.push(i)
  }
  optionContainer.innerHTML = '';
  let animationDelay = 0.1;
  //criar opções em HTML
  for(let i=0; i<optionLen; i++){
    //opção aleatória
    const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    //obtenha a posição de 'optonIndex' do array availableOptions
    const index2 = availableOptions.indexOf(optonIndex);
    // remova o 'optonIndex' da matriz availableOptions, para que essa opção não se repita
    availableOptions.splice(index2,1);
    const option = document.createElement("div");
    option.innerHTML =  currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option)
    option.setAttribute("onclick","getResult(this)");
  }

  questionCounter++
}
// obter o resultado da pergunta da tentativa atual
function getResult(element){
  const id = parseInt(element.id);
  //obtenha a resposta comparando o id da opção clicada
  if(id === currentQuestion.answer){
    //defina a cor verde para a opção correta
    element.classList.add("correct");
    // adicione o indicador para corrigir a marca
    updateAnswerIndicator("correct");
    correctAnswers++;
  }else{
    //defina a cor vermelha para a opção incorreta
    element.classList.add("wrong");
    // adicione o indicador à marca errada
    updateAnswerIndicator("wrong");
    // se a resposta estiver incorreta mostre a opção correta adicionando a cor verde a opção correta
    const optionLen = optionContainer.children.length;
    for(let i=0;i <optionLen; i++){
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
        optionContainer.children[i].classList.add("correct");
        }
    }
}
  attempt++;
  unclickableOptions();
}
// tornar todas as opções não clicáveis ​​uma vez que o usuário selecione uma opção (RESTRITO O USUÁRIO PARA ALTERAR A OPÇÃO NOVAMENTE)
function unclickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0; i<optionLen;i++){
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator(){
  answersIndicatorContainer.innerHTML = '';
  const totalQuestion = quiz.length;
  for(let i=0; i<totalQuestion; i++){
    const  indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType){
  answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}

function next(){
  if(questionCounter === quiz.length){
    quizOver();
  }else{
    getNewQuestion();
  }
}

function quizOver(){
  //ocultar quiz Box
  quizBox.classList.add("hide");
  //mostrar result Box
  resultBox.classList.remove("hide");
  quizResult();
}
// obter o resultado do quiz
function quizResult(){
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML =attempt - correctAnswers ;
  const percentage = (correctAnswers/quiz.length)*100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
  resultBox.querySelector(".total-score").innerHTML = correctAnswers +"/"+ quiz.length;

}

function resetQuiz(){
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;

}

function tryAgainQuiz(){
  // ocultar result Box
  resultBox.classList.add("hide");
  // mostrar home Box
  homeBox.classList.remove("hide");
  resetQuiz();
}



//#### PONTO DE PARTIDA ####

function startQuiz(){

  //ocultar home Box
  homeBox.classList.add("hide");
  // mostrar quiz Box
  quizBox.classList.remove("hide");

  // primeiro, definiremos todas as questões na matriz availableQuestions
  setAvailableQuestions();
  // em seguida, chamaremos getNewQuestion (); function
  getNewQuestion();
  // para criar indicador de respostas
  answersIndicator();
}

window.onload = function (){
  homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
