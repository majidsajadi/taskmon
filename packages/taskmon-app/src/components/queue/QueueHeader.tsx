import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPause, FiPlay, FiTrash2 } from "react-icons/fi";
import { usePauseQueue } from "../../hooks/usePauseQueue";
import { useDestroyQueue } from "../../hooks/useDestroyQueue";
import { Button } from "../base";

type QueueHeaderProps = {
  queueName: string;
  paused: boolean;
};

export function QueueHeader({ queueName, paused }: QueueHeaderProps) {
  const navigate = useNavigate();
  const pauseQueue = usePauseQueue();
  const destroyQueue = useDestroyQueue();

  const handlePause = () => {
    if (queueName) {
      pauseQueue.mutate(queueName);
      toast(`Paused queue ${queueName}`);
    }
  };

  const handleDestroy = () => {
    if (queueName) {
      destroyQueue.mutate(queueName);
      toast(`Destroyed queue ${queueName}`);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-3xl font-bold">{queueName}</h3>
      <div className="flex space-x-2">
        <Button onClick={handlePause} icon={paused ? <FiPlay /> : <FiPause />}>
          {paused ? "Resume" : "Pause"}
        </Button>
        <Button type="danger" onClick={handleDestroy} icon={<FiTrash2 />}>
          Destroy
        </Button>
        <Button type="primary">New Job</Button>
      </div>
    </div>
  );
}
