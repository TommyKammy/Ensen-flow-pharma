# Regulated-Content Artifact Safety

## Purpose

Artifact safety defines what may appear in public Ensen-flow-pharma documentation, validation package assets, validation templates, examples, prompts, tests, and fixtures.

This repository is public validation-ready scaffolding. It may describe customer-confidential and regulated handling boundaries, but public artifacts must use synthetic-only public examples and must not publish raw customer, regulated, secret, or environment-specific content.

## Public Artifact Boundary

Public artifacts may include:

- Synthetic-only public examples that are invented for documentation or validation-template shape.
- Public Ensen-protocol references and public Protocol v0.4.0 Track B vocabulary.
- Draft-only validation package placeholders that name intended fields without real source payloads.
- Generic role names, generic system labels, and placeholder identifiers that cannot identify a customer, patient, batch, regulated record, source tenant, private repository, or live environment.

Public artifacts must not include:

- Raw customer data or customer-owned records.
- Raw regulated records, regulated record payloads, batch records, disposition records, complaint records, deviation records, audit records, electronic signatures, or production evidence.
- Raw credentials, raw secrets, tokens, private keys, passwords, connection strings, API keys, or sample values that resemble reusable credentials.
- Workstation-local absolute paths, user-home paths, private file shares, or host-specific local evidence locations.
- Live connector details, source tenant names, private repository URLs, real ERPNext site details, live environment names, network endpoints, or account identifiers.
- Customer identifiers, patient identifiers, user identifiers, tenant identifiers, batch identifiers, product identifiers, or source object IDs taken from real systems.

If an artifact needs to show shape, use placeholders such as `<customer-id>`, `<regulated-record-id>`, `<erpnext-site>`, `<evidence-reference>`, or `<supervisor-config-path>` instead of real values.

## Confidential References

Customer-confidential or regulated context belongs outside public artifacts unless it has been transformed into a synthetic example. Confidential references may be tracked only in owner-controlled local systems or future approved evidence repositories with explicit authorization, retention, access control, and review boundaries.

The public repository may point to the existence of a confidential reference boundary, but it must not contain the raw confidential reference itself. Do not move customer-confidential, regulated, or secret material into public Markdown, validation templates, examples, prompts, tests, fixtures, issue text, pull request text, screenshots, exported logs, or committed evidence files.

## Protocol v0.4.0 Track B Alignment

Protocol v0.4.0 Track B classification separates `public`, `internal`, `customer-confidential`, and `regulated` contexts. Ensen-flow-pharma uses that classification vocabulary as planning guidance:

- `public` is the only classification allowed for committed public examples in this repository.
- `customer-confidential` and `regulated` examples must be synthetic before publication.
- Missing, unclear, or unknown classification must fail closed instead of being inferred from document names, path shape, issue text, or nearby notes.
- Approval, draft-only, and evidence vocabulary does not turn this repository into a production GxP system, compliance guarantee, or approved evidence store.

## Fail-Closed Workflow Boundary

Before publishing or committing an artifact, reviewers and future automation must reject the artifact or route it for private remediation when it contains, appears to contain, or cannot prove the absence of unsafe regulated-content categories.

Unsafe categories fail closed:

| Category | Public artifact handling |
| --- | --- |
| Raw customer data | Do not publish; replace with synthetic-only public examples. |
| Raw regulated records | Do not publish; keep outside the public repository and use placeholders. |
| Raw credentials or raw secrets | Do not publish; rotate if exposure is possible and remove from artifacts. |
| Workstation-local absolute paths | Do not publish; replace with repo-relative commands or placeholders. |
| Live connector details | Do not publish; describe connector shape without real tenant, endpoint, or account details. |
| Customer identifiers | Do not publish; replace with synthetic labels or placeholders. |
| Missing or unknown classification | Do not publish; classify through the authoritative boundary first. |

This fail-closed guidance applies to README updates, validation package documents, validation templates, examples, prompts, tests, fixtures, generated outputs, exported logs, review attachments, and any future artifact proposed for publication.

## Validation Package and Template Guidance

Validation package and validation templates assets should show field structure, review expectations, and placeholder evidence references without embedding raw source content. Use synthetic examples for package shape and reserve confidential references for owner-controlled systems outside this public repository.

Validation authors should document where a confidential reference would be controlled, who owns review, and which approval or evidence boundary would apply. They must not include the actual confidential reference, regulated record, secret, live connector detail, or customer identifier in the public artifact.
