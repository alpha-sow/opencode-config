import { expect, test } from "bun:test";
import plugin, { prTitle } from "../plugins/pr-session-title";

const pr = (o: object) => async () =>
  JSON.stringify({ number: 7, title: "Fix  x", state: "OPEN", ...o });

test("PR ouverte", async () =>
  expect(await prTitle("/d", pr({}))).toBe("PR #7 — Fix x"));
test("PR fermée/mergée ignorée", async () => {
  expect(await prTitle("/d", pr({ state: "MERGED" }))).toBeUndefined();
});
test("échec gh (pas de PR, auth, timeout)", async () => {
  expect(
    await prTitle("/d", async () => {
      throw new Error("no pull requests found");
    }),
  ).toBeUndefined();
  expect(await prTitle("/d", async () => "pas du json")).toBeUndefined();
});
test("gh réel en répertoire sans dépôt : aucun effet", async () => {
  expect(await prTitle("/tmp")).toBeUndefined();
});
test("hook title enregistré, utilise le répertoire de la session", async () => {
  let handler: any;
  const ctx: any = {
    session: {
      hook: async (n: string, h: any) => {
        if (n === "title") handler = h;
      },
      get: async () => {
        throw new Error("x");
      },
    },
  };
  await (plugin as any).setup(ctx);
  const ev: any = { sessionID: "s" };
  await handler(ev);
  expect(ev.result).toBeUndefined(); // erreur → titre habituel
});
