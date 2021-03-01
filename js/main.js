var oStudentName = document.getElementById("name");
var oButton = document.getElementsByTagName("button")[0];
var oVolume = document.getElementsByTagName("img")[0];
var oClass = document.getElementsByName("class")[0];

var speakName = true;

(function () {
    for (var i = 0; i < classes.length; ++i) {
        var option = document.createElement("option");
        option.text = classes[i];
        try {
            oClass.add(option); // IE8及更早版本
        } catch (err) {
            oClass.add(option, null);
        }
    }
    if (!window.speechSynthesis) {
        oVolume.title = "该浏览器不支持语音播报";
        clickVolume();
    }
})();

function speakText(text) {
    var ssu = new window.SpeechSynthesisUtterance();
    ssu.lang = 'zh-CN'; // 语言环境
    ssu.rate = 0.8; // 语音的语速，默认为1
    // window.speechSynthesis.onvoiceschanged = () => {
    //     var voices = window.speechSynthesis.getVoices();
    //     if (voices.length > 0) {
    //         ssu.voice = voices[0]; // 声音来源
    //     }
    // };
    ssu.text = text;
    window.speechSynthesis.speak(ssu);
}

function shuffle(array) {
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

function clickVolume() {
    if (window.speechSynthesis)
        speakName = !speakName;
    else
        speakName = false;
    oVolume.src = speakName ? "images/speaker.svg" : "images/mute.svg";
}

var running = false;
var clsidx = 0;
var index = cls_students[clsidx].length;
var timer;

function clickButton() {
    if (running)
        return;
    running = true;
    oButton.className = "disable-button";
    var i = oClass.selectedIndex;
    if (i != clsidx || index >= cls_students[i].length) {
        clsidx = i;
        var students = cls_students[clsidx];
        var last = students[index - 1];
        index = 0;
        shuffle(students);
        if (students[index] == last) {
            students.shift();
            students.push(last);
        }
    }
    timer = setInterval(function () {
        var students = cls_students[clsidx];
        if (i >= 20) {
            clearInterval(timer);
            oStudentName.innerHTML = students[index];
            if (speakName) {
                try {
                    speakText(students[index]);
                } catch (err) {

                }
            }
            ++index;
            running = false;
            oButton.className = "default-button";
        } else {
            oStudentName.innerHTML = students[i % students.length];
        }
        i++;
    }, 50)
}