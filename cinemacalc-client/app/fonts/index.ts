import localFont from "next/font/local";

const proximaNova = localFont({
  src: [
    {
      path: "./ProximaNova-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ProximaNova-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./ProximaNova-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-proxima-nova",
});

const proximaSoft = localFont({
  src: [
    {
      path: "./ProximaSoft-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./ProximaSoft-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./ProximaSoft-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-proxima-soft",
});

export { proximaNova, proximaSoft };
