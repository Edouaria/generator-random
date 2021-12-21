var stagiaires = ["Esther", "Lamia", "Zineb", "Aurélia", "Sofiane", "Kevin", "Julien", "Faouzi", "Michelle", "Aicha", "Maxime", "Clois"]
var already_passed = []
var res = document.querySelector("p")
var stagiaire = ""
var mon_bouton = document.querySelector('button')
var container = document.querySelector(".row")

mon_bouton.addEventListener("click", function() {
    show_next_stagiaire()
    new_tab = []
    already_passed.map(val => {
        new_tab.push(" " + val)
    })
    res.innerHTML = new_tab
})

function random_stagiaire() {
    stagiaire = stagiaires[parseInt(Math.random() * stagiaires.length)]
}

function show_next_stagiaire() {
    random_stagiaire()
    if (already_passed.length < stagiaires.length) {
        if (is_stagiaire_already_passed()) {
            show_next_stagiaire()
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
            button_stagiaire.style.color = "black"
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
        button_stagiaire.style.color = "black"
        toggle_stagiaire(button_stagiaire)
        container.appendChild(button_stagiaire)
    }
}

generate_buttons_stagiaires()
