# 매출현황 대시보드

대리점 · 품목 · 매출 데이터를 한 화면에서 확인하는 Vite + React + TypeScript 대시보드. Supabase(PostgreSQL)를 데이터 소스로 사용하고 Vercel에 정적 배포한다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # Supabase URL / anon key 입력
npm run dev
```

## 데이터베이스

`sql/reset_all.sql`에 `agency`, `item`, `sales` 3개 테이블 생성 + 샘플 데이터 스크립트가 있다. Supabase SQL Editor에서 실행한다.

**배포 전 필수**: `agency`, `item`, `sales` 테이블에 읽기 전용 RLS(Row Level Security) 정책을 적용할 것. anon key는 클라이언트에 그대로 노출되므로 RLS 없이는 누구나 쓰기까지 가능하다.

## 기술 스택

Vite + React 19 + TypeScript · `@supabase/supabase-js` · Recharts · Vercel
