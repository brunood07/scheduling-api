function extractUserIdFromAccessToken(accessToken: string): string {
  const [, payload] = accessToken.split(".");
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const { sub } = JSON.parse(decodedPayload);
  return sub;
}

export { extractUserIdFromAccessToken };