import React from "react";

type DescriptionsProps = {
  items: { label: string; content: React.ReactNode }[];
};

export function Descriptions({ items }: DescriptionsProps) {
  return (
    <ul className="flex flex-col space-y-2 list-none">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between">
          <div>{item.label}</div>
          <div className="font-medium">{item.content}</div>
        </li>
      ))}
    </ul>
  );
}
