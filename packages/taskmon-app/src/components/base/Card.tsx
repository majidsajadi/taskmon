import React from "react";

type CardProps = {
  children: React.ReactNode;
  title: string;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-4 font-bold tracking-wider uppercase">{title}</div>
      <div>{children}</div>
    </div>
  );
}
