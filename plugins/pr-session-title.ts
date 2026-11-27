import { execFile } from "node:child_process";
import { Plugin } from "@opencode/plugin";

// Titre de session = « PR #N — Titre » si la branche du répertoire de la session
// a une PR ouverte (draft incluse). Sinon `event.result` reste intact : le titre
// OpenCode habituel (agent `title`) s'applique. Aucune sortie gh n'est envoyée à un modèle.

type Run = (dir: string) => Promise<string>;

const ghPrView: Run = (dir) =>
  new Promise((resolve, reject) => {
    execFile(
      "gh",
      ["pr", "view", "--json", "number,title,state"],
      {
        cwd: dir,
        timeout: 5000,
        env: {
          ...process.env,
          GH_PROMPT_DISABLED: "1",
          GH_NO_UPDATE_NOTIFIER: "1",
        },
      },
      (err, stdout) => (err ? reject(err) : resolve(stdout)),
    );
  });

export async function prTitle(
  dir: string,
  run: Run = ghPrView,
): Promise<string | undefined> {
  try {
    const pr = JSON.parse(await run(dir));
    if (
      pr?.state !== "OPEN" ||
      !Number.isInteger(pr.number) ||
      typeof pr.title !== "string"
    )
      return;
    const title = pr.title.replace(/\s+/g, " ").trim();
    return title ? `PR #${pr.number} — ${title}` : undefined;
  } catch {
    return; // pas de PR, gh absent/non authentifié, timeout, JSON invalide
  }
}

export default Plugin.define({
  id: "pr-session-title",
  async setup(ctx) {
    await ctx.session.hook("title", async (event) => {
      try {
        const { directory } = await ctx.session.get({
          sessionID: event.sessionID,
        });
        const title = await prTitle(directory);
        if (title) event.result = title;
      } catch {
        // on laisse le titre habituel
      }
    });
  },
});
