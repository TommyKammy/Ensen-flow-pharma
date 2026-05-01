import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";

const requiredFiles = [
  ".gitignore",
  ".github/workflows/ci.yml",
  "README.md",
  "docs/erpnext-object-mapping.md",
  "docs/intended-use.md",
  "docs/validation-package/README.md",
  "docs/validation-package/functional-specification.md",
  "docs/validation-package/installation-qualification.md",
  "docs/validation-package/operational-qualification.md",
  "docs/validation-package/performance-qualification.md",
  "docs/validation-package/risk-assessment.md",
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
}

if (await fileExists("docs/intended-use.md")) {
  const intendedUse = readFileSync("docs/intended-use.md", "utf8").toLowerCase();
  for (const phrase of [
    "read-only inputs",
    "draft-only outputs",
    "human approval",
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
    "not a validated workflow",
    "not a compliance guarantee"
  ]) {
    if (!packageReadme.includes(phrase)) {
      failures.push(`docs/validation-package/README.md must name the validation package phrase: ${phrase}`);
    }
  }
}

const validationPackageExpectations = new Map([
  ["docs/validation-package/validation-plan.md", ["purpose", "scope", "intended use", "gxp boundary", "read-only", "draft-only", "human approval", "evidence", "audit", "open placeholders"]],
  ["docs/validation-package/user-requirements-specification.md", ["user requirements specification", "urs", "requirement id", "acceptance approach", "human approval", "draft-only", "open placeholders"]],
  ["docs/validation-package/functional-specification.md", ["functional specification", "fs", "requirement link", "design placeholder", "erpnext", "ensen evidence", "audit", "open placeholders"]],
  ["docs/validation-package/risk-assessment.md", ["risk assessment", "risk id", "hazard", "control", "severity", "occurrence", "detectability", "open placeholders"]],
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
