'use strict';

let healthyPetArr = [];

let healthyCheck = false;

//Initial
renderTableData(petArr);

// When click Submit button
submitBtn.addEventListener('click', function () {
  let data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseFloat(weightInput.value),
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  console.log(typeof data.date);
  console.log(data.date.toLocaleDateString());

  //Check input data success
  if (validate(data)) {
    // Add pet in petArr
    petArr.push(data);
    saveToStorage(keyPet, petArr);

    // Clear input data
    clearInput();

    // Show data
    renderTableData(petArr);
  }
});

// Render Table function
function renderTableData(petArr) {
  tBodyElement.innerHTML = '';

  // console.log(petArr);
  for (let pet of petArr) {
    const row = document.createElement('tr');

    // Show table
    row.innerHTML = `
        <th scope="row">${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight} kg</td>
        <td>${pet.length} cm</td>
        <td>${pet.breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
        </td>
        <td><i class="bi ${
          pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        <td><i class="bi ${
          pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        <td><i class="bi ${
          pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        
        <td>${new Date(pet.date).toLocaleDateString()}</td>
        <td>
            <button
            type="button"
            class="btn btn-danger"
            onclick="deletePet('${pet.id}')"
            >
            Delete
            </button>
        </td>
      `;
    tBodyElement.appendChild(row);
  }
}

// Render Breed when Type changes
function renderBreed(breedArr, type) {
  const breedEl = document.getElementById('input-breed');

  breedEl.innerHTML = '';

  //Make default option is 'Select Breed'
  //If don't choose Type, don't render breed's type
  if (type === 'Select Type') {
    const option = document.createElement('option');
    option.innerHTML = 'Select Breed';
    breedEl.appendChild(option);
    return;
  }

  //Render when Type changes
  if (type != 'Select Type')
    breedArr = breedArr.filter((breed) => breed.type === type);

  breedArr.forEach((breed) => {
    const option = document.createElement('option');
    option.innerHTML = `${breed.name}`;
    breedEl.appendChild(option);
  });
}

// Healthy Btn
healthyBtn.addEventListener('click', function () {
  // console.log(typeInput.value);
  if (!healthyCheck) {
    healthyCheck = true;

    //Filter healthPet use checkHealth function
    healthyPetArr = petArr.filter((pet) => checkHealth(pet) === true);
    renderTableData(healthyPetArr);
    healthyBtn.textContent = 'Show All Pet';
  } else {
    healthyCheck = false;
    renderTableData(petArr);
    healthyBtn.textContent = 'Show Healthy Pet';
  }
});

//Check healthy pet
const checkHealth = (pet) => {
  return pet.vaccinated && pet.dewormed && pet.sterilized;
};

// When click Delete button
const deletePet = (petId) => {
  //Confirm before delete Pet
  if (confirm('Are you sure')) {
    // Remove out petArr, petsId
    for (let pet of petArr)
      if (pet.id === petId) petArr.splice(petArr.indexOf(pet), 1);

    saveToStorage(keyPet, petArr);

    renderTableData(petArr);

    // Reset Healthy Btn
    healthyBtn.textContent = 'Show Healthy Pet';
    healthyCheck = false;
  }
};
