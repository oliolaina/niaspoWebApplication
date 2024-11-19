document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
});

document.getElementById('loadUsers').addEventListener('click', async function() {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent =`${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
});
