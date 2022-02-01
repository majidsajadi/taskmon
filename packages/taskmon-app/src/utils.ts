import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { JobStatus } from "./types";
dayjs.extend(relativeTime);

export default class Utils {
  static entriesToObject(
    entries: IterableIterator<[string, string]>
  ): Record<string, string> {
    const res: Record<string, string> = {};
    for (const [key, value] of entries) {
      res[key] = value;
    }

    return res;
  }

  static copyTextToClipboard(text: string): boolean {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    textField.style.position = "fixed";
    textField.style.opacity = "0";

    document.body.appendChild(textField);
    textField.select();

    const result = document.execCommand("copy");

    textField.remove();

    return result;
  }

  static formatDate(date: number | undefined): string | undefined {
    if (!date) return;
    return dayjs(date).format("YYYY.MM.DD HH:mm:ss");
  }

  static fromNow(date: number | undefined): string | undefined {
    if (!date) return;
    return dayjs(date).fromNow();
  }

  static formatCode(code: object): string {
    return JSON.stringify(code, null, 2);
  }

  static capitalize(str: string): string {
    const arr = [...str];
    return arr[0].toUpperCase() + arr.slice(1).join("").toLowerCase();
  }

  static getStateColor(state: JobStatus): string {
    switch (state) {
      case JobStatus.ACTIVE:
        return "#0ea5e9";
      case JobStatus.FAILED:
        return "#ef4444";
      case JobStatus.COMPLETED:
        return "#14b8a6";
      case JobStatus.WAITING:
        return "#6366f1";
      case JobStatus.DELAYED:
        return "#fde047";
      case JobStatus.PAUSED:
        return "#f97316";
      default:
        return "";
    }
  }
}
