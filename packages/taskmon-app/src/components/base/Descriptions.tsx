import React from "react";

type DescriptionsProps = {
  items: { label: string; content: React.ReactNode }[];
  title?: string;
};

export function Descriptions({ items, title }: DescriptionsProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      {title && <div className="mb-4 font-bold tracking-wider uppercase">{title}</div>}
      <ul className="flex flex-col space-y-2 list-none">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>{item.label}</div>
            <div className="font-medium">{item.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
