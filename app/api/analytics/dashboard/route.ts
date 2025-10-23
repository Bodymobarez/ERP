import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get dashboard statistics
    const [
      projectStats,
      financeStats,
      hrStats,
      inventoryStats,
    ] = await Promise.all([
      // Project Statistics
      prisma.project.groupBy({
        by: ['status'],
        _count: true,
      }),
      
      // Finance Statistics
      Promise.all([
        prisma.invoice.aggregate({
          _sum: { total: true },
          _count: true,
          where: { status: { in: ['draft', 'sent'] } },
        }),
        prisma.invoice.aggregate({
          _sum: { paidAmount: true },
          where: { status: 'paid' },
        }),
      ]),
      
      // HR Statistics
      Promise.all([
        prisma.employee.count({ where: { status: 'active' } }),
        prisma.leave.count({ where: { status: 'pending' } }),
        prisma.attendance.count({
          where: {
            date: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
          },
        }),
      ]),
      
      // Inventory Statistics
      Promise.all([
        prisma.item.count({ where: { isActive: true } }),
        prisma.item.count({
          where: {
            currentStock: { lte: prisma.item.fields.minStock },
          },
        }),
      ]),
    ])

    // Recent activities
    const [recentProjects, recentInvoices, recentTasks] = await Promise.all([
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          status: true,
          progress: true,
          createdAt: true,
        },
      }),
      prisma.invoice.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          number: true,
          total: true,
          status: true,
          date: true,
        },
      }),
      prisma.task.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueDate: true,
        },
      }),
    ])

    return NextResponse.json({
      projects: {
        byStatus: projectStats,
        recent: recentProjects,
      },
      finance: {
        outstanding: financeStats[0]._sum.total || 0,
        received: financeStats[1]._sum.paidAmount || 0,
        invoiceCount: financeStats[0]._count,
        recent: recentInvoices,
      },
      hr: {
        activeEmployees: hrStats[0],
        pendingLeaves: hrStats[1],
        attendanceCount: hrStats[2],
      },
      inventory: {
        totalItems: inventoryStats[0],
        lowStockItems: inventoryStats[1],
      },
      recentTasks,
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

