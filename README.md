# Ensen-flow-pharma

Ensen-flow-pharma provides validation-ready scaffolding for future Pharma/GxP workflow packages and validation assets for Ensen Flow.

This repository is intentionally shallow at this stage. It does not provide live ERPNext integration, regulated workflow execution, electronic signatures, write-back behavior, Part 11 or Annex 11 assurance, batch release, final disposition, or automated quality decisions.

## Local Verification

Run the repo-owned pre-PR verification command before opening or updating a pull request:

```sh
npm run verify:pre-pr
```

CI runs the same command for pull requests and pushes to `main`.

## Current Scaffold

- `.gitignore` keeps local/generated artifacts out of source control without hiding documentation, validation templates, fixtures, or GitHub workflow files.
- `.github/workflows/ci.yml` runs the baseline verification command.
- The [first pilot intended use and GxP boundary](docs/intended-use.md) document defines the supported scaffolding and out-of-scope regulated operations.
- `docs/validation-templates/` is reserved for future validation-ready templates and examples.
