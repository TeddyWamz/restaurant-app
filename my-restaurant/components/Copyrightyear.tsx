// // components/CopyrightYear.tsx
// 'use client';

// import { useEffect, useState } from 'react';

// export default function CopyrightYear() {
//   const [year, setYear] = useState<number | null>(null);

//   useEffect(() => {
//     setYear(new Date().getFullYear());
//   }, []);

//   // Renders a fallback or empty space during SSR to avoid hydration mismatch
//   return <span>{year ?? new Date().getFullYear()}</span>;
// }