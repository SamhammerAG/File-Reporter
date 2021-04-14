const path = require("path");
const fs = require("fs");
const github = require('@actions/github');
const core = require("@actions/core");

const folderPath = path.join("./", core.getInput("folderPath"));
const files = fs.readdirSync(folderPath)

let body;

files.forEach(name => {
    const filePath = path.join(folderPath, name);
    const content = fs.readFileSync(filePath);

    if (content) {
        body = body + `<details><summary>${name}</summary>${content}</details>`;
    }
});

if (body) {
    const repo = process.env.GITHUB_REPOSITORY;

    github.getOctokit(core.getInput("token")).repos.createCommitComment({
        owner: repo.split("/")[0],
        repo: repo.split("/")[1],
        commit_sha: process.env.GITHUB_SHA,
        body: body,
    })
    .then(() => core.info(`${files.length} reported!`))
    .catch((error => {
        core.error("Reporting failed!");
        core.error(error);
    }));
} else {
    core.info("Nothing to report.");
}
