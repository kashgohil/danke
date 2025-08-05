import { NextResponse } from 'next/server';

export async function GET() {
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Danke System Status</title>
    <description>Real-time status updates for Danke services</description>
    <link>https://danke.no/status</link>
    <atom:link href="https://danke.no/status/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    
    <item>
      <title>All Systems Operational</title>
      <description>All Danke services are running normally with no reported issues.</description>
      <link>https://danke.no/status</link>
      <guid>https://danke.no/status#${
        new Date().toISOString().split('T')[0]
      }</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rssContent, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
