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
- The [first pilot intended use and GxP boundary](docs/intended-use.md) document defines the supported scaffolding, customer-confidential and regulated input planning boundary, and out-of-scope regulated operations.
- The [Protocol v0.4.0 Track B boundary](docs/protocol-v0.4.0-track-b-boundary.md) document records the adopted Ensen-protocol snapshot and the pharma-side validation-ready interpretation of customer / regulated evidence vocabulary.
- The [regulated-content artifact safety](docs/artifact-safety.md) guidance defines synthetic-only public examples, confidential-reference boundaries, and fail-closed handling for unsafe public artifacts.
- The [regulated workflow controls](docs/regulated-workflow-controls.md) document defines read-only input controls, draft-only output controls, human approval checkpoints, and non-goals for automatic quality decisions or regulated write-back.
- The [customer-readiness checklist](docs/customer-readiness-checklist.md) helps operators decide whether future customer or regulated pilot discussions are safe without claiming validation execution, production approval, or compliance readiness.
- The [Phase 2 dry-run regulated workflow draft tracker](docs/phase-2-dry-run-regulated-workflow-tracker.md) fixes the PHARMA-P2-000 child issue sequence, fake / read-only / draft-only boundary, Flow Phase 6 input guidance, and RG-2 readiness definition.
- The [low-risk document review workflow](docs/document-review-workflow.md) draft defines the PHARMA-P2-010 synthetic / copied sample context workflow, read-only input posture, draft-only output posture, human approval checkpoint, rejection / revocation handling, and validation-package mapping notes.
- The [ERPNext object mapping draft](docs/erpnext-object-mapping.md) identifies candidate source objects, Ensen-flow-pharma concepts, data classification notes, future usage, and evidence/audit implications.
- The [validation package skeleton](docs/validation-package/README.md) provides draft-only placeholders for validation planning, requirements, risk, traceability, and IQ/OQ/PQ-style evidence planning.
- The [Track B validation delta](docs/validation-package/track-b-validation-delta.md) adds draft-only placeholders for customer-confidential and regulated input boundary planning.
- `docs/validation-templates/` is reserved for future validation-ready templates and examples.
