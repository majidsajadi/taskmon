import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

type EditorProps = {
  value: string;
  lang?: 'json';
  readonly?: boolean;
  onChange?: (value: string) => void;
};

export function Editor({ onChange, value, lang, readonly }: EditorProps) {
  const extensions = []

  if (lang) {
    extensions.push(json())
  }
  
  return (
    <CodeMirror
      height="200px"
      editable={!readonly}
      value={value}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
