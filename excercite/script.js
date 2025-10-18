let users = JSON.parse(localStorage.getItem("users")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let editU = null,
  editP = null;

const loginArea = document.getElementById("loginArea");
const app = document.getElementById("app");
const who = document.getElementById("who");
const btnLogout = document.getElementById("btnLogout");
const inpEmail = document.getElementById("inpEmail");
const inpPass = document.getElementById("inpPass");
const btnLogin = document.getElementById("btnLogin");

const secUsers = document.getElementById("secUsers");
const secProducts = document.getElementById("secProducts");
const secHome = document.getElementById("secHome");
const tabUsers = document.getElementById("tabUsers");
const tabProducts = document.getElementById("tabProducts");
const tabHome = document.getElementById("tabHome");

const u_name = document.getElementById("u_name");
const u_email = document.getElementById("u_email");
const u_role = document.getElementById("u_role");
const u_save = document.getElementById("u_save");

const p_name = document.getElementById("p_name");
const p_price = document.getElementById("p_price");
const p_img = document.getElementById("p_img");
const p_save = document.getElementById("p_save");

const tbUsers = document.getElementById("tbUsers");
const tbProducts = document.getElementById("tbProducts");
const cards = document.getElementById("cards");

function saveLS() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("products", JSON.stringify(products));
}

btnLogin.onclick = (e) => {
  e.preventDefault();
  const email = inpEmail.value.trim();
  const pass = inpPass.value.trim();

  if (email === "admin@example.com" && pass === "123456") {
    localStorage.setItem("role", "admin");
    openApp();
  } else if (email === "user@example.com" && pass === "123456") {
    localStorage.setItem("role", "user");
    openApp();
  } else {
    alert("Sai email hoặc mật khẩu!");
  }
};

btnLogout.onclick = () => {
  localStorage.removeItem("role");
  app.classList.add("hidden");
  loginArea.classList.remove("hidden");
  btnLogout.classList.add("hidden");
};

function openApp() {
  const role = localStorage.getItem("role");
  loginArea.classList.add("hidden");
  app.classList.remove("hidden");
  btnLogout.classList.remove("hidden");

  if (role === "admin") showSection("users");
  else showSection("home");

  renderUsers();
  renderProducts();
  renderHome();
  applyRole();
}

tabUsers.onclick = () => showSection("users");
tabProducts.onclick = () => showSection("products");
tabHome.onclick = () => showSection("home");

function showSection(s) {
  secUsers.classList.add("hidden");
  secProducts.classList.add("hidden");
  secHome.classList.add("hidden");
  if (s === "users") secUsers.classList.remove("hidden");
  if (s === "products") secProducts.classList.remove("hidden");
  if (s === "home") secHome.classList.remove("hidden");
}

u_save.onclick = () => {
  const name = u_name.value.trim();
  const email = u_email.value.trim();
  const role = u_role.value;
  if (!name || !email) return alert("Vui lòng nhập đầy đủ thông tin!");

  const obj = { name, email, role };
  if (editU === null) users.push(obj);
  else {
    users[editU] = obj;
    editU = null;
    u_save.textContent = "Lưu";
  }
  u_name.value = u_email.value = "";
  u_role.value = "user";
  saveLS();
  renderUsers();
};

function renderUsers() {
  tbUsers.innerHTML = "";
  users.forEach((u, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td>
        <button class="btn-edit" onclick="onEditUser(${i})">Sửa</button>
        <button class="btn-del" onclick="onDelUser(${i})">Xóa</button>
      </td>`;
    tbUsers.appendChild(tr);
  });
}
function onEditUser(i) {
  u_name.value = users[i].name;
  u_email.value = users[i].email;
  u_role.value = users[i].role;
  editU = i;
  u_save.textContent = "Cập nhật";
}
function onDelUser(i) {
  if (confirm("Xóa người dùng này?")) {
    users.splice(i, 1);
    saveLS();
    renderUsers();
  }
}

p_save.onclick = () => {
  const name = p_name.value.trim();
  const price = p_price.value.trim();
  const img = p_img.value.trim();
  if (!name || !price || !img)
    return alert("Vui lòng nhập đủ thông tin sản phẩm!");

  const obj = { name, price, img };
  if (editP === null) products.push(obj);
  else {
    products[editP] = obj;
    editP = null;
    p_save.textContent = "Lưu";
  }
  p_name.value = p_price.value = p_img.value = "";
  saveLS();
  renderProducts();
  renderHome();
};

function renderProducts() {
  tbProducts.innerHTML = "";
  products.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td><img class="thumb" src="${p.img}" alt="${p.name}"></td>
      <td>
        <button class="btn-edit" onclick="onEditProduct(${i})">Sửa</button>
        <button class="btn-del" onclick="onDelProduct(${i})">Xóa</button>
      </td>`;
    tbProducts.appendChild(tr);
  });
}
function onEditProduct(i) {
  p_name.value = products[i].name;
  p_price.value = products[i].price;
  p_img.value = products[i].img;
  editP = i;
  p_save.textContent = "Cập nhật";
}
function onDelProduct(i) {
  if (confirm("Xóa sản phẩm này?")) {
    products.splice(i, 1);
    saveLS();
    renderProducts();
    renderHome();
  }
}

function renderHome() {
  cards.innerHTML = "";
  if (products.length === 0) {
    cards.innerHTML = '<div>Chưa có sản phẩm nào</div>';
    return;
  }
  products.forEach((p) => {
    const d = document.createElement("div");
    d.className = "card-item";
    d.innerHTML = `
      <img src="${p.img}" onerror="this.src='https://via.placeholder.com/180'">
      <h4>${p.name}</h4>
      <div style="color:#0078d4;font-weight:600">${p.price}</div>`;
    cards.appendChild(d);
  });
}

function applyRole() {
  const r = localStorage.getItem("role");

  document.querySelectorAll(".btn-edit,.btn-del").forEach((b) => {
    b.style.display = r === "user" ? "none" : "";
  });

  if (r === "user") {
    tabUsers.style.display = "none";
    tabProducts.style.display = "none";
  } else {
    tabUsers.style.display = "inline-block";
    tabProducts.style.display = "inline-block";
  }
}

if (localStorage.getItem("role")) openApp();
