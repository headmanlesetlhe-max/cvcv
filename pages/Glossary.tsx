import React, { useState } from 'react';
import { Search, BookOpen, Tag } from 'lucide-react';

interface Term {
  term: string;
  definition: string;
  category: 'Language' | 'Tool' | 'Concept' | 'Platform';
}

const terms: Term[] = [
  {
    term: "HTML",
    definition: "HyperText Markup Language. The skeleton of a website. It tells the browser what is a heading, a paragraph, an image, etc.",
    category: "Language"
  },
  {
    term: "CSS",
    definition: "Cascading Style Sheets. The clothing of a website. It tells the browser how things should look (colors, fonts, spacing).",
    category: "Language"
  },
  {
    term: "JavaScript",
    definition: "The muscles of a website. It makes things interactive (like what happens when you click a button or submit a form).",
    category: "Language"
  },
  {
    term: "DOM",
    definition: "Document Object Model. Think of it as a family tree of your HTML elements that the browser creates. JavaScript uses this tree to change things on the page.",
    category: "Concept"
  },
  {
    term: "Repository (Repo)",
    definition: "A storage location for your project's code files. It's like a folder, but supercharged with history tracking (Git).",
    category: "Concept"
  },
  {
    term: "Deploy",
    definition: "The process of moving your website from your computer to a server on the internet so others can see it.",
    category: "Concept"
  },
  {
    term: "Hosting",
    definition: "A service that provides space on a server to store your website files. Netlify is a hosting provider.",
    category: "Concept"
  },
  {
    term: "Domain",
    definition: "The address of your website (e.g., google.com). It's easier for humans to remember than an IP address.",
    category: "Concept"
  },
  {
    term: "IDE",
    definition: "Integrated Development Environment. A fancy word for a code editor with extra tools. VS Code is an IDE.",
    category: "Tool"
  },
  {
    term: "Extension",
    definition: "A plugin that adds new features to your software. 'Live Server' is an extension for VS Code.",
    category: "Tool"
  },
  {
    term: "VS Code",
    definition: "Visual Studio Code. A free, popular code editor made by Microsoft. It's the industry standard for web development.",
    category: "Tool"
  },
  {
    term: "Netlify",
    definition: "A platform that hosts websites for free. It's famous for being very easy to use for beginners.",
    category: "Platform"
  },
  {
    term: "GitHub",
    definition: "A website that hosts your Git repositories. It allows you to backup your code and share it with other developers.",
    category: "Platform"
  },
  {
    term: "Frontend",
    definition: "The part of the website users see and interact with (built with HTML, CSS, JS).",
    category: "Concept"
  },
  {
    term: "Browser",
    definition: "Software used to view websites (e.g., Chrome, Firefox, Safari). It reads your HTML/CSS and paints the screen.",
    category: "Tool"
  }
];

export const Glossary: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Language': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Tool': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Concept': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Platform': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-emerald-400" />
          WebDev Dictionary
        </h1>
        <p className="text-slate-400 text-lg">
          Stuck on a word? Here is your cheat sheet for developer jargon.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search for a term..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="grid gap-4">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-900 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.term}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500">
            No terms found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
};