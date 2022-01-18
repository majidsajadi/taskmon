import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Queue } from "./queue/Queue";
import { NoMatch } from "./NoMatch";

export default function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":queueName" element={<Queue />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
