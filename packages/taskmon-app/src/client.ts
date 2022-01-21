import axios from "axios";
import { Job, QueueListResponse } from "./types";

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

// fund-management response type
type ResponseType<Data = undefined> = {
  success: boolean;
  data?: Data;
  count?: number;
};

const ERROR_MESSAGE = "Unexpected Error. Please submit an issue in Github";

class Client {
  private readonly prefixUrl: string | undefined;

  constructor(prefixUrl = "/api/v1") {
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
    list: (): Promise<ResponseType<QueueListResponse>> => {
      return this.request<ResponseType<QueueListResponse>>({
        path: `/queues`,
        method: Method.GET,
      });
    },

    // get: (queueName: string): Promise<string> => {
    //   return this.request<string>({
    //     path: `/queue/${queueName}`,
    //     method: Method.GET,
    //   });
    // },

    resume: (queueName: string): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/resume`,
        method: Method.POST,
      });
    },

    pause: (queueName: string): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/pause`,
        method: Method.POST,
      });
    },

    clean: (queueName: string): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/clean`,
        method: Method.PUT,
      });
    },
  };

  public readonly job = {
    list: (
      queueName: string,
      query?: QueryParams
    ): Promise<ResponseType<Job[]>> => {
      return this.request<ResponseType<Job[]>>({
        path: `/queue/${queueName}/jobs`,
        method: Method.GET,
        query: query,
      });
    },

    // get: (
    //   queueName: string,
    //   jobId: string,
    // ): Promise<Job> => {
    //   return this.request<Job>({
    //     path: `/queue/${queueName}/jobs/${jobId}`,
    //     method: Method.GET,
    //   });
    // },

    create: (
      queueName: string,
      body: Record<string, unknown>
    ): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/jobs`,
        method: Method.POST,
        body,
      });
    },

    retry: (queueName: string, jobId: string): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/clean/${jobId}/retry`,
        method: Method.POST,
      });
    },

    delete: (queueName: string, jobId: string): Promise<ResponseType> => {
      return this.request({
        path: `/queue/${queueName}/clean/${jobId}`,
        method: Method.DELETE,
      });
    },
  };
}

const client = new Client("");

export { Client };
export default client;
