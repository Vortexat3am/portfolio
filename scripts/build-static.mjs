import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, rmSync } from "node:fs";

rmSync(".next", { recursive: true, force: true });
rmSync("out", { recursive: true, force: true });

const build = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "true" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

if (existsSync("scripts/static.htaccess")) {
  copyFileSync("scripts/static.htaccess", "out/.htaccess");
}

console.log("\nDone. Upload everything inside the `out` folder to your host.");
