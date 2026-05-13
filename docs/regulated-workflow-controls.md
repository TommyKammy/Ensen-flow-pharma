# Regulated Workflow Controls

## Purpose

This document defines the read-only input controls and draft-only output controls for Ensen-flow-pharma Track B planning. It keeps future workflow package authors, validation package authors, and reviewers aligned on the current repository boundary: documentation and validation-ready scaffolding only.

These controls do not implement runtime regulated workflow execution, live ERPNext integration, or an approval engine. They describe what future packages must preserve before any owner-controlled validated process can use generated material.

## Read-Only Input Controls

Input context in this repository is read-only planning context. Public artifacts may describe or reference only these input shapes:

| Input shape | Control |
| --- | --- |
| Copied context | Treat copied source context as a static planning reference. Do not mutate, synchronize, or write back to the source system. |
| Exported context | Treat exported source context as a detached snapshot. Do not claim the export is current, complete, validated, or authoritative for regulated use. |
| Fake context | Use synthetic fake examples for public documentation, tests, prompts, fixtures, and templates. Do not mix fake examples with customer-confidential or regulated records. |
| Reference-only context | Use references to describe intended linkage or evidence shape. Do not treat a reference as approval, source truth, release authorization, or a regulated record. |

Missing provenance, unclear classification, untrusted identity, placeholder credentials, TODO values, unsigned tokens, copied host hints, or inferred tenant, repository, batch, account, issue, or environment linkage must fail closed. The repository must not infer regulated readiness from document names, path shape, nearby notes, GitHub issue text, or validation-template presence.

Read-only input controls prohibit live write-back, live connector operation, direct ERPNext mutation, source-record updates, customer-system updates, and any automated external application of generated material.

## Draft-Only Output Controls

Generated or assembled output remains draft-only until a separate qualified process reviews and approves it outside this public scaffold. Draft-only output controls apply to:

- Workflow package assets.
- Validation package deltas.
- Validation plan, URS, FS, risk, traceability, IQ, OQ, and PQ placeholders.
- Evidence and audit planning notes.
- Review checklists, prompts, examples, and templates.

Draft artifacts must stay visibly separate from committed, applied, approved, released, or dispositioned records. A draft may name intended evidence fields, approval routes, and source assumptions, but it must not present itself as validated evidence, an approved quality record, a completed batch release, a final disposition, or a production GxP workflow.

## Human Approval Checkpoints

Human approval checkpoints are mandatory and separate from generated draft artifacts. A qualified human approval checkpoint is required before:

- Regulated use.
- Release decision.
- Disposition decision.
- Quality action.
- External application of a workflow package asset.
- Acceptance of validation package deltas into a controlled validation package.

The human approval checkpoint must be recorded by the authoritative owner-controlled process. Approval must not be inferred from generated text, notification delivery, issue state, pull request state, file presence, template completion, copied comments, or convenience summaries.

## Non-Goals

These behaviors are explicitly out of scope for this repository:

- Automatic quality decisions.
- Automatic release.
- Automatic disposition.
- Batch release approval.
- Final disposition approval.
- Live write-back to ERPNext or any other source system.
- Electronic signatures.
- Runtime regulated workflow execution.
- Part 11, Annex 11, GxP validation, or compliance guarantees.

Future implementation work must preserve this boundary unless a later issue adds a validated, owner-controlled runtime design with explicit authorization, provenance, retention, human review, evidence, audit, and validation controls.
