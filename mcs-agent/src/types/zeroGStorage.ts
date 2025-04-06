export interface ZeroGStorageOptions {
  name?: string;
  description?: string;
  contentType?: string;
  replicationLevel?: number;
  encryption?: string;
  metadata?: Record<string, any>;
}

export interface ZeroGStorageResponse {
  success: boolean;
  storageId?: string;
  metadataUri?: string;
  error?: string;
}

export interface AnalysisResult {
  analysis: {
    severity_counts?: {
      high?: number;
      medium?: number;
      low?: number;
    };
  };
} 