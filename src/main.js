const expres = require("express");
const octokat = require("octokat");
const moment = require("moment");

const app = express();

const user = "";
const email = "";

const github = octokat({ token: "" });

function getCommits() {
    return github.fromUrl(`https://api.github.com/users/${user}/events`).fetch().then(events => {
        const commits = [];
        events.items.forEach(event => {
            if (event.type === "PushEvent") {
                event.payload.commits.reverse().forEach(commit => {
                    if (commit.author.email === email) {
                        commits.push({
                            repo: event.repo,
                            createdAt: moment(event.createdAt).format("MMMM Do YYYY, hh:mm:ss"),
                            ...commit
                        });
                    }
                });
            };
        });
        return commits;
    });
}

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static("./public"));

app.get("/api", (req, res) => {
    getCommits().then(commits => {
        res.send(commits);
    });
});

app.listen(3030, () => console.log(`app started`));