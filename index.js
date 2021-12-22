var stagiaires = ["Esther", "Lamia", "Zineb", "Aurélia", "Sofiane", "Kevin", "Julien", "Faouzi", "Michelle", "Aicha", "Maxime", "Clois"]
var already_passed = []
var res = document.querySelector("p")
res.style.padding = "40px"
var stagiaire = ""
var my_buttons = document.querySelectorAll(".whoisit")
var restart_button = my_buttons[0]
var start_button = my_buttons[1]
var container = document.querySelector(".row")
var counter = 0;
var is_wheeling = false

function launch_the_wheel() {
    var i = setInterval(function () {
        res.innerHTML = stagiaires[counter%stagiaires.length]
        if (counter === 10) {
            let new_tab = []
            already_passed.map(val => {
                new_tab.push(" " + val)
            })
            res.innerHTML = new_tab
            clearInterval(i);
            is_wheeling = false
            restart_button.style.backgroundColor = "blueviolet"
            restart_button.style.color = "white"
            start_button.style.backgroundColor = "blueviolet"
            start_button.style.color = "white"
        }
        counter++;
    }, 100);
}

restart_button.addEventListener("click", function() {
    if (is_wheeling === false) {
        already_passed = []
        res.innerHTML = "..."
        counter = 0
    }
})

start_button.addEventListener("click", function() {
    if (is_wheeling === false) {
        is_wheeling = true
        restart_button.style.backgroundColor = "lightgrey"
        restart_button.style.color = "dimgrey"
        start_button.style.backgroundColor = "lightgrey"
        start_button.style.color = "dimgrey"
        counter = 0
        get_next_stagiaire()
        launch_the_wheel()
    }
})

function random_stagiaire() {
    stagiaire = stagiaires[parseInt(Math.random() * stagiaires.length)]
}

function get_next_stagiaire() {
    random_stagiaire()
    if (already_passed.length < stagiaires.length) {
        if (is_stagiaire_already_passed()) {
            get_next_stagiaire()
        } else {
            already_passed.push(stagiaire)
        }
    }
}

function is_stagiaire_already_passed() {
    for (let i = 0; i < already_passed.length; i++) {
        if (stagiaire == already_passed[i]) {
            return true
        }
    }
}

function toggle_stagiaire(button_stagiaire) {
    button_stagiaire.addEventListener("click", function() {
        if (button_stagiaire.value == "on") {
            stagiaires = stagiaires.filter(val => {
                return val !== button_stagiaire.textContent
            })
            button_stagiaire.value = "off"
            button_stagiaire.className = "btn rounded-0 col-2 text-center"
            button_stagiaire.style.backgroundColor = "lightgrey"
            button_stagiaire.style.color = "dimgrey"
        } else {
            stagiaires.push(button_stagiaire.textContent)
            button_stagiaire.value = "on"
            button_stagiaire.className = "btn rounded-0 col-2 text-center"
            button_stagiaire.style.backgroundColor = "blueviolet"
            button_stagiaire.style.color = "white"
        }
        console.log("stagiaires ", stagiaires);
    })
}

function generate_buttons_stagiaires() {
    for (let i = 0; i < stagiaires.length; i++) {
        let button_stagiaire = document.createElement("button")
        button_stagiaire.textContent = stagiaires[i]
        button_stagiaire.value = "on"
        button_stagiaire.className = "btn rounded-0 col-2 text-center"
        button_stagiaire.style.backgroundColor = "blueviolet"
        button_stagiaire.style.color = "white"
        toggle_stagiaire(button_stagiaire)
        container.appendChild(button_stagiaire)
    }
}

generate_buttons_stagiaires()
