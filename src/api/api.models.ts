import { IncomingHttpHeaders } from 'http2';

export type GetAttributeResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
}