import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    applinks: {
      apps: [],
      details: [
        {
          appID: "GWA3RNTJ4B.com.streetfeast.streetfeast.dev",
          paths: ["/m/*"],
        },
        {
          appID: "GWA3RNTJ4B.com.streetfeast.streetfeast",
          paths: ["/m/*"],
        },
      ],
    },
    activitycontinuation: {
      apps: [
        "GWA3RNTJ4B.com.streetfeast.streetfeast.dev",
        "GWA3RNTJ4B.com.streetfeast.streetfeast",
      ],
    },
    webcredentials: {
      apps: [
        "GWA3RNTJ4B.com.streetfeast.streetfeast.dev",
        "GWA3RNTJ4B.com.streetfeast.streetfeast",
      ],
    },
  });
}
