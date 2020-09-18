import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function fetchGif(): Promise<string> {
  try {
    let gif = ''

    const giphyToken = core.getInput('GIPHY_TOKEN')

    if (giphyToken) {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyToken}&tag=welcome`)
      gif = `![welcome_gif](${response.data.data.image_url})`;
    }

    return gif;
  } catch(e) {
    core.setFailed(e.message);
    return '';
  }
}

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('GITHUB_TOKEN');

    const context = github.context;

    if (context.payload.pull_request == null && context.payload.issue == null) {
      core.setFailed('No pull request found.');
      return;
    }

    const gif = await fetchGif();

    const requestNumber = context.payload.pull_request?.number || context.payload.issue?.number;

    const octokit = github.getOctokit(githubToken);

    const response = await octokit.issues.createComment({
      ...context.repo,
      issue_number: requestNumber!,
      body: gif
    });

    core.setOutput('gif_url', response.data.html_url);
  } catch(e) {
    core.setFailed(e.message);
  }
}

run();
