---
description: Priority directive for directory analysis and code reviews
---

# Priority Rule: Module & Directory Inspection

Whenever a request involves analyzing, diagnosing, exploring, or reviewing a **directory**, a **module** (e.g., `@sharedUI/`, `src/components/`), or **multiple files at once**:

1. 🚫 **NO SEQUENTIAL INDIVIDUAL READS:** 
   - Do NOT use the `read` / `Read` tool repeatedly in sequence.
   - Do NOT run looping `find`, `cat`, or `wc` commands via `bash`.

2. ⚡ **MANDATORY USE OF REPOMIX:**
   Call the Repomix MCP tool (or run `npx repomix <folder-path> --stdout` via `bash`) in a **SINGLE STEP** to load the entire module into your context.

   *Example for @sharedUI/:*
   `npx repomix sharedUI --stdout` (or invoke the `pack_directory` MCP tool with `directoryPath: "sharedUI"`).

3. 📝 **ANALYSIS:**
   Perform the entire diagnostic directly from the consolidated information pack returned by Repomix.