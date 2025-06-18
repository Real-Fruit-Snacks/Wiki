---
title: Personal Blog Platform
tags: [projects, blog, gatsby, graphql, cms]
created: 2024-01-30
author: Blog Team
description: JAMstack blog built with Gatsby and headless CMS
updated: 2024-02-28
category: projects
status: published
---

# Personal Blog Platform

## Project Goals

Create a fast, modern blog platform with:
- Static site generation for performance
- MDX support for interactive content
- SEO optimization
- Dark mode support
- Comment system
- Newsletter integration
- Analytics

## Technology Stack

- **Gatsby** - Static site generator
- **GraphQL** - Data layer
- **MDX** - Markdown with JSX
- **Tailwind CSS** - Styling
- **Netlify CMS** - Content management
- **Algolia** - Search functionality
- **Disqus** - Comments
- **Mailchimp** - Newsletter

## Project Structure

```
personal-blog/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   ├── SEO/
│   │   ├── BlogPost/
│   │   ├── Navigation/
│   │   └── ThemeToggle/
│   ├── pages/
│   ├── templates/
│   ├── hooks/
│   └── utils/
├── content/
│   ├── blog/
│   ├── pages/
│   └── images/
├── gatsby-config.js
├── gatsby-node.js
└── gatsby-browser.js
```

## Key Features Implementation

### MDX Setup

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              quality: 90,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
            },
          },
        ],
      },
    },
  ],
};
```

### Blog Post Template

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { formatDate } from '../utils/helpers';

const BlogPostTemplate = ({ data }) => {
  const { mdx } = data;
  const { title, date, description, tags } = mdx.frontmatter;

  return (
    <Layout>
      <SEO 
        title={title}
        description={description}
        article
      />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span>{mdx.timeToRead} min read</span>
          </div>
          <div className="flex gap-2 mt-4">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
        
        <footer className="mt-12 pt-8 border-t">
          <NewsletterSignup />
          <ShareButtons url={mdx.fields.slug} title={title} />
          <Comments />
        </footer>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date
        description
        tags
      }
    }
  }
`;

export default BlogPostTemplate;
```

### Dynamic OG Images

```javascript
// gatsby-node.js
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  for (const post of result.data.allMdx.nodes) {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);
    
    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(post.frontmatter.title, 600, 315);
    
    // Save image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(
      `public/og-images${post.fields.slug}.png`,
      buffer
    );
  }
};
```

### Search Implementation

```javascript
// Search component using Algolia
import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InstantSearch searchClient={searchClient} indexName="blog_posts">
      <Configure hitsPerPage={5} />
      <div className="relative">
        <SearchBox
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4">
            <Hits hitComponent={Hit} />
          </div>
        )}
      </div>
    </InstantSearch>
  );
};

const Hit = ({ hit }) => (
  <Link to={hit.slug} className="block p-2 hover:bg-gray-100 rounded">
    <h4 className="font-semibold">
      <Highlight attribute="title" hit={hit} />
    </h4>
    <p className="text-sm text-gray-600">
      <Highlight attribute="excerpt" hit={hit} />
    </p>
  </Link>
);
```

### Theme Toggle Hook

```javascript
// useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
```

## Content Management

### Netlify CMS Configuration

```yaml
# static/admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: static/images
public_folder: /images

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Featured Image", name: "featuredImage", widget: "image"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Body", name: "body", widget: "markdown"}
```

## Performance Optimizations

### Image Optimization
```javascript
// gatsby-config.js
{
  resolve: `gatsby-plugin-sharp`,
  options: {
    defaults: {
      formats: [`auto`, `webp`, `avif`],
      placeholder: `blurred`,
      quality: 90,
      breakpoints: [640, 768, 1024, 1280, 1536],
    },
  },
}
```

### PWA Configuration
```javascript
{
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: `Personal Blog`,
    short_name: `Blog`,
    start_url: `/`,
    background_color: `#ffffff`,
    theme_color: `#663399`,
    display: `minimal-ui`,
    icon: `src/images/icon.png`,
  },
},
`gatsby-plugin-offline`,
```

## Deployment

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "public"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-gatsby"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "same-origin"
```

## Analytics Integration

```javascript
// gatsby-config.js
{
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    trackingIds: [process.env.GA_TRACKING_ID],
    gtagConfig: {
      anonymize_ip: true,
      cookie_expires: 0,
    },
    pluginConfig: {
      head: true,
      respectDNT: true,
    },
  },
}
```

## Future Enhancements

- [ ] RSS feed generation
- [ ] Podcast episode support
- [ ] Multi-language support
- [ ] A/B testing for titles
- [ ] Reading progress indicator
- [ ] Related posts algorithm
- [ ] Social media auto-posting