import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeProps = {
  code: string;
};

export function Code({ code }: CodeProps) {
  return (
    <SyntaxHighlighter language="javascript" style={atomOneLight}>
      {code}
    </SyntaxHighlighter>
  );
}
