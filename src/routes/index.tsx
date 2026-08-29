import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  PieChart as PieChartIcon,
  BarChart3,
  FlaskConical,
  Trophy,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Q3 2026 — Organizador Financeiro" },
      {
        name: "description",
        content:
          "Dashboard de métricas do App Organizador Financeiro no Q3 2026: NPS, CSAT, churn, instalações, funil de conversão e teste A/B de push.",
      },
      { property: "og:title", content: "Dashboard Q3 2026 — Organizador Financeiro" },
      {
        property: "og:description",
        content:
          "Métricas de produto do Q3 2026: NPS 71, CSAT 4,7, churn 2,1%, 24.800 usuários ativos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  {
    label: "NPS",
    value: "71",
    previous: "64",
    delta: "+7 pts",
    positive: true,
    hint: "Excelente (zona de qualidade)",
  },
  {
    label: "CSAT",
    value: "4,7",
    previous: "4,4",
    delta: "+0,3",
    positive: true,
    hint: "Satisfação média (escala 1–5)",
  },
  {
    label: "Churn",
    value: "2,1%",
    previous: "2,8%",
    delta: "-0,7 p.p.",
    positive: true,
    hint: "Cancelamentos no trimestre",
  },
  {
    label: "Usuários ativos",
    value: "24.800",
    previous: "21.300",
    delta: "+16,4%",
    positive: true,
    hint: "MAU em setembro",
  },
];

const installs = [
  { mes: "Jul", Instalações: 9200, Desinstalações: 2100 },
  { mes: "Ago", Instalações: 10500, Desinstalações: 2450 },
  { mes: "Set", Instalações: 11800, Desinstalações: 2600 },
];

const funnel = [
  { etapa: "Visitaram a loja", valor: 31500 },
  { etapa: "Instalaram o app", valor: 22400 },
  { etapa: "Criaram conta", valor: 14800 },
  { etapa: "Conectaram banco", valor: 9100 },
  { etapa: "Assinaram o Pro", valor: 3200 },
];

const motivos = [
  { name: "Preço da assinatura", value: 34 },
  { name: "Sincronização bancária", value: 22 },
  { name: "Pouco uso", value: 19 },
  { name: "Falta de recursos", value: 15 },
  { name: "Outros", value: 10 },
];

const pieColors = [
  "oklch(0.577 0.215 27)",
  "oklch(0.68 0.15 55)",
  "oklch(0.7 0.14 85)",
  "oklch(0.62 0.1 195)",
  "oklch(0.52 0.13 163)",
];

const numFmt = (v: number) => v.toLocaleString("pt-BR");

function KpiCard({
  label,
  value,
  previous,
  delta,
  positive,
  hint,
}: (typeof kpis)[number]) {
  const Icon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              positive ? "bg-accent text-primary" : "bg-destructive/10 text-destructive"
            }`}
          >
            <Icon className="h-3 w-3" />
            {delta}
          </span>
        </div>
        <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Anterior: <span className="font-medium text-foreground">{previous}</span>
          {" · "}
          {hint}
        </p>
      </CardContent>
    </Card>
  );
}

function SectionTitle({ icon: Icon, title, sub }: { icon: typeof BarChart3; title: string; sub: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground sm:text-lg">{title}</h2>
        <p className="text-xs text-muted-foreground sm:text-sm">{sub}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const funnelMax = funnel[0].valor;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:flex sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">
                App Organizador Financeiro
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Dashboard de métricas · Q3 2026 (Jul – Ago – Set)
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Q3 2026
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* KPIs */}
        <section aria-label="Indicadores-chave">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </div>
        </section>

        {/* Installs vs uninstalls */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <SectionTitle
              icon={BarChart3}
              title="Instalações vs. desinstalações"
              sub="Crescimento líquido positivo nos três meses do trimestre"
            />
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={installs} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" tickFormatter={numFmt} />
                  <Tooltip
                    formatter={(v: number) => numFmt(v)}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      fontSize: 13,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Bar dataKey="Instalações" fill="oklch(0.52 0.13 163)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Desinstalações" fill="oklch(0.577 0.215 27)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Funnel */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <SectionTitle
                icon={Filter}
                title="Funil de conversão"
                sub="Do acesso à loja até a assinatura do plano Pro"
              />
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {funnel.map((f, i) => {
                const pct = (f.valor / funnelMax) * 100;
                const prev = i > 0 ? funnel[i - 1].valor : null;
                return (
                  <div key={f.etapa}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                      <span className="min-w-0 truncate font-medium text-foreground">
                        {f.etapa}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {numFmt(f.valor)}
                        {prev !== null && (
                          <span className="ml-1 font-semibold text-primary">
                            ({((f.valor / prev) * 100).toFixed(1).replace(".", ",")}%)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%`, opacity: 1 - i * 0.13 }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="pt-1 text-xs text-muted-foreground">
                Conversão total do funil:{" "}
                <span className="font-semibold text-foreground">
                  {((funnel[4].valor / funnelMax) * 100).toFixed(1).replace(".", ",")}%
                </span>{" "}
                — gargalo principal entre criar conta e conectar banco.
              </p>
            </CardContent>
          </Card>

          {/* Pie */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <SectionTitle
                icon={PieChartIcon}
                title="Motivos de desinstalação"
                sub="Distribuição das respostas de quem removeu o app no Q3"
              />
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={motivos}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="45%"
                      outerRadius="75%"
                      paddingAngle={3}
                      strokeWidth={0}
                      label={({ value }) => `${value}%`}
                      fontSize={12}
                    >
                      {motivos.map((m, i) => (
                        <Cell key={m.name} fill={pieColors[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => `${v}%`}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        fontSize: 13,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} layout="horizontal" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground">
                Preço da assinatura é o maior motivo (34%), seguido por problemas de
                sincronização bancária (22%).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* A/B test */}
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <SectionTitle
              icon={FlaskConical}
              title="Teste A/B — Notificações push"
              sub="Reengajamento de usuários inativos há mais de 7 dias"
            />
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-accent px-4 py-3">
              <Trophy className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-accent-foreground">
                <span className="font-semibold">Variante B venceu</span> com significância
                estatística de <span className="font-semibold">96%</span> — recomenda-se
                adotar a cópia da Variante B nas próximas campanhas.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Variante</th>
                    <th className="py-2 pr-4 font-medium">Envios</th>
                    <th className="py-2 pr-4 font-medium">Taxa de retorno</th>
                    <th className="py-2 pr-4 font-medium">Retornos</th>
                    <th className="py-2 font-medium">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium">A — Lembrete genérico</td>
                    <td className="py-3 pr-4">8.000</td>
                    <td className="py-3 pr-4">3,5%</td>
                    <td className="py-3 pr-4">280</td>
                    <td className="py-3 text-muted-foreground">Controle</td>
                  </tr>
                  <tr className="bg-accent/60">
                    <td className="py-3 pr-4 font-medium">B — Meta de economia personalizada</td>
                    <td className="py-3 pr-4">8.000</td>
                    <td className="py-3 pr-4 font-semibold text-primary">5,1%</td>
                    <td className="py-3 pr-4 font-semibold">408</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                        <Trophy className="h-3 w-3" /> Vencedora
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Uplift relativo de +45,7% na taxa de retorno · IC 95% · teste executado em
              agosto de 2026.
            </p>
          </CardContent>
        </Card>

        <footer className="pb-4 text-center text-xs text-muted-foreground">
          Dados consolidados do trimestre Q3 2026 · App Organizador Financeiro
        </footer>
      </main>
    </div>
  );
}
