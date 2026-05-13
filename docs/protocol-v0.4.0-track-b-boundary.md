# Protocol v0.4.0 Track B Boundary

## Adopted Snapshot

Ensen-flow-pharma adopts the public Ensen-protocol `v0.4.0` snapshot as the validation-ready reference for the X-Gate 3 Track B customer / regulated evidence boundary.

Source evidence:

- Repository: `TommyKammy/Ensen-protocol`
- Release tag: `v0.4.0`
- Release URL: `https://github.com/TommyKammy/Ensen-protocol/releases/tag/v0.4.0`
- Release commit: `f6c3c5b`
- Boundary: X-Gate 3 Track B customer / regulated evidence boundary

This file is the pharma-side protocol snapshot surface for the current skeleton. It records adopted semantics without vendoring runtime implementation code, adding a live connector, or claiming production GxP execution.

## Classification Semantics

Track B classification required means customer / regulated evidence references must carry an explicit classification before the reference is accepted as Track B evidence. Missing or unknown classification must block, reject, quarantine, or route a follow-up instead of being inferred from document names, paths, issue text, operator notes, or nearby metadata.

The pharma validation-ready boundary recognizes these Protocol `v0.4.0` values:

| Value | Pharma-side interpretation |
| --- | --- |
| `public` | Synthetic examples, documentation, conformance notes, and validation-ready skeleton text that are safe to publish. |
| `internal` | Non-public operator or planning evidence that is not customer-owned and not regulated. |
| `customer-confidential` | Customer-owned, customer-identifying, customer-provided, or customer-system-derived reference material. |
| `regulated` | Evidence or data subject to regulated handling, retention, validation, electronic record, privacy, or domain-specific controls. |

Public examples in this repository must remain synthetic and use `public` semantics. The repository must add no customer records, no regulated record payloads, no raw secrets, no credentials, no workstation-local absolute paths, no private repository details, and no live connector details to public fixtures, examples, prompts, tests, or documentation.

## Approval and Draft-Only Semantics

Protocol `v0.4.0` approval and draft-only evidence semantics are validation-ready vocabulary for future package authors and reviewers. They do not make this repository an approval engine or production regulated workflow.

The pharma boundary recognizes these approval states:

| Value | Pharma-side interpretation |
| --- | --- |
| `approval-required` | A human approval point is required before an action can be committed or externally applied. |
| `approved` | The authoritative workflow boundary has recorded the required human approval. |
| `rejected` | The proposed action or evidence must not be treated as approved or applied. |
| `revoked` | A previously recorded approval was withdrawn by the authoritative workflow boundary. |
| `superseded` | A newer proposal, approval record, or evidence record replaces this one for future handling. |

A draft-only artifact must stay visibly separate from committed or externally applied evidence. It should name the draft-only intent, the not-applied external state, the approval state, and the human approval boundary. Approval must not be inferred from nearby names, issue text, file shape, notification delivery, or validation-template presence.

## Pharma Boundary

This intake preserves the Ensen-flow-pharma repository boundary:

- It is validation-ready scaffolding, not a production GxP execution claim.
- It is not a compliance guarantee.
- It is not Part 11 or Annex 11 assurance.
- It does not add live ERPNext operation, write-back behavior, electronic signatures, batch release, final disposition, automated quality decisions, credential handling, customer data storage, regulated workflow controls, retention storage, or production audit storage.
- It does not certify a regulated workflow, package, template, connector, or evidence repository.

Future work may use this vocabulary to shape validation package placeholders, review checklists, and evidence planning. Any runtime handling of customer-confidential or regulated material still needs an explicit owner-controlled boundary, authorization model, storage and retention design, human review process, and validation evidence outside this skeleton.
