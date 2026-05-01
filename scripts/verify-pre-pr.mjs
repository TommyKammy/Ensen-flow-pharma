import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";

const requiredFiles = [
  ".gitignore",
  ".github/workflows/ci.yml",
  "README.md",
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

for (const path of ["README.md", "docs/validation-templates/README.md"]) {
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

if (failures.length > 0) {
  console.error("Baseline verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Baseline verification passed.");
