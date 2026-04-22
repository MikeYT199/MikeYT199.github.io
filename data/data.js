// data/data.js - Base de datos simulada en memoria

const perfil = {
  nombre: "Mike Suarez",
  titulo: "Desarrollador Full Stack",
  descripcion: "Apasionado por la tecnología y el arte visual. Vivo explorando nuevos horizontes, capturando momentos únicos y construyendo experiencias digitales que conectan personas. Con más de 5 años de experiencia en desarrollo web y apps.",
  ubicacion: "Pucallpa, Perú",
  email: "mike77@gmail.com",
  website: "www.mike.dev",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-6lV1UilMYr-LII7TZEjbPfCkj3nw5Ri9g&s",
  stats: {
    fotos: 127,
    seguidores: 2840,
    siguiendo: 341
  }
};

const albums = [
  {
    id: 1,
    titulo: "DeadPool core",
    descripcion: "Escenas graciosas de DeadPool",
    portada: "https://resources.diariolibre.com/images/2022/09/27/13662000-ca3634e4-focus-0.02-0.31-608-342.jpg",
    likes: 234,
    fotos: [
      { id: 1, url: "https://indiehoy.com/wp-content/uploads/2019/06/deadpool.jpg", titulo: "Pool", likes: 89 },
      { id: 2, url: "https://www.geo.tv/assets/uploads/updates/2023-09-10/509196_5522103_updates.jpg", titulo: "Pool sorprendido", likes: 76 },
      { id: 3, url: "https://www.awn.com/sites/default/files/styles/large_featured/public/image/featured/1050912-reynolds-face-el-cancer-once-more-deadpool-3.jpg?itok=ENuowK1L", titulo: "Craneo Atravesado", likes: 112 },
      { id: 4, url: "https://www.elnuevodia.com/resizer/v2/BXBMFLDADBHFDBHDU37HUV2JBA.jpg?auth=7e571d5d3f19aeb2530cff868e56065e16c5bb13dc17aeaa4596fe2803589d96&quality=75&width=829&focal=408%2C216", titulo: "Kiss with in dog", likes: 95 }
    ]
  },
  {
    id: 2,
    titulo: "Sitios Turisticos",
    descripcion: "Lugares increíbles que conoci",
    portada: "https://picsum.photos/seed/ciudad1/600/400",
    likes: 189,
    fotos: [
      { id: 5, url: "https://i0.wp.com/blog.expan.pro/wp-content/uploads/2024/12/rio.jpg?resize=1000%2C600&ssl=1", titulo: "Cristo Redentor", likes: 67 },
      { id: 6, url: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2025/09/torre-eiffel-atardecer.jpg", titulo: "Torre Eiffel", likes: 88 },
      { id: 7, url: "https://muyinteresante.okdiario.com/wp-content/uploads/sites/5/2022/10/17/634db1c86719d.jpeg", titulo: "Muralla China", likes: 54 }
    ]
  },
  {
    id: 3,
    titulo: "Platos Favoritos",
    descripcion: "Sabores del Perú y el mundo",
    portada: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlxmk2p1fbNL6vj1RoWe6DbKp93A6QfjKmg&s",
    likes: 312,
    fotos: [
      { id: 8, url: "https://origin.cronosmedia.glr.pe/large/2023/09/05/lg_64f79f2894d02071770b0e72.jpg", titulo: "Ceviche clásico", likes: 145 },
      { id: 9, url: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/lomo_saltado.jpg", titulo: "Lomo saltado", likes: 98 },
      { id: 10, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHe-u3SR5UQdUAOCmxpz-vwIVGYLPz3sWQ8Q&s", titulo: "Anticuchos", likes: 87 }
    ]
  },
  {
    id: 4,
    titulo: "Naturaleza Salvaje",
    descripcion: "Fauna y flora en su hábitat natural",
    portada: "https://picsum.photos/seed/nature1/600/400",
    likes: 276,
    fotos: [
      { id: 11, url: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2810728.webp?w=1600&h=900", titulo: "Tigre", likes: 110 },
      { id: 12, url: "https://maldita.es/uploads/public/Foto%20gorila%20broma.jpg", titulo: "Gorila", likes: 93 },
      { id: 13, url: "https://content.elmueble.com/medio/2020/09/02/plantas-carnivoras-ideas-consejos_da2cc168_674x506.jpg", titulo: "Plantas Carnívoras", likes: 78 }
    ]
  }
];

const contactos = [
  { id: 1, nombre: "María García", email: "maria@ejemplo.com", telefono: "+51 987 654 321", tipo: "Amiga", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc" },
  { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com", telefono: "+51 912 345 678", tipo: "Colega", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=c0aede" },
  { id: 3, nombre: "Ana Martínez", email: "ana@ejemplo.com", telefono: "+51 945 678 901", tipo: "Cliente", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4" },
  { id: 4, nombre: "Pedro Sánchez", email: "pedro@ejemplo.com", telefono: "+51 923 456 789", tipo: "Colega", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro&backgroundColor=d1f7c4" },
  { id: 5, nombre: "Lucía Torres", email: "lucia@ejemplo.com", telefono: "+51 956 789 012", tipo: "Amiga", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia&backgroundColor=ffdfbf" },
  { id: 6, nombre: "Roberto Díaz", email: "roberto@ejemplo.com", telefono: "+51 934 567 890", tipo: "Familiar", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto&backgroundColor=ffd5dc" }
];

// Almacén de likes en memoria
const likesStore = {
  albums: { 1: 234, 2: 189, 3: 312, 4: 276 },
  fotos: { 1: 89, 2: 76, 3: 112, 4: 95, 5: 67, 6: 88, 7: 54, 8: 145, 9: 98, 10: 87, 11: 110, 12: 93, 13: 78 }
};

// Favoritos en memoria
let favoritos = [
  { id: 1, tipo: 'foto', itemId: 1, titulo: 'Amanecer en los Andes', url: 'https://picsum.photos/seed/mont1/800/600', album: 'Paisajes de Montaña' },
  { id: 2, tipo: 'foto', itemId: 8, titulo: 'Ceviche clásico', url: 'https://picsum.photos/seed/food1/800/600', album: 'Gastronomía' }
];

module.exports = { perfil, albums, contactos, likesStore, favoritos };
