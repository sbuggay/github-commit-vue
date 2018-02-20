const express = require("express");
const octokat = require("octokat");
const moment = require("moment");

const app = express();

const user = process.env.GITHUB_COMMIT_VUE_USER || "";
const email = process.env.GITHUB_COMMIT_VUE_EMAIL || "";
const token = process.env.GITHUB_COMMIT_VUE_TOKEN || "";
const port = process.env.GITHUB_COMMIT_VUE_PORT || 3030;
const github = octokat({
    token: token
});

// utility function to get github events from octokat
function getCommits() {
    return github.fromUrl(`https://api.github.com/users/${user}/events`).fetch()
        .then(events => events.items
            .filter(event => event.type === "PushEvent")
            .map(event => {
                return event.payload.commits.reverse()
                    .filter(commit => commit.author.email === email)
                    .map((commit, index, array) => ({
                        link: array.length === 1 ? 0 : index === 0 ? 1 : index === (array.length - 1) ? 3 : 2,
                        repo: event.repo,
                        createdAt: moment(event.createdAt).format("MMMM Do YYYY, hh:mm:ss"),
                        ...commit,
                    }));
            }).reduce((list, commits) => list.concat(commits), []));
}

// server static
app.use(express.static("./public"));

// commit api
app.get("/api", (req, res) => {
    getCommits().then(commits => {
        res.send(commits);
    });
});

if (user && email && token) {
    // Start listening
    app.listen(port, () => console.log(`app started`));
} else {
    console.error("You must set GITHUB_COMMIT_VUE_USER, GITHUB_COMMIT_VUE_EMAIL, and GITHUB_COMMIT_VUE_TOKEN env variables.")
}