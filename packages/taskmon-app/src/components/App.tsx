import { Routes, Route } from "react-router-dom";
import { Queue } from "./queue/Queue";
import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";
import { Home } from "./Home";

export default function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="queues/:queueName" element={<Queue />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
