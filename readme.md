# github-commit-vue

![demo](https://raw.githubusercontent.com/sbuggay/github-commit-vue/master/demo/demo.png)

## Setup

Install dependencies

```
npm install
```

## Usage

```
Usage: main [options]


  Options:

    -V, --version  output the version number
    -u, --user     GitHub Username
    -t, --token    GitHub API Token
    -p, --port     Port
    -h, --help     output usage information
```


These options can also be set through env variables, although the command line arguments take precedence.
- `GITHUB_COMMIT_VUE_USER`
- `GITHUB_COMMIT_VUE_TOKEN`
- `GITHUB_COMMIT_VUE_PORT` (optional, default: 3030)

You can generate a new token here: https://github.com/settings/tokens.

```
npm start
```

