"use strict";
let data = [];
let editingId = null;
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const tableBody = document.querySelector("#dataTable tbody");
form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    if (editingId !== null) {
        const index = data.findIndex((item) => item.id === editingId);
        if (index !== -1) {
            data[index] = Object.assign(Object.assign({}, data[index]), { name, age });
            editingId = null;
        }
    }
    else {
        const newData = { id: data.length + 1, name, age };
        data.push(newData);
    }
    renderTable();
    form.reset();
});
const renderTable = () => {
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>
          <button onclick="edit(${item.id})">Edit</button>
          <button onclick="remove(${item.id})">Delete</button>
        </td>
      `;
        tableBody.appendChild(row);
    });
};
const edit = (id) => {
    editingId = id;
    const item = data.find((item) => item.id === id);
    if (item) {
        nameInput.value = item.name;
        ageInput.value = String(item.age);
    }
};
const add = () => {
    form.reset();
    editingId = null;
};
const reset = () => {
    form.reset();
    editingId = null;
};
const remove = (id) => {
    data = data.filter((item) => item.id !== id);
    renderTable();
};
//# sourceMappingURL=script.js.map