# github-commit-vue

[![npm version](https://badge.fury.io/js/github-commit-vue.svg)](https://badge.fury.io/js/github-commit-vue)

![demo](https://raw.githubusercontent.com/sbuggay/github-commit-vue/master/demo/demo.png)

github-commit-vue is a simple single page app that will show you your latest commits. This can probably easily be changed to track certain project/organization commits instead which would be far more interesting for a team dashboard or something.

You can acquire this through:
```
npm install -g github-commit-vue
```

Run it with simply:
```
github-commit-vue [options]
```
## Usage

```
Usage: main [options]


  Options:

    -V, --version  output the version number
    -u, --user     GitHub Username
    -t, --token    GitHub API Token (https://github.com/settings/tokens)
    -p, --port     Port (optional, default: 3030)
    -h, --help     output usage information
```

You must provide your GitHub username `-u` and a GitHub access token `-t`. You can generate a new token here: https://github.com/settings/tokens. Make sure they have repo and user permissions.

These options can also be set through env variables, although the command line arguments take precedence.
- `GITHUB_COMMIT_VUE_USER`
- `GITHUB_COMMIT_VUE_TOKEN`
- `GITHUB_COMMIT_VUE_PORT` (optional, default: 3030)

## Contributing

Clone the repo.

Install dependencies
```
npm install
```

Start the app
```
npm start
```

