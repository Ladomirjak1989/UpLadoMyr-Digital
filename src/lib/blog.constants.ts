// однакова структура з бекендом

const BLOG_CATEGORY_UI_VALUES = [
  'All Category',
  'Growth Tactics',
  'How to',
  'Insights',
  'Management',
  'Starting Your Business',
] as const;

// те, що реально зберігаємо в БД/DTO (без "All Category")
const BLOG_CATEGORY_STORAGE_VALUES = BLOG_CATEGORY_UI_VALUES.filter(
  (v) => v !== 'All Category'
) as unknown as readonly string[];

const BLOG_STATUS_VALUES = ['draft', 'published'] as const;

export const BLOG = {
  CATEGORY: {
    UI_VALUES: BLOG_CATEGORY_UI_VALUES, // для селектів/фільтрів
    STORAGE_VALUES: BLOG_CATEGORY_STORAGE_VALUES, // що реально зберігаємо
  },
  STATUS: {
    VALUES: BLOG_STATUS_VALUES, // статуси
  },
  DEFAULTS: {
    STATUS: 'draft' as (typeof BLOG_STATUS_VALUES)[number],
  },
} as const;

export type BlogCategory = (typeof BLOG.CATEGORY.STORAGE_VALUES)[number];
export type BlogStatus = (typeof BLOG.STATUS.VALUES)[number];

// runtime guards (за бажанням)
export const isBlogCategory = (v: unknown): v is BlogCategory =>
  typeof v === 'string' && BLOG.CATEGORY.STORAGE_VALUES.includes(v);
export const isBlogStatus = (v: unknown): v is BlogStatus =>
  typeof v === 'string' && (BLOG.STATUS.VALUES as readonly string[]).includes(v);
