import { Routes, Route } from "react-router-dom";
import { Queue } from "./queue/Queue";
import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";
import { useContext } from "react";
import { AppContext } from "../context/App";

export default function App() {
  const { queueLoading } = useContext(AppContext);

  if (queueLoading) return <div>loading...</div>;

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="queues/:queueName" element={<Queue />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
