import fs from 'fs';
import path from 'path';

console.log('Running AdClaw test suite...');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    passed++;
    console.log(`✓ PASS: ${message}`);
  }
}

// 1. Core python package checks
assert(fs.existsSync('./src/adclaw/__init__.py'), 'src/adclaw/__init__.py exists');
assert(fs.existsSync('./src/adclaw/agents'), 'src/adclaw/agents exists');
assert(fs.existsSync('./src/adclaw/agents/skills'), 'src/adclaw/agents/skills exists');

// 2. Console web workspace
assert(fs.existsSync('./console/package.json'), 'console/package.json exists');
const consolePkg = JSON.parse(fs.readFileSync('./console/package.json', 'utf-8'));
assert(consolePkg.name, 'console package has valid name');

// 3. Metadata files
assert(fs.existsSync('./LICENSE'), 'LICENSE exists');
const lic = fs.readFileSync('./LICENSE', 'utf-8');
assert(lic.includes('Abdullah Formuli'), 'LICENSE lists Abdullah Formuli');

assert(fs.existsSync('./MAINTAINERS.md'), 'MAINTAINERS.md exists');
const maint = fs.readFileSync('./MAINTAINERS.md', 'utf-8');
assert(maint.includes('Maintained solely by Abdullah Formuli'), 'MAINTAINERS.md asserts sole maintainer status');

assert(fs.existsSync('./package.json'), 'package.json exists');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
assert(pkg.author.includes('Abdullah Formuli'), 'package.json author matches Abdullah Formuli');
assert(pkg.repository.url.includes('authrain-cloud-abdullahformuli/adclaw'), 'package.json repo matches');

assert(fs.existsSync('./CITATION.cff'), 'CITATION.cff exists');
const cff = fs.readFileSync('./CITATION.cff', 'utf-8');
assert(cff.includes('Abdullah'), 'CITATION.cff contains author name');

// 4. Prohibited files check
assert(!fs.existsSync('./CONTRIBUTING.md'), 'CONTRIBUTING.md is deleted');
assert(!fs.existsSync('./CODE_OF_CONDUCT.md'), 'CODE_OF_CONDUCT.md is deleted');
assert(!fs.existsSync('./.github/PULL_REQUEST_TEMPLATE.md'), 'PULL_REQUEST_TEMPLATE.md is deleted');

// 5. Check pyproject.toml
assert(fs.existsSync('./pyproject.toml'), 'pyproject.toml exists');
const pyproj = fs.readFileSync('./pyproject.toml', 'utf-8');
assert(pyproj.includes('authrain-cloud-abdullahformuli/adclaw'), 'pyproject.toml points to authrain-cloud-abdullahformuli/adclaw');

console.log(`\nAll ${passed}/${total} test checks passed successfully!`);
