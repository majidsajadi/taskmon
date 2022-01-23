import { Routes, Route } from "react-router-dom";
import { Queue } from "./queue/Queue";
import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";

export default function App() {
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
