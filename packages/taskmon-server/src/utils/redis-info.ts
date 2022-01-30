/**
 * Parse Redis info string
 * This was taken from how `.serverInfo` was parsed in the ioredis library
 * https://github.com/luin/ioredis/blob/f275bc24de3825f80415a69ff227a45251dd1a3b/lib/redis/index.ts#L500
 * @param infoString Result of Redis INFO command
 */
const parseRedisInfo = (infoString: string): Record<string, any> => {
  const info: Record<string, any> = {};

  const lines = infoString.split("\r\n");
  for (let i = 0; i < lines.length; ++i) {
    const parts = lines[i].split(":");
    if (parts[1]) {
      info[parts[0]] = parts[1];
    }
  }
  return info;
};

export default parseRedisInfo;