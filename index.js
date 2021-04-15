const path = require("path");
const fs = require("fs");
const github = require('@actions/github');
const core = require("@actions/core");

const folderPath = path.join("./", core.getInput("folderPath"));
const files = fs.readdirSync(folderPath)

let body = "";

files.forEach(name => {
    const filePath = path.join(folderPath, name);
    const content = fs.readFileSync(filePath);

    if (content.trim) {
        // Markdown only works with empty line
        body = body + `<details><summary>${name}</summary>\n\n${"```"}${content}${"```"}</details>`;
    }
});

if (body) {
    const rest = github.getOctokit(core.getInput("token"));
    const repo = process.env.GITHUB_REPOSITORY;

    rest.repos.createCommitComment({
        owner: repo.split("/")[0],
        repo: repo.split("/")[1],
        commit_sha: process.env.GITHUB_SHA,
        body: body,
    })
    .then(() => core.info(`${files.length} files reported!`))
    .catch((error => {
        core.error("Reporting failed!");
        core.error(error);
    }));
} else {
    core.info("Nothing to report.");
}
