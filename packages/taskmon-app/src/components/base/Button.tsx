import React, { MouseEventHandler } from "react";
import classNames from "classnames";

type ButtonProps = {
  type?: "primary" | "outline" | "link" | "danger";
  size?: "small" | "default";
  disabled?: boolean;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler;
};

export function Button({
  type = "outline",
  size = "default",
  disabled = false,
  href,
  className,
  children,
  icon,
  onClick,
}: ButtonProps) {
  const defaultCLS = classNames("rounded-md");
  const colorCLS = classNames({
    "border border-gray-400 hover:border-teal-600 hover:text-teal-600":
      type === "outline",
    "border border-teal-600 bg-teal-600 text-white hover:border-teal-700 hover:bg-teal-700":
      type === "primary",
    "border border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700":
      type === "danger",
    "hover:text-teal-600": type === "link",
  });
  const sizeCLS = classNames(size === "default" ? "font-medium px-3 py-2" : "text-sm");
  const disabledCLS = classNames(disabled && "cursor-not-allowed opacity-50");

  const renderContent = () =>
    icon ? (
      <div className="flex items-center space-x-1">
        <span>{icon}</span>
        {children && <span>{children}</span>}
      </div>
    ) : (
      children
    );

  const CLS = classNames(className, defaultCLS, colorCLS, sizeCLS, disabledCLS);

  if (href) {
    return (
      <a href={href} className={CLS}>
        {renderContent()}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={CLS}>
      {renderContent()}
    </button>
  );
}
