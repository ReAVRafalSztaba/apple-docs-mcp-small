/**
 * Tool definitions for Apple Developer Documentation MCP Server
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import { searchFrameworkSymbolsTool } from './search-framework-symbols.js';

/**
 * Exposed tools (trimmed to user-requested 6)
 */
export const toolDefinitions: Tool[] = [
  {
    name: 'search_apple_docs',
    description: 'Search Apple Developer Documentation for APIs, frameworks, guides, and samples. Best for finding specific APIs, classes, or methods.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for Apple Developer Documentation.',
        },
        type: {
          type: 'string',
          enum: ['all', 'documentation', 'sample'],
          description: 'Filter content type. Default: "all".',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_apple_doc_content',
    description: 'Get detailed content from a specific Apple Developer Documentation page.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'Full URL starting with https://developer.apple.com/documentation/.',
        },
        includeRelatedApis: { type: 'boolean' },
        includeReferences: { type: 'boolean' },
        includeSimilarApis: { type: 'boolean' },
        includePlatformAnalysis: { type: 'boolean' },
      },
      required: ['url'],
    },
  },
  {
    name: 'list_technologies',
    description: 'Browse Apple technologies and frameworks by category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        language: { type: 'string', enum: ['swift', 'occ'] },
        includeBeta: { type: 'boolean' },
        limit: { type: 'number' },
      },
      required: [],
    },
  },
  searchFrameworkSymbolsTool,
  {
    name: 'get_related_apis',
    description: 'Analyze API relationships and discover related functionality.',
    inputSchema: {
      type: 'object',
      properties: {
        apiUrl: { type: 'string' },
        includeInherited: { type: 'boolean' },
        includeConformance: { type: 'boolean' },
        includeSeeAlso: { type: 'boolean' },
      },
      required: ['apiUrl'],
    },
  },
  {
    name: 'get_platform_compatibility',
    description: 'Check API availability across Apple platforms and OS versions.',
    inputSchema: {
      type: 'object',
      properties: {
        apiUrl: { type: 'string' },
        compareMode: { type: 'string', enum: ['single', 'framework'] },
        includeRelated: { type: 'boolean' },
      },
      required: ['apiUrl'],
    },
  },
];
