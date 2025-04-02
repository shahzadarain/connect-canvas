
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const createMCPPost = async () => {
  try {
    // Check if the post already exists
    const { data: existingPost, error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .ilike('title', '%Model Context Protocol%')
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for existing post:', checkError);
      throw checkError;
    }

    if (existingPost) {
      console.log('MCP blog post already exists');
      return { success: false, message: 'Blog post already exists', id: existingPost.id };
    }

    // Create the blog post with well-formatted content
    const content = `# Understanding the Model Context Protocol (MCP)

The Model Context Protocol (MCP) is an open standard designed to enable AI applications, such as chatbots or virtual assistants, to seamlessly connect with external data sources and tools. This connection allows AI systems to access up-to-date information and perform tasks more effectively.

## The Universal Connector for AI Systems

Think of MCP as the "USB-C for AI applications." Just as USB-C provides a universal port to connect various devices like smartphones, laptops, and external drives, MCP offers a standardized method for AI applications to interface with different data sources and services.

![MCP Connectivity Diagram](/lovable-uploads/photo-1581091226825-a6a2a5aee158.png)

## How MCP Works

The Model Context Protocol operates through a client-server architecture:

* **MCP Clients**: These are AI applications that need access to external data or functionalities.
* **MCP Servers**: These provide specific capabilities, such as access to databases, web services, or other tools.

When an AI application (the MCP Client) requires information or needs to perform a task beyond its built-in capabilities, it sends a request through MCP to the appropriate MCP Server. The server processes this request and returns the necessary data or performs the action, enabling the AI application to deliver more accurate and context-aware responses.

## Key Benefits of the Model Context Protocol

### Standardization
Provides a uniform way for AI applications to interact with various external systems, reducing the need for custom integrations.

### Flexibility
Allows AI applications to switch between different data sources or tools without significant changes to their core architecture.

### Enhanced Functionality
Enables AI systems to access real-time data and perform a broader range of tasks by leveraging external resources.

## Real-World Applications

1. **Enterprise Chatbots**: Access company databases to provide employees with the latest internal information.
2. **Customer Support AI**: Connect to order management systems to check delivery status or process returns.
3. **Research Assistants**: Query specialized academic databases to retrieve the most current scholarly articles.
4. **Personal Assistants**: Interface with smart home systems, calendars, and online services to provide comprehensive assistance.

By implementing MCP, developers can create AI applications that are more versatile, efficient, and capable of integrating seamlessly with a wide array of external systems and data sources.`;

    const tags = [
      'Model Context Protocol',
      'MCP',
      'AI Integration',
      'AI Standards',
      'Data Connectivity',
      'AI Development',
      'Machine Learning',
      'API Standards',
      'AI Infrastructure',
      'Tech Standards'
    ];

    // Create the blog post
    const { data: newPost, error: createError } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: 'The Model Context Protocol (MCP): The USB-C for AI Applications',
          slug: 'model-context-protocol-mcp-usb-c-for-ai',
          content: content,
          excerpt: 'Discover how the Model Context Protocol (MCP) is revolutionizing AI applications by providing a standardized way to connect with external data sources and tools.',
          author: 'Shahzad ASGHAR',
          status: 'published',
          published_at: new Date().toISOString(),
          featured_image: '/lovable-uploads/photo-1581091226825-a6a2a5aee158.png',
          tags: tags,
          meta_title: 'Model Context Protocol (MCP): The Universal Standard for AI Integration',
          meta_description: 'Learn how the Model Context Protocol creates a standardized way for AI applications to connect with external data sources and tools, enhancing functionality and versatility.',
          meta_keywords: ['Model Context Protocol', 'MCP', 'AI integration', 'data connectivity', 'AI standards', 'external tools', 'AI development', 'chatbot enhancement', 'AI infrastructure', 'universal AI protocol']
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error('Error creating MCP blog post:', createError);
      throw createError;
    }

    console.log('Created MCP blog post successfully:', newPost);
    return { success: true, message: 'MCP blog post created successfully', id: newPost.id };
  } catch (error) {
    console.error('Error in createMCPPost:', error);
    throw error;
  }
};
