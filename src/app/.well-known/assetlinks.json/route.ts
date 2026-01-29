import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      "relation": [
        "delegate_permission/common.handle_all_urls",
        "delegate_permission/common.get_login_creds"
      ],
      "target": {
        "namespace": "android_app",
        "package_name": "com.streetfeast.streetfeast.dev",
        "sha256_cert_fingerprints": [
          "C8:D3:2C:61:72:35:5D:FE:36:58:37:E8:6F:23:D3:CB:B9:3E:A6:29:97:31:FA:58:F5:05:78:10:5D:4E:74:6E"
        ]
      }
    },
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.streetfeast.streetfeast",
        sha256_cert_fingerprints: [
          "A8:53:1F:40:CF:74:80:FA:53:45:13:7F:61:88:FD:B8:9E:1B:B4:34:74:0D:BC:EE:40:CB:8E:F8:88:78:52:3F",
        ],
      },
    },
  ]);
}
