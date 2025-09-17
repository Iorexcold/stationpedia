import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * ============== ========
 *         TYPES
 * ======================
 */

// Item with multiple categories + images
export type ItemWithRelations = Prisma.ItemGetPayload<{
  include: { categories: true; images: true }
}>

// Category with its items
export type CategoryWithItems = Prisma.CategoryGetPayload<{
  include: { items: true }
}>

// Image with its linked item
export type ImageWithItem = Prisma.ImageGetPayload<{
  include: { item: true }
}>

/**
 * ======================
 *         ITEMS
 * ======================
 */

export async function getItems(): Promise<ItemWithRelations[]> {
  return prisma.item.findMany({
    include: { categories: true, images: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getItemBySlug(slug: string): Promise<ItemWithRelations | null> {
  return prisma.item.findUnique({
    where: { slug },
    include: { categories: true, images: true },
  })
}

export async function createItem(data: Prisma.ItemCreateInput) {
  return prisma.item.create({ data })
}

export async function updateItem(id: string, data: Prisma.ItemUpdateInput) {
  return prisma.item.update({ where: { id }, data })
}

export async function deleteItem(id: string) {
  return prisma.item.delete({ where: { id } })
}

/**
 * ======================
 *       CATEGORIES
 * ======================
 */
export async function getCategories(): Promise<CategoryWithItems[]> {
  return prisma.category.findMany({
    include: { items: true },
    orderBy: { name: 'asc' },
  })
}

export async function getCategoryBySlug(slug: string): Promise<CategoryWithItems | null> {
  return prisma.category.findUnique({
    where: { slug },
    include: { items: true },
  })
}

export async function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({ data })
}

export async function updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
  return prisma.category.update({ where: { id }, data })
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } })
}

/**
 * ======================
 *        IMAGES
 * ======================
 */
export async function getImages(): Promise<ImageWithItem[]> {
  return prisma.image.findMany({ include: { item: true } })
}

export async function createImage(data: Prisma.ImageCreateInput) {
  return prisma.image.create({ data })
}

export async function deleteImage(id: string) {
  return prisma.image.delete({ where: { id } })
}
