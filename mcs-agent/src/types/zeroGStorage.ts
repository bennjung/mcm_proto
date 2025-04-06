export interface ZeroGStorageOptions {
  name?: string;
  description?: string;
  contentType?: string;
  replicationLevel?: number;
  encryption?: string;
  metadata?: Record<string, unknown>;
}

export interface ZeroGStorageResponse {
  success: boolean;
  cid?: string;
  size?: number;
  timestamp?: string;
  uri?: string;
  error?: string;
  details?: unknown;
}

export interface AnalysisResult {
  analysis: {
    vulnerability_count: number;
    severity_counts: {
      high: number;
      medium: number;
      low: number;
    };
  };
} 