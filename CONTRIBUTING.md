<!-- omit in toc -->
# Contributing to LNWallet Discord Bot

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's README
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Legal Notice](#legal-notice)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
  - [Before Submitting a Bug Report](#before-submitting-a-bug-report)
  - [How Do I Submit a Good Bug Report?](#how-do-i-submit-a-good-bug-report)
- [Suggesting Enhancements](#suggesting-enhancements)
  - [Before Submitting an Enhancement](#before-submitting-an-enhancement)
  - [How Do I Submit a Good Enhancement Suggestion?](#how-do-i-submit-a-good-enhancement-suggestion)
- [Your First Code Contribution](#your-first-code-contribution)
- [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)

---

## I Have a Question

If you want to ask a question, we assume that you have read the available [Documentation](./docs).

Before you ask a question, it is best to search for existing [Issues](https://github.com/Anthony01M/lightning-wallet-bot/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you still need help:
- Open an [Issue](https://github.com/Anthony01M/lightning-wallet-bot/issues/new).
- Provide as much context as you can about what you're running into.

We will then take care of the issue as soon as possible.

---

## I Want To Contribute

### Legal Notice
When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content, and that the content you contribute may be provided under the project license.

---

## How to Contribute

Thank you for your interest in contributing to this project! Please follow these steps to ensure your contribution is smooth and appreciated:

1. Fork the repository to your own GitHub account.

2. Create a new branch for your work, following the naming convention:  
   `feature/issue-id` or `fix/issue-id`  
   Use the issue number from our GitHub issues tracker if applicable.

3. Commit your changes with clear and descriptive commit messages.  
   Tip: Always link the issue ID in your branch name and commit message when possible.  
   Example:  
```
feat(transactions): add recent history list (#0)
```

4. Open a Pull Request (PR) from your fork to the main repository. Please provide a clear description of your changes and why they are needed.

5. Follow any additional project-specific guidelines described here or in issue discussions.

---

## Reporting Bugs

### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you for more information. Therefore, please follow these steps before submitting:

- Make sure you are using the latest version.
- Verify that the bug is not due to your environment or usage (see the [documentation](./docs)).
- Check existing bug reports in the [bug tracker](https://github.com/Anthony01M/lightning-wallet-bot/issues?q=label%3Abug).
- Search online (including Stack Overflow) for similar issues.
- Collect the following details to include in your report:
- Stack trace or error logs
- Operating system, platform, and version (Windows, Linux, macOS, x86, ARM)
- Versions of interpreter, compiler, SDK, runtime, or package manager
- Input and output relevant to the bug
- Steps to reliably reproduce the issue, including whether it occurs on older versions

### How Do I Submit a Good Bug Report?

Security bugs and vulnerabilities must never be reported publicly via issue tracker. Instead, send them privately to <anthony@sir.systems>. Consider providing a PGP key for encrypted communication.

When reporting a bug publicly:

- Open an [Issue](https://github.com/Anthony01M/lightning-wallet-bot/issues/new).
- Describe the expected behavior and the actual behavior.
- Provide detailed context, including reproduction steps and code snippets if applicable.
- Include the information collected above.

Once submitted:

- The project team will label the issue accordingly.
- A maintainer will try to reproduce the issue. If reproduction steps are missing or unclear, you may be asked to provide them.
- Issues that cannot be reproduced will be marked as `needs-repro` and will remain open until confirmed.
- Confirmed issues will be marked `needs-fix` and prioritized accordingly.

---

## Suggesting Enhancements

This section guides you through submitting enhancement suggestions, including new features and minor improvements.

### Before Submitting an Enhancement

- Use the latest version.
- Check the [documentation](./docs) to see if the feature already exists or can be configured.
- Search existing issues for similar suggestions. Comment on existing issues instead of opening duplicates.
- Consider whether your suggestion fits the project’s goals and benefits a majority of users.
- If your suggestion targets a small subset, consider developing a plugin or add-on instead.

### How Do I Submit a Good Enhancement Suggestion?

Enhancements are tracked as [GitHub issues](https://github.com/Anthony01M/lightning-wallet-bot/issues).

- Use a clear, descriptive title.
- Provide detailed step-by-step descriptions.
- Describe current behavior, expected behavior, and why.
- Include screenshots or recordings if applicable.
- Explain the usefulness and potential impact of the enhancement.

---

## Your First Code Contribution

Welcome! Here’s how to get started with your first code contribution:

1. Set up your development environment:
- Install [Node.js (LTS version)](https://nodejs.org/)
- Clone the repository
- Run `pnpm install` to install dependencies

2. Development tools recommended:
- Use an IDE with TypeScript support (e.g., [Visual Studio Code](https://code.visualstudio.com/))
- Install the [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) extensions for consistent code style

3. Run the bot locally:
- Configure your `.env` file with the required environment variables (see `.env.example` for reference)
- Use `pnpm dev` or equivalent to start the bot in development mode

4. Create a feature branch based on the issue you're addressing (e.g., `feature/0` or `fix/0` — where 0 is the number of an open issue)
   
   Make sure an issue exists before starting work, so we can track it and discuss details beforehand.

5. Make your changes, adhering to the coding style and commit message guidelines

6. Test your changes thoroughly

7. Open a Pull Request referencing the issue

If you need help at any stage, feel free to open an issue or contact the maintainers.

---

## Improving The Documentation

Good documentation makes the project accessible to everyone! You can help by:
- Fixing typos, grammar, or formatting errors
- Adding missing information or clarifying existing content
- Improving examples or tutorials
- Updating outdated sections
- Translating documentation into other languages (check with maintainers first)

To contribute docs:
- Edit Markdown files under the `/docs` directory or relevant locations
- Follow existing style and structure
- Use descriptive commit messages, e.g., `docs(installation): fix typo in setup instructions`

---

## Styleguides

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

Format:
```
<type>(optional-scope): <description>
```
Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style updates (formatting, missing semi-colons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: CI configuration changes
- `chore`: Other changes that don’t modify source or test files
- `revert`: Reverts a previous commit

Examples:
- `feat(profile): add user XP display`
- `fix(withdraw): handle insufficient balance edge case`
- `docs(readme): clarify contribution guidelines`
- `refactor(transactions): clean up transaction parser`
- `chore(deps): update discord.js to v15`

---

## Join The Project Team

Interested in becoming a core contributor or maintainer? Here’s how:
- Regularly contribute high-quality code, documentation, or support
- Participate actively in discussions and issue triaging
- Help review Pull Requests and provide constructive feedback
- Communicate clearly and collaborate respectfully

If you’re interested, reach out via an issue or direct message to discuss next steps.

---

<!-- omit in toc -->
## Attribution

This guide is based on the [contributing.md](https://contributing.md/generator) template and customized for LNWallet Discord Bot.