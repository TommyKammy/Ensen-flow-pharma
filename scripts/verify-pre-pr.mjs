import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";

const requiredFiles = [
  ".gitignore",
  ".github/workflows/ci.yml",
  "README.md",
  "docs/erpnext-object-mapping.md",
  "docs/intended-use.md",
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

const failures = [];

for (const path of requiredFiles) {
  if (!(await fileExists(path))) {
    failures.push(`Missing required baseline file: ${path}`);
  }
}

for (const sourcePath of [
  ".github/workflows/ci.yml",
  "docs/validation-templates/README.md",
  "scripts/verify-pre-pr.mjs"
]) {
  if (gitCheckIgnore(sourcePath)) {
    failures.push(`Source path is unexpectedly ignored by .gitignore: ${sourcePath}`);
  }
}

for (const path of ["README.md", "docs/erpnext-object-mapping.md", "docs/intended-use.md", "docs/validation-templates/README.md"]) {
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

if (failures.length > 0) {
  console.error("Baseline verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Baseline verification passed.");
