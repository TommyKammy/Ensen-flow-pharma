# Validation Package Skeleton

## Purpose

This directory contains draft-only validation package scaffolding for future Ensen-flow-pharma work. It is a planning aid for validation package authors and reviewers, not a validated workflow and not a compliance guarantee.

The skeleton cross-references the pilot intended use, GxP boundary, ERPNext object mapping draft, artifact safety guidance, and future Ensen evidence and audit concepts without adding runtime behavior.

## Package Index

- [Validation plan](validation-plan.md) for scope, roles, controlled placeholders, and approval gates.
- [User requirements specification](user-requirements-specification.md) for URS placeholders.
- [Functional specification](functional-specification.md) for design placeholders linked to requirements.
- [Risk assessment](risk-assessment.md) for draft risk controls and review notes.
- [Track B validation delta](track-b-validation-delta.md) for customer-confidential and regulated input boundary placeholders, source provenance, classification, confidential references, draft status, human approval, evidence retention, rollback / revocation, and residual risk planning.
- [Traceability matrix](traceability-matrix.md) for URS, FS, risk, IQ, OQ, and PQ linkage planning.
- [Installation qualification](installation-qualification.md) for IQ evidence planning.
- [Operational qualification](operational-qualification.md) for OQ evidence planning.
- [Performance qualification](performance-qualification.md) for PQ evidence planning.
- [Regulated-content artifact safety](../artifact-safety.md) for synthetic-only public examples and confidential-reference boundaries.
- [Regulated workflow controls](../regulated-workflow-controls.md) for read-only input controls, draft-only output controls, human approval checkpoints, and non-goals for automatic quality decision behavior.
- [Customer-readiness checklist](../customer-readiness-checklist.md) for documentation-only pilot discussion gates, fail-closed stop conditions, and residual risk review.

## Control Points

- Intended use: planning and authoring support for future validation package assets.
- GxP boundary: no live ERPNext execution, no write-back, and no regulated disposition behavior.
- Read-only source posture: source references are copied or documented examples only.
- Draft-only output posture: every artifact remains open placeholders until a qualified process approves it outside this repository.
- Human approval: regulated use, release decisions, disposition decisions, and quality actions require qualified human approval outside this scaffold.
- Track B validation delta: customer-confidential and regulated input boundary fields remain open placeholders for intended-use-specific validation planning.
- Regulated workflow controls: validation package deltas remain draft-only outputs, source context remains under read-only input controls, and human approval checkpoints must be explicit before any controlled validation package use.
- Automatic quality decision boundary: generated validation package assets must not claim automatic quality decisions, automatic release, automatic disposition, live write-back, or electronic signatures.
- Evidence and audit posture: future evidence and audit fields must distinguish copied source context, reviewer notes, and approval state.
- Artifact safety: public validation package examples must stay synthetic-only public examples; raw customer data, raw regulated records, raw credentials, raw secrets, workstation-local absolute paths, live connector details, and customer identifiers fail closed and stay out of committed public artifacts.

## Open Placeholders

- Validation owner:
- System owner:
- Quality owner:
- Source ERPNext environment:
- Intended workflow package:
- Evidence repository:
- Approval process:
- Revision history:
- Track B validation delta owner:
