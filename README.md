# OpenCode Config

Configuration repository for OpenCode in this workspace.

## Key Files

- `opencode.jsonc`: core OpenCode settings, models, agents, MCP servers, and instructions.
- `cli.json`: terminal/CLI (V2) settings.
- `dcp.jsonc`: dynamic context pruning settings.
- `session-renamer.json`: session naming settings.
- `agents/*.md`: agent definitions and behavior notes.
- `plugins/rtk.ts`: command rewrite plugin for `rtk`.

## Notes

- This repo is config-only, not an application codebase.
- `package-lock.json` is present, so npm is the package manager of record.

## Example `.zshrc`

```sh
# Main Orchestrator & Utility System Models
export OPENCODE_DEFAULT_MODEL="openai/gpt-5.6-luna"
export OPENCODE_SMALL_MODEL="ollama/gpt-oss:latest"
export OPENCODE_SESSION_RENAMER_MODEL="ollama/gpt-oss:latest"

# Specialized Sub-Agents
export OPENCODE_EXPLORER_MODEL="openrouter/deepseek/deepseek-v4-flash-0731"
export OPENCODE_EXPLAINER_MODEL="openai/gpt-5.6-luna"
export OPENCODE_PLANNER_MODEL="openai/gpt-5.6-sol"
export OPENCODE_CODER_MODEL="openai/gpt-5.6-sol"
export OPENCODE_REVIEWER_MODEL="openai/gpt-5.6-terra"
```
