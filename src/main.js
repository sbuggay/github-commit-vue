const express = require("express");
const octokat = require("octokat");
const moment = require("moment");
const commander = require("commander");

const packageJson = require("../package.json");

const app = express();

// Parse command line arguments
commander
    .version(packageJson.version)
    .option("-u, --user [user]", "GitHub Username")
    .option("-t, --token [token]", "GitHub API Token (https://github.com/settings/tokens)")
    .option("-p, --port [port]", "Port (optional, default: 3030)")
    .parse(process.argv);

// Optionally try to grab them from env vars
const envOptions = {
    user: commander.user || process.env.GITHUB_COMMIT_VUE_USER || "",
    token: commander.token || process.env.GITHUB_COMMIT_VUE_TOKEN || "",
    port: commander.port || process.env.GITHUB_COMMIT_VUE_PORT || 3030
}

let github;

/**
 * Utility function to convert api urls to real urls
 * 
 * @param {any} apiUrl 
 * @returns 
 */
function apiToUrl(apiUrl) {
    return apiUrl.replace("api.", "").replace("repos/", "");
}

/**
 * Utility function to get github events from octokat
 * 
 * @returns list of commits
 */
function getCommits() {
    return github.fromUrl(`https://api.github.com/users/${envOptions.user}/events`).fetch()
        .then(events => events.items
            .filter(event => event.type === "PushEvent")
            .map(event => {
                return event.payload.commits.reverse()
                    .map((commit, index, array) => ({
                        link: array.length === 1 ? 0 : index === 0 ? 1 : index === (array.length - 1) ? 3 : 2,
                        repo: event.repo,
                        createdAt: moment(event.createdAt).format("MMMM Do YYYY, hh:mm:ss A"),
                        commitUrl: apiToUrl(commit.url).replace("commits", "commit"),
                        repoUrl: apiToUrl(event.repo.url),
                        ref: event.payload.ref,
                        ...commit,
                    }));
            }).reduce((list, commits) => list.concat(commits), []).slice(0, 20));
}

// Static route
app.use(express.static("./public"));

// Commit API endpoint
app.get("/api", (req, res) => {
    getCommits().then(commits => {
        res.send(commits);
    });
});

if (envOptions.user && envOptions.token) {
    // Start listening
    github = octokat({
        token: envOptions.token
    });
    app.listen(envOptions.port, () => console.log(`${packageJson.name} listening on port ${envOptions.port}`));
} else {
    console.error("You must set GITHUB_COMMIT_VUE_USER or -u and GITHUB_COMMIT_VUE_TOKEN or -t options.")
}