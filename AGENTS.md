# Repository Guide

- This repo is OpenCode configuration, not an application codebase. The important files are `opencode.jsonc`, `config.json`, `dcp.jsonc`, `tui.jsonc`, `session-renamer.json`, `agents/*.md`, and `plugins/rtk.ts`.
- Read `opencode.jsonc` first: it wires env-driven model names, sets `default_agent` to `build`, enables the `context7` and `repomix` MCP servers, and loads instructions from `.opencode/rules/*.md` (there are currently no files there).
- Agent definitions live in `agents/` as `coder`, `planner`, `explainer`, `explorer`, and `reviewer`. Keep those names in sync with config references.
- `plugins/rtk.ts` is a thin delegating plugin. It only rewrites `bash`/`shell` commands when `rtk` is installed and `rtk rewrite` is the source of truth.
- `config.json` allows everything by default, but shell commands still ask, and these are explicitly denied: `rm -rf *`, `rm -rf /`, `git push --force`.
- `dcp.jsonc` has manual context compression enabled. `tui.jsonc` only loads `@tarquinen/opencode-dcp@latest` and `@slkiser/opencode-quota@latest`. `session-renamer.json` reads `OPENCODE_SESSION_RENAMER_MODEL`.
- This repo uses npm (`package-lock.json` is present) and has no repo-defined scripts in `package.json`.
- Keep edits minimal and config-focused. Avoid touching `node_modules/` or other generated/install artifacts.
