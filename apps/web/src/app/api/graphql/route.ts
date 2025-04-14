// src/app/api/graphql/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { query, variables, operationName } = await req.json();

    const headers = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
    };

    const graphqlResponse = await fetch(process.env.GRAPHQL_API_ENDPOINT!, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables, operationName }),
    });

    if (!graphqlResponse.ok) {
      console.error('Upstream GraphQL Error:', {
        status: graphqlResponse.status,
        statusText: graphqlResponse.statusText,
      });
      return NextResponse.json(
        { error: 'Error from GraphQL server' },
        { status: graphqlResponse.status }
      );
    }

    const data = await graphqlResponse.json();

    // You can transform the response here if needed
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
