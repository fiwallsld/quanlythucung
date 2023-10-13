'use strict';

renderBreedTable(breedArr);

submitBtn.addEventListener('click', () => {
  let newBreed = {
    name: breedInput.value,
    type: typeInput.value,
  };

  if (validateBreed(newBreed)) {
    breedArr.push(newBreed);

    saveToStorage(keyBreed, breedArr);

    clearInputBreed();

    renderBreedTable(breedArr);
  }
});

function clearInputBreed() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}

function validateBreed(breed) {
  if (validateBreed.isName(breed.name) && validateBreed.isType(breed.type)) {
    return true;
  }

  return false;
}

validateBreed.isName = (name) => {
  if (name === '') {
    alert('Please enter a name!');
    return false;
  }

  breedArr.forEach((breed) => {
    if (breed.name === name) {
      alert('Name is invalin');
      return false;
    }
  });

  return true;
};

validateBreed.isType = (type) => {
  if (type === 'Select Type') {
    alert('Please choose a type');
    return false;
  }
  return true;
};

// When Delete button click
function deleteBreed(breedId) {
  console.log(breedId);

  if (confirm('Are you sure')) {
    breedArr.forEach((breed) => {
      if (breed.id == breedId) breedArr.splice(breedArr.indexOf(breed), 1);
    });

    renderBreedTable(breedArr);

    saveToStorage(keyBreed, breedArr);
  }
}

///// Render Table function
function renderBreedTable(breedArr) {
  tBodyElement.innerHTML = '';

  breedArr.forEach((breed, index) => {
    const row = document.createElement('tr');

    breed.id = index + 1;
    row.innerHTML = `
        <td>${breed.id}</td>
        <td>${breed.name}</td>
        <td>${breed.type}</td><td>
        <button
            type="button"
            class="btn btn-danger"
            onclick="deleteBreed('${breed.id}')"
            >
            Delete
            </button>
        </td>
    `;
    tBodyElement.appendChild(row);
  });
}
