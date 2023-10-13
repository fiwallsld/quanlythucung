'use strict';

const importBtn = document.getElementById('import-btn');
const exportBtn = document.getElementById('export-btn');
const inputFile = document.getElementById('input-file');

function saveStaticDataToFile() {
  let petArr = getFromStorage(keyPet);

  var blob = new Blob([JSON.stringify(petArr)], {
    type: 'text/plain;charset=utf-8',
  });

  saveAs(blob, 'static.json');
}

exportBtn.addEventListener('click', saveStaticDataToFile);

importBtn.addEventListener('click', () => {
  var file = inputFile.files[0];

  if (file) {
    let reader = new FileReader();
    reader.readAsText(file, 'utf-8');

    reader.onload = (e) => {
      saveToStorage(keyPet, e.target.result);
      alert('Successfully loaded');
    };

    reader.onerror = (e) => {
      alert('Error reading data file!!!');
    };
  } else alert('Please add file data!');
});
