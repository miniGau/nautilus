import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { z } from 'zod';

const mcpServer = new McpServer({
  name: 'example-mcp-server',
  version: '1.0.0',
});

// Register the echo tool
mcpServer.registerTool(
  'echo',
  {
    description: 'Echo back a message',
    inputSchema: {
      message: z.string().describe('Message to echo back'),
    },
  },
  async ({ message }) => {
    console.log(`Received echo request: ${message}`);
    return {
      content: [
        {
          type: 'text',
          text: `Echo: ${message}`,
        },
      ],
    };
  }
);

async function main() {
  try {
    console.log('Starting MCP server...');
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.log('MCP server connected successfully');
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    throw error;
  }
}

main().catch((err) => {
  console.error('MCP server failed:', err);
  process.exit(1);
});
