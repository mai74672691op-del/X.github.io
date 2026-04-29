import { SVGProps } from 'react';

export function DogLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 黑色眉毛 (左) */}
      <path d="M 20 28 Q 28 20 36 28" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" />
      <path d="M 18 35 L 22 30" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
      {/* 黑色眉毛 (右) */}
      <path d="M 64 28 Q 72 20 80 28" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" />
      <path d="M 82 35 L 78 30" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />

      {/* 星星眼睛 (左) */}
      <polygon 
        points="28,30 31,38 39,39 33,45 35,53 28,49 21,53 23,45 17,39 25,38" 
        fill="#FFC107" 
      />
      {/* 星星眼睛 (右) */}
      <polygon 
        points="72,30 75,38 83,39 77,45 79,53 72,49 65,53 67,45 61,39 69,38" 
        fill="#FFC107" 
      />

      {/* 蓝色泪滴/汗滴 (左) */}
      <ellipse cx="18" cy="50" rx="4" ry="3" fill="#40E0D0" transform="rotate(-20 18 50)" />
      <ellipse cx="22" cy="60" rx="5" ry="4" fill="#40E0D0" transform="rotate(-15 22 60)" />

      {/* 蓝色泪滴/汗滴 (右) */}
      <ellipse cx="82" cy="50" rx="4" ry="3" fill="#40E0D0" transform="rotate(20 82 50)" />
      <ellipse cx="78" cy="60" rx="5" ry="4" fill="#40E0D0" transform="rotate(15 78 60)" />

      {/* 小黑鼻子 */}
      <ellipse cx="50" cy="48" rx="5" ry="3" fill="#e5e7eb" />

      {/* 张开的嘴巴 */}
      <path d="M 35 58 Q 50 85 65 58 Z" fill="#e5e7eb" />
      {/* 红色舌头 */}
      <path d="M 40 68 Q 50 80 60 68 Q 50 72 40 68 Z" fill="#FF6347" />
    </svg>
  );
}
