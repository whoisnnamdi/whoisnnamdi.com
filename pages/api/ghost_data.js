/**
 * Re-export content layer functions for backwards compatibility
 * This file previously used Ghost CMS API, now uses local markdown files
 */

export {
  getPosts,
  getPost,
  getPages,
  getPage,
  getAll
} from '../../lib/content'
