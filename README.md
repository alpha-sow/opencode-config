# OpenCode Config

Configuration repository for OpenCode in this workspace.

## Key Files

- `opencode.jsonc`: core OpenCode settings, models, agents, MCP servers, and instructions.
- `config.json`: permissions and global runtime settings.
- `dcp.jsonc`: dynamic context pruning settings.
- `tui.jsonc`: TUI plugins.
- `session-renamer.json`: session naming settings.
- `agents/*.md`: agent definitions and behavior notes.
- `plugins/rtk.ts`: command rewrite plugin for `rtk`.

## Notes

- This repo is config-only, not an application codebase.
- `package-lock.json` is present, so npm is the package manager of record.

## Example `.zshrc`

```sh
export OPENCODE_DEFAULT_MODEL="openai/gpt-5.4-mini"
export OPENCODE_SMALL_MODEL="openai/gpt-5.4-mini"
export OPENCODE_EXPLAINER_MODEL="openai/gpt-5.4-mini"
export OPENCODE_PLANNER_MODEL="openai/gpt-5.4-mini"
export OPENCODE_CODER_MODEL="openai/gpt-5.4-mini"
export OPENCODE_EXPLORER_MODEL="openai/gpt-5.4-mini"
export OPENCODE_REVIEWER_MODEL="openai/gpt-5.4-mini"
export OPENCODE_SESSION_RENAMER_MODEL="openai/gpt-5.4-mini"
```
