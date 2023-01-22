import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "t3.capacitor",
  appName: "t3-capacitor",
  webDir: "out",
  bundledWebRuntime: false,

  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
