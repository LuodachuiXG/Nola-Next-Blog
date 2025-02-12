import type { Config } from "tailwindcss";
import {heroui} from '@heroui/react';

import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {

  },
  darkMode: "class",
  plugins: [
    typography,
    heroui({
      layout: {

      }
    })
  ],
} satisfies Config;
