# Training Task Routing Workflow

## Purpose

This PHARMA-P2-002 training task routing workflow is a Phase 2 draft for planning how training-oriented review suggestions could be routed from safe sample context. It uses synthetic examples or copied sample context only and prepares validation-ready notes without creating a training assignment, training completion record, customer SOP execution record, or validation execution evidence.

This workflow is documentation-only. It is not training assignment, not training completion, not customer SOP execution, not validation execution, not production approval, not live ERPNext operation, and not evidence that any workflow package is approved for regulated use.

## Intended Use Boundary

The workflow supports draft routing review for training-oriented planning only:

- Inputs are synthetic examples or copied sample context that can be reviewed publicly without raw regulated records, customer data, training records, learner identifiers, credentials, secrets, live connector details, LMS details, or workstation-local absolute paths.
- Inputs are read-only planning/reference material. They must not be synchronized, mutated, written back, treated as current authoritative source material, or treated as proof that a learner, role, SOP, or training plan is in scope.
- Outputs are draft-only routing suggestions, review notes, unresolved questions, validation-package mapping notes, evidence placeholders, audit placeholders, and rollback notes.
- A human approval checkpoint outside this repository is required before any downstream training use, SOP use, validation package adoption, regulated use, release decision, disposition decision, quality action, or customer-facing claim.

The workflow has no LMS integration, no write-back credentials, no electronic signature behavior, no batch release, no final disposition, no automated quality decision, and no GxP compliance readiness claim.

## Source Context

Allowed source context is intentionally narrow:

| Field | Draft handling |
| --- | --- |
| Source provenance | Record a synthetic source label or copied sample context boundary, such as `<sample-training-context-export>`. Do not infer tenant, repository, customer, account, learner, role, SOP, training plan, issue, batch, document, or environment linkage from file names, nearby notes, comments, or issue text. |
| Data classification | Classify every input as `public`, `internal`, `customer-confidential`, or `regulated` before use. Public repository examples must be synthetic even when they describe customer-confidential, regulated, or training-oriented handling. Missing or unknown classification fails closed. |
| Confidential-reference posture | Use only placeholders such as `<owner-controlled-confidential-reference>`. The public draft must not include the raw confidential reference, learner identifier, training record, source identifier, live endpoint, LMS detail, or private evidence location. |
| Scope binding | Bind routing suggestions to the explicit sample boundary and intended workflow package. Do not generalize a routing note from one sample to another learner, role, SOP, site, customer, or validation package without an authoritative link. |

Placeholder credentials, sample secrets, unsigned tokens, TODO values, forwarded headers, host hints, client-supplied identity, naming conventions, and path shape are not valid prerequisites. If any prerequisite signal is missing, malformed, or only partially trusted, the routing review stops and records the gap instead of proceeding.

## Workflow Steps

1. Intake a synthetic example or copied sample context reference and confirm source provenance, data classification, and confidential-reference posture.
2. Confirm the source is read-only planning/reference material and that no live ERPNext connector, endpoint, credential, LMS endpoint, write-back route, learner update, training record mutation, or customer-system mutation is in scope.
3. Review the sample context for possible training-oriented routing cues, such as role label, SOP topic, prerequisite topic, unresolved owner question, or validation-package mapping candidate.
4. Create draft-only routing suggestions with rationale, unresolved gaps, approval prerequisites, evidence placeholders, audit placeholders, and residual-risk notes.
5. Route the draft-only routing suggestions to a human approval checkpoint before any downstream training, SOP, validation, regulated, customer-facing, or owner-controlled use.
6. If the suggestion is rejected, revoked, superseded, or found unsafe, withdraw the draft output and record rollback notes.

The workflow does not assign training, complete training, update learner status, execute a customer SOP, make automatic quality decisions, approve change control, release a batch, assign final disposition, or execute validation.

## Draft Output Package

Each output remains visibly draft-only and should contain:

- Routing identifier: `<training-routing-draft-id>`.
- Source provenance and explicit classification.
- Input boundary statement confirming read-only planning/reference material.
- Confidential-reference placeholder, if one exists.
- Draft-only routing suggestions and their sample-bound rationale.
- Human approval checkpoint required before downstream use.
- Rejection / revocation state: `draft`, `approval-required`, `rejected`, `revoked`, or `superseded`.
- Evidence / audit separation notes.
- Rollback notes for withdrawing unsafe, outdated, or incorrectly scoped draft guidance.

Draft outputs must not include raw regulated records, customer identifiers, learner identifiers, training record identifiers, patient identifiers, batch identifiers, product identifiers, source object IDs, raw credentials, raw secrets, live connector details, LMS details, production evidence, or workstation-local absolute paths.

## Evidence / Audit Separation

Evidence and audit concepts are planning fields only:

- Evidence placeholders describe what a future owner-controlled evidence repository would need to retain for a reviewed routing suggestion.
- Audit placeholders describe the draft artifact, reviewer, source classification, unresolved gaps, approval state, rejection / revocation state, and rollback state.
- Draft routing notes are not approved evidence, a source regulated record, a training record, a learner record, a production audit log, or a validated system record.
- Any future export, restore, or readiness rollup must use a snapshot-consistent owner-controlled process; this draft must not stitch together mixed-state records or treat a partial write as durable truth.

Flow Phase 6 is referenced only as a pattern for public-safe evidence, audit vocabulary, recovery, rollback, revocation, and re-run notes. It does not create a shared runtime dependency, deployment dependency, authorization assumption, evidence-store dependency, live adapter behavior, LMS integration, or production GxP execution claim.

## Validation Package Alignment

This workflow maps to the Phase 1 validation package skeleton as draft planning material:

| Validation package surface | Training-routing mapping |
| --- | --- |
| Validation plan | Scope, roles, entry criteria, exit criteria, evidence placeholders, audit placeholders, and approval route remain open until qualified owners review them. |
| User requirements specification | Requirements may describe read-only source review, draft-only routing suggestions, explicit classification, human approval checkpoints, and rejection / revocation handling. |
| Functional specification | Design placeholders may describe intake, routing suggestion assembly, gap capture, evidence placeholder creation, audit placeholder creation, rollback, and revocation. |
| Risk assessment | Risks should cover missing provenance, inferred classification, confidential-reference leakage, training-record leakage, draft misuse, mixed-state evidence, and unsupported downstream use. |
| Traceability matrix | Link intended requirements to routing steps, risk controls, and IQ/OQ/PQ-style placeholders without claiming execution. |

The Track B validation delta remains the primary placeholder surface for source provenance, data classification, confidential reference, draft status, human approval, evidence retention, rollback / revocation, and residual risk planning.

## Future Owner-Controlled Review

A future owner-controlled process could review training-oriented routing suggestions by checking the draft identifier, source provenance, classification, explicit scope binding, unresolved gaps, approval prerequisites, evidence placeholders, audit placeholders, rejection / revocation state, and residual risks.

That future process must not treat this public draft as training assignment, training completion, customer SOP execution, validation execution, LMS integration, production approval, or a compliance guarantee. Any approved use must come from a separate authoritative process with qualified owners, controlled records, intended-use-specific validation planning, and documented approval.

## Rejection, Revocation, And Rollback

Reject or revoke the draft workflow output when:

- Source provenance, classification, scope, approval path, or confidential-reference posture is missing or inferred.
- The input contains or appears to contain raw regulated content, customer data, training records, learner identifiers, credentials, secrets, live connector details, LMS details, or workstation-local absolute paths.
- A reviewer asks for live ERPNext execution, LMS integration, write-back, electronic signatures, batch release, final disposition, automated quality decisions, training completion, customer SOP execution, validation execution, production approval, or compliance guarantees.
- The draft artifact is outdated, superseded, or attached to the wrong intended workflow package.

Rollback notes must identify the draft artifact, withdrawal reason, replacement path, and any validation-package placeholders that must be re-reviewed. Rejection or revocation does not delete the need for human review; it preserves the guardrail until the prerequisite is repaired through an owner-controlled process.

## Manual Review Checklist

- All examples are synthetic examples or copied sample context only.
- Inputs are marked read-only planning/reference material.
- Outputs are marked draft-only routing suggestions.
- Human approval checkpoint is explicit before downstream use.
- Source provenance, data classification, confidential-reference posture, rejection / revocation, evidence / audit separation, and rollback notes are present.
- The draft does not claim training assignment, training completion, customer SOP execution, validation execution, production approval, live ERPNext operation, LMS integration, write-back, electronic signature behavior, batch release, final disposition, automated quality decision, or GxP compliance readiness.
