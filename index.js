var stagiaires = ["Esther", "Lamia", "Zineb", "Aurélia", "Sofiane", "Kevin", "Julien", "Faouzi", "Michelle", "Aicha", "Maxime", "Clois"]
var already_passed = []
var res = document.querySelector(".result_container")
res.style.padding = "40px"
var stagiaire = ""
var my_buttons = document.querySelectorAll(".whoisit")
var restart_button = my_buttons[0]
var start_button = my_buttons[1]
var toggle_stagiaire_container = document.querySelector(".toggle_stagiaire")
var counter = 0;
var is_wheeling = false
var nodes_child_to_be_removed = []

// WHEEL
function launch_the_wheel() {
    let selected_stagiaire = document.createElement("div")
    nodes_child_to_be_removed.push(selected_stagiaire)
    selected_stagiaire.className = "col-2"
    let i = setInterval(function () {
        selected_stagiaire.textContent = stagiaires[counter%stagiaires.length]
        res.appendChild(selected_stagiaire)
        if (counter === 20) {
            already_passed.map(val => {
                selected_stagiaire.textContent = val
            })
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

// RESTART
restart_button.addEventListener("click", function() {
    if (is_wheeling === false) {
        already_passed = []
        nodes_child_to_be_removed.map(el => {
            res.removeChild(el)
        })
        nodes_child_to_be_removed = []
        counter = 0
        start_button.disabled = false
        let range = document.createRange();
        range.selectNodeContents(toggle_stagiaire_container);
        range.deleteContents();
        stagiaires = ["Esther", "Lamia", "Zineb", "Aurélia", "Sofiane", "Kevin", "Julien", "Faouzi", "Michelle", "Aicha", "Maxime", "Clois"]
        generate_buttons_stagiaires()
    }
})

// START
start_button.addEventListener("click", function() {
    if (is_wheeling === false && res.childElementCount < stagiaires.length + 1) {
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

// GET RANDOM STAGIAIRE DISPLAYED
function random_stagiaire() {
    const ma_var_filtered = stagiaires.filter(el => {
        return already_passed.indexOf(el) === -1
    })
    return ma_var_filtered[parseInt(Math.random() * ma_var_filtered.length)]
}

function get_next_stagiaire() {
    const next_stagiaire = random_stagiaire()
    if (next_stagiaire !== undefined) {
        already_passed.push(next_stagiaire)
    }
    if (already_passed.length === stagiaires.length) {
        start_button.disabled = true
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
        if (button_stagiaire.value === "on") {
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
        toggle_stagiaire_container.appendChild(button_stagiaire)
    }
}

stagiaires.filter(val => {
    console.log(val);
})

generate_buttons_stagiaires()

