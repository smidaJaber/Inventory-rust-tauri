import { GrauAdapter } from "./base";
import { BrowserAdapter } from "./browser";
import { DesktopAdapter } from "./desktop";

export const adapter: GrauAdapter =
	"__TAURI__" in window ? new DesktopAdapter() : new BrowserAdapter();
