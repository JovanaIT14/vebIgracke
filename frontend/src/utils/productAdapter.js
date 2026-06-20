export const toUiProduct = (product) => ({
  id: product._id || product.id,
  naziv: product.name || product.naziv,
  slika: product.image || product.slika,
  opis: product.description || product.opis,
  cijena: product.price ?? product.cijena,
  kategorija: product.category || product.kategorija,
  uzrast: product.ageRange || product.uzrast,
  materijal: product.material || product.materijal,
  brojNaStanju: product.countInStock ?? product.brojNaStanju,
  rating: product.rating ?? 0,
  backendProduct: product._id || product.backendProduct || product.id,
});

export const toApiProduct = (product) => ({
  name: product.naziv,
  image: product.slika,
  description: product.opis,
  brand: product.brand || 'Toyland',
  category: product.kategorija,
  ageRange: product.uzrast,
  material: product.materijal,
  price: Number(product.cijena),
  countInStock: Number(product.brojNaStanju),
  rating: Number(product.rating),
  numReviews: product.numReviews || 0,
});
