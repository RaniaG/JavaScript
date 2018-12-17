var questionsArr=[];
var selectedQuestionsArr=[];
var lastQ=0;
var currentQ=0;
var skippedQsArr=[];
var answers=document.getElementsByClassName("answer-container");
var question=document.querySelector(".question");
var links=document.getElementsByClassName("q-link");
var nextBtn=document.getElementById("next");
var skipBtn=document.getElementById("skip");
var terminateBtn=document.getElementById("terminate");
var skippedQuestionContainer=document.getElementsByClassName("skipped")[0];


function questionConst(qId,quesText,ansArr,correctAns,ans){
    this.qId=qId;
    this.quesText=quesText;
    this.ansArr=ansArr;
    this.correctAns=correctAns;
    this.ans=ans;
}

function createQuestions(){
    questionsArr[0]=new questionConst(0,"what is the color of oranges?",['orange','red','green','yellow'],0,null);
    questionsArr[1]=new questionConst(1,"what is the color of banana?",['orange','red','green','yellow'],3,null);

    questionsArr[2]=new questionConst(2,"what is the color of cucumber?",['orange','red','green','yellow'],2,null);

    questionsArr[3]=new questionConst(3,"what is the color of apples?",['orange','red','green','yellow'],1,null);
    questionsArr[4]=new questionConst(4,"what is the color of grapes?",['orange','red','green','yellow'],0,null);
    questionsArr[5]=new questionConst(5,"what is the color of mango?",['orange','red','green','yellow'],0,null);

    questionsArr[6]=new questionConst(6,"what is the color of strawberry?",['orange','red','green','yellow'],1,null);

    questionsArr[7]=new questionConst(7,"what is the color of pineapple?",['orange','red','green','yellow'],3,null);
    
    questionsArr[8]=new questionConst(8,"what is the color of kiwi?",['orange','red','green','yellow'],2,null);
    questionsArr[9]=new questionConst(9,"what is the color of tomato?",['orange','red','green','yellow'],1,null);


    
}

function selectRandomQuestions(n){
    var rand=Math.floor(Math.random() * 10);
    var indexArr=[]
    for (var index = 0; index < n; index++) {
        while(indexArr.indexOf(rand)!=-1)
        {
            rand=Math.floor(Math.random() * 10);
        }
        indexArr.push(rand);
    }
    for ( index = 0; index < n; index++) {
        questionsArr[indexArr[index]].qId=index;
        selectedQuestionsArr.push(questionsArr[indexArr[index]]);
    }
    for (var i = 0;  i< selectedQuestionsArr.length; i++) {
        skippedQsArr[i]=false;
    }
    console.log(selectedQuestionsArr);
    showQuestionN();
}


function showQuestionN(){
    question.innerText=selectedQuestionsArr[currentQ].quesText;  
    for (var index = 0; index < answers.length; index++) {
        if(selectedQuestionsArr[currentQ].ans==index)
                answers[index].classList.add('active');
        else answers[index].classList.remove('active');
        answers[index].children[0].innerText=String.fromCharCode(index+97);
        answers[index].children[1].innerText=selectedQuestionsArr[currentQ].ansArr[index];
    }
    updateQuestionLink();

}

function updateQuestionLink(){
    links.forEach(function(el){
        el.classList.remove("active");
    });
    document.querySelector(".q-link[question='"+(currentQ+1)+"']").classList.add("active");
}
function markSkippedQuestion(){
    var elem=document.createElement("div");
    elem.classList.add("skipped-question");
    elem.setAttribute("question",currentQ+1);
    elem.innerText="Question "+(currentQ+1);
    skippedQuestionContainer.appendChild(elem);

    elem.addEventListener("click",function(event){
        currentQ=event.target.getAttribute("question")-1;
        showQuestionN();
    })
}
function removeSkippedQuestion(){
    var elem=document.querySelector(".skipped-question[question='"+(currentQ+1)+"']");
    skippedQuestionContainer.removeChild(elem);
}
function nextQuestion(){
    if(selectedQuestionsArr[currentQ].ans==null&&(!skippedQsArr[currentQ]))
    {
        return confirm("are you sure you don't want to answer this question?");

    }
    if(skippedQsArr[currentQ]){
        if(selectedQuestionsArr[currentQ].ans!=null){
            //remove from skippedQsArr
            skippedQsArr[currentQ]=false;
            removeSkippedQuestion();
        }
        currentQ=lastQ;
        showQuestionN();
        return false;
    }
    return true;
}
function showNextQuestion(){
    if(currentQ<selectedQuestionsArr.length-1)
        lastQ=++currentQ;
    console.log(lastQ);
    // console.log(currentQ);
    showQuestionN();
}
function calcScore(){
    var score=0;
    selectedQuestionsArr.forEach(function(el){
        if(el.correctAns==el.ans)
            score++;
    })
    return score/selectedQuestionsArr.length*100;
}

/**---------------------------------------------------------------------------------------------------------- */
answers.forEach=Array.prototype.forEach;
links.forEach=Array.prototype.forEach;

answers.forEach(function(el){
    el.addEventListener("click",function(event){
        selectedQuestionsArr[currentQ].ans=event.target.innerText.charCodeAt(0)-97;
        // console.log(selectedQuestionsArr[currentQ].ans);
        showQuestionN();
    });
});

nextBtn.addEventListener("click",function(){
    if(nextQuestion()){
        console.log("yes");
        showNextQuestion();
    }
});
skipBtn.addEventListener("click",function(){
    if(!skippedQsArr[currentQ])
    {
        skippedQsArr[currentQ]=true;
        markSkippedQuestion();
    }
    showNextQuestion();
});
terminateBtn.addEventListener("click",function(){
    if(confirm("are you sure you want to terminate exam?"))
    {
        var score=calcScore();
        var alertString="your score is :"+score+"%\n";
        if(score<50)
            alertString+="LOSER";
        else if(score<80)
            alertString+="Not bad";
        else alertString+="Great";
        alert(alertString);
    }
});

createQuestions();
selectRandomQuestions(5);
alert("Start exam");





