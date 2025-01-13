export interface HttpAppResponse<Data> {
  message: string;
  status: number;
  response: Data;
}
