import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contractSchema = z.object({
  number: z.string().optional(),
  title: z.string().min(1, 'عنوان العقد مطلوب'),
  description: z.string().optional(),
  type: z.enum(['supply', 'service', 'maintenance', 'employment', 'other']),
  status: z.enum(['draft', 'active', 'expired', 'terminated']),
  startDate: z.string(),
  endDate: z.string(),
  value: z.number().min(0, 'قيمة العقد يجب أن تكون موجبة'),
  clientId: z.string().optional(),
  supplierId: z.string().optional(),
  notes: z.string().optional(),
  terms: z.array(z.object({
    title: z.string(),
    description: z.string()
  })).optional(),
  amendments: z.array(z.object({
    number: z.string(),
    description: z.string(),
    date: z.string(),
    status: z.enum(['pending', 'approved', 'rejected']),
    reason: z.string().optional()
  })).optional()
})

export async function GET() {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        terms: true,
        amendments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the data to match frontend interface
    const transformedContracts = contracts.map(contract => ({
      ...contract,
      clientName: contract.client?.name,
      supplierName: contract.supplier?.name,
      startDate: contract.startDate.toISOString().split('T')[0],
      endDate: contract.endDate.toISOString().split('T')[0],
      // Convert Decimal to number for JSON serialization
      value: Number(contract.value)
    }))

    return NextResponse.json(transformedContracts)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json(
      { error: 'فشل في جلب العقود' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contractSchema.parse(body)

    // Generate contract number if not provided
    let contractNumber = validatedData.number
    if (!contractNumber) {
      const lastContract = await prisma.contract.findFirst({
        orderBy: { createdAt: 'desc' }
      })
      
      const lastNumber = lastContract?.number?.match(/\d+$/)?.[0] || '0'
      contractNumber = `CON-${String(parseInt(lastNumber) + 1).padStart(4, '0')}`
    }

    const contract = await prisma.contract.create({
      data: {
        number: contractNumber,
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        status: validatedData.status,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        value: validatedData.value,
        clientId: validatedData.clientId,
        supplierId: validatedData.supplierId,
        notes: validatedData.notes,
        terms: {
          create: validatedData.terms || []
        },
        amendments: {
          create: validatedData.amendments || []
        }
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        terms: true,
        amendments: true
      }
    })

    const transformedContract = {
      ...contract,
      clientName: contract.client?.name,
      supplierName: contract.supplier?.name,
      startDate: contract.startDate.toISOString().split('T')[0],
      endDate: contract.endDate.toISOString().split('T')[0],
      value: Number(contract.value)
    }

    return NextResponse.json(transformedContract, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating contract:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء العقد' },
      { status: 500 }
    )
  }
}