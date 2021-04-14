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

const commit = process.env.GITHUB_SHA;
const repo = process.env.GITHUB_REPOSITORY;

const owner = repo.split("/")[0];
const repoName = repo.split("/")[1];

core.info(owner);
core.info(repoName);

const folderPath = path.join("./", core.getInput("folderPath"));

const files = fs.readdirSync(folderPath)

files.forEach(name => {
    const filePath = path.join(folderPath, name);

    core.info(filePath);
    core.info(fs.readFileSync(filePath));
});
