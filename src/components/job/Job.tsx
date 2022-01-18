import { Disclosure, Tab } from "@headlessui/react";
import {
  FiMinusSquare,
  FiPlusSquare,
  FiTrash2,
  FiRepeat,
} from "react-icons/fi";
import { Job } from "../../types";
import { Button, Progress, Tag, Tooltip, Code } from "../base";
import Utils from "../../utils";
import classNames from "classnames";

type JobProps = {
  job: Job;
  status: string;
};

export function Job({ job, status }: JobProps) {
  const hasStacktrace = job.stacktrace && !!job.stacktrace.length;

  const getTabCLS = ({ selected }: { selected: boolean }) =>
    classNames(
      "p-2 text-right border border-r-0 border-transparent rounded",
      selected && "border-teal-600 text-teal-600"
    );

  const renderDetail = () => (
    <Tab.Group vertical>
      <div className="flex">
        <Tab.List className="w-20 flex flex-col">
          {job.data && <Tab className={getTabCLS}>Data</Tab>}
          {job.returnvalue && <Tab className={getTabCLS}>Options</Tab>}
          {job.opts && <Tab className={getTabCLS}>Returns</Tab>}
          {hasStacktrace && <Tab className={getTabCLS}>Error</Tab>}
        </Tab.List>
        <Tab.Panels className="grow border-l h-64 overflow-auto">
          {job.data && (
            <Tab.Panel>
              <Code code={Utils.formatCode(job.data)} />
            </Tab.Panel>
          )}
          {job.returnvalue && (
            <Tab.Panel>
              <Code code={Utils.formatCode(job.returnvalue)} />
            </Tab.Panel>
          )}
          {job.opts && (
            <Tab.Panel>
              <Code code={Utils.formatCode(job.opts)} />
            </Tab.Panel>
          )}
          {hasStacktrace && (
            <Tab.Panel>
              <Code code={job.stacktrace.join("")} />
            </Tab.Panel>
          )}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );

  const renderItem = () => (
    <>
      <div className="flex items-center space-x-6 grow">
        <div className="flex-none truncate w-16">{job.id}</div>
        <div className="truncate grow">{job.name}</div>
        <div className="flex-none w-32 truncate">
          <Tag status={status} />
        </div>
        <div className="flex-none truncate w-36">
          <Tooltip content={Utils.fromNow(job.finishedOn) || ""}>
            {Utils.formatDate(job.timestamp)}
          </Tooltip>
        </div>
        <div className="flex-none truncate w-36">
          <Tooltip content={Utils.fromNow(job.finishedOn) || ""}>
            {Utils.formatDate(job.processedOn)}
          </Tooltip>
        </div>
        <div className="flex-none truncate w-36">
          <Tooltip content={Utils.fromNow(job.finishedOn) || ""}>
            {Utils.formatDate(job.finishedOn)}
          </Tooltip>
        </div>
        <div className="flex-none w-44">
          <Progress percent={job.progress} />
        </div>
      </div>
      <div className="flex flex-none w-12 items-center justify-end space-x-2">
        <Tooltip content="Delete Job">
          <Button
            className="align-sub"
            type="link"
            size="small"
            icon={<FiTrash2 className="text-lg text-red-500" />}
          />
        </Tooltip>
        <Tooltip content="Retry Job">
          <Button
            className="align-sub"
            type="link"
            size="small"
            icon={<FiRepeat className="text-lg text-teal-600" />}
          />
        </Tooltip>
      </div>
    </>
  );

  return (
    <Disclosure>
      {({ open }) => (
        <div className="px-4 py-2 border-b">
          <div className="flex items-center space-x-6">
            <Disclosure.Button className="flex-none w-3">
              {open ? <FiMinusSquare /> : <FiPlusSquare />}
            </Disclosure.Button>
            {renderItem()}
          </div>
          <Disclosure.Panel className="pt-3">{renderDetail()}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
