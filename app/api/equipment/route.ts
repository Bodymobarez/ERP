import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateCode } from '@/lib/utils'
import { z } from 'zod'

const equipmentSchema = z.object({
  code: z.string().min(1, 'رمز المعدة مطلوب'),
  name: z.string().min(1, 'اسم المعدة مطلوب'),
  category: z.string().min(1, 'فئة المعدة مطلوبة'),
  manufacturer: z.string().min(1, 'الشركة المصنعة مطلوبة'),
  model: z.string().min(1, 'الطراز مطلوب'),
  serialNumber: z.string().optional(),
  purchaseDate: z.string(),
  purchaseCost: z.number().min(0, 'تكلفة الشراء يجب أن تكون موجبة'),
  currentValue: z.number().min(0, 'القيمة الحالية يجب أن تكون موجبة'),
  status: z.enum(['available', 'in-use', 'maintenance', 'retired']).optional(),
  location: z.string().optional(),
  condition: z.enum(['excellent', 'good', 'fair', 'poor']).optional(),
  warrantyExpiry: z.string().optional(),
  notes: z.string().optional(),
  image: z.string().optional()
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

    const contentType = request.headers.get('content-type')
    let data: any

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData (with file upload)
      const formData = await request.formData()
      
      data = {
        code: formData.get('code') as string,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        manufacturer: formData.get('manufacturer') as string,
        model: formData.get('model') as string,
        serialNumber: formData.get('serialNumber') as string || undefined,
        purchaseDate: formData.get('purchaseDate') as string,
        purchaseCost: parseFloat(formData.get('purchaseCost') as string || '0'),
        currentValue: parseFloat(formData.get('currentValue') as string || '0'),
        status: (formData.get('status') as string) || 'available',
        location: formData.get('location') as string || undefined,
        condition: (formData.get('condition') as string) || 'good',
        warrantyExpiry: formData.get('warrantyExpiry') as string || undefined,
        notes: formData.get('notes') as string || undefined
      }

      // Handle image upload (simplified - in production, use cloud storage)
      const imageFile = formData.get('image') as File
      if (imageFile && imageFile.size > 0) {
        // In a real application, upload to cloud storage
        data.image = `/uploads/equipment/${Date.now()}-${imageFile.name}`
      }
    } else {
      // Handle JSON data
      data = await request.json()
    }

    const validatedData = equipmentSchema.parse(data)

    // Check if code already exists
    const existingEquipment = await prisma.equipment.findUnique({
      where: { code: validatedData.code }
    })

    if (existingEquipment) {
      return NextResponse.json(
        { error: 'رمز المعدة موجود بالفعل' },
        { status: 400 }
      )
    }

    // Generate code if not provided
    const equipmentCode = validatedData.code || generateCode('EQP')

    const equipment = await prisma.equipment.create({
      data: {
        code: equipmentCode,
        name: validatedData.name,
        category: validatedData.category,
        manufacturer: validatedData.manufacturer,
        model: validatedData.model,
        serialNumber: validatedData.serialNumber,
        purchaseDate: new Date(validatedData.purchaseDate),
        purchaseCost: validatedData.purchaseCost,
        currentValue: validatedData.currentValue,
        status: validatedData.status || 'available',
        location: validatedData.location,
        condition: validatedData.condition || 'good',
        warrantyExpiry: validatedData.warrantyExpiry ? new Date(validatedData.warrantyExpiry) : null,
        notes: validatedData.notes,
        image: validatedData.image
      },
    })

    return NextResponse.json(equipment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'بيانات غير صحيحة', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error creating equipment:', error)
    return NextResponse.json(
      { error: 'فشل في إضافة المعدة' },
      { status: 500 }
    )
  }
}

