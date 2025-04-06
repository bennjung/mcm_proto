import { Button } from '@/components/ui/button';
import ReputationSection from '@/components/ReputationSection';
import { useState } from 'react';

export default function Home() {
  const [repoPath, setRepoPath] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">MCS Agent</h1>
        <p className="mb-4">Modular Code Security Platform</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            Analyze Code
          </Button>
          <Button variant="outline" className="w-full">
            Encrypt Code
          </Button>
          <Button variant="outline" className="w-full">
            Upload to 0G Storage
          </Button>
          <Button variant="outline" className="w-full">
            Mint NFT
          </Button>
        </div>

        {repoPath && (
          <section className="mb-8">
            <ReputationSection repoUrl={repoUrl} />
          </section>
        )}
      </div>
    </div>
  );
}
