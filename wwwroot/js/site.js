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
  const addRarityCombobox = document.getElementById('add-rarity');
  const addDescriptionTextbox = document.getElementById('add-description');

  const item = {
    name: addNameTextbox.value,
    price: parseFloat(addPriceTextbox.value) || 0,
    rarity: addRarityCombobox.value,
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
      addRarityCombobox.value = 'Common';
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
  document.getElementById('edit-price').value = item.price.toFixed(2);
  document.getElementById('edit-rarity').value = item.rarity;
  document.getElementById('edit-description').value = item.description;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    articleId: parseInt(itemId, 10),
    name: document.getElementById('edit-name').value,
    price: document.getElementById('edit-price').value,
    rarity: document.getElementById('edit-rarity').value,
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

function openTab(tabId) {
  var index;
  var tabs = document.getElementsByClassName("tab");
  for (index = 0; index < tabs.length; index++) {
    tabs[index].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";
}

function exportTable(){
  let csvContent = articles.map(function(article) {
    let splitter = ';';
    let merged = "";
    for (const prop in article) {
      merged += article[prop] + splitter;
    }
    return merged;
  }).join("\n");
  let url = window.URL.createObjectURL(new Blob([csvContent], {type: "data:attachment/text"}));
  let link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "articles.csv");
  link.style.display = 'none';
  document.body.appendChild(link); // Required for FF
  link.click(); // download the data
  window.URL.revokeObjectURL(url);
  link.remove();
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
  button.classList.add('rounded-md', 'bg-transparent', 'hover:bg-violet-900', 'text-violet-900', 'hover:text-white', 'font-sans', 'px-5', 'py-1', 'mx-2', 'my-1');

  data.forEach(item => {

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.articleId})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.articleId})`);

    let tr = tBody.insertRow();
    tr.classList.add('even:bg-slate-50', 'h-12', 'text-gray-700');
    
    let td1 = tr.insertCell(0);
    td1.classList.add('pl-4', 'text-gray-400','border-t', 'border-slate-200');
    let textNode1 = document.createTextNode(item.articleId);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    td2.classList.add('pl-4', 'font-semibold','border-t', 'border-slate-200');
    let textNode2 = document.createTextNode(item.name);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(2);
    td3.classList.add('pl-4','border-t', 'border-slate-200', 'text-right');
    let textNode3 = document.createTextNode(item.price.toFixed(2) + '\u{1F48E}');
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    td4.classList.add('pl-4','border-t', 'border-slate-200');
    let textNode4 = document.createTextNode(item.rarity);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    td5.classList.add('pl-4','border-t', 'border-slate-200');
    let textNode5 = document.createTextNode(item.description);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(5);
    td6.classList.add('border-t', 'border-slate-200');
    td6.appendChild(editButton);

    let td7 = tr.insertCell(6);
    td7.classList.add('border-t', 'border-slate-200');
    td7.appendChild(deleteButton);
  });

  articles = data;
}