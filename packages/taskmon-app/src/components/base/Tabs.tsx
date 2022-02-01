import { Tab } from "@headlessui/react";
import classNames from "classnames";

type TabsProps = {
  items: { label: string; content: React.ReactNode }[];
};

export function Tabs({ items }: TabsProps) {
  const renderTabs = () => (
    <Tab.List className="flex flex-col flex-wrap p-2 mr-4">
      {items.map((item) => (
        <Tab
          className={({ selected }) =>
            classNames(
              "flex-grow mb-2 text-center rounded-md",
              selected ? "bg-teal-600 text-white" : "bg-gray-100"
            )
          }
        >
          <span className="block px-6 py-3 text-xs font-medium leading-tight uppercase ">
            {item.label}
          </span>
        </Tab>
      ))}
    </Tab.List>
  );

  const renderContent = () => (
    <Tab.Panels className="tab-content">
      {items.map((item) => (
        <Tab.Panel>{item.content}</Tab.Panel>
      ))}
    </Tab.Panels>
  );

  return (
    <Tab.Group>
      <div className="flex items-start">
        {renderTabs()}
        {renderContent()}
      </div>
    </Tab.Group>
  );
}
