declare module 'next/server' {
  export class NextResponse {
    static json(body: any, init?: ResponseInit): NextResponse;
  }
} 