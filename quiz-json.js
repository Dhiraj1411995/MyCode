var currentques = 0, cpositive = 0, cnegative = 0, c = 0, c1 = 0, notattempt = 0;
/*currentques is for current question number,cpositive and c is for counting correct responses,cnegative and c1 is used for counting negative responses.
    notattempt is used here for counting number of questions which are not attempted*/
var score = 0;//it is for calculating score
var totques = allquestions.length;//totques has now total number of questions and allquestions is the javascript object that is json variable
var response = new Array();//response is the number type array used for storing 1, 0, -1 for correct,not attemp and incorrect response respectively. 
var response_val = new Array();//response_val is used for storing the option number of responds
var tot_time;//it is for showing total time taken
var container = document.getElementById("mycontainer");//myconatiner is the division used for showing division that contain questions,buttons,timer,title etc and conatiner now stores the questions division
var queselement = document.getElementById("ques");//ques is the division taken for question pallete itself
var nxt = document.getElementById("next");//for next button
var prev = document.getElementById('prev');//for previous button
var rescontainer = document.getElementById("res");//for result division
var contents = document.getElementById("res1");//for showing quick summary in the result division
var content_details = document.getElementById("res2");//for showing detailed view of user responses and correct responses
var finaltitle = document.getElementById('finaltitle');
var div_card = document.getElementById('div_card');
var link1 = document.getElementById('link1');
var link2 = document.getElementById('link2');
var current_select=null;
var responses=new Array();
window.onload = function () {
    var quizStatus = sessionStorage.getItem('status');
    var temp = sessionStorage.getItem('currentstatus');
    if (temp) {
        currentques = temp;
    }
    if (quizStatus == "started") {
        start_test();
    }
}

var radiobuttonsvalue = document.getElementsByName("option");
function getquestion(value) {
    var val = allquestions[value];
    queselement.textContent = (value + 1) + ". " + val.ques;   
    var spanoptions = document.getElementsByClassName("options");
    for (var i = 0; i < 4; i++) {
        //console.log(val);
        spanoptions[i].innerHTML = val.options[i];
        radiobuttonsvalue[i].value = val.options[i];

    }
    
}

function change_func(val) {
    var user_choice = val.value;
    current_select = user_choice;
}

function nxtQuestion() {
    
    
    var selectopt = document.querySelector('input[type=radio]:checked');
    if (!selectopt) {
        response_val.push("not attempted");
        alert('You are not attempting this question.');
    }
    else {
        var ans = selectopt.value;
        response_val.push(ans);
        console.log(allquestions[currentques].ans);
    }
    if (allquestions[currentques].ans == ans){
        response.push(1);
        responses.push(1);
    }
    else if (selectopt != null && allquestions[currentques].ans != ans){
        response.push(-1);
        responses.push(-1);
    }
    else{
        response.push(0);
        responses.push(0);
    }
    allquestions[currentques].userselection = ans;
    console.log(response);
    console.log(responses);
    console.log(response_val);

    if(selectopt)
        selectopt.checked = false;
    currentques = currentques + 1;
    if (!selectopt && currentques == 0)
        prev.style.display = "none";
    else
        prev.style.display = "";

    if (currentques == totques - 1)
        nxt.textContent="Submit";
    else
        nxt.textContent="Next";
    console.log(allquestions[currentques]);
    if (currentques == totques) {
        for (var i = 0; i < response.length; i++) {
            if (response[i] > 0)
                cpositive++;
            else if (response[i] < 0)
                cnegative = cnegative - 1;
        }
        for (var i = 0; i < response.length; i++) {
            if (response[i] > 0)
                c++;
            else if (response[i] < 0)
                c1++;
        }
        notattempt = totques - (c + c1);
        score = (cpositive * 5) + (cnegative * 1.25);
        tot_time = "0" + (9 - parseInt(document.getElementById('minutes').value)) + " : " + (60 - parseInt(document.getElementById('seconds').value));
        container.style.display = "none";
        rescontainer.style.display = "";
        finaltitle.innerHTML = "Quiz At A Glance";
        contents.innerHTML = "You have completed your quiz and your score is " + score + " out of 100." + '<br>' + "You have given " + totques + " questions and out of " + totques + " questions " + c + " is correct and " + c1 + " is incorrect and " + notattempt + " is not attempted." + '<br>' + "You have completed your quiz in " + tot_time;

        console.log(response);
        console.log(responses);
        console.log(response_val);
        return;
    }
    getquestion(currentques);
}

function resetoptions() {
    current_select = null;
    for (var i = 0; i < 4; i++) {
        radiobuttonvalues[i].checked = false;
    }
}

function prevQuestion() {
    currentques = currentques - 1;
    getquestion(currentques);
    if (currentques == 0) {
        response.pop();
        response.pop();
        response_val.pop();
        response_val.pop();
        prev.style.display = "none";
    }
    else{
        response.pop();
        response_val.pop();
    }
    
    if(responses[currentques]==1){
        for (var i = 0; i < 4; i++) {
            if(radiobuttonsvalue[i].value == allquestions[currentques].ans){
                radiobuttonsvalue[i].checked=true;
            }
    
        }       
    }
    else if(responses[currentques]==0){
        for (var i = 0; i < 4; i++) {
                radiobuttonsvalue[i].checked=false;
        }
    }
    else if(responses[currentques]==-1){
        for (var i = 0; i < 4; i++) {
            if(radiobuttonsvalue[i].value == allquestions[currentques].userselection){
                radiobuttonsvalue[i].checked=true;
            }
    
        }
    }
    /*else if(responses[currentques]==-1){
        $("input[name=option][value=" + allquestions[currentques].userselection + "]").prop('checked', true);
    }*/
    console.log(response);
    console.log(responses);
    console.log(response_val);
}

function start_test() {
    container.style.display = "";
    div_card.style.display = "none";
    countdown();
    sessionStorage.setItem('status', 'started');
}

function timeup() {
    for (var i = 0; i < response.length; i++) {
        if (response[i] > 0)
            cpositive++;
        else if (response[i] < 0)
            cnegative = cnegative - 1;
    }
    for (var i = 0; i < response.length; i++) {
        if (response[i] > 0)
            c++;
        else if (response[i] < 0)
            c1++;
    }
    notattempt = totques - (c + c1);
    score = (cpositive * 5) + (cnegative * 1.25);
    container.style.display = "none";
    rescontainer.style.display = "";
    finaltitle.innerHTML = "Quiz At A Glance";
    contents.innerHTML = "You ran out of your time and your responses have been automatically submitted and your score is " + score + " out of 100." + '<br>' + "You have given " + totques + " questions and out of " + totques + " questions " + c + " is correctly answered." + "<br>" + "You have given " + c1 + " incorrected responses and not attempted questions are " + notattempt;
}
function summary() {
    contents.style.display = "";
    content_details.style.display = "none";
    link1.className = link1.className + " active";
    link2.className = link2.className.replace(" active", "");
    finaltitle.innerHTML = "Quiz At A Glance";
}
function detail() {
    contents.style.display = "none";
    content_details.style.display = "";
    link1.className = link1.className.replace(" active", "");
    link2.className = link2.className + " active";
    finaltitle.innerHTML = "Detailed View Of Your Responses";
    var detailed_view = [];
    for (var i = 0; i < totques; i++) {
        detailed_view.push({
            "Question": allquestions[i].ques,
            "CorrectOption": allquestions[i].ans,
            "YourAnswer": allquestions[i].userselection
        })
    }

    var col = [];
    for (var i = 0; i < detailed_view.length; i++) {
        for (var key in detailed_view[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "dynamic-table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < detailed_view.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (detailed_view[i][col[j]] == undefined)
                detailed_view[i][col[j]] = "not attempted";
            tabCell.innerHTML = detailed_view[i][col[j]];
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    content_details.innerHTML = "";
    content_details.appendChild(table);
}
getquestion(currentques);

