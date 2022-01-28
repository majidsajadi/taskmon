import axios from "axios";
import {
  ListJobsResponse,
  QueueListResponse,
  QueueResponse,
  WorkerListResponse,
} from "./types";

enum Method {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PATCH = "patch",
  PUT = "put",
}

type QueryParams = Record<string, string | number> | URLSearchParams;

type RequestParameters = {
  path: string;
  method: Method;
  query?: QueryParams;
  body?: Record<string, unknown>;
};

const ERROR_MESSAGE = "Unexpected Error. Please submit an issue in Github";

class Client {
  private readonly prefixUrl: string | undefined;

  constructor(prefixUrl = "http://localhost:8000/api/v1") {
    this.prefixUrl = prefixUrl;
  }

  private async request<ServerResponse>({
    path,
    method,
    query,
    body,
  }: RequestParameters): Promise<ServerResponse> {
    try {
      const searchParams = new URLSearchParams();
      if (query) {
        for (const [key, value] of Object.entries(query)) {
          if (value !== undefined) {
            searchParams.append(key, String(value));
          }
        }
      }

      const baseURL = `${this.prefixUrl}${path}`;
      const params = searchParams.toString();
      const url = params ? `${baseURL}?${params}` : baseURL;
      const response = await axios.request<ServerResponse>({
        method,
        url,
        data: body,
      });

      return response.data;

      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response?.data?.error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        throw new Error(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(ERROR_MESSAGE);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(ERROR_MESSAGE);
      }
    }
  }

  public readonly queue = {
    list: (): Promise<QueueListResponse> => {
      return this.request<QueueListResponse>({
        path: `/queues`,
        method: Method.GET,
      });
    },

    stats: (queueName: string): Promise<QueueResponse> => {
      return this.request<QueueResponse>({
        path: `/queues/${queueName}`,
        method: Method.GET,
      });
    },

    // Resume a paused queue. or Pause a queue.
    pause: (queueName: string): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}/pause`,
        method: Method.PUT,
      });
    },

    // Destroy a queue if there is not active jobs in the queue
    destroy: (queueName: string): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}`,
        method: Method.DELETE,
      });
    },
  };

  public readonly worker = {
    list: (queueName: string): Promise<WorkerListResponse> => {
      return this.request<WorkerListResponse>({
        path: `/queues/${queueName}/workers`,
        method: Method.GET,
      });
    },
  };

  public readonly job = {
    list: (
      queueName: string,
      query?: QueryParams
    ): Promise<ListJobsResponse> => {
      return this.request<ListJobsResponse>({
        path: `/queues/${queueName}/jobs`,
        method: Method.GET,
        query: query,
      });
    },

    create: (
      queueName: string,
      body: Record<string, unknown>
    ): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}/jobs`,
        method: Method.POST,
        body,
      });
    },

    // Retry a failed job
    retry: (queueName: string, jobId: string): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}/jobs/${jobId}/retry`,
        method: Method.PUT,
      });
    },

    // Promote a delayed job to the top of the queue.
    promote: (queueName: string, jobId: string): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}/jobs/${jobId}`,
        method: Method.PUT,
      });
    },

    // Remove a job completely from queue
    delete: (queueName: string, jobId: string): Promise<void> => {
      return this.request({
        path: `/queues/${queueName}/jobs/${jobId}`,
        method: Method.DELETE,
      });
    },
  };
}

const client = new Client();

export { Client };
export default client;
