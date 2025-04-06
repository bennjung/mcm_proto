export interface StepResult {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result: any;
  error?: string;
  timestamp?: string;
}

export interface WorkflowStatus {
  repoUrl: string;
  walletAddress: string;
  steps: {
    analysis: StepResult;
    encryption: StepResult;
    storage: StepResult;
    minting: StepResult;
  };
  startTime: string;
  endTime?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  result?: {
    tokenId?: string;
    transactionHash?: string;
    metadataUri?: string;
    encryptedCodeUri?: string;
    storageId?: string;
  };
  error?: string;
  timestamp?: string;
} 