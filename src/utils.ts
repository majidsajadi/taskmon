import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default class Utils {
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
    return dayjs(date).format("YYYY.MM.DD HH:mm");
  }

  static fromNow(date: number | undefined): string | undefined {
    if (!date) return;
    return dayjs(date).fromNow();
  }

  static formatCode(code: object): string {
    return JSON.stringify(code, null, 2);
  }
}
