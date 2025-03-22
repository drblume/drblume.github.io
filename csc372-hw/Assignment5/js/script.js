const gallery = document.getElementById("gallery");
const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    fetchRepos(username);
  }
});

async function fetchRepos(username) {
  gallery.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=20&sort=updated`);
    const repos = await res.json();

    if (res.status !== 200) {
      throw new Error(repos.message || "Failed to fetch repos.");
    }

    if (repos.length === 0) {
      gallery.innerHTML = `<p>No repositories found for ${username}.</p>`;
      return;
    }

    const repoCards = await Promise.all(
      repos.map(async (repo) => {
        const [commitRes, langRes] = await Promise.all([
          fetch(repo.commits_url.replace("{/sha}", "")),
          fetch(repo.languages_url)
        ]);

        const commits = await commitRes.json();
        const languages = await langRes.json();

        return `
          <div class="repo-card">
            <div class="repo-header">
              <img src="githubIcon.png" alt="GitHub icon" />
              <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            </div>
            <p>${repo.description || "No description provided."}</p>
            <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
            <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            <p><strong>Languages:</strong> ${Object.keys(languages).join(", ") || "None"}</p>
            <p><strong>Commits:</strong> ${Array.isArray(commits) ? commits.length : "N/A"}</p>
          </div>
        `;
      })
    );

    gallery.innerHTML = repoCards.join("");
  } catch (err) {
    gallery.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}
