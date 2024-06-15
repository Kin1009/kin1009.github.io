async function fetchAndRenderRepositories() {
    try {
        const response = await fetch("https://kin1009.github.io/files/repos.json");
        const repos = await response.json();
        const tableBody = document.getElementById('repoTableBody');
        tableBody.innerHTML = '';
        repos.forEach(repo => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><a href="${repos[repo]}"><bold>${repo}</bold></a></td>
            `;
            //<td>${repo.description}</td>
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}
document.addEventListener('DOMContentLoaded', fetchAndRenderRepositories);