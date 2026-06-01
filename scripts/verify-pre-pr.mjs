import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";

const requiredFiles = [
  ".gitignore",
  ".github/workflows/ci.yml",
  "README.md",
  "docs/artifact-safety.md",
  "docs/customer-readiness-checklist.md",
  "docs/document-review-workflow.md",
  "docs/erpnext-object-mapping.md",
  "docs/intended-use.md",
  "docs/protocol-v0.4.0-track-b-boundary.md",
  "docs/phase-2-dry-run-regulated-workflow-tracker.md",
  "docs/regulated-workflow-controls.md",
  "docs/validation-package/README.md",
  "docs/validation-package/functional-specification.md",
  "docs/validation-package/installation-qualification.md",
  "docs/validation-package/operational-qualification.md",
  "docs/validation-package/performance-qualification.md",
  "docs/validation-package/risk-assessment.md",
  "docs/validation-package/track-b-validation-delta.md",
  "docs/validation-package/traceability-matrix.md",
  "docs/validation-package/user-requirements-specification.md",
  "docs/validation-package/validation-plan.md",
  "docs/validation-templates/README.md",
  "package.json",
  "scripts/verify-pre-pr.mjs"
];

const forbiddenClaims = [
  /part\s*11\s+compliant/i,
  /annex\s*11\s+compliant/i,
  /validated\s+erpnext\s+workflow/i,
  /batch\s+release\s+approved/i,
  /final\s+disposition\s+approved/i,
  /automated\s+quality\s+decision\s+compliance/i
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function gitCheckIgnore(path) {
  try {
    execFileSync("git", ["check-ignore", "--quiet", path], { stdio: "ignore" });
    return true;
  } catch (error) {
    if (error.status === 1) {
      return false;
    }
    throw error;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsRequiredPhrase(contents, phrase) {
  return new RegExp(`\\b${escapeRegExp(phrase)}\\b`, "i").test(contents);
}

const failures = [];

for (const path of requiredFiles) {
  if (!(await fileExists(path))) {
    failures.push(`Missing required baseline file: ${path}`);
  }
}

for (const sourcePath of requiredFiles.filter((path) => path !== ".gitignore")) {
  if (gitCheckIgnore(sourcePath)) {
    failures.push(`Source path is unexpectedly ignored by .gitignore: ${sourcePath}`);
  }
}

for (const path of requiredFiles.filter((path) => path.endsWith(".md"))) {
  if (!(await fileExists(path))) {
    continue;
  }

  const contents = readFileSync(path, "utf8");
  for (const pattern of forbiddenClaims) {
    if (pattern.test(contents)) {
      failures.push(`Forbidden compliance guarantee language found in ${path}: ${pattern}`);
    }
  }
}

if (await fileExists("README.md")) {
  const readme = readFileSync("README.md", "utf8");
  if (!/\[[^\]]*intended use[^\]]*\]\(docs\/intended-use\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/intended-use.md with intended-use navigation text.");
  }

  if (!/\[[^\]]*ERPNext[^\]]*mapping[^\]]*\]\(docs\/erpnext-object-mapping\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/erpnext-object-mapping.md with ERPNext mapping navigation text.");
  }

  if (!/\[[^\]]*validation package[^\]]*\]\(docs\/validation-package\/README\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/validation-package/README.md with validation package navigation text.");
  }

  if (!/\[[^\]]*Protocol v0\.4\.0[^\]]*\]\(docs\/protocol-v0\.4\.0-track-b-boundary\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/protocol-v0.4.0-track-b-boundary.md with Protocol v0.4.0 navigation text.");
  }

  if (!/\[[^\]]*artifact safety[^\]]*\]\(docs\/artifact-safety\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/artifact-safety.md with artifact safety navigation text.");
  }

  if (!/\[[^\]]*regulated workflow controls[^\]]*\]\(docs\/regulated-workflow-controls\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/regulated-workflow-controls.md with regulated workflow controls navigation text.");
  }

  if (!/\[[^\]]*customer-readiness checklist[^\]]*\]\(docs\/customer-readiness-checklist\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/customer-readiness-checklist.md with customer-readiness checklist navigation text.");
  }

  if (!/\[[^\]]*document review workflow[^\]]*\]\(docs\/document-review-workflow\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/document-review-workflow.md with document review workflow navigation text.");
  }

  if (!/\[[^\]]*Phase 2[^\]]*tracker[^\]]*\]\(docs\/phase-2-dry-run-regulated-workflow-tracker\.md\)/i.test(readme)) {
    failures.push("README.md must link to docs/phase-2-dry-run-regulated-workflow-tracker.md with Phase 2 tracker navigation text.");
  }
}

if (await fileExists("docs/intended-use.md")) {
  const intendedUse = readFileSync("docs/intended-use.md", "utf8").toLowerCase();
  for (const phrase of [
    "read-only inputs",
    "draft-only outputs",
    "human approval",
    "customer-confidential",
    "regulated input",
    "planning guidance only",
    "approved pilot gates",
    "customer sop",
    "training",
    "change control",
    "validation execution",
    "synthetic",
    "public-safe",
    "batch release",
    "final product disposition",
    "automated quality decisions",
    "live erpnext operation",
    "electronic signature implementation",
    "compliance guarantees"
  ]) {
    if (!intendedUse.includes(phrase)) {
      failures.push(`docs/intended-use.md must name the boundary phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/erpnext-object-mapping.md")) {
  const mapping = readFileSync("docs/erpnext-object-mapping.md", "utf8").toLowerCase();
  for (const phrase of [
    "draft until validated",
    "data classification",
    "future usage",
    "evidence",
    "audit",
    "live erpnext connector",
    "write-back",
    "regulated workflow operation",
    "electronic signature",
    "compliance guarantee"
  ]) {
    if (!mapping.includes(phrase)) {
      failures.push(`docs/erpnext-object-mapping.md must name the mapping phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/protocol-v0.4.0-track-b-boundary.md")) {
  const protocolBoundary = readFileSync("docs/protocol-v0.4.0-track-b-boundary.md", "utf8");
  const lowerProtocolBoundary = protocolBoundary.toLowerCase();

  for (const phrase of [
    "ensen-protocol",
    "v0.4.0",
    "f6c3c5b",
    "x-gate 3 track b",
    "customer / regulated evidence boundary",
    "public",
    "internal",
    "customer-confidential",
    "regulated",
    "classification required",
    "missing or unknown classification",
    "approval-required",
    "approved",
    "rejected",
    "revoked",
    "superseded",
    "draft-only",
    "human approval",
    "not-applied",
    "not a production gxp execution claim",
    "not a compliance guarantee",
    "not part 11 or annex 11 assurance",
    "no customer records",
    "no regulated record payloads",
    "no raw secrets",
    "no live connector details"
  ]) {
    if (!lowerProtocolBoundary.includes(phrase)) {
      failures.push(`docs/protocol-v0.4.0-track-b-boundary.md must name the Protocol v0.4.0 boundary phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/artifact-safety.md")) {
  const artifactSafety = readFileSync("docs/artifact-safety.md", "utf8").toLowerCase();
  for (const phrase of [
    "artifact safety",
    "synthetic-only public examples",
    "confidential references",
    "customer-confidential",
    "regulated",
    "protocol v0.4.0 track b",
    "public",
    "raw customer data",
    "raw regulated records",
    "raw credentials",
    "raw secrets",
    "workstation-local absolute paths",
    "live connector details",
    "customer identifiers",
    "fail closed",
    "do not publish",
    "validation package",
    "validation templates"
  ]) {
    if (!artifactSafety.includes(phrase)) {
      failures.push(`docs/artifact-safety.md must name the artifact safety phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/regulated-workflow-controls.md")) {
  const regulatedWorkflowControls = readFileSync("docs/regulated-workflow-controls.md", "utf8").toLowerCase();
  for (const phrase of [
    "regulated workflow controls",
    "read-only input controls",
    "copied",
    "exported",
    "fake",
    "reference-only",
    "draft-only output controls",
    "workflow package assets",
    "validation package deltas",
    "human approval checkpoint",
    "regulated use",
    "release decision",
    "disposition decision",
    "quality action",
    "automatic quality decisions",
    "automatic release",
    "automatic disposition",
    "live write-back",
    "electronic signatures",
    "non-goals"
  ]) {
    if (!regulatedWorkflowControls.includes(phrase)) {
      failures.push(`docs/regulated-workflow-controls.md must name the regulated workflow control phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/customer-readiness-checklist.md")) {
  const readinessChecklist = readFileSync("docs/customer-readiness-checklist.md", "utf8").toLowerCase();
  for (const phrase of [
    "customer-readiness checklist",
    "readiness discussion only",
    "not validation execution",
    "not production approval",
    "not a compliance guarantee",
    "runtime access-control changes",
    "sensitive access material handling",
    "out of scope",
    "intended use",
    "synthetic public examples",
    "classification",
    "confidential references",
    "read-only inputs",
    "draft-only outputs",
    "human approval",
    "rollback / revocation",
    "evidence retention",
    "residual risks",
    "pilot is not ready",
    "raw regulated content",
    "sensitive access material",
    "live erpnext details",
    "write-back requests",
    "electronic signature requests",
    "batch release",
    "final disposition",
    "automated quality decisions"
  ]) {
    if (!readinessChecklist.includes(phrase)) {
      failures.push(`docs/customer-readiness-checklist.md must name the customer-readiness phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/document-review-workflow.md")) {
  const documentReviewWorkflow = readFileSync("docs/document-review-workflow.md", "utf8").toLowerCase();
  for (const phrase of [
    "document review workflow",
    "pharma-p2-010",
    "low-risk",
    "synthetic",
    "copied sample context",
    "read-only planning/reference material",
    "draft-only artifacts",
    "human approval checkpoint",
    "source provenance",
    "data classification",
    "confidential-reference posture",
    "rejection / revocation",
    "evidence / audit separation",
    "rollback notes",
    "phase 1 validation package skeleton",
    "track b validation delta",
    "flow phase 6",
    "public-safe evidence",
    "not validation execution",
    "not production approval",
    "not live erpnext operation",
    "no write-back credentials",
    "no electronic signature behavior",
    "no batch release",
    "no final disposition",
    "no automated quality decision",
    "no gxp compliance readiness"
  ]) {
    if (!documentReviewWorkflow.includes(phrase)) {
      failures.push(`docs/document-review-workflow.md must name the document review workflow phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/phase-2-dry-run-regulated-workflow-tracker.md")) {
  const phase2Tracker = readFileSync("docs/phase-2-dry-run-regulated-workflow-tracker.md", "utf8").toLowerCase();
  for (const phrase of [
    "phase 2",
    "pharma-p2-000",
    "dry-run regulated workflow draft",
    "fake / read-only / draft-only",
    "synthetic examples",
    "copied sample context",
    "raw regulated records",
    "live erpnext endpoints",
    "write-back credentials",
    "electronic signatures",
    "batch release",
    "final disposition",
    "automated quality decisions",
    "compliance guarantee",
    "document review",
    "training task routing",
    "quality follow-up",
    "validation evidence mapping",
    "rg-2 readiness",
    "readiness for dry-run regulated workflow draft evaluation",
    "not validation execution",
    "not production approval",
    "not a compliance guarantee",
    "flow phase 6",
    "x-gate 5",
    "audit",
    "evidence export",
    "recovery",
    "rollback",
    "revocation",
    "no shared runtime dependency"
  ]) {
    if (!phase2Tracker.includes(phrase)) {
      failures.push(`docs/phase-2-dry-run-regulated-workflow-tracker.md must name the Phase 2 tracker phrase: ${phrase}`);
    }
  }
}

if (await fileExists("docs/validation-package/README.md")) {
  const packageReadme = readFileSync("docs/validation-package/README.md", "utf8").toLowerCase();
  for (const phrase of [
    "validation plan",
    "user requirements specification",
    "functional specification",
    "risk assessment",
    "traceability matrix",
    "installation qualification",
    "operational qualification",
    "performance qualification",
    "intended use",
    "gxp boundary",
    "erpnext object mapping",
    "evidence",
    "audit",
    "read-only",
    "draft-only",
    "human approval",
    "regulated workflow controls",
    "read-only input controls",
    "draft-only output controls",
    "human approval checkpoints",
    "automatic quality decision",
    "artifact safety",
    "synthetic-only public examples",
    "track b validation delta",
    "not a validated workflow",
    "not a compliance guarantee"
  ]) {
    if (!packageReadme.includes(phrase)) {
      failures.push(`docs/validation-package/README.md must name the validation package phrase: ${phrase}`);
    }
  }
}

const validationPackageExpectations = new Map([
  ["docs/validation-package/validation-plan.md", ["purpose", "scope", "intended use", "gxp boundary", "regulated workflow controls", "read-only", "draft-only", "human approval", "human approval checkpoint", "automatic quality decision", "evidence", "audit", "open placeholders"]],
  ["docs/validation-package/user-requirements-specification.md", ["user requirements specification", "urs", "requirement id", "acceptance approach", "human approval", "draft-only", "open placeholders"]],
  ["docs/validation-package/functional-specification.md", ["functional specification", "fs", "requirement link", "design placeholder", "erpnext", "ensen evidence", "audit", "open placeholders"]],
  ["docs/validation-package/risk-assessment.md", ["risk assessment", "risk id", "hazard", "control", "severity", "occurrence", "detectability", "open placeholders"]],
  ["docs/validation-package/track-b-validation-delta.md", ["track b validation delta", "customer-confidential", "regulated input", "source provenance", "data classification", "confidential reference", "draft status", "human approval", "evidence retention", "rollback / revocation", "residual risk", "intended use", "artifact safety", "read-only input controls", "draft-only output controls", "open placeholders", "not a validated workflow", "not a compliance guarantee"]],
  ["docs/validation-package/traceability-matrix.md", ["traceability matrix", "urs id", "fs id", "risk id", "iq", "oq", "pq", "open placeholders"]],
  ["docs/validation-package/installation-qualification.md", ["installation qualification", "iq", "prerequisite", "evidence placeholder", "expected result", "open placeholders"]],
  ["docs/validation-package/operational-qualification.md", ["operational qualification", "oq", "test objective", "acceptance criteria", "evidence placeholder", "open placeholders"]],
  ["docs/validation-package/performance-qualification.md", ["performance qualification", "pq", "scenario", "acceptance criteria", "evidence placeholder", "open placeholders"]]
]);

for (const [path, phrases] of validationPackageExpectations) {
  if (!(await fileExists(path))) {
    continue;
  }

  const contents = readFileSync(path, "utf8").toLowerCase();
  for (const phrase of phrases) {
    if (!containsRequiredPhrase(contents, phrase)) {
      failures.push(`${path} must name the validation skeleton phrase: ${phrase}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Baseline verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Baseline verification passed.");
