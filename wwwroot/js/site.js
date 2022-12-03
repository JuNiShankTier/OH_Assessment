const uri = 'api/articles';
let articles = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addPriceTextbox = document.getElementById('add-price');
  const addDescriptionTextbox = document.getElementById('add-description');

  const item = {
    name: addNameTextbox.value,
    price: parsefloat(addPriceTextbox.value) || 0,
    description: addDescriptionTextbox.value
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addPriceTextbox.value = '';
      addDescriptionTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = articles.find(item => item.articleId === id);
  
  document.getElementById('edit-id').value = item.articleId;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-price').value = item.price;
  document.getElementById('edit-description').value = item.description;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value,
    price: document.getElementById('edit-price').value,
    description: document.getElementById('edit-description').value,
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'Article' : 'Articles';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('articles');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.articleId})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.articleId})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let textNode1 = document.createTextNode(item.articleId);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    let textNode2 = document.createTextNode(item.name);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(2);
    let textNode3 = document.createTextNode(item.price);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    let textNode4 = document.createTextNode(item.description);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    td5.appendChild(editButton);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);
  });

  articles = data;
}