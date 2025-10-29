/**
 * Tool handlers for Apple Developer Documentation MCP Server
 */

import {
  searchAppleDocsSchema,
  getAppleDocContentSchema,
  listTechnologiesSchema,
  searchFrameworkSymbolsSchema,
  getRelatedApisSchema,
  getPlatformCompatibilitySchema,
} from '../schemas/index.js';

/**
 * Tool handler function type
 */
export type ToolHandler = (
  args: unknown,
  server: any
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

/**
 * Map of tool names to their handlers (trimmed to 6 tools)
 */
export const toolHandlers: Record<string, ToolHandler> = {
  search_apple_docs: async (args, server) => {
    const validatedArgs = searchAppleDocsSchema.parse(args);
    return await server.searchAppleDocs(validatedArgs.query, validatedArgs.type);
  },

  get_apple_doc_content: async (args, server) => {
    const validatedArgs = getAppleDocContentSchema.parse(args);
    return await server.getAppleDocContent(
      validatedArgs.url,
      validatedArgs.includeRelatedApis,
      validatedArgs.includeReferences,
      validatedArgs.includeSimilarApis,
      validatedArgs.includePlatformAnalysis,
    );
  },

  list_technologies: async (args, server) => {
    const validatedArgs = listTechnologiesSchema.parse(args);
    return await server.listTechnologies(
      validatedArgs.category,
      validatedArgs.language,
      validatedArgs.includeBeta,
      validatedArgs.limit,
    );
  },

  search_framework_symbols: async (args, server) => {
    const validatedArgs = searchFrameworkSymbolsSchema.parse(args);
    return await server.searchFrameworkSymbols(
      validatedArgs.framework,
      validatedArgs.symbolType,
      validatedArgs.namePattern,
      validatedArgs.language,
      validatedArgs.limit,
    );
  },

  get_related_apis: async (args, server) => {
    const validatedArgs = getRelatedApisSchema.parse(args);
    return await server.getRelatedApis(
      validatedArgs.apiUrl,
      validatedArgs.includeInherited,
      validatedArgs.includeConformance,
      validatedArgs.includeSeeAlso,
    );
  },

  get_platform_compatibility: async (args, server) => {
    const validatedArgs = getPlatformCompatibilitySchema.parse(args);
    return await server.getPlatformCompatibility(
      validatedArgs.apiUrl,
      validatedArgs.compareMode,
      validatedArgs.includeRelated,
    );
  },
};

/**
 * Handle tool call with the appropriate handler
 */
export async function handleToolCall(
  toolName: string,
  args: unknown,
  server: any,
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  try {
    const handler = toolHandlers[toolName];
    if (!handler) {
      throw new Error(`Unknown tool: ${toolName}`);
    }

    return await handler(args, server) as { content: Array<{ type: string; text: string }>; isError?: boolean };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
      }],
      isError: true,
    };
  }
}
