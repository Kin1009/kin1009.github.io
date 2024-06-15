document.getElementById('fetch-projects-btn').addEventListener('click', async () => {
    const packageName = document.getElementById('package-name').value.trim().toLowerCase();
    const messageElement = document.getElementById('message');
    const projectsTableBody = document.querySelector('#projects-table tbody');

    messageElement.textContent = 'Fetching projects...';

    try {
        // Fetch the repo list from the remote JSON file
        const reposUrl = 'https://kin1009.github.io/files/repos.txt';
        const response = await fetch(reposUrl);
        if (!response.ok) throw new Error('Failed to fetch repository list.');

        const repos = await response.json();

        // Filter and display the projects
        projectsTableBody.innerHTML = '';
        for (const [description, repoUrl] of Object.entries(repos)) {
            if (packageName && !description.toLowerCase().includes(packageName)) {
                continue; // Skip entries not matching the search term
            }
            const row = document.createElement('tr');
            const packageCell = document.createElement('td');
            const authorCell = document.createElement('td');
            const repoParts = repoUrl.split('/');
            const author = repoParts[repoParts.length - 2];

            packageCell.textContent = description;
            authorCell.textContent = author;
            row.appendChild(packageCell);
            row.appendChild(authorCell);
            projectsTableBody.appendChild(row);
        }

        if (projectsTableBody.innerHTML === '') {
            messageElement.textContent = 'No projects found.';
        } else {
            messageElement.textContent = 'Projects fetched successfully.';
        }
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        console.error(error);
    }
});

document.getElementById('download-btn').addEventListener('click', async () => {
    const selectedProject = document.getElementById('selected-project').value.trim();
    const messageElement = document.getElementById('message');
    const downloadLink = document.getElementById('download-link');

    if (!selectedProject) {
        messageElement.textContent = 'Please enter a project name to download.';
        return;
    }

    messageElement.textContent = 'Fetching repository URL...';

    try {
        // Fetch the repo URL from the remote JSON file
        const reposUrl = 'https://kin1009.github.io/files/repos.txt';
        const response = await fetch(reposUrl);
        if (!response.ok) throw new Error('Failed to fetch repository list.');

        const repos = await response.json();
        const repoUrl = repos[selectedProject];

        if (!repoUrl) {
            throw new Error('Description not found in repository list.');
        }

        // Construct the ZIP URL
        const zipUrl = new URL('archive/refs/heads/main.zip', repoUrl).href;
        
        // Download the ZIP file
        messageElement.textContent = 'Downloading repository...';
        const zipResponse = await fetch(zipUrl);
        if (!zipResponse.ok) throw new Error('Failed to download repository.');

        const zipBlob = await zipResponse.blob();

        // Uncompress the ZIP file
        messageElement.textContent = 'Unpacking repository...';
        const zipFile = new JSZip();
        const unzippedContent = await zipFile.loadAsync(zipBlob);

        // Create a new ZIP file
        messageElement.textContent = 'Recompressing repository...';
        const recompressedZip = new JSZip();
        for (const [fileName, fileData] of Object.entries(unzippedContent.files)) {
            if (!fileData.dir) {
                const content = await fileData.async('blob');
                recompressedZip.file(fileName, content);
            }
        }

        // Generate the recompressed ZIP file
        const recompressedBlob = await recompressedZip.generateAsync({ type: 'blob' });

        // Create a download link for the recompressed ZIP file
        const recompressedUrl = URL.createObjectURL(recompressedBlob);
        downloadLink.href = recompressedUrl;
        downloadLink.download = `${selectedProject}_recompressed.zip`;
        downloadLink.style.display = 'block';
        downloadLink.textContent = 'Download Recompressed ZIP';

        messageElement.textContent = 'Repository recompressed successfully!';
    } catch (error) {
        messageElement.textContent = `Error: ${error.message}`;
        console.error(error);
    }
});