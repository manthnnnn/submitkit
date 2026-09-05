import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  try {
    const nets = os.networkInterfaces();
    let detectedIp = "localhost";

    for (const name of Object.keys(nets)) {
      const netList = nets[name];
      if (!netList) continue;
      for (const net of netList) {
        if (net.family === "IPv4" && !net.internal) {
          detectedIp = net.address;
          break;
        }
      }
      if (detectedIp !== "localhost") break;
    }

    return NextResponse.json({ ip: detectedIp, port: 3002 });
  } catch (error) {
    return NextResponse.json({ ip: "localhost", port: 3002 });
  }
}
