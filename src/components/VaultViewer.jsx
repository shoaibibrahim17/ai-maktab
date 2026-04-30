import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { safeHaptic } from '../utils/tgHelpers';

const VaultViewer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadContent = async () => {
      try {
        // Dynamic import enables code-splitting: only the viewed file is loaded into RAM
        const module = await import(`../content/vault/${slug}.md?raw`);
        if (isMounted) {
          const raw = module.default;
          const stripped = raw.replace(/^---[\s\S]*?---\n/, '');
          setContent(stripped);
        }
      } catch (err) {
        if (isMounted) {
          setContent('# 404 — Resource Not Found\n\nThis vault entry does not exist.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadContent();
    window.scrollTo(0, 0);

    return () => { isMounted = false; };
  }, [slug]);

  return (
    <div className="min-h-screen vault-page">
      <div className="star-field" />

      {/* Back navigation */}
      <div
        className="sticky top-0 z-50 glass rounded-none border-x-0 border-t-0 p-4 px-8 flex flex-col gap-3 animate-fade-in-up"
      >
        <div className="w-full text-center arabic-text text-gold" style={{ fontStyle: 'italic', opacity: 0.8, letterSpacing: '2px', fontSize: '1.1rem' }}>
          بسم الله الرحمن الرحيم
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              safeHaptic('medium');
              navigate('/');
            }}
            className="back-btn flex items-center gap-2"
          >
            ← SI | AL-MAKTABA (The Library)
          </button>
          <div className="vault-breadcrumb">
            {slug?.replace(/-/g, ' ')}
          </div>
        </div>
      </div>

      {/* Markdown content */}
      <main
        className="vault-content max-w-4xl mx-auto p-8 md:p-16 animate-fade-in-up"
        style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
      >
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="hub-badge animate-pulse">Unlocking Vault...</div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <div className="mb-10">
                  <h1 className="vault-h1" style={{ marginBottom: '0.75rem' }}>{children}</h1>
                  <a 
                    href="https://www.linkedin.com/in/shaikh-ibrahim17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    [ Tawasul (<span className="arabic-text">تواصل</span>) | Connect Me on LinkedIn ]
                  </a>
                </div>
              ),
              h2: ({ children }) => <h2 className="vault-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="vault-h3">{children}</h3>,
              h4: ({ children }) => <h4 className="vault-h4">{children}</h4>,
              p: ({ children }) => <p className="vault-p">{children}</p>,
              ul: ({ children }) => <ul className="vault-ul">{children}</ul>,
              ol: ({ children }) => <ol className="vault-ol">{children}</ol>,
              li: ({ children }) => <li className="vault-li">{children}</li>,
              code: ({ inline, children }) =>
                inline
                  ? <code className="vault-code-inline">{children}</code>
                  : <code>{children}</code>,
              pre: ({ children }) => <pre className="vault-pre">{children}</pre>,
              blockquote: ({ children }) => <blockquote className="vault-blockquote">{children}</blockquote>,
              strong: ({ children }) => <strong className="vault-strong">{children}</strong>,
              table: ({ children }) => <div className="vault-table-wrap"><table className="vault-table">{children}</table></div>,
              th: ({ children }) => <th className="vault-th">{children}</th>,
              td: ({ children }) => <td className="vault-td">{children}</td>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="vault-link">
                  {children}
                </a>
              ),
              hr: () => <hr className="vault-hr" />,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </main>

      <footer className="p-12 text-center text-sm" style={{ color: 'rgba(249, 245, 248, 0.7)' }}>
        <p>
          © 2026 Shaikh Ibrahim | The Muhandis (<span className="arabic-text text-gold" style={{ opacity: 1 }}>المهندس</span>) of the Ibrahim Maktaba
        </p>
      </footer>
    </div>
  );
};

export default VaultViewer;
