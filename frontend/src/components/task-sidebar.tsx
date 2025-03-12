export function TaskSidebar() {
  return (
    <div className="w-64 border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Estado</h3>
          <ul className="space-y-2">
            <li>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Por hacer
              </button>
            </li>
            <li>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                En progreso
              </button>
            </li>
            <li>
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Completado
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 