# Phase 2 Dry-Run Regulated Workflow Draft Tracker

This tracker records Phase 2 for Ensen-flow-pharma. PHARMA-P2-000 is a documentation-first parent for dry-run regulated workflow draft planning only. It prepares a reviewable child issue sequence before any low-risk Pharma/GxP workflow draft is added.

Phase 2 is validation-ready scaffolding only. It is not validation execution, not production approval, not a compliance guarantee, not live ERPNext execution, and not evidence that any workflow package is approved for regulated use.

## Boundary

All Phase 2 work must stay inside a fake / read-only / draft-only boundary:

- Allowed inputs are synthetic examples or copied sample context that can be reviewed publicly without raw regulated records, customer identifiers, raw secrets, live connector details, or workstation-local absolute paths.
- Allowed outputs are dry-run regulated workflow draft artifacts, review notes, validation package deltas, and readiness checklists that remain visibly draft-only.
- Human review remains required before any regulated use, validation package execution, release decision, disposition decision, or quality action.
- Missing provenance, unclear scope, placeholder credentials, unauthenticated identity, or unapproved boundary signals must fail closed instead of being treated as sufficient context.

Phase 2 excludes live ERPNext endpoints, live ERPNext connectors, write-back credentials, electronic signatures, batch release, final disposition, automated quality decisions, production approval, validated system claims, Part 11 or Annex 11 assurance, and compliance guarantee language.

## Planned Child Issue Sequence

The Phase 2 child issues should be opened and executed in this order after this parent tracker is accepted:

| Order | Planned child issue | Purpose | Exit boundary |
| --- | --- | --- | --- |
| 1 | PHARMA-P2-010 document review | Review the existing intended use, artifact safety, regulated workflow controls, ERPNext mapping, and validation package scaffold for Phase 2 fit. | Gaps are captured as draft-only follow-ups, with no validation execution claim. |
| 2 | PHARMA-P2-020 training task routing | Draft how synthetic or copied sample context would route into training-oriented task review. | Routing remains fake / read-only / draft-only and does not route live records or credentials. |
| 3 | PHARMA-P2-030 quality follow-up | Draft quality follow-up prompts, owner checkpoints, and escalation notes for dry-run review. | Follow-up does not make automatic quality decisions, release decisions, or disposition decisions. |
| 4 | PHARMA-P2-040 validation evidence mapping | Map dry-run draft artifacts to validation package evidence placeholders and audit expectations. | Mapping stays planning guidance and does not create approved evidence or a validated workflow. |
| 5 | PHARMA-P2-050 RG-2 readiness | Decide whether the draft set is ready for dry-run regulated workflow draft evaluation. | RG-2 readiness is not validation execution, production approval, or a compliance guarantee. |

Child issues should reference this tracker as the parent boundary. They should not infer tenant, customer, repository, ERPNext object, validation package, or environment linkage from naming conventions, path shape, or nearby metadata alone.

## Flow Phase 6 Input Guidance

Flow Phase 6 and X-Gate 5 provide input guidance for the shape of audit, evidence export, recovery, rollback, and revocation discussions. Pharma Phase 2 should borrow those concepts only as review vocabulary:

- Audit: name the draft artifact, source classification, reviewer, and unresolved gaps without treating draft text as an authoritative regulated record.
- Evidence export: describe what a future export would need to include, while keeping current artifacts as sample-only planning material.
- Recovery: document how a dry-run draft would be re-created or superseded when source context changes.
- Rollback: record how a draft recommendation or mapping would be withdrawn before any regulated use.
- Revocation: require visible retirement of unsafe or outdated draft guidance.

This repository has no shared runtime dependency on Ensen Flow internals for Phase 2. Flow Phase 6 / X-Gate 5 informs Pharma Phase 2 wording and review shape only; it does not make Pharma depend on Flow runtime code, live adapters, authorization state, evidence stores, or deployment behavior.

## RG-2 Readiness Definition

RG-2 means readiness for dry-run regulated workflow draft evaluation. It asks whether the Phase 2 draft set is coherent enough for review against the fake / read-only / draft-only boundary.

RG-2 does not mean validation execution, production approval, release approval, final disposition approval, automated quality decision approval, live ERPNext readiness, electronic signature readiness, or GxP compliance readiness. Any RG-2 note must preserve open risks, unresolved assumptions, and follow-up requirements instead of converting draft scaffolding into approved regulated evidence.
