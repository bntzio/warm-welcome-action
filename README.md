<p style="font-size:77px;text-align:center;">🤗</p>
<h1 align="center">warm welcome action</h1>
<p align="center">GitHub Action to give a warm welcome on PRs 💖</p>

![GitHub release (latest by date)](https://img.shields.io/github/v/release/bntzio/warm-welcome-action?style=flat-square)

### About

`warm-welcome-action` is a very simple GitHub Action I made to learn the basics of how actions work ⚙️ and for the [dev.to actions hackathon](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn) 🎉

What this action does is every time a user submits a new pull request on a repository with this action installed, it will post a warm welcome gif to make the person who made the PR well, welcome.

### How to use

Create a `.github/workflows/action.yml` file in the repository you want to install this action, then add the following to it:

```yml
name: "Warm Welcome"
on:
  pull_request:
  issues:
    types: [opened]
  push:
    branches:
      - master
jobs:
  test:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2.0.0
    - name: grab and post gif and message
      id: warm_welcome
      uses: bntzio/warm-welcome-action@latest
      with: 
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        GIPHY_TOKEN: ${{ secrets.GIPHY_TOKEN }}
```

That's all! 🙂 now every time someone opens a new pull request on your repository this action will trigger and it'll publish a warm welcoming GIF! 💖

### Enjoy and welcome! 😄

![welcome_gif](https://media.giphy.com/media/FQyQEYd0KlYQ/giphy.gif)

### License

MIT © [bntz.io](https://bntz.io)
