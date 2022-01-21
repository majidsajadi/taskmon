import Tippy from "@tippyjs/react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <Tippy className="text-sm" animation="fade" arrow={false} content={content}>
      <span>{children}</span>
    </Tippy>
  );
}
