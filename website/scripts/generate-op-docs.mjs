#!/usr/bin/env node

/**
 * Generate operation reference MDX files from palette manifests.
 *
 * This script:
 * 1. Reads all manifest files from frontend/src/palette/manifest directory
 * 2. Parses each manifest to extract operation metadata
 * 3. Generates MDX files in pages/docs/operations/<domain>/<op>.mdx
 * 4. Generates domain index files with operation listings
 *
 * Run with: npm run generate:docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_DIR = path.resolve(ROOT, '../frontend/src/palette/manifest');
const OUTPUT_DIR = path.resolve(ROOT, 'pages/docs/operations');

// TypeScript manifest regex to extract the manifest object
const MANIFEST_REGEX = /const manifest:\s*OpManifest\s*=\s*({[\s\S]*?});?\s*export default manifest;/;

/**
 * Parse a TypeScript manifest file to extract the manifest object
 */
function parseManifestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Try to extract the manifest object using regex
  const match = content.match(MANIFEST_REGEX);
  if (!match) {
    console.warn(`Could not parse manifest from ${filePath}`);
    return null;
  }

  const manifestStr = match[1];

  // Safely evaluate the manifest object (this is a simplified parser)
  // In production, you'd want a proper TypeScript parser
  try {
    // Remove type annotations and convert to valid JS
    const jsStr = manifestStr
      .replace(/:\s*(string|number|boolean|OpManifest|{[^}]*}|\[\])/g, '')
      .replace(/import type[^;]+;/g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');

    // Very basic JSON-like parsing (not robust for all cases)
    // This works for the simple objects in our manifests
    const manifest = eval(`(${jsStr})`);

    return manifest;
  } catch (error) {
    console.warn(`Failed to parse manifest from ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Find all manifest files in the manifest directory
 */
function findManifestFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively search subdirectories
      files.push(...findManifestFiles(fullPath));
    } else if (entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Generate MDX content for an operation
 */
function generateOperationMDX(manifest) {
  const { id, domain, op, label, description, command, args = [], resultKind, keywords = [] } = manifest;

  const argsTable = args.length > 0 ? `
## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
${args.map(arg => {
  const required = arg.required ? 'Yes' : 'No';
  const type = arg.kind || 'text';
  return `| \`${arg.name}\` | \`${type}\` | ${required} | ${arg.description || ''} |`;
}).join('\n')}
` : '';

  const keywordsSection = keywords.length > 0 ? `
## Keywords

${keywords.map(k => `- \`${k}\``).join('\n')}
` : '';

  const examplesSection = `
## Examples

### Command Palette

Press \`⌘K\` and search for:
- By name: \`${label}\`
- By keywords: ${keywords.map(k => `\`${k}\``).join(', ')}

Fill in the required arguments:
${args.map(arg => `- **${arg.name}**: ${arg.description || arg.label || ''}`).join('\n')}

### MCP Server

Call via MCP:

\`\`\`json
{
  "name": "lore_${domain}_${op}",
  "arguments": {
${args.map(arg => `    "${arg.name}": "<value>"`).join(',\n')}
  }
}
\`\`\`

### Agent Skills

Use in agent skills as:

\`\`\`python
await call_lore_operation("${domain}.${op}", {
${args.map(arg => `    "${arg.name}": <value>`).join(',\n')
})
\`\`\`
`;

  const errorsSection = `
## Errors

Possible error codes:

| Code | Description | Resolution |
|------|-------------|------------|
| \`INVALID_ARGUMENT\` | Missing or invalid argument | Check required fields and types |
| \`NOT_FOUND\` | Resource doesn't exist | Verify the resource exists |
| \`CONFLICT\` | Operation would cause conflicts | Resolve conflicts before retrying |
| \`UNAUTHORIZED\` | Authentication required | Check your auth token |
| \`SERVER_ERROR\` | Internal server error | Retry or contact support |
`;

  return `# ${label}

**ID**: \`${id}\`
**Domain**: \`${domain}\`
**Command**: \`${command}\`
**Result Kind**: \`${resultKind}\`

${description}

${argsTable}
${keywordsSection}
${examplesSection}
${errorsSection}
<Callout type="info">
  **Generated from**: \`frontend/src/palette/manifest/${domain}/${op}.ts\`
</Callout>
`;
}

/**
 * Generate domain index MDX
 */
function generateDomainIndex(domain, operations) {
  const opsList = operations.map(op => {
    return `| [\`${op.label}\`](./${op.op}) | \`${op.id}\` | ${op.description || ''} |`;
  }).join('\n');

  return `# ${domain.charAt(0).toUpperCase() + domain.slice(1)} Operations

Operations for **${domain}** domain.

## Operations

| Operation | ID | Description |
|-----------|----|-------------|
${opsList}

<Callout type="info">
  **Auto-generated**: This page is generated from palette manifests. See [Operations Reference](./) for more.
</Callout>
`;
}

/**
 * Main function
 */
function main() {
  console.log('Generating operation reference from palette manifests...');

  // Find all manifest files
  const manifestFiles = findManifestFiles(MANIFEST_DIR);
  console.log(`Found ${manifestFiles.length} manifest files`);

  // Group manifests by domain
  const manifestsByDomain = {};

  for (const filePath of manifestFiles) {
    const manifest = parseManifestFile(filePath);
    if (!manifest || !manifest.id) continue;

    const { domain } = manifest;
    if (!manifestsByDomain[domain]) {
      manifestsByDomain[domain] = [];
    }

    manifestsByDomain[domain].push(manifest);
  }

  // Generate MDX files for each domain
  for (const [domain, manifests] of Object.entries(manifestsByDomain)) {
    const domainDir = path.join(OUTPUT_DIR, domain);
    fs.mkdirSync(domainDir, { recursive: true });

    console.log(`Generating ${domain} operations (${manifests.length} ops)...`);

    // Generate domain index
    const domainIndex = generateDomainIndex(domain, manifests);
    fs.writeFileSync(path.join(domainDir, 'index.mdx'), domainIndex);

    // Generate individual operation pages
    for (const manifest of manifests) {
      const opMDX = generateOperationMDX(manifest);
      const opFile = path.join(domainDir, `${manifest.op}.mdx`);
      fs.writeFileSync(opFile, opMDX);
    }
  }

  console.log(`Generated operation reference in ${OUTPUT_DIR}`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
