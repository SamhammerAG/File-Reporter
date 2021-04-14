const path = require("path");
const fs = require("fs");
const github = require('@actions/github');
const core = require("@actions/core");

/* github.getOctokit("").repos.createCommitComment({
    owner: "",
    repo: "",
    commit_sha: "",
    body: ""
});*/

const repo = process.env.GITHUB_REPOSITORY;
const commit = process.env.GITHUB_SHA;

core.info(repo);
core.info(commit);

const folderPath = path.join("./", core.getInput("folderPath"));

const files = fs.readdirSync(folderPath)

files.forEach(name => {
    const path = path.join(folderPath, name);

    core.info(path);
    core.info(fs.readFileSync(path));
});
