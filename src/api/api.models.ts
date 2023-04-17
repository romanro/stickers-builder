import { IncomingHttpHeaders } from 'http2';

export type GetAPIResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
}