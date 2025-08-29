import { PrismaClient, FieldType } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // we clean the tables so we can start from scratch
    await prisma.item.deleteMany()
    await prisma.field.deleteMany()
    await prisma.inventoryAccess.deleteMany()
    await prisma.numbering.deleteMany()
    await prisma.inventory.deleteMany()
    await prisma.user.deleteMany()

    // users
    const diana = await prisma.user.create({
        data: { email: 'diana@example.com', name: 'Diana' },
    })
    const carlos = await prisma.user.create({
        data: { email: 'carlos@example.com', name: 'Carlos' },
    })
    const ana = await prisma.user.create({
        data: { email: 'ana@example.com', name: 'Ana' },
    })

    const laptops = await prisma.inventory.create({
        data: {
            code: 'LAP',
            name: 'Laptops',
            description: 'Office notebooks and ultrabooks',
            ownerId: diana.id,
            isPublic: true,
        },
    })

    await prisma.field.createMany({
        data: [
            { key: 'model', name: 'Model', type: FieldType.string, required: true, inventoryId: laptops.id },
            { key: 'price', name: 'Price', type: FieldType.number, inventoryId: laptops.id },
            { key: 'vendor', name: 'Vendor', type: FieldType.string, inventoryId: laptops.id },
        ],
    })

    await prisma.numbering.create({
        data: { pattern: '{CODE}-{YYYY}-{SEQ:5}', inventoryId: laptops.id },
    })

    await prisma.item.createMany({
        data: [
            {
                invNumber: 'LAP-2025-00001',
                data: { model: 'XPS 13', price: 28000, vendor: 'Dell' },
                createdBy: diana.id,
                inventoryId: laptops.id,
            },
            {
                invNumber: 'LAP-2025-00002',
                data: { model: 'MacBook Air', price: 32000, vendor: 'Apple' },
                createdBy: carlos.id,
                inventoryId: laptops.id,
            },
        ],
    })

    const books = await prisma.inventory.create({
        data: {
            code: 'BOOK',
            name: 'Programming Books',
            description: 'Library – JS, React, Python and more',
            ownerId: carlos.id,
            isPublic: false,
        },
    })

    await prisma.field.createMany({
        data: [
            { key: 'title', name: 'Title', type: FieldType.string, required: true, inventoryId: books.id },
            { key: 'author', name: 'Author', type: FieldType.string, inventoryId: books.id },
            { key: 'year', name: 'Year', type: FieldType.number, inventoryId: books.id },
        ],
    })

    await prisma.numbering.create({
        data: { pattern: '{CODE}-{YY}-{SEQ:4}', inventoryId: books.id },
    })

    await prisma.item.create({
        data: {
            invNumber: 'BOOK-25-0001',
            data: { title: "You Don't Know JS", author: 'Kyle Simpson', year: 2015 },
            createdBy: carlos.id,
            inventoryId: books.id,
        },
    })

    await prisma.inventoryAccess.create({
        data: { inventoryId: books.id, userId: diana.id, canWrite: true },
    })

    const hr = await prisma.inventory.create({
        data: {
            code: 'HRD',
            name: 'HR Documents',
            description: 'Policies, contracts, and onboarding',
            ownerId: ana.id,
            isPublic: false,
        },
    })

    await prisma.field.create({
        data: {
            key: 'docType',
            name: 'Document type',
            type: FieldType.enum,
            options: ['Policy', 'Contract', 'Onboarding'],
            required: true,
            inventoryId: hr.id,
        },
    })

    await prisma.numbering.create({
        data: { pattern: 'HR-{YYYY}-{SEQ:3}', inventoryId: hr.id },
    })

    await prisma.item.create({
        data: {
            invNumber: 'HR-2025-001',
            data: { docType: 'Contract' },
            createdBy: ana.id,
            inventoryId: hr.id,
        },
    })

    await prisma.inventoryAccess.create({
        data: { inventoryId: hr.id, userId: carlos.id, canWrite: true },
    })

    console.log('✅ Seeding finished!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
