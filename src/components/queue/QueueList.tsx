import classNames from "classnames";
import { matchPath, useLocation, Link } from "react-router-dom";

const queueList = [
  "USER_QUEUE",
  "ISSUANCE_QUEUE",
  "REDEMPTION_QUEUE",
  "WEB_HOOKS",
  "SMS_QUEUE",
  "FUND_QUEUE",
  "FUND_BANK_ACCOUNT_LIST",
  "OVERDUE_QUEUE",
  "COORDINATION",
  "ASSET",
  "NOTIFICATION_QUEUE",
];

export function QueueList() {
  const location = useLocation();

  const getLinkCLS = (match: boolean) =>
    classNames(
      "hover:bg-slate-100 w-full rounded px-4 py-2 block truncate",
      match && "bg-slate-100"
    );

  return (
    <div className="flex-none">
      {queueList.map((qn) => {
        const to = `/${qn}`;
        const match = matchPath(to, location.pathname) ?? false;
        // TODO: generate id here
        return (
          <Link className={getLinkCLS(!!match)} key={qn} to={to}>
            {qn}
          </Link>
        );
      })}
    </div>
  );
}
