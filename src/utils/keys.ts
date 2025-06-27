// Utility functions for generating unique keys

/**
 * Generates a unique key for a contact item
 */
export const generateContactKey = (item: { $id: string; userId: string }): string => {
  return `contact-${item.$id}-${item.userId}`;
};

/**
 * Generates a unique key for a search result item
 */
export const generateSearchKey = (item: { $id: string; userId: string }): string => {
  return `search-${item.$id}-${item.userId}`;
};

/**
 * Generates a unique key for any list item with a prefix
 */
export const generateUniqueKey = (prefix: string, item: { $id: string; userId: string }): string => {
  return `${prefix}-${item.$id}-${item.userId}`;
};

/**
 * Ensures a unique key by adding a timestamp if needed
 */
export const ensureUniqueKey = (baseKey: string, index: number): string => {
  return `${baseKey}-${index}`;
}; 