'use strict';

const formEl = document.getElementById('container-form');

renderTableData(petArr);
renderBreed(breedArr);

function renderTableData(petArr) {
  tBodyElement.innerHTML = '';

  for (let pet of petArr) {
    const row = document.createElement('tr');

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
              class="btn btn-warning"
              onclick="edit('${pet.id}')"
              >
              Edit
              </button>
          </td>
        `;
    tBodyElement.appendChild(row);
  }
}

//Show data for editing
function edit(petId) {
  // Check and show form
  if (formEl.classList.contains('hide')) {
    formEl.classList.remove('hide');
  }

  // Check if click two time on the same button will hide form
  if (petId === idInput.value) {
    formEl.classList.add('hide');
    idInput.value = '';
  }

  //When show form, render pet's data
  if (!formEl.classList.contains('hide')) startEditPet(petId);
}

function startEditPet(petId) {
  let pet = petArr.find((pet) => pet.id === petId);

  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  renderBreed(breedArr, pet.type);
  breedInput.value = pet.breed;
}
// When click Submit button
submitBtn.addEventListener('click', function () {
  let data = {
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
  };

  const petId = idInput.value;

  //Check input data success
  if (validateEdit(data)) {
    // Get pet will edit
    let pet = petArr.find((pet) => pet.id === petId);

    updatePet(pet, data);

    saveToStorage(keyPet, petArr);

    clearInput();
    formEl.classList.toggle('hide');

    renderTableData(petArr);
  }
});

function updatePet(pet, data) {
  pet.name = data.name;
  pet.age = data.age;
  pet.type = data.type;
  pet.weight = data.weight;
  pet.length = data.length;
  pet.color = data.color;
  pet.breed = data.breed;
  pet.vaccinated = data.vaccinated;
  pet.sterilized = data.sterilized;
  pet.dewormed = data.dewormed;
}

// Change Breed option when type input change
typeInput.addEventListener('change', () => {
  renderBreed(breedArr, typeInput.value);
});

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

// Common function
function validateEdit(data) {
  // Check data
  if (
    validate.isAge(data.age) &&
    validate.isType(data.type) &&
    validate.isWeight(data.weight) &&
    validate.isLength(data.length) &&
    validate.isBreed(data.breed)
  )
    return true;

  return false;
}
