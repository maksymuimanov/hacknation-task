import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { User, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 bg-muted/20">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">System wspierania zgłoszeń i decyzji ZUS</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Inteligentny system wspierania zgłoszeń i decyzji ZUS.
          <br />
          Od chaosu do klarowności.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
        <Link to="/obywatel" className="group">
          <Card className="h-full border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-col items-center text-center space-y-4 pt-10 pb-6 relative z-10">
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <User className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Asystent obywatelski</CardTitle>
                <CardDescription className="text-base">
                  Zgłoś wypadek przy pracy, korzystając z inteligentnego kreatora.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground pb-10 relative z-10">
              Dla osób prowadzących działalność gospodarczą.
            </CardContent>
          </Card>
        </Link>
        <Link to="/urzednik" className="group">
          <Card className="h-full border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="flex flex-col items-center text-center space-y-4 pt-10 pb-6 relative z-10">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Panel analityka ZUS</CardTitle>
                <CardDescription className="text-base">
                  Weryfikuj zgłoszenia, analizuj dokumenty i generuj projekty decyzji.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground pb-10 relative z-10">
              Dla pracowników ZUS i orzeczników.
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}

export default Home;
