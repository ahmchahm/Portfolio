import React from 'react';

export default async function ProjectPage({ params }) {
  const { id } = params;
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const apiUrl = baseURL.startsWith('http') ? baseURL : `${protocol}://${baseURL}`;
    const res = await fetch(`${apiUrl}/api/projects/${id}`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok) {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-gray-500">The requested project could not be found.</p>
        </div>
      );
    }

    const p = data.project;
    
    // Sanitize description: remove MS Office XML comments
    const sanitizeHtml = (html) => {
      return html
        .replace(/<!--\[if gte mso \d+\]>[\s\S]*?<!\[endif\]-->/g, '') // Remove MS Office conditionals
        .replace(/<!--[\s\S]*?-->/g, '') // Remove all HTML comments
        .replace(/<o:\w+[^>]*>/g, '') // Remove Office namespace tags
        .trim();
    };
    
    const cleanDescription = sanitizeHtml(p.description || '');
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{p.title}</h1>
        {p.image && <div className="mb-4"><img src={p.image} alt={p.title} className="w-full rounded" /></div>}
        <div className="mb-4 text-lg prose prose-invert" dangerouslySetInnerHTML={{ __html: cleanDescription }} />
        <div className="mb-4">
          <h3 className="font-semibold">Technologies</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {(p.technologies || []).map((t, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          {p.github && <a className="px-4 py-2 bg-gray-800 text-white rounded" href={p.github} target="_blank" rel="noreferrer">Source</a>}
          {p.demo && <a className="px-4 py-2 bg-blue-600 text-white rounded" href={p.demo} target="_blank" rel="noreferrer">Live Demo</a>}
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-gray-500">Unable to load project.</p>
      </div>
    );
  }
}
