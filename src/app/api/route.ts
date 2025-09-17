
import { getPrismaEdge } from '@/lib/prisma-edge'

export const runtime = 'edge'

export async function GET() {
  const prisma = getPrismaEdge()
  const items = await prisma.item.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  })

  return new Response(JSON.stringify(items), {
    headers: { 'content-type': 'application/json' },
  })
}
