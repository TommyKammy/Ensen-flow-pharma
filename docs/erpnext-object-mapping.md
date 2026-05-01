# ERPNext Object Mapping Draft

## Status and Boundary

This document is a first-pass ERPNext object mapping draft for future Pharma/GxP workflow scaffolding. Every field, workflow, object relationship, and usage note remains draft until validated against a real owner-controlled ERPNext environment in a later phase.

The mapping is documentation only. It does not add a live ERPNext connector, API call, credential path, write-back behavior, regulated workflow operation, electronic signature behavior, batch release, final product disposition, automated quality decision, or compliance guarantee.

## Intended Mapping Use

The future usage for this draft is read-only planning of workflow package structure, evidence placeholders, validation-template coverage, and human review checkpoints. Any future implementation must keep read-only inputs, draft-only outputs, and qualified human approval outside this repository before regulated use.

Data classification values are planning labels for repository documentation. They are not a substitute for a validated data inventory, owner-approved classification, or system-specific risk assessment.

## Object Mapping

| ERPNext source object | Ensen-flow-pharma concept | Data classification | Future usage | Evidence and audit implications |
| --- | --- | --- | --- | --- |
| `Item` | Material or product master reference | Potential GxP master data; may include product, material, and quality-relevant attributes | Draft package scoping, material identity references, and human review prompts | Preserve source object name, owner-controlled identifier, draft snapshot timestamp, and reviewer note fields. Do not infer release or disposition status from the record alone. |
| `Batch` | Batch or lot context | Potential GxP operational data; may be regulated depending on local process ownership | Draft batch-context placeholder for validation examples and evidence grouping | Capture copied batch identifier, source environment label, and provenance note. Missing provenance must block regulated use. |
| `Batch Manufacturing Record` | Manufacturing execution evidence anchor | Potential high-impact GxP execution record | Future read-only evidence index for human review of manufacturing steps | Track document identifier, revision or status visible in the owner system, extraction method, and review status. Do not treat the draft mapping as execution control. |
| `Quality Inspection` | Quality result evidence | Potential GxP quality data | Draft evidence checklist for inspection result availability and human assessment | Preserve source inspection identifier, linked item or batch if explicitly present, result status as copied context, and reviewer disposition notes. No automated quality decisions. |
| `Material Request` | Supply or movement intent | Business operational data with possible GxP relevance when tied to controlled materials | Draft dependency context for workflow package examples | Record source identifier and explicit linkage to material or batch only when present in the owner-controlled source. Do not infer GxP impact from naming alone. |
| `Purchase Receipt` | Supplier receipt evidence | Potential GxP receipt or chain-of-custody evidence | Draft incoming-material evidence reference | Capture supplier, receipt identifier, date, and linked material context as copied fields. Human review must decide fitness for regulated evidence use. |
| `Stock Entry` | Inventory movement evidence | Potential GxP operational data | Draft material movement context for traceability examples | Preserve movement identifier, movement type, linked item or batch, and copied timestamp. No write-back, inventory adjustment, or status mutation. |
| `Work Order` | Planned production activity | Potential GxP process planning data | Draft workflow package context for planned or historical production steps | Capture work order identifier, linked item, status as copied context, and owner-system provenance. Do not use this draft to start, complete, or approve work. |
| `Job Card` | Operation-level execution detail | Potential GxP execution data | Draft operation evidence anchor for human review checklists | Preserve operation identifier, linked work order when explicit, and copied completion context. Electronic signature and operator identity controls are out of scope. |
| `BOM` | Recipe or bill-of-materials reference | Potential GxP master data | Draft package dependency reference for material and process structure | Capture BOM identifier, version if available, and linked item context. Treat all recipe use as draft until validated by the process owner. |
| `Serial No` | Unit-level traceability context | Potential GxP traceability data | Draft traceability example when unit-level identity is relevant | Record source serial identifier and explicit batch or item linkage only when present. Do not broaden traceability by path shape or naming convention. |
| `Supplier` | Supplier identity reference | Supplier master data; may support GxP supplier qualification context | Draft evidence context for incoming-material examples | Capture supplier identifier and copied status or qualification context only as source-system evidence. This mapping does not approve suppliers. |

## Future Validation Notes

- A later owner-controlled environment review must confirm exact ERPNext object names, enabled modules, custom fields, permissions, and lifecycle states before any implementation relies on this draft.
- Future connector work must fail closed when source identity, provenance, tenant or environment binding, object linkage, or authorization context is missing or malformed.
- Future evidence exports must identify copied records, source timestamps, and review status without claiming that draft records are approved regulated evidence.
- Future audit behavior must distinguish source-system audit trails from Ensen-flow-pharma draft review notes. This repository does not create a regulated audit trail.
- Any electronic signature, approval workflow, live ERPNext connector, write-back path, or regulated workflow operation must be designed and validated outside this Phase 1 mapping draft.
