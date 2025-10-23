import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateCode } from '@/lib/utils'
import { z } from 'zod'

const equipmentSchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  manufacturer: z.string(),
  model: z.string(),
  serialNumber: z.string().optional(),
  purchaseDate: z.string(),
  purchaseCost: z.number(),
  currentValue: z.number(),
  location: z.string().optional(),
  warrantyExpiry: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    const where: any = {}
    if (status) where.status = status
    if (category) where.category = category

    const equipment = await prisma.equipment.findMany({
      where,
      include: {
        _count: {
          select: { maintenance: true, assignments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(equipment)
  } catch (error) {
    console.error('Error fetching equipment:', error)
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = equipmentSchema.parse(body)

    const code = generateCode('EQP')

    const equipment = await prisma.equipment.create({
      data: {
        ...validatedData,
        code,
        purchaseDate: new Date(validatedData.purchaseDate),
        warrantyExpiry: validatedData.warrantyExpiry
          ? new Date(validatedData.warrantyExpiry)
          : undefined,
      },
    })

    return NextResponse.json(equipment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating equipment:', error)
    return NextResponse.json({ error: 'Failed to create equipment' }, { status: 500 })
  }
}

