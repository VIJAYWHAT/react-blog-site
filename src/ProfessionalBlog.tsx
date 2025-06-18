import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ArrowLeft, Clock, CalendarDays, BookOpen } from 'lucide-react';
import { Skeleton } from "./components/ui/skeleton";
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";

// Sample blog posts in markdown format
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "2023-10-15",
    excerpt: "Learn the fundamentals of React development",
    readTime: "5 min read",
    markdown: `# Getting Started with React

React is a JavaScript library for building user interfaces. Here's what you need to know:

## Core Concepts

1. **Components**: The building blocks of React apps
2. **JSX**: Syntax extension that allows HTML in JavaScript
3. **State**: Data that changes over time in your components
4. **Props**: Passing data between components

## Installation

To create a new React app:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will start a development server at http://localhost:3000
`,
    tags: ["React", "Frontend", "JavaScript"]
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    date: "2023-11-02",
    excerpt: "Explore powerful TypeScript techniques for better code",
    readTime: "8 min read",
    markdown: `# Advanced TypeScript Patterns

TypeScript brings type safety to JavaScript. Here are some advanced patterns:

## Utility Types

\`\`\`typescript
type Partial<T> = { [P in keyof T]?: T[P] }
type Readonly<T> = { readonly [P in keyof T]: T[P] }
\`\`\`

## Conditional Types

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T
type Flatten<T> = T extends Array<infer U> ? U : T
\`\`\`

## Best Practices

1. Use strict mode
2. Prefer interfaces for public API
3. Use type guards
4. Leverage discriminated unions
`,
    tags: ["TypeScript", "Advanced", "Web Development"]
  },
  {
    id: 3,
    title: "CSS Architecture with Tailwind",
    date: "2023-11-20",
    excerpt: "Structure your CSS for maintainability at scale",
    readTime: "6 min read",
    markdown: `# CSS Architecture with Tailwind

Tailwind CSS provides utility classes that let you build designs directly in your markup.

## Benefits

- **No naming**: No need to invent class names
- **Consistency**: Design tokens ensure uniformity
- **Performance**: Only generates CSS you actually use

## Example Component

\`\`\`html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
\`\`\`

## Best Practices

1. Use @apply for repeated utility combinations
2. Extract components for complex UI
3. Customize your design tokens
4. Use plugins for extensions
`,
    tags: ["CSS", "Tailwind", "Frontend"]
  }
];

marked.use(markedHighlight({
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

function MarkdownRenderer({ content }: { content: string }) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const renderMarkdown = async () => {
      const result = await marked(content);
      setHtml(result);
    };

    renderMarkdown();
  }, [content]);

  return (
    <div 
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none 
                prose-headings:text-foreground prose-a:text-blue-600 
                hover:prose-a:text-blue-500 prose-code:bg-muted/50 
                prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted/80 
                prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}

function PostCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}

function PostCard({ post, onClick }: { post: typeof blogPosts[0], onClick: () => void }) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col group">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={onClick}
          className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
        >
          Read
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProfessionalBlog() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostClick = (post: typeof blogPosts[0]) => {
    setIsLoading(true);
    // Simulate loading for demo purposes
    setTimeout(() => {
      setSelectedPost(post);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Dev Insights</h1>
            <p className="text-blue-100 max-w-2xl">
              Expert articles on modern web development, frameworks, and best practices
            </p>
            <div className="mt-6 flex space-x-2">
              {['React', 'TypeScript', 'CSS', 'JavaScript', 'Frontend'].map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {isLoading ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col space-y-6">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-8 w-48" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
            </div>
          </div>
        ) : selectedPost ? (
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Back to all posts
            </Button>
            
            <article className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <MarkdownRenderer content={selectedPost.markdown} />
              </div>
              
              <div className="pt-6 border-t">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPost(null)}
                    className="group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to all posts
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Thanks for reading!</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Latest Articles</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 rounded-lg border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handlePostClick(post)} 
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="px-6">
                Load More Articles
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Dev Insights</h3>
              <p className="text-muted-foreground text-sm">
                Expert articles on modern web development, frameworks, and best practices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Articles</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Get the latest articles delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg border border-r-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full"
                />
                <Button className="rounded-l-none px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Dev Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}