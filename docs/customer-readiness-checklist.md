# Customer-Readiness Checklist

## Purpose

This customer-readiness checklist helps operators decide whether a future customer or regulated pilot is safe to discuss from the current Ensen-flow-pharma Track B scaffold.

It is readiness discussion only. It is not validation execution, not production approval, not customer SOP approval, and not a compliance guarantee. It does not make this repository, a workflow package, a validation template, or a future ERPNext integration ready for regulated production use.

Runtime access-control changes and sensitive access material handling are out of scope. This checklist adds no connector behavior, no credential handling, no live ERPNext access, no write-back behavior, and no real customer examples.

## Positive Readiness Checks

Use this checklist before discussing a future customer or regulated pilot. Every item must be true before the pilot can be described as ready for discussion:

| Area | Readiness check |
| --- | --- |
| Intended use | The pilot has a documented intended use that stays within planning, authoring, review, and validation-ready scaffolding. |
| Synthetic public examples | Public examples, fixtures, prompts, and validation-template content are synthetic public examples only. |
| Classification | Every referenced input, example, and evidence placeholder has an explicit classification: public, internal, customer-confidential, or regulated. |
| Confidential references | Customer-confidential or regulated context is represented only through placeholders or owner-controlled confidential references outside the public repository. |
| Read-only inputs | Source context is copied, exported, fake, or reference-only and cannot mutate a source system. |
| Draft-only outputs | Generated workflow package assets, validation deltas, review notes, and evidence plans remain draft-only outputs. |
| Human approval | A qualified human approval path is documented outside this repository before any regulated use, release decision, disposition decision, quality action, or external application. |
| Rollback / revocation | The future owner-controlled process can withdraw, supersede, or revoke a draft, approval, or evidence reference when scope, provenance, classification, or approval changes. |
| Evidence retention | Evidence retention is described as a future owner-controlled boundary, not as storage or approval provided by this public scaffold. |
| Residual risks | Residual risks remain visible, unresolved items have owners, and the discussion does not imply that open risk has been accepted. |

## Fail-Closed Readiness Rule

If provenance, classification, confidential-reference handling, human review path, or data boundary is missing, unclear, inferred, or only partially trusted, the pilot is not ready.

Do not infer readiness from document names, path shape, issue text, pull request state, file presence, template completion, convenience summaries, or nearby metadata. Repair the missing prerequisite in the owner-controlled process before continuing the customer-readiness discussion.

## Stop Conditions

Stop the readiness discussion and route the material for private remediation or a later scoped issue if any item below appears, is requested, or cannot be ruled out:

- Raw regulated content.
- Raw customer data, customer identifiers, source object IDs, patient identifiers, batch identifiers, complaint records, deviation records, audit records, or production evidence.
- Sensitive access material, including credentials, secrets, tokens, private keys, passwords, connection strings, API keys, or reusable sample values.
- Live ERPNext details, source tenant names, live environment names, network endpoints, account identifiers, or connector configuration.
- Write-back requests, source-system updates, customer-system updates, live synchronization, or external application of generated material.
- Electronic signature requests or any request to treat this repository as an electronic signature implementation.
- Batch release.
- Final disposition.
- Automated quality decisions, automatic release, automatic disposition, or automated quality actions.
- Requests to treat the scaffold as validation execution, production approval, customer SOP approval, training completion, change control completion, or a compliance guarantee.

## Discussion Boundary

Allowed readiness discussion can cover the intended use, synthetic public example shape, explicit classification, confidential-reference boundary, read-only input posture, draft-only output posture, human approval path, rollback / revocation planning, evidence retention planning, and residual risks.

The discussion must stay separate from validation execution, customer SOP approval, production use, runtime access-control changes, sensitive access material handling, live connector setup, or compliance guarantee claims.
