const questions = [
    { q: "Pulau terbesar di Indonesia?", a: "KALIMANTAN" },
    { q: "Ibu kota Indonesia?", a: "JAKARTA" },
    { q: "Rumah adat Toraja?", a: "TONGKONAN" },
    { q: "Suku asli Papua?", a: "ASMAT" },
    { q: "Candi terbesar di Indonesia?", a: "BOROBUDUR" },
    { q: "Gunung tertinggi di Indonesia?", a: "PUNCAKJAYA" },
    { q: "Lagu daerah Bali?", a: "JANGER" },
    { q: "Tarian khas Aceh?", a: "SAISRIMA" },
    { q: "Danau terbesar di Indonesia?", a: "TOBA" },
    { q: "Kota pahlawan?", a: "SURABAYA" },
    { q: "Ibukota Jawa Barat?", a: "BANDUNG" },
    { q: "Bahasa daerah Lombok?", a: "SASAK" },
    { q: "Tari khas Betawi?", a: "TOPENG" },
    { q: "Kerajaan Islam pertama di Indonesia?", a: "SAMUDERA" },
    { q: "Senjata khas Madura?", a: "CELURIT" },
    { q: "Alat musik Minang?", a: "TALEMPONG" },
    { q: "Batik berasal dari?", a: "JAWA" },
    { q: "Tarian dari Minahasa?", a: "MAENGKET" },
    { q: "Pulau Dewata adalah?", a: "BALI" },
    { q: "Rumah adat Jawa?", a: "JOGLO" },
    { q: "Kerajinan dari Lombok?", a: "GERABAH" },
    { q: "Suku terbesar di Sumatera?", a: "BATAK" },
    { q: "Senjata khas Bugis?", a: "BADIK" }
];

let index = 0;
let timeLeft = 60;
let timer;
let container = document.getElementById("puzzle-container");
let questionBox = document.getElementById("question-box");
let levelTitle = document.getElementById("level-title");
let message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const backBtn = document.getElementById("backBtn");

// START GAME
startBtn.onclick = () => {
    startBtn.style.display = "none";  // sembunyikan tombol Mulai
    shuffleBtn.style.display = "inline-block"; // tampilkan Acak
    backBtn.style.display = "inline-block"; // tampilkan Kembali
    index = 0;
    loadQuestion();
};

// SHUFFLE
shuffleBtn.onclick = () => loadQuestion();

// KEMBALI KE MENU AWAL
backBtn.onclick = () => {
    clearInterval(timer);
    timeLeft = 60;
    updateTimer();
    message.innerHTML = "";
    questionBox.innerHTML = "";
    container.innerHTML = "";

    startBtn.style.display = "inline-block"; // tampilkan Mulai
    shuffleBtn.style.display = "none";        // sembunyikan Acak
    backBtn.style.display = "none";           // sembunyikan Kembali
    levelTitle.innerHTML = "Level 1";         // reset level title
};

// LOAD QUESTION
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 60;
    updateTimer();
    message.innerHTML = "";

    const { q, a } = questions[index];
    questionBox.innerHTML = q;

    let letters = a.split("");
    letters = shuffle(letters);

    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${letters.length}, 1fr)`;

    letters.forEach(l => {
        let div = document.createElement("div");
        div.className = "letter";
        div.draggable = true;
        div.textContent = l;
        container.appendChild(div);
    });

    dragDrop();
    startTimer();
    updateLevelTitle();
}

function updateLevelTitle() {
    if(index < 5) levelTitle.innerHTML = "Level 1";
    else if(index < 13) levelTitle.innerHTML = "Level 2";
    else levelTitle.innerHTML = "Level 3";
}

// TIMER
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if(timeLeft <= 0){
            clearInterval(timer);
            message.innerHTML = "<span style='color:red'>Waktu Habis!</span>";
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById("timer").innerText = timeLeft;
}

// DRAG & DROP
function dragDrop() {
    let items = document.querySelectorAll(".letter");
    let dragItem = null;

    items.forEach(i => {
        i.addEventListener("dragstart", () => dragItem = i);
        i.addEventListener("dragover", e => e.preventDefault());
        i.addEventListener("drop", () => {
            if(i !== dragItem){
                let temp = i.textContent;
                i.textContent = dragItem.textContent;
                dragItem.textContent = temp;
                checkAnswer();
            }
        });
    });
}

// CHECK ANSWER
function checkAnswer() {
    const correct = questions[index].a;
    const current = [...document.querySelectorAll(".letter")].map(l => l.textContent).join("");

    if(current === correct){
        message.innerHTML = "<span style='color:green'>Benar!</span>";
        clearInterval(timer);
        setTimeout(() => {
            index++;
            if(index >= questions.length){
                message.innerHTML = "<span style='color:blue'>Semua level selesai!</span>";
            } else {
                loadQuestion();
            }
        }, 800);
    } else {
        message.innerHTML = "<span style='color:red'>Salah!</span>";
        setTimeout(() => message.innerHTML = "", 500);
    }
}

// SHUFFLE
function shuffle(arr){
    return arr.sort(() => Math.random() - 0.5);
}