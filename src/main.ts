import * as express from "express";
import * as octokat from "octokat";
import * as moment from "moment";

const app = express();

const USER = "";
const EMAIL = "";

const github = octokat({ token: "" });

function getCommits() {
    return github.fromUrl(`https://api.github.com/users/${USER}/events`).fetch().then(events => {
        const commits = [];
        // console.log(events);
        events.items.forEach(event => {
            if (event.type === "PushEvent") {
                event.payload.commits.reverse().forEach(commit => {
                    if (commit.author.email === EMAIL) {
                        commits.push({
                            repo: event.repo,
                            createdAt: moment(event.createdAt).format("MMMM Do YYYY, hh:mm:ss"),
                            ...commit
                        });
                    }
                });
            };
        });
        console.log(commits);
        return commits;
    }, failure => {
        console.error(failure);
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