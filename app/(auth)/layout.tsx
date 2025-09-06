import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  L
                </span>
              </div>
              <span className="font-bold text-xl">LAVC Platform</span>
            </Link>
          </div>

          {children}
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative flex items-center justify-center p-12 text-white">
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-4xl font-bold">
              Gestiona tus eventos veterinarios
            </h1>
            <p className="text-lg opacity-90">
              La plataforma más completa para organizar conferencias, gestionar
              participantes y generar reportes profesionales.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm opacity-80">Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-80">Eventos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15</div>
                <div className="text-sm opacity-80">Países</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">Disponibilidad</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}
