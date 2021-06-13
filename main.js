// When the user scrolls down  50 px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.getElementById("navbar").style.padding = "20px 20px";
    document.getElementById("logo").style.Size = "20px";
  } else {
    document.getElementById("navbar").style.padding = "50px 20px";
    document.getElementById("logo").style.Size = "40px";
  }
}
let nCount = selector => {
    $(selector).each(function () {
      $(this)
        .animate({
          Counter: $(this).text()
        }, {
          // A string or number determining how long the animation will run.
          duration: 4000,
          // A string indicating which easing function to use for the transition.
          easing: "swing",
          /**
           * A function to be called for each animated property of each animated element. 
           * This function provides an opportunity to
           *  modify the Tween object to change the value of the property before it is set.
           */
          step: function (value) {
            $(this).text(Math.ceil(value));
          }
        });
    });
  };
  
  let a = 0;
  $(window).scroll(function () {
    // The .offset() method allows us to retrieve the current position of an element  relative to the document
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
      a++;
      nCount(".rect > h1");
    }
  });
  var quiz = {
    // (A) PROPERTIES 
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
    {
      q : "Hvor langt kan en Maravelo cykel køre på en fuld opladning?",
      o : [
        "30 km",
        "50 km",
        "70 km",
        "100 km"
      ],
      a : 3 // svaret er 100
    },
    {
      q : "Hvor mange forskellige cykler har Maravelo at tilbyde?",
      o : [
        "3",
        "7",
        "10",
        "12"
      ],
      a : 3 // svaret er 12
    },
    {
      q : "Hvor længe tager det at oplade vores el-cykel batteri fuldt?",
      o : [
        "4 timer",
        "6 timer",
        "8 timer",
        "10 timer"
      ],
      a : 0 //svaret er 4 timer
    },
    {
      q : "Hvad er mindste prisen på at lease en cykel?",
      o : [
        "599,-",
        "499,-",
        "399,-",
        "799,-"
      ],
      a : 2 // svaret er 399,-
    },
    {
      q : "Hvor ligger vores butik?",
      o : [
        "Charlottenlund",
        "Humlebæk",
        "Slagelse",
        "Albertslund"
      ],
      a : 1 // svaret er Humlebæk
    }
    ],
  
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
  
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
  
    // (B) INIT QUIZ HTML
    init: function(){
      // (B1) WRAPPER
      quiz.hWrap = document.getElementById("quizWrap");
  
      // (B2) QUESTIONS SECTION
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      // (B3) ANSWERS SECTION
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      // (B4) GO!
      quiz.draw();
    },
  
    // (C) DRAW QUESTION
    draw: function(){
      // (C1) QUESTION
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      // (C2) OPTIONS
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", quiz.select);
        quiz.hAns.appendChild(label);
      }
    },
    
    // (D) OPTION SELECTED
    select: function(){
      // (D1) DETACH ALL ONCLICK
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.removeEventListener("click", quiz.select);
      }
  
      // (D2) CHECK IF CORRECT
      let correct = this.dataset.idx == quiz.data[quiz.now].a;
      if (correct) { 
        quiz.score++; 
        this.classList.add("correct");
      } else {
        this.classList.add("wrong");
      }
    
      // (D3) NEXT QUESTION OR END GAME
      quiz.now++;
      setTimeout(function(){
        if (quiz.now < quiz.data.length) { quiz.draw(); } 
        else {
          quiz.hQn.innerHTML = `Du har svaret rigtigt på ${quiz.score} ud af ${quiz.data.length} spørgsmål.`;
          quiz.hAns.innerHTML = "Maravelos cykler kan køre 100km på en fuldopladning, og opladningen tager 4 timer. Maravelo har 12 forskellige cykler at tilbyde og mindsteprisen for en leasing er 399 ,- Maravelo holder til i Humlebæk på Bakkegårdsvej 106.";
        }
      }, 1000);
    }
  };
  window.addEventListener("load", quiz.init);

  