import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateContractSchema = z.object({
  title: z.string().min(1, 'عنوان العقد مطلوب').optional(),
  description: z.string().optional(),
  type: z.enum(['supply', 'service', 'maintenance', 'employment', 'other']).optional(),
  status: z.enum(['draft', 'active', 'expired', 'terminated']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  value: z.number().min(0, 'قيمة العقد يجب أن تكون موجبة').optional(),
  clientId: z.string().optional(),
  supplierId: z.string().optional(),
  notes: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
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

    if (!contract) {
      return NextResponse.json(
        { error: 'العقد غير موجود' },
        { status: 404 }
      )
    }

    const transformedContract = {
      ...contract,
      clientName: contract.client?.name,
      supplierName: contract.supplier?.name,
      startDate: contract.startDate.toISOString().split('T')[0],
      endDate: contract.endDate.toISOString().split('T')[0],
      value: Number(contract.value)
    }

    return NextResponse.json(transformedContract)
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json(
      { error: 'فشل في جلب العقد' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateContractSchema.parse(body)

    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id }
    })

    if (!existingContract) {
      return NextResponse.json(
        { error: 'العقد غير موجود' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.type !== undefined) updateData.type = validatedData.type
    if (validatedData.status !== undefined) updateData.status = validatedData.status
    if (validatedData.startDate !== undefined) updateData.startDate = new Date(validatedData.startDate)
    if (validatedData.endDate !== undefined) updateData.endDate = new Date(validatedData.endDate)
    if (validatedData.value !== undefined) updateData.value = validatedData.value
    if (validatedData.clientId !== undefined) updateData.clientId = validatedData.clientId
    if (validatedData.supplierId !== undefined) updateData.supplierId = validatedData.supplierId
    if (validatedData.notes !== undefined) updateData.notes = validatedData.notes

    const contract = await prisma.contract.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(transformedContract)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating contract:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث العقد' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id }
    })

    if (!existingContract) {
      return NextResponse.json(
        { error: 'العقد غير موجود' },
        { status: 404 }
      )
    }

    await prisma.contract.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'تم حذف العقد بنجاح' })
  } catch (error) {
    console.error('Error deleting contract:', error)
    return NextResponse.json(
      { error: 'فشل في حذف العقد' },
      { status: 500 }
    )
  }
}