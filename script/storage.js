'use strict';

const submitBtn = document.getElementById('submit-btn');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tBodyElement = document.getElementById('tbody');
const healthyBtn = document.getElementById('healthy-btn');

const sidebarEl = document.getElementById('sidebar');

// Animation for sidebar
sidebarEl.addEventListener('click', () => {
  sidebarEl.classList.toggle('active');
});

let initPetsArr = [
  {
    id: 'P001',
    name: '',
    age: 3,
    type: 'Dog',
    weight: 12,
    length: '87',
    color: '#e08f8f',
    breed: 'Doberman Pinscher',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: 'Sat Jul 14 2022 00:37:50 GMT+0700',
  },
  {
    id: 'P002',
    name: 'Charlie Tuxx',
    age: 4,
    type: 'Cat',
    weight: 4,
    length: '65',
    color: '#8cee9c',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    date: 'Sat Aug 24 2022 00:37:50 GMT+0700',
  },
  {
    id: 'P003',
    name: 'Sweetie Pie',
    age: 3,
    type: 'Dog',
    weight: 6,
    length: 45,
    color: '#ff1414',
    breed: 'Husky',
    vaccinated: false,
    dewormed: false,
    sterilized: true,
    date: 'Sat Sep 24 2022 00:37:50 GMT+0700',
  },
  {
    id: 'P004',
    name: 'Chocolate And Kitten',
    age: 4,
    type: 'Cat',
    weight: 6,
    length: '87',
    color: '#444209',
    breed: 'Mixed Breed',
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: 'Sat Oct 24 2022 00:37:50 GMT+0700',
  },
  {
    id: 'P005',
    name: 'Symph',
    age: 3,
    type: 'Dog',
    weight: 8,
    length: 77,
    color: '#006fff',
    breed: 'Doberman Pinscher',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: '3/4/2022',
  },
  {
    id: 'P006',
    name: 'Minh Phuong',
    age: 5,
    type: 'Dog',
    weight: 14,
    length: '68',
    color: '#5e38e5',
    breed: 'Doberman Pinscher',
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    date: 'Sat Dec 12 2022 00:37:50 GMT+0700',
  },
  {
    id: 'P008',
    name: 'Handler',
    age: 5,
    type: 'Dog',
    weight: 11,
    length: '92',
    color: '#000000',
    breed: 'Doberman Pinscher',
    vaccinated: true,
    dewormed: true,
    sterilized: false,
    date: '2022-12-23T19:47:53.201Z',
  },
  {
    id: 'P010',
    name: 'Lufffi',
    age: 5,
    type: 'Cat',
    weight: 2,
    length: '35',
    color: '#a0b5c0',
    breed: 'Mixed Breed',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: '2022-12-23T19:56:51.593Z',
  },
];

let innitBreedsArr = [
  {
    name: 'Tabby',
    type: 'Cat',
  },
  {
    name: 'Mixed Breed',
    type: 'Cat',
  },
  {
    name: 'Husky',
    type: 'Dog',
  },
  {
    name: 'Domestic Short Hair',
    type: 'Cat',
  },
  {
    name: 'Doberman Pinscher',
    type: 'Dog',
  },
];

const keyPet = 'petsData';
const keyBreed = 'breedsData';

// Get pet's data

if (!localStorage.petsData) {
  saveToStorage('petsData', initPetsArr);
}

const petArr = getFromStorage(keyPet);

// Get breed
if (!localStorage.breedsData) {
  saveToStorage('breedsData', innitBreedsArr);
}
const breedArr = getFromStorage(keyBreed);

// Function save and get from localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// --------------------Common function
function validate(data) {
  // Check
  if (
    validate.isId(data.id) &&
    validate.isAge(data.age) &&
    validate.isType(data.type) &&
    validate.isWeight(data.weight) &&
    validate.isLength(data.length) &&
    validate.isBreed(data.breed)
  )
    return true;

  return false;
}

// Children function
validate.isId = function (id) {
  if (id && checkId(id)) {
    return true;
  }

  if (id && !checkId(id)) {
    alert('ID must be unique');
    return false;
  }

  if (!id.trim()) alert('Please input for id');

  return false;
};

// Check Id when input data
const checkId = (id) => {
  for (let pet of petArr) if (pet.id === id) return false;
  return true;
};

validate.isAge = function (age) {
  if (age != 0 && !age) {
    alert('Please input for age');
    return false;
  }

  if (age < 1 || age > 15) {
    alert('Age must be between 1 and 15');
    return false;
  }

  return true;
};

validate.isWeight = function (weight) {
  if (weight != 0 && !weight) {
    alert('Please input for weight');
    return false;
  }

  if (weight < 1 || weight > 15) {
    alert('Weight must be between 1 and 15');
    return false;
  }

  return true;
};

validate.isLength = function (length) {
  if (length === '' && !length) {
    alert('Please input for length');
    return false;
  }

  if (length < 1 || length > 100) {
    alert('length must be between 1 and 100');
    return false;
  }

  return true;
};

validate.isType = function (type) {
  if (type === 'Select Type') {
    alert('Please select Type!');
    return false;
  }
  return true;
};

validate.isBreed = function (breed) {
  if (breed === 'Select Breed') {
    alert('Please select Breed!');
    return false;
  }

  return true;
};

const clearInput = () => {
  (idInput.value = ''),
    (nameInput.value = ''),
    (ageInput.value = ''),
    (typeInput.value = 'Select Type'),
    (weightInput.value = ''),
    (lengthInput.value = ''),
    (colorInput.value = '#000000'),
    (breedInput.value = 'Select Breed'),
    (vaccinatedInput.checked = false),
    (dewormedInput.checked = false),
    (sterilizedInput.checked = false);
};

// Change Breed option when Ty
if (typeInput)
  typeInput.addEventListener('change', () => {
    renderBreed(breedArr, typeInput.value);
  });
