import { Hono } from 'hono';
import { z } from 'zod';

// Define Zod schemas for API validation and documentation
export const PackOptionsSchema = z.object({
  removeComments: z.boolean().optional().describe('Remove comments from source code'),
  removeEmptyLines: z.boolean().optional().describe('Remove empty lines from source code'),
  showLineNumbers: z.boolean().optional().describe('Show line numbers in output'),
  fileSummary: z.boolean().optional().describe('Include file summary in output'),
  directoryStructure: z.boolean().optional().describe('Include directory structure in output'),
  includePatterns: z.string().optional().describe('Comma-separated glob patterns to include'),
  ignorePatterns: z.string().optional().describe('Comma-separated glob patterns to ignore'),
  outputParsable: z.boolean().optional().describe('Output in parsable format'),
  compress: z.boolean().optional().describe('Compress the output'),
});

export const PackSummarySchema = z.object({
  totalFiles: z.number().describe('Total number of files processed'),
  totalCharacters: z.number().describe('Total number of characters in all files'),
  totalTokens: z.number().describe('Total number of tokens in all files'),
});

export const TopFileSchema = z.object({
  path: z.string().describe('File path'),
  charCount: z.number().describe('Number of characters in the file'),
  tokenCount: z.number().describe('Number of tokens in the file'),
});

export const PackResultSchema = z.object({
  content: z.string().describe('Packed repository content'),
  format: z.string().describe('Output format used'),
  metadata: z.object({
    repository: z.string().describe('Repository name or identifier'),
    timestamp: z.string().describe('Processing timestamp'),
    summary: PackSummarySchema.optional().describe('Summary statistics'),
    topFiles: z.array(TopFileSchema).optional().describe('Top files by size'),
  }),
});

export const ErrorResponseSchema = z.object({
  error: z.string().describe('Error message'),
  requestId: z.string().optional().describe('Request ID for tracking'),
});

// OpenAPI 3.0 specification
export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Repomix API',
    version: '1.0.0',
    description: `
# Repomix API

Pack your entire repository into a single, AI-friendly file. Perfect for feeding your codebase to Large Language Models (LLMs) or other AI tools.

## Features

- **Multiple Output Formats**: XML, Markdown, or Plain text
- **Repository Sources**: Upload ZIP files or process remote repositories (GitHub, GitLab, etc.)
- **Flexible Configuration**: Remove comments, compress output, include/exclude patterns
- **Security**: Automatic detection and exclusion of sensitive files
- **File Size Limits**: 
  - Maximum request size: 10MB
  - Maximum ZIP size: 10MB  
  - Maximum uncompressed size: 50MB
  - Maximum files in ZIP: 1000

## Usage Examples

### Process Remote Repository
\`\`\`bash
curl -X POST "https://api.repomix.com/api/pack" \\
  -F "format=xml" \\
  -F "url=https://github.com/yamadashy/repomix" \\
  -F "options={\\"removeComments\\": true}"
\`\`\`

### Process ZIP File
\`\`\`bash
curl -X POST "https://api.repomix.com/api/pack" \\
  -F "format=markdown" \\
  -F "file=@repository.zip" \\
  -F "options={\\"compress\\": true}"
\`\`\`

## Rate Limits

- Default timeout: 30 seconds per request
- Concurrent processing optimized based on server capacity

## Support

- Website: [repomix.com](https://repomix.com)
- GitHub: [yamadashy/repomix](https://github.com/yamadashy/repomix)
- Discord: [Join our community](https://discord.gg/wNYzTwZFku)
    `,
    contact: {
      name: 'Repomix Support',
      url: 'https://github.com/yamadashy/repomix/issues',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/yamadashy/repomix/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: 'https://api.repomix.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health Check',
        description: 'Check if the API server is running',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'Server is healthy',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  example: 'OK',
                },
              },
            },
          },
        },
      },
    },
    '/api/pack': {
      post: {
        summary: 'Pack Repository',
        description: 'Pack a repository (from file or URL) into a single AI-friendly file',
        tags: ['Repository Processing'],
        requestBody: {
          description: 'Repository data and options',
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  format: {
                    type: 'string',
                    enum: ['xml', 'markdown', 'plain'],
                    description: 'Output format',
                    example: 'xml',
                  },
                  options: {
                    type: 'string',
                    description: 'JSON string of options',
                    example: '{"removeComments": true, "compress": false}',
                  },
                  file: {
                    type: 'string',
                    format: 'binary',
                    description: 'ZIP file containing the repository (optional)',
                  },
                  url: {
                    type: 'string',
                    description: 'Repository URL (GitHub, GitLab, etc.) (optional)',
                    example: 'https://github.com/yamadashy/repomix',
                  },
                },
                oneOf: [
                  {
                    required: ['format', 'options', 'file'],
                  },
                  {
                    required: ['format', 'options', 'url'],
                  },
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successfully packed repository',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    content: {
                      type: 'string',
                      description: 'Packed repository content',
                    },
                    format: {
                      type: 'string',
                      description: 'Output format used',
                    },
                    metadata: {
                      type: 'object',
                      properties: {
                        repository: {
                          type: 'string',
                          description: 'Repository name or identifier',
                        },
                        timestamp: {
                          type: 'string',
                          description: 'Processing timestamp',
                        },
                        summary: {
                          type: 'object',
                          properties: {
                            totalFiles: {
                              type: 'number',
                              description: 'Total number of files processed',
                            },
                            totalCharacters: {
                              type: 'number',
                              description: 'Total number of characters in all files',
                            },
                            totalTokens: {
                              type: 'number',
                              description: 'Total number of tokens in all files',
                            },
                          },
                        },
                        topFiles: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              path: {
                                type: 'string',
                                description: 'File path',
                              },
                              charCount: {
                                type: 'number',
                                description: 'Number of characters in the file',
                              },
                              tokenCount: {
                                type: 'number',
                                description: 'Number of tokens in the file',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - validation error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Error message',
                    },
                    requestId: {
                      type: 'string',
                      description: 'Request ID for tracking',
                    },
                  },
                },
              },
            },
          },
          '413': {
            description: 'File too large',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Error message',
                    },
                    requestId: {
                      type: 'string',
                      description: 'Request ID for tracking',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Error message',
                    },
                    requestId: {
                      type: 'string',
                      description: 'Request ID for tracking',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      PackOptions: {
        type: 'object',
        properties: {
          removeComments: {
            type: 'boolean',
            description: 'Remove comments from source code',
          },
          removeEmptyLines: {
            type: 'boolean',
            description: 'Remove empty lines from source code',
          },
          showLineNumbers: {
            type: 'boolean',
            description: 'Show line numbers in output',
          },
          fileSummary: {
            type: 'boolean',
            description: 'Include file summary in output',
          },
          directoryStructure: {
            type: 'boolean',
            description: 'Include directory structure in output',
          },
          includePatterns: {
            type: 'string',
            description: 'Comma-separated glob patterns to include',
          },
          ignorePatterns: {
            type: 'string',
            description: 'Comma-separated glob patterns to ignore',
          },
          outputParsable: {
            type: 'boolean',
            description: 'Output in parsable format',
          },
          compress: {
            type: 'boolean',
            description: 'Compress the output',
          },
        },
      },
    },
  },
};

// Create Swagger routes
export const createSwaggerRoutes = (app: Hono) => {
  // OpenAPI JSON spec endpoint
  app.get('/openapi.json', (c) => {
    return c.json(openApiSpec);
  });

  // Swagger UI HTML page
  app.get('/docs', (c) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Repomix API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" />
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin:0;
      background: #fafafa;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/openapi.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });
  </script>
</body>
</html>
    `;
    return c.html(html);
  });

  // API documentation index page
  app.get('/api-docs', (c) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Repomix API</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .logo {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #6b7280;
      font-size: 1.2rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .section h2 {
      color: #1f2937;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    .links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    .link-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
    }
    .link-card:hover {
      border-color: #2563eb;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    }
    .link-card h3 {
      margin: 0 0 0.5rem 0;
      color: #2563eb;
    }
    .link-card p {
      margin: 0;
      color: #6b7280;
    }
    .code {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1rem;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🔧 Repomix API</div>
    <div class="subtitle">Pack your codebase into AI-friendly formats</div>
  </div>

  <div class="section">
    <h2>📋 API Documentation</h2>
    <div class="links">
      <a href="/docs" class="link-card">
        <h3>📖 Swagger UI</h3>
        <p>Interactive API documentation with example requests</p>
      </a>
      <a href="/openapi.json" class="link-card">
        <h3>📄 OpenAPI Spec</h3>
        <p>Raw OpenAPI 3.0 specification in JSON format</p>
      </a>
      <a href="/health" class="link-card">
        <h3>💚 Health Check</h3>
        <p>Simple endpoint to check if the API is running</p>
      </a>
    </div>
  </div>

  <div class="section">
    <h2>🚀 Quick Start</h2>
    <p>Process a remote repository:</p>
    <div class="code">curl -X POST "${c.req.url.replace('/api-docs', '/api/pack')}" \\
  -F "format=xml" \\
  -F "url=https://github.com/yamadashy/repomix" \\
  -F "options={}"</div>
  </div>

  <div class="section">
    <h2>🔗 External Links</h2>
    <div class="links">
      <a href="https://repomix.com" class="link-card">
        <h3>🌐 Website</h3>
        <p>Official Repomix website</p>
      </a>
      <a href="https://github.com/yamadashy/repomix" class="link-card">
        <h3>🐙 GitHub</h3>
        <p>Source code and documentation</p>
      </a>
      <a href="https://discord.gg/wNYzTwZFku" class="link-card">
        <h3>💬 Discord</h3>
        <p>Join our community</p>
      </a>
    </div>
  </div>
</body>
</html>
    `;
    return c.html(html);
  });

  return app;
};

// Export schemas for use in main app
export type PackOptions = z.infer<typeof PackOptionsSchema>;
export type PackResult = z.infer<typeof PackResultSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
