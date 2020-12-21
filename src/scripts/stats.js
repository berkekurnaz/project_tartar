const urlParams = new URLSearchParams(window.location.search);

var lang = urlParams.get('l');

var minute = urlParams.get('m');
var second = urlParams.get('s');

var countTotal = urlParams.get('1');
var countTrue = urlParams.get('2');
var countFalse = urlParams.get('3');

var countAngry = urlParams.get('4');
var countDisgusted = urlParams.get('5');
var countFearful = urlParams.get('6');
var countHappy = urlParams.get('7');
var countNeutral = urlParams.get('8');
var countSad = urlParams.get('9');
var countSurprised = urlParams.get('10');

showStats();

function showStats() {
    document.getElementsByClassName("lessonMinute")[0].innerHTML = minute + ":" + second;
    document.getElementsByClassName("lessonMinute")[1].innerHTML = minute + ":" + second;

    document.getElementsByClassName("countTotal")[0].innerHTML = calculateAttentionTheClass(countTotal, countTrue);
    document.getElementsByClassName("countTotal")[1].innerHTML = calculateAttentionTheClass(countTotal, countTrue);

    document.getElementsByClassName("countSmile")[0].innerHTML = calculateEmotion(countHappy);
    document.getElementsByClassName("countSmile")[1].innerHTML = calculateEmotion(countHappy);

    document.getElementsByClassName("countNeutral")[0].innerHTML = calculateEmotion(countNeutral);
    document.getElementsByClassName("countNeutral")[1].innerHTML = calculateEmotion(countNeutral);

    document.getElementsByClassName("countAngry")[0].innerHTML = calculateEmotion(countAngry);
    document.getElementsByClassName("countAngry")[1].innerHTML = calculateEmotion(countAngry);

    document.getElementsByClassName("countSurprised")[0].innerHTML = calculateEmotion(countSurprised);
    document.getElementsByClassName("countSurprised")[1].innerHTML = calculateEmotion(countSurprised);

    document.getElementsByClassName("countSad")[0].innerHTML = calculateEmotion(countSad);
    document.getElementsByClassName("countSad")[1].innerHTML = calculateEmotion(countSad);

    document.getElementsByClassName("countFearful")[0].innerHTML = calculateEmotion(countFearful);
    document.getElementsByClassName("countFearful")[1].innerHTML = calculateEmotion(countFearful);

    document.getElementsByClassName("commentArea")[0].innerHTML = studentComment();
    document.getElementsByClassName("commentArea")[1].innerHTML = studentComment();

    setHiddenByLanguage(lang);
}


function calculateAttentionTheClass(totalCount, trueCount) {
    return "%" + ((trueCount * 100) / totalCount).toFixed(2);
}

function calculateEmotion(count) {
    var countTotalEmotion = parseInt(countAngry) + parseInt(countFearful) + parseInt(countHappy) + parseInt(countNeutral) + parseInt(countSad) + parseInt(countSurprised);
    return "%" + ((count * 100) / countTotalEmotion).toFixed(0);
}

function studentComment() {
    var per = (countTrue * 100) / countTotal;
    if (per >= 80) {
        if (lang == "eng") {
            return "'Overall the student's attendance rate is great.'";
        } else if (lang == "tr") {
            return "'Genel Olarak Öğrencinin derse katılım oranı harika.'";
        }
    } else if (per < 80 && per >= 60) {
        if (lang == "eng") {
            return "'Generally Student attendance rate is normal'";
        } else if (lang == "tr") {
            return "'Genel Olarak Öğrencinin derse katılım oranı normal.'";
        }
    } else if (per < 60 && per >= 30) {
        if (lang == "eng") {
            return "'Generally, student attendance rate is below average'";
        } else if (lang == "tr") {
            return "'Genel Olarak Öğrencinin derse katılım oranı ortalama altında.'";
        }
    } else if (per < 30) {
        if (lang == "eng") {
            return "'Generally, the student's attendance rate is low'";
        } else if (lang == "tr") {
            return "'Genel Olarak Öğrencinin derse katılım oranı düşük.'";
        }
    } else {
        return "Error !";
    }
}

function setHiddenByLanguage(lang) {
    if (lang == "eng") {
        document.getElementById("screenEng").style.display = "block";
        document.getElementById("screenTr").style.display = "none";
    } else if (lang == "tr") {
        document.getElementById("screenEng").style.display = "none";
        document.getElementById("screenTr").style.display = "block";
    } else {
        document.getElementById("screenEng").style.display = "block";
        document.getElementById("screenTr").style.display = "none";
    }
}