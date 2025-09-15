import { IAdminLayoutProps } from "./type/AdminLayout.types";

/**
 * 관리자 페이지 공통 레이아웃 템플릿
 * @example
 * <AdminLayout
 *   title="Admin Dashboard"
 *   subtitle="지난 7일 요약"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Admin' },
 *   ]}
 *   actions={
 *     <div className="flex gap-2">
 *       <button className="rounded-md bg-black px-3 py-1 text-white">New</button>
 *       <button className="rounded-md bg-neutral-200 px-3 py-1">Export</button>
 *     </div>
 *   }
 * >
 *   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
 *      ...KPIs / Panels...
 *   </div>
 * </AdminLayout>
 */
export default function AdminLayout({
  title,
  subtitle,
  actions,
  breadcrumbs,
  onBack,
  children,
  withContainer = true,
  className = "",
}: IAdminLayoutProps) {
  const Container = withContainer
    ? ({ children: c }: { children: React.ReactNode }) => (
        <div className="mx-auto max-w-7xl p-4 md:p-6">{c}</div>
      )
    : ({ children: c }: { children: React.ReactNode }) => <>{c}</>;
  return (
    <div className={`min-h-screen ${className}`}>
      <header
        className="border-b bg-white/70 backdrop-blur"
        role="banner"
        aria-label="admin header"
      >
        <Container>
          <div className="flex flex-col gap-3">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
                  {breadcrumbs.map((b, i) => (
                    <li key={b.label} className="flex items-center gap-1">
                      {b.href ? (
                        <a href={b.href} className="underline-offset-2 hover:underline">
                          {b.label}
                        </a>
                      ) : (
                        <span aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}>
                          {b.label}
                        </span>
                      )}
                      {i < breadcrumbs.length - 1 && <span>›</span>}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                {onBack && (
                  <button
                    type="button"
                    aria-label="Go back"
                    onClick={onBack}
                    className="mt-0.5 rounded-full bg-neutral-200 px-2 py-1 text-sm"
                    title="Back"
                  >
                    ←
                  </button>
                )}
                <div>
                  <h1 className="text-xl font-semibold">{title}</h1>
                  {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
                </div>
              </div>
              {actions && <div className="shrink-0">{actions}</div>}
            </div>
          </div>
        </Container>
      </header>

      <main role="main" aria-label="admin content">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
