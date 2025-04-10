import { saveToStorage, getFromStorage, AnalysisStorageData } from './storage';

async function testStorage() {
  try {
    // 테스트 데이터
    const testData: AnalysisStorageData = {
      repoUrl: "https://github.com/test/repo",
      securityScore: 85,
      vulnerabilities: [
        {
          severity: 'medium',
          description: 'Potential SQL injection vulnerability',
          location: 'src/database.ts:45'
        }
      ],
      recommendations: [
        'Use parameterized queries to prevent SQL injection'
      ],
      timestamp: new Date().toISOString()
    };

    console.log('1. Saving analysis data to storage...');
    const storageResult = await saveToStorage(testData);
    console.log('Storage Result:', storageResult);

    console.log('\n2. Retrieving analysis data from storage...');
    const retrievedData = await getFromStorage(storageResult.id);
    console.log('Retrieved Data:', retrievedData);

  } catch (error) {
    console.error('Storage Test Error:', error);
  }
}

testStorage(); 