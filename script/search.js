'use strict';

const findBtn = document.getElementById('find-btn');

renderBreed(breedArr, 'Select Type');

findBtn.addEventListener('click', () => {
  let data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  const result = petArr
    .findId(data.id)
    .findName(data.name)
    .findType(data.type)
    .findBreed(data.breed)
    .findVaccine(data.vaccinated)
    .findDewormed(data.dewormed)
    .findSterilized(data.sterilized);

  renderTableData(result);
});

// Add check functions for Array
Array.prototype.findId = function (id) {
  if (!id) return this;
  return this.filter((pet) => pet.id.includes(id));
};
Array.prototype.findName = function (name) {
  if (!name) return this;
  return this.filter(
    (pet) =>
      pet.name.includes(name.toUpperCase()) ||
      pet.name.includes(name.toLowerCase()) ||
      pet.name.includes(name)
  );
};
Array.prototype.findType = function (type) {
  if (type === 'Select Type') return this;
  return this.filter((pet) => pet.type.includes(type));
};
Array.prototype.findBreed = function (breed) {
  if (breed === 'Select Breed') return this;
  return this.filter((pet) => pet.breed.includes(breed));
};
Array.prototype.findVaccine = function (vaccine) {
  if (vaccine) return this.filter((pet) => pet.vaccinated === vaccine);
  return this;
};
Array.prototype.findDewormed = function (dewormed) {
  if (dewormed) return this.filter((pet) => pet.dewormed === dewormed);
  return this;
};
Array.prototype.findSterilized = function (sterilized) {
  if (sterilized) return this.filter((pet) => pet.sterilized === sterilized);
  return this;
};

// Render Breed when Type changes
function renderBreed(breedArr, type) {
  const breedEl = document.getElementById('input-breed');

  breedEl.innerHTML = '';

  //Make default option is 'Select Breed'
  const option = document.createElement('option');
  option.innerHTML = 'Select Breed';
  breedEl.appendChild(option);

  // breedEl.appendChild(document.createElement('option').innerHTML = 'Select Breed');

  //If don't choose Type, render full breed
  if (type === 'Select Type') {
    breedArr.forEach((breed) => {
      const option = document.createElement('option');
      option.innerHTML = `${breed.name}`;
      breedEl.appendChild(option);
    });
    return;
  }

  //Render when Type changes
  if (type != 'Select Type')
    breedArr
      .filter((breed) => breed.type === type)
      .forEach((breed) => {
        const option = document.createElement('option');
        option.innerHTML = `${breed.name}`;
        breedEl.appendChild(option);
      });
}

//Render data to table
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
        `;
    tBodyElement.appendChild(row);
  }
}
