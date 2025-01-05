export interface ResponseDTO<Response> {
  status: number;
  message: string;
  response: Response;
}
