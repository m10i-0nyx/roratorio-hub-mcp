import { runPlaywrightTask } from "./playwright-task";
import { logInfo } from "./logger";

async function main() {
    logInfo("MCP server started on port 5000");

    // Playwrightタスクを1回実行して終了する簡易サンプル
    await runPlaywrightTask();

    logInfo("Server stopped");
    process.exit(0);
}

main();
