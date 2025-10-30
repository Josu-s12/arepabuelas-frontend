export default function Footer(){
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-red-700">Arepabuelas de la esquina</h4>
          <p className="text-sm text-neutral-600 mt-1">Tradición boyacense al alcance de un clic. Hecho con amor, servido con seguridad.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Soporte</h5>
          <ul className="text-sm text-neutral-700 space-y-1">
            <li>Preguntas frecuentes</li>
            <li>Políticas de envíos y devoluciones</li>
            <li>Seguridad y privacidad</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Confianza</h5>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">HTTPS</span>
            <span className="badge">Pago simulado seguro</span>
            <span className="badge">Validación de usuario</span>
            <span className="badge">Anti‑XSS/CSRF</span>
          </div>
        </div>
      </div>
      <div className="bg-red-50 border-t border-red-100">
        <div className="container mx-auto px-4 py-3 text-xs text-neutral-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Arepabuelas de la esquina</span>
          <span>Hecho con 🫶 y 🛡️ por Antipinzas Group</span>
        </div>
      </div>
    </footer>
  )
}