document.addEventListener('DOMContentLoaded', ()=>{

    let questionContainer = document.getElementById("question-container");
    let questionDisplay = document.getElementById("question-text");
    let choicesDisplay = document.getElementById("choices-list");
    let resultContainer = document.getElementById("result-container");
    let scoreDisplay = document.getElementById("score");
    let startBtn = document.getElementById("start-btn");
    let nextBtn = document.getElementById("next-btn");
    let restartBtn = document.getElementById("restart-btn");
    let resultQuesDisplay = document.getElementById("resultDisplay");


    let questions = [
        {
            question: "What is 2+2?",
            choices: ["3", "5", "-3", "4"],
            answer: "4",
            marks: 1
        },
        {
            question: "What is 15th alphabet in English?",
            choices: ["i", "m", "o", "q"],
            answer: "o",
            marks: 1
        },
        {
            question: "Is HTML a markup language",
            choices: ["True", "False"],
            answer: "True",
            marks: 2
        },
        {
            question: "What will be next in this sequence: a, c, f, j, ___ ",
            choices: ["m", "n", "o", "p"],
            answer: "o",
            marks: 3
        },
        {
            question: "How much is 55kg when converted to lbs?",
            choices: ["100lbs", "110lbs", "120lbs", "130lbs"],
            answer: "120lbs",
            marks: 3
        },
    ]
    let score = 0;
    let currQuestionIndex = 0;
    let currSelected = ""
    let resultArray = []

    startBtn.addEventListener('click', startQuiz)
    
    function startQuiz(){
        questionContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden')
        startBtn.classList.add('hidden')

        displayNextQuestion()
    }

    function displayNextQuestion(){
        questionDisplay.textContent = questions[currQuestionIndex].question;
        choicesDisplay.innerHTML = ""

        questions[currQuestionIndex].choices.forEach(choice => {
            let li = document.createElement('li');
            li.textContent = choice
            li.id = choice

            choicesDisplay.appendChild(li)

            li.addEventListener('click', (event)=>{
                if(currSelected === ""){
                    li.classList.add("selected");
                    currSelected = li.id;
                    nextBtn.classList.remove('hidden')
                } else if (currSelected === li.id){
                    currSelected = ""
                    li.classList.remove('selected')
                    nextBtn.classList.add('hidden')
                } else {
                    document.getElementById(currSelected).classList.remove('selected');
                    li.classList.add("selected");
                    currSelected = li.id;
                }
            })
        })
    }

    nextBtn.addEventListener('click', ()=>{
        if(currSelected === questions[currQuestionIndex].answer){
            score += questions[currQuestionIndex].marks;
            resultArray[currQuestionIndex] = 1
        } else {
            resultArray[currQuestionIndex] = 0
        }

        currQuestionIndex++;
        currSelected = "";

        if(currQuestionIndex < questions.length){
            displayNextQuestion();
        } else {
            displayResult();
        }
    })

    function displayResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        let totalMarks = 0;
        for(let i=0; i<questions.length; i++){
            totalMarks += questions[i].marks
        }

        scoreDisplay.textContent = `${score} out of ${totalMarks}`

        for(let i=0; i<questions.length; i++){
            let li = document.createElement('li')

            if(resultArray[i]){
                li.innerHTML = `
                <img src="https://www.svgrepo.com/show/405751/green-circle.svg" alt="" class="img1">
                <span>${questions[i].question}</span>
                `;
            } else {
                li.innerHTML = `
                <img src="https://www.svgrepo.com/show/397693/red-exclamation-mark.svg" alt="" class="img2">
                <span>${questions[i].question}</span>
                `;
            }

            resultQuesDisplay.appendChild(li)
        }
    }

    restartBtn.addEventListener('click', ()=>{
        score = 0;
        currQuestionIndex = 0;
        resultArray = []
        questionContainer.classList.remove('hidden')
        resultContainer.classList.add('hidden')
        
        displayNextQuestion()
    })
})