# 🛠️ Contribution Guide

Welcome to the project — we're thrilled to have you here! Whether you're a first-time contributor or a seasoned developer, this guide will help you contribute effectively and ensure consistency across the codebase.

---

## 🌟 Code of Conduct

To create a welcoming and respectful environment, all contributors are expected to follow our community guidelines:

- **Respect**: Treat others with dignity and kindness. Provide constructive, helpful feedback.
- **Inclusivity**: Contributions are welcome from everyone, regardless of background or experience.
- **Professionalism**: Keep discussions focused on improving the project.
- **Collaboration**: Be open to ideas, reviews, and working together as a team.
- **Positivity**: Approach issues with a solution-oriented mindset — we're all here to learn and grow.

---

## ✨ How to Get Started

We appreciate all kinds of contributions — bug fixes, new features, documentation, tests, or ideas. Here's how to get involved:

### 🐞 1. Find or Open an Issue

Before forking the repository:

- **Browse existing issues** to find something to work on.
- **Comment** on the issue to signal that you're interested.
- If the issue doesn't exist yet, **open a new one** and describe the problem or suggestion clearly.
- Wait for **feedback or approval** from maintainers.

### 🚀 2. Fork and Clone the Project

Once your issue is acknowledged:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
git checkout -b feat/your-feature-name
```

We follow **Trunk-Based Development (TBD)**, so all branches are created from `main`.

### ✏️ 3. Make Your Changes

- Keep your changes focused and atomic.
- Follow naming conventions: `feat/...`, `fix/...`, `docs/...`.
- Add unit or integration tests where needed.
- Run linter and tests before pushing:

```bash
npm run lint
npm run test
```

---

## 📦 Submitting a Pull Request (PR)

1. Rebase your branch with the latest `main`:

```bash
git checkout main
git pull origin main
git checkout feat/your-feature-name
git rebase main
```

2. Push your branch and open a PR to merge into `main`.
3. Use a descriptive title and fill out the PR template.
4. Reference any issue with `Closes #issue-number`.

---

## 🔍 Reviewing and Merging PRs

### 🔎 Code Review

- Check code clarity, correctness, and test coverage.
- Test the changes locally if applicable.
- Provide respectful and constructive feedback.

### ✅ Merge Guidelines

- Use **Squash and Merge** for clean commit history.
- Ensure all CI/CD checks pass.

---

## 📋 Pull Request Checklist

- [ ] Issue linked using `Closes #...`
- [ ] Code tested locally and CI passes
- [ ] Documentation updated if needed
- [ ] Conventional commit messages used
- [ ] Branch rebased with `main`
- [ ] Reviewed and approved by a contributor
- [ ] No sensitive information (e.g., secrets) included

---

## 🔄 Development Workflow Summary

| Task Type        | Branch From | Merge Into | Naming Example           |
|------------------|-------------|------------|---------------------------|
| Feature          | `main`      | `main`     | `feat/user-auth`         |
| Bug Fix          | `main`      | `main`     | `fix/login-error`        |
| Documentation    | `main`      | `main`     | `docs/setup-update`      |
| Hotfix           | `main`      | `main`     | `fix/critical-typo`      |

---

## 👨‍💻 Need Help?

Open an issue or use the Discussions tab. We're happy to support new contributors!

Thanks again for your time and effort — you make this project better! 

Happy coding! 🚀

