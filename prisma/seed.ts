import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Company
  const company = await prisma.company.upsert({
    where: { taxId: 'TAX-001' },
    update: {},
    create: {
      name: 'Acme Corporation',
      legalName: 'Acme Corporation LLC',
      taxId: 'TAX-001',
      email: 'contact@acme.com',
      phone: '+1234567890',
      website: 'https://acme.com',
      address: '123 Business Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
    },
  })
  console.log('✅ Company created')

  // Create Branch
  const branch = await prisma.branch.upsert({
    where: { code: 'BR-001' },
    update: {},
    create: {
      name: 'Main Branch',
      code: 'BR-001',
      email: 'main@acme.com',
      phone: '+1234567890',
      address: '123 Business Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      companyId: company.id,
    },
  })
  console.log('✅ Branch created')

  // Create Permissions
  const permissions = await Promise.all([
    prisma.permission.upsert({
      where: { name: 'projects:read' },
      update: {},
      create: { name: 'projects:read', resource: 'projects', action: 'read', description: 'View projects' },
    }),
    prisma.permission.upsert({
      where: { name: 'projects:write' },
      update: {},
      create: { name: 'projects:write', resource: 'projects', action: 'write', description: 'Create/Edit projects' },
    }),
    prisma.permission.upsert({
      where: { name: 'finance:read' },
      update: {},
      create: { name: 'finance:read', resource: 'finance', action: 'read', description: 'View finance' },
    }),
    prisma.permission.upsert({
      where: { name: 'hr:read' },
      update: {},
      create: { name: 'hr:read', resource: 'hr', action: 'read', description: 'View HR' },
    }),
  ])
  console.log('✅ Permissions created')

  // Create Admin Role
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator with full access',
      permissions: {
        create: permissions.map(p => ({ permissionId: p.id })),
      },
    },
  })
  console.log('✅ Admin role created')

  // Create Manager Role
  const managerRole = await prisma.role.upsert({
    where: { name: 'Manager' },
    update: {},
    create: {
      name: 'Manager',
      description: 'Manager with limited access',
      permissions: {
        create: [
          { permissionId: permissions[0].id },
          { permissionId: permissions[2].id },
        ],
      },
    },
  })
  console.log('✅ Manager role created')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      companyId: company.id,
      branchId: branch.id,
      roles: {
        create: { roleId: adminRole.id },
      },
    },
  })
  console.log('✅ Admin user created')

  // Create Sample Clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        code: 'CLI-001',
        name: 'Tech Solutions Inc',
        type: 'company',
        contactName: 'John Doe',
        email: 'john@techsolutions.com',
        phone: '+1234567891',
        address: '456 Tech Ave',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94102',
        companyId: company.id,
      },
    }),
    prisma.client.create({
      data: {
        code: 'CLI-002',
        name: 'Global Enterprises',
        type: 'company',
        contactName: 'Jane Smith',
        email: 'jane@global.com',
        phone: '+1234567892',
        address: '789 Business Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        postalCode: '90001',
        companyId: company.id,
      },
    }),
  ])
  console.log('✅ Sample clients created')

  // Create Sample Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Website Redesign',
        code: 'PRJ-001',
        description: 'Complete website redesign project',
        status: 'active',
        priority: 'high',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-06-30'),
        budget: 100000,
        progress: 35,
        companyId: company.id,
        createdById: adminUser.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'Mobile App Development',
        code: 'PRJ-002',
        description: 'iOS and Android app development',
        status: 'planning',
        priority: 'medium',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-12-31'),
        budget: 250000,
        progress: 10,
        companyId: company.id,
        createdById: adminUser.id,
      },
    }),
  ])
  console.log('✅ Sample projects created')

  // Create Sample Invoices
  await Promise.all([
    prisma.invoice.create({
      data: {
        number: 'INV-001',
        type: 'sales',
        date: new Date('2025-01-15'),
        dueDate: new Date('2025-02-15'),
        status: 'paid',
        subtotal: 10000,
        tax: 1000,
        total: 11000,
        paidAmount: 11000,
        balance: 0,
        clientId: clients[0].id,
        createdById: adminUser.id,
        items: {
          create: {
            description: 'Consulting Services',
            quantity: 1,
            unitPrice: 10000,
            total: 10000,
          },
        },
      },
    }),
    prisma.invoice.create({
      data: {
        number: 'INV-002',
        type: 'sales',
        date: new Date('2025-01-20'),
        dueDate: new Date('2025-02-20'),
        status: 'sent',
        subtotal: 25000,
        tax: 2500,
        total: 27500,
        paidAmount: 0,
        balance: 27500,
        clientId: clients[1].id,
        createdById: adminUser.id,
        items: {
          create: {
            description: 'Development Services',
            quantity: 1,
            unitPrice: 25000,
            total: 25000,
          },
        },
      },
    }),
  ])
  console.log('✅ Sample invoices created')

  // Create Sample Employees
  await Promise.all([
    prisma.employee.create({
      data: {
        employeeId: 'EMP-001',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@acme.com',
        phone: '+1234567893',
        dateOfBirth: new Date('1990-05-15'),
        gender: 'Female',
        nationality: 'USA',
        address: '111 Employee St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10002',
        position: 'Senior Developer',
        department: 'Engineering',
        hireDate: new Date('2020-01-15'),
        salary: 120000,
        companyId: company.id,
        branchId: branch.id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: 'EMP-002',
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob@acme.com',
        phone: '+1234567894',
        dateOfBirth: new Date('1988-08-20'),
        gender: 'Male',
        nationality: 'USA',
        address: '222 Worker Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10003',
        position: 'Project Manager',
        department: 'Management',
        hireDate: new Date('2019-03-10'),
        salary: 95000,
        companyId: company.id,
        branchId: branch.id,
      },
    }),
  ])
  console.log('✅ Sample employees created')

  // Create Sample Inventory Items
  await Promise.all([
    prisma.item.create({
      data: {
        sku: 'ITM-001',
        name: 'Office Chair',
        description: 'Ergonomic office chair',
        category: 'Furniture',
        unit: 'piece',
        unitPrice: 299.99,
        costPrice: 150.00,
        minStock: 10,
        currentStock: 45,
      },
    }),
    prisma.item.create({
      data: {
        sku: 'ITM-002',
        name: 'Laptop',
        description: 'Business laptop',
        category: 'Electronics',
        unit: 'piece',
        unitPrice: 1299.99,
        costPrice: 900.00,
        minStock: 5,
        currentStock: 3,
      },
    }),
  ])
  console.log('✅ Sample inventory items created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

