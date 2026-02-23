export interface LoginResponse {
  token: string;
}

export interface CloudnarySignatureResponse {
  timestamp: number;
  signature: string;
  cloudName: string;
  apiKey: string;
  folder: string;
}
