import { Card, Descriptions } from "../base";

type RedisClientInfoProps = {
  clientInfo: Record<string, any>;
};

export function RedisClientInfo({ clientInfo }: RedisClientInfoProps) {
  return (
    <Card title="Redis">
      <Descriptions
        items={[
          { label: "Version", content: clientInfo.redis_version },
          { label: "Mode", content: clientInfo.redis_mode },
          { label: "Role", content: clientInfo.role },
          { label: "Used Memory", content: clientInfo.used_memory_human },
          {
            label: "Peak Used Memory",
            content: clientInfo.used_memory_peak_human,
          },
          { label: "Clients", content: clientInfo.connected_clients },
          {
            label: "Uptime (seconds)",
            content: `${clientInfo.uptime_in_seconds}S`,
          },
          { label: "Uptime (days)", content: `${clientInfo.uptime_in_days}D` },
        ]}
      />
    </Card>
  );
}
