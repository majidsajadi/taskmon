import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
}
