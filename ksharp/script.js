async function fetchAndRenderRepositories() {
    try {
        const response = await fetch('https://api.github.com/users/Kin1009/repos');
        const repos = await response.json();
        const tableBody = document.getElementById('repoTableBody');
        tableBody.innerHTML = '';
        repos.forEach(repo => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><a href="${repo.html_url}"><bold>${repo.name}</bold></a></td>
            `;
            //<td>${repo.description}</td>
            if (repo.description === null) {
                row.innerHTML += `<td>None</td>`
            } else {
                row.innerHTML += `<td>${repo.description}</td>`
            }
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderRepositories);