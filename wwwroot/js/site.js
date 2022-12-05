const articleUri = "api/articles";
const orderUri = "api/orders";
let articles = [];
let orders = [];

async function init() {
  document.getElementById("articlesPage").style.display = "none";
  document.getElementById("editForm").style.display = "none";
  document.getElementById("editOrderForm").style.display = "none";
  await getArticleItems();
  await getOrderItems();
  await createArticleSelectionsForAddForm();
  const addDeliveryDayDatebox = document.getElementById("add-delivery-day");
  addDeliveryDayDatebox.value = getToday();
}

async function getOrderItems() {
  await fetch(orderUri)
    .then((response) => response.json())
    .then((data) => _displayOrderItems(data))
    .catch((error) => console.error("Unable to get items.", error));
}

async function getArticleItems() {
  await fetch(articleUri)
    .then((response) => response.json())
    .then((data) => _displayArticleItems(data))
    .catch((error) => console.error("Unable to get items.", error));
}

async function createArticleSelectionsForAddForm() {
  const select = document.getElementById("add-article");
  if (articles == null) await getArticleItems();
  articles.map((article) => {
    let opt = document.createElement("option");
    opt.value = article.articleId;
    opt.innerHTML = article.name;
    select.appendChild(opt);
  });
  select.value = 1;
}

function createArticleSelectionsForEditForm(orderArticleId) {
  const select = document.getElementById("edit-article");
  if (articles == null) getArticleItems();
  articles.map((article) => {
    let opt = document.createElement("option");
    opt.value = article.articleId;
    opt.innerHTML = article.name;
    select.appendChild(opt);
  });
  orderArticleId == null ? (select.value = 1) : (select.value = orderArticleId);
}

async function addOrderItem() {
  const addArticleCombobox = document.getElementById("add-article");
  const addAmountTextbox = document.getElementById("add-amount");
  const addDeliveryDayDatebox = document.getElementById("add-delivery-day");
  const addRecipientTextbox = document.getElementById("add-recipient");

  const item = {
    articleId: addArticleCombobox.value,
    amount: parseFloat(addAmountTextbox.value) || 0,
    deliveryDay: addDeliveryDayDatebox.value,
    recipient: addRecipientTextbox.value,
  };

  await fetch(orderUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getOrderItems();
      addArticleCombobox.value = articles[0].articleId;
      addAmountTextbox.value = "";
      addDeliveryDayDatebox.value = getToday();
      addRecipientTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

async function addArticleItem() {
  const addNameTextbox = document.getElementById("add-name");
  const addPriceTextbox = document.getElementById("add-price");
  const addRarityCombobox = document.getElementById("add-rarity");
  const addDescriptionTextbox = document.getElementById("add-description");

  const item = {
    name: addNameTextbox.value,
    price: parseFloat(addPriceTextbox.value) || 0,
    rarity: addRarityCombobox.value,
    description: addDescriptionTextbox.value,
  };

  await fetch(articleUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getArticleItems();
      addNameTextbox.value = "";
      addPriceTextbox.value = "";
      addRarityCombobox.value = "Common";
      addDescriptionTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

async function deleteOrderItem(id) {
  await fetch(`${orderUri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getOrderItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

async function deleteArticleItem(id) {
  await fetch(`${articleUri}/${id}`, {
    method: "DELETE",
  })
    .then(() => getArticleItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

function displayOrderEditForm(id) {
  const item = orders.find((item) => item.orderId === id);

  const now = new Date(item.deliveryDay);
  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  const deliveryDate = now.getFullYear() + "-" + month + "-" + day;

  document.getElementById("edit-order-id").value = item.orderId;
  createArticleSelectionsForEditForm(item.articleId);
  document.getElementById("edit-amount").value = item.amount;
  document.getElementById("edit-delivery-day").value = deliveryDate;
  document.getElementById("edit-recipient").value = item.recipient;
  document.getElementById("editOrderForm").style.display = "block";
}

function displayArticleEditForm(id) {
  const item = articles.find((item) => item.articleId === id);

  document.getElementById("edit-id").value = item.articleId;
  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-price").value = item.price.toFixed(2);
  document.getElementById("edit-rarity").value = item.rarity;
  document.getElementById("edit-description").value = item.description;
  document.getElementById("editForm").style.display = "block";
}

async function updateOrderItem() {
  const itemId = document.getElementById("edit-order-id").value;
  const item = {
    orderId: parseInt(itemId, 10),
    articleId: document.getElementById("edit-article").value,
    amount: document.getElementById("edit-amount").value,
    deliveryDay: document.getElementById("edit-delivery-day").value,
    recipient: document.getElementById("edit-recipient").value,
  };

  await fetch(`${orderUri}/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getOrderItems())
    .catch((error) => console.error("Unable to update item.", error));

  closeOrderInput();

  return false;
}

async function updateArticleItem() {
  const itemId = document.getElementById("edit-id").value;
  const item = {
    articleId: parseInt(itemId, 10),
    name: document.getElementById("edit-name").value,
    price: document.getElementById("edit-price").value,
    rarity: document.getElementById("edit-rarity").value,
    description: document.getElementById("edit-description").value,
  };

  await fetch(`${articleUri}/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getArticleItems())
    .catch((error) => console.error("Unable to update item.", error));

  closeInput();

  return false;
}

function closeOrderInput() {
  document.getElementById("editOrderForm").style.display = "none";
}

function closeArticleInput() {
  document.getElementById("editForm").style.display = "none";
}

function openTab(tabId) {
  var index;
  var tabs = document.getElementsByClassName("tab");
  for (index = 0; index < tabs.length; index++) {
    tabs[index].style.display = "none";
  }
  document.getElementById(tabId).style.display = "block";
}

function exportOrderTable() {
  let csvHeader = "";
  let csvContent = orders
    .map(function (order) {
      let splitter = ";";
      let merged = "";
      for (const prop in order) {
        merged += order[prop] + splitter;
        csvHeader += prop + splitter;
      }
      return merged;
    })
    .join("\n");
  csvContent = csvHeader + "\n" + csvContent;
  let url = window.URL.createObjectURL(
    new Blob([csvContent], { type: "data:attachment/text" })
  );
  let link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "orders.csv");
  link.style.display = "none";
  document.body.appendChild(link); // Required for FF
  link.click(); // download the data
  window.URL.revokeObjectURL(url);
  link.remove();
}

function exportArticleTable() {
  let csvHeader = "";
  let csvContent = articles
    .map(function (article) {
      let splitter = ";";
      let merged = "";
      for (const prop in article) {
        merged += article[prop] + splitter;
        csvHeader += prop + splitter;
      }
      return merged;
    })
    .join("\n");
  csvContent = csvHeader + "\n" + csvContent;
  let url = window.URL.createObjectURL(
    new Blob([csvContent], { type: "data:attachment/text" })
  );
  let link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "articles.csv");
  link.style.display = "none";
  document.body.appendChild(link); // Required for FF
  link.click(); // download the data
  window.URL.revokeObjectURL(url);
  link.remove();
}

function _displayOrderCount(itemCount) {
  const name = itemCount === 1 ? "Order" : "Orders";

  document.getElementById("counterOrders").innerText = `${itemCount} ${name}`;
}

function _displayArticleCount(itemCount) {
  const name = itemCount === 1 ? "Article" : "Articles";

  document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayOrderItems(data) {
  const tBody = document.getElementById("orders");
  tBody.innerHTML = "";

  _displayOrderCount(data.length);

  const button = document.createElement("button");
  button.classList.add(
    "rounded-md",
    "bg-transparent",
    "hover:bg-violet-900",
    "text-violet-900",
    "hover:text-white",
    "font-sans",
    "px-5",
    "py-1",
    "mx-2",
    "my-1"
  );

  data.forEach((item) => {
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `displayOrderEditForm(${item.orderId})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteOrderItem(${item.orderId})`);

    let tr = tBody.insertRow();
    tr.classList.add("even:bg-slate-50", "h-12", "text-gray-700");

    let td1 = tr.insertCell(0);
    td1.classList.add("pl-4", "text-gray-400", "border-t", "border-slate-200");
    let textNode1 = document.createTextNode(item.orderId);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    td2.classList.add("pl-4", "font-semibold", "border-t", "border-slate-200");
    let textNode2 = document.createTextNode(
      articles.find((article) => article.articleId == item.articleId).name
    );
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(2);
    td3.classList.add("pl-4", "border-t", "border-slate-200", "text-center");
    let textNode3 = document.createTextNode(item.amount);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    td4.classList.add("pl-4", "border-t", "border-slate-200");
    let textNode4 = document.createTextNode(item.deliveryDay);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    td5.classList.add("pl-4", "border-t", "border-slate-200");
    let textNode5 = document.createTextNode(item.recipient);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(5);
    td6.classList.add("border-t", "border-slate-200");
    td6.appendChild(editButton);

    let td7 = tr.insertCell(6);
    td7.classList.add("border-t", "border-slate-200");
    td7.appendChild(deleteButton);
  });

  orders = data;
}

function _displayArticleItems(data) {
  const tBody = document.getElementById("articles");
  tBody.innerHTML = "";

  _displayArticleCount(data.length);

  const button = document.createElement("button");
  button.classList.add(
    "rounded-md",
    "bg-transparent",
    "hover:bg-violet-900",
    "text-violet-900",
    "hover:text-white",
    "font-sans",
    "px-5",
    "py-1",
    "mx-2",
    "my-1"
  );

  data.forEach((item) => {
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute(
      "onclick",
      `displayArticleEditForm(${item.articleId})`
    );

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute(
      "onclick",
      `deleteArticleItem(${item.articleId})`
    );

    let tr = tBody.insertRow();
    tr.classList.add("even:bg-slate-50", "h-12", "text-gray-700");

    let td1 = tr.insertCell(0);
    td1.classList.add("pl-4", "text-gray-400", "border-t", "border-slate-200");
    let textNode1 = document.createTextNode(item.articleId);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    td2.classList.add("pl-4", "font-semibold", "border-t", "border-slate-200");
    let textNode2 = document.createTextNode(item.name);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(2);
    td3.classList.add("pl-4", "border-t", "border-slate-200", "text-right");
    let textNode3 = document.createTextNode(
      item.price.toFixed(2) + "\u{1F48E}"
    );
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(3);
    td4.classList.add("pl-4", "border-t", "border-slate-200");
    let textNode4 = document.createTextNode(item.rarity);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(4);
    td5.classList.add("pl-4", "border-t", "border-slate-200");
    let textNode5 = document.createTextNode(item.description);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(5);
    td6.classList.add("border-t", "border-slate-200");
    td6.appendChild(editButton);

    let td7 = tr.insertCell(6);
    td7.classList.add("border-t", "border-slate-200");
    td7.appendChild(deleteButton);
  });

  articles = data;
}

function getToday() {
  const now = new Date();
  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);
  return now.getFullYear() + "-" + month + "-" + day;
}
