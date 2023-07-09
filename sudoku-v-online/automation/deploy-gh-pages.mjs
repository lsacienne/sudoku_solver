/* eslint-disable no-console */
import { execa } from "execa"
import fs from "fs"
(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        // eslint-disable-next-line no-console
        console.log("Building started...");
        await execa("npm", ["run", "build"]);
        // await execa("yarn", ["build"]);
        // Understand if it's dist or build folder
        const folderName = "sudoku-v-online/".concat(fs.existsSync("dist") ? "dist" : "build");
        await execa("git", ["--work-tree", folderName, "add", "--all"], { cwd: '..' });
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"], { cwd: '..' });
        console.log("Pushing to gh-pages...");
        await execa("git", ["subtree", "split", "--prefix", "sudoku-v-online/dist", "main"], { cwd: '..' });
        await execa("git", ["push", "origin", `HEAD:gh-pages`, "--force"]);
        await execa("rm", ["-r", folderName]);
        await execa("git", ["checkout", "-f", "main"]);
        console.log("Successfully deployed, check your settings");
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
        process.exit(1);
    }
})();