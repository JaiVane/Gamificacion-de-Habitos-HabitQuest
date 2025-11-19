export const normalizeMeta = (m) => ({
  id: m.Id ?? m.id,
  titulo: m.Titulo ?? m.titulo,
  descripcion: m.Descripcion ?? m.descripcion,
  valorObjetivo: m.ValorObjetivo ?? m.valorObjetivo,
  valorActual: m.ValorActual ?? m.valorActual,
  estado: m.Estado ?? m.estado,
  fechaLimite: m.FechaLimite ?? m.fechaLimite,
  categoriaId: m.CategoriaId ?? m.categoriaId,
  categoriaNombre: m.CategoriaNombre ?? m.categoriaNombre,
  habitos: m.Habitos ?? m.habitos,
});
