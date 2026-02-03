import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          surface: "#fafafa",
          border: "#e5e7eb",
          text: "#1f2937",
          muted: "#6b7280",
          accent: "#3b82f6",
          "accent-hover": "#2563eb",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", "JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[700]"),
            "--tw-prose-headings": theme("colors.gray[900]"),
            "--tw-prose-lead": theme("colors.gray[600]"),
            "--tw-prose-links": theme("colors.blue[600]"),
            "--tw-prose-bold": theme("colors.gray[900]"),
            "--tw-prose-counters": theme("colors.gray[500]"),
            "--tw-prose-bullets": theme("colors.gray[400]"),
            "--tw-prose-hr": theme("colors.gray[200]"),
            "--tw-prose-quotes": theme("colors.gray[900]"),
            "--tw-prose-quote-borders": theme("colors.blue[500]"),
            "--tw-prose-captions": theme("colors.gray[600]"),
            "--tw-prose-code": theme("colors.pink[600]"),
            "--tw-prose-pre-code": theme("colors.gray[800]"),
            "--tw-prose-pre-bg": theme("colors.gray[50]"),
            "--tw-prose-th-borders": theme("colors.gray[300]"),
            "--tw-prose-td-borders": theme("colors.gray[200]"),
            maxWidth: "65ch", // Optimal reading width
            fontSize: "1.0625rem", // Slightly larger for comfort
            lineHeight: "1.75", // Generous line height
            p: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            h1: {
              fontWeight: "700",
              fontSize: "2.25em",
              marginTop: "0",
              marginBottom: "0.8888889em",
              lineHeight: "1.1111111",
            },
            h2: {
              fontWeight: "600",
              fontSize: "1.875em",
              marginTop: "1.5555556em",
              marginBottom: "0.8888889em",
              lineHeight: "1.3333333",
            },
            h3: {
              fontWeight: "600",
              fontSize: "1.5em",
              marginTop: "1.6em",
              marginBottom: "0.6em",
              lineHeight: "1.6",
            },
            blockquote: {
              fontWeight: "400",
              fontStyle: "italic",
              borderLeftWidth: "0.25rem",
              paddingLeft: "1em",
            },
            code: {
              fontWeight: "500",
              fontSize: "0.875em",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        lg: {
          css: {
            fontSize: "1.125rem",
            lineHeight: "1.7777778",
            p: {
              marginTop: "1.6666667em",
              marginBottom: "1.6666667em",
            },
            h1: {
              fontSize: "2.6666667em",
              marginTop: "0",
              marginBottom: "0.875em",
              lineHeight: "1",
            },
            h2: {
              fontSize: "2em",
              marginTop: "1.5555556em",
              marginBottom: "0.8888889em",
              lineHeight: "1.3333333",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
