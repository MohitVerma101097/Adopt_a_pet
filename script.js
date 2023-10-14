const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petPromise.json();

const template = document.querySelector("#animal-card");
const wrapper = document.createElement("div");

function decideAgeText(age) {
    if (age <= 0) {
        return "Less than a year old";
    } else if (age === 1) {
        return "1 year old";
    } else if (age > 1) {
        return `${age} years old`;
    }
}

pets.forEach(pet => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;

    const img = clone.querySelector("img");
    img.src = pet.photo;
    img.alt = `A ${pet.species} named ${pet.name}`;

    const age = new Date().getFullYear() - pet.birthYear;
    const ageText = decideAgeText(age);

    clone.querySelector(".name").textContent = pet.name
    clone.querySelector(".age").textContent = ageText;
    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".description").textContent = pet.description
    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`

    wrapper.appendChild(clone);
});

document.querySelector(".animals").appendChild(wrapper);

const filterButtons = document.querySelectorAll(".filter-nav a");

const handleFilterClick = (e) => {
    let target = e.target;
    e.preventDefault();
    filterButtons.forEach((data) => {
        data.classList.remove("active");
    });
    target.classList.add("active");
    filterPets(target.dataset.filter);
};

filterButtons.forEach(data => {
    data.addEventListener("click", handleFilterClick);
});

const filterPets = (species) => {
    const allPets = document.querySelectorAll(".animal-card")
    if (species == "all") {
        allPets.forEach(data => {
            data.style.display = "";
        })
    } else {
        allPets.forEach(data => {
            if (data.querySelector(".species").textContent == species) {
                data.style.display = "";
            } else {
                data.style.display = "none";
            }
        })
    }
}
