
let items = JSON.parse(localStorage.getItem('items')) || [];
const correctPassword = "mypassword123"; // Change this to your own password

function addItem() {
    const itemInput = document.getElementById('itemInput').value.trim();
    const linkInput = document.getElementById('linkInput').value.trim();
    const imageInput = document.getElementById('imageInput').value.trim();

    if (itemInput) {
        items.push({ name: itemInput, link: linkInput, image: imageInput });
        items.sort((a, b) => a.name.localeCompare(b.name));
        saveItems();
        displayItems();
        document.getElementById('itemInput').value = '';
        document.getElementById('linkInput').value = '';
        document.getElementById('imageInput').value = '';
    }
}

function displayItems() {
    const ul = document.getElementById('itemList');
    ul.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        let content = `<span>${item.name}</span>`;
        if (item.link) {
            content += ` - <a href="${item.link}" target="_blank">Link</a>`;
        }
        if (item.image) {
            content += `<br><img src="${item.image}" alt="Image">`;
        }
        li.innerHTML = content;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() {
            items.splice(index, 1);
            saveItems();
            displayItems();
        };
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
}

function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function searchItems() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = items.filter(item => item.name.toLowerCase().includes(query));
    const ul = document.getElementById('itemList');
    ul.innerHTML = '';
    filtered.forEach((item, index) => {
        const li = document.createElement('li');
        let content = `<span>${item.name}</span>`;
        if (item.link) {
            content += ` - <a href="${item.link}" target="_blank">Link</a>`;
        }
        if (item.image) {
            content += `<br><img src="${item.image}" alt="Image">`;
        }
        li.innerHTML = content;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() {
            items.splice(index, 1);
            saveItems();
            displayItems();
        };
        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
}

function changeBackground() {
    const bgUrl = document.getElementById('bgInput').value.trim();
    if (bgUrl) {
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        localStorage.setItem('backgroundImage', bgUrl);
        document.getElementById('bgInput').value = '';
    }
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim();
    if (password === correctPassword) {
        document.querySelector('.add-tab').style.display = 'inline';
        document.querySelector('.bg-tab').style.display = 'inline';
        document.getElementById('login').style.display = 'none';
        document.getElementById('items').style.display = 'block';
    } else {
        document.getElementById('loginMessage').textContent = "Incorrect password!";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedBg = localStorage.getItem('backgroundImage');
    if (savedBg) {
        document.body.style.backgroundImage = `url('${savedBg}')`;
    }
    displayItems();
    document.querySelector('.add-tab').addEventListener('click', function() {
        document.getElementById('items').style.display = 'none';
        document.getElementById('add-item').style.display = 'block';
        document.getElementById('change-bg').style.display = 'none';
    });

    document.querySelector('.bg-tab').addEventListener('click', function() {
        document.getElementById('items').style.display = 'none';
        document.getElementById('add-item').style.display = 'none';
        document.getElementById('change-bg').style.display = 'block';
    });

    document.querySelector('.navbar a[href="#items"]').addEventListener('click', function() {
        document.getElementById('add-item').style.display = 'none';
        document.getElementById('change-bg').style.display = 'none';
        document.getElementById('items').style.display = 'block';
    });
});
