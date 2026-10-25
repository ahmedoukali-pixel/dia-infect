import { useEffect, useState } from 'react';

const API_URL = (
  import.meta.env.VITE_API_URL || 'https://dia-infect-backend.onrender.com'
).replace(/\/+$/, '');

type ApiStatus = 'checking' | 'online' | 'offline';

const modules = [
  {
    number: '01',
    title: 'Data intake',
    status: 'Planned',
    description:
      'A future controlled workflow for permitted research data and input validation.',
  },
  {
    number: '02',
    title: 'Laboratory review',
    status: 'Planned',
    description:
      'A future module for units, missing values, and data-quality checks.',
  },
  {
    number: '03',
    title: 'Model evaluation',
    status: 'Not connected',
    description:
      'No prediction is generated in this release. A validated model must be integrated separately.',
  },
];

export default function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking');
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    let currentController: AbortController | undefined;

    async function checkApi() {
      currentController?.abort();
      const controller = new AbortController();
      currentController = controller;

      try {
        const response = await fetch(`${API_URL}/api/health`, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`API returned HTTP ${response.status}`);
        }

        const data: unknown = await response.json();

        if (
          typeof data !== 'object' ||
          data === null ||
          !('status' in data) ||
          data.status !== 'ok'
        ) {
          throw new Error('Unexpected API health response');
        }

        if (active) {
          setApiStatus('online');
          setLastChecked(new Date().toLocaleTimeString());
        }
      } catch {
        if (active && !controller.signal.aborted) {
          setApiStatus('offline');
          setLastChecked(new Date().toLocaleTimeString());
        }
      }
    }

    void checkApi();
    timer = setInterval(() => void checkApi(), 30_000);

    return () => {
      active = false;
      currentController?.abort();
      if (timer) clearInterval(timer);
    };
  }, []);

  const statusText: Record<ApiStatus, string> = {
    checking: 'Checking API connection…',
    online: 'API connected',
    offline: 'API unavailable',
  };

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="#">
          <span className="brand-mark">D</span>
          DiaInfect
        </a>
        <span className="version">V0.1.0 · FOUNDATION</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span className="pulse" />
          RESEARCH PLATFORM · EARLY DEVELOPMENT
        </div>

        <h1>
          Evidence first.
          <br />
          <span>Build with care.</span>
        </h1>

        <p className="intro">
          A foundation for a carefully validated infection-risk research
          workflow. This release establishes the software structure only—no
          clinical prediction is enabled.
        </p>

        <div className="hero-actions">
          <a className="primary" href="#modules">
            Explore the foundation <span>↘</span>
          </a>

          <span
            className="status-note"
            role="status"
            aria-live="polite"
            title={
              lastChecked
                ? `Last checked at ${lastChecked}`
                : 'Waiting for the first health check'
            }
          >
            <span
              aria-hidden="true"
              style={{
                color:
                  apiStatus === 'online'
                    ? '#16a34a'
                    : apiStatus === 'offline'
                      ? '#dc2626'
                      : '#a3a3a3',
              }}
            >
              ●
            </span>{' '}
            {statusText[apiStatus]}
          </span>
        </div>

        {apiStatus === 'offline' && (
          <p className="api-warning" role="status">
            The API could not be reached. It may be starting up, or the
            connection may be blocked. Please try again shortly.
          </p>
        )}

        <div className="notice">
          <span className="notice-icon">i</span>
          <p>
            <strong>Research prototype — not for clinical use.</strong> Do not
            enter identifiable or real patient data. No diagnosis or risk score
            is produced in V0.1.0.
          </p>
        </div>
      </section>

      <section id="modules" className="modules">
        <div className="section-heading">
          <div>
            <p className="kicker">ROADMAP</p>
            <h2>Platform modules</h2>
          </div>
          <span className="counter">03 MODULES</span>
        </div>

        <div className="cards">
          {modules.map((module) => (
            <article className="card" key={module.number}>
              <div className="card-top">
                <span className="number">{module.number}</span>
                <span
                  className={
                    module.status === 'Not connected' ? 'tag muted' : 'tag'
                  }
                >
                  {module.status}
                </span>
              </div>

              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="card-line" />
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>
          DiaInfect <span className="dim">/ V0.1.0</span>
        </span>
        <span className="dim">
          Built for research · Validation before deployment
        </span>
      </footer>
    </main>
  );
}
