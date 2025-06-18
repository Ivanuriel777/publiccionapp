import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const productos = [
  {
    id: '1',
    nombre: 'Camiseta Nike:Playera negra para todo tipo de tallas',
    precio: 29.99,
    imagen: 'https://permanent.mx/cdn/shop/products/65.png?v=1689102255',
    reseñas: [5] ,
  },
  {
    id: '2',
    nombre: 'Gorro Adidas: Gorro casual para salir ',
    precio: 19.99,
    
    imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/71ab10bfa4ca4e9686dcafc901299242_9366/Gorro_Beanie_Adicolor_Cuff_UNISEX_Azul_IL4878_01_00_standard.png',
    reseñas: [4, 3, 5],
  },
  {
    id: '3',
    nombre: 'Tenis Puma:Tenis:Color blanco calzado del 25-28 ',
    precio: 49.99,
    imagen: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1028561-0100V1.jpg',
    reseñas: [5, 5, 4],
  },
  {
    id: '4',
    nombre: 'Sudadera:SUdadera para tipos de talla color azul marino ',
    precio: 39.99,
    imagen: 'https://m.media-amazon.com/images/I/41yx6TeA2IL._AC_SY1000_.jpg',
    reseñas: [4, 4, 4, 5],
  },
   {
    id: '5',
    nombre: 'sudadera SPORT  para tipos de talla ',
    precio: 39.99,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiSy-cp2g8_6TEsldEbMlyb5sQ4VZ5Rg3xmQ&s',
    reseñas: [4, 4, 4, 5],
  }, {
    id: '6',
    nombre: 'Tenis Nike:Blancos con franja azul para toda las tallas    ',
    precio: 39.99,
    imagen: 'https://down-mx.img.susercontent.com/file/cn-11134207-7qukw-lj251mg0qvlma3',
    reseñas: [4, 4, 4, 5],
  },
{
    id: '7',
    nombre: 'chamarra juvenil:Diseño minimalista,todas las tallas diponibles  ',
    precio: 39.99,
    imagen: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTvxb2k2oE7BUvcOpgAhqEBKCHHKZqImjKhXr9eZ0ZQAzkvykQmOi3rKx1whJF_J5MQmRQSSBwS32MnXc_C2L4UyWHrpe-AjQGh2PB6-lIJbi1vadUEXHF1nEU_LOjZHpL9PxtdSqI&usqp=CAc',
    reseñas: [4, 4, 4, 5],
  },
{
    id: '8',
    nombre: 'Tenis JORDAN:Color Negro con Rojo,del 25/28 ',
    precio: 39.99,
    imagen: 'https://minymal.com.mx/wp-content/uploads/2023/10/Jordan-1-Retro-High-OG-Satin-Bred-Mujer-FD4810-061-minymal-tenis-sneakers-2.webp ',
    reseñas: [4, 4, 4, 5],
  },
  
{
    id: '9',
    nombre: ' Playera para hombre:Color verde  tallas disponibles',
    precio: 39.99,
    imagen:  'https://img.ltwebstatic.com/images3_pi/2024/01/16/37/17053749294b20bf9b9a175ef714d57710bc304244_thumbnail_405x552.jpg' ,
    reseñas: [4, 4, 4, 5],
  },
  {
    id: '10',
    nombre: ' Playera Polo:Color azul,talla.CH/M/G.',
    precio: 39.99,
    imagen: 'https://uniquniformes.com/cdn/shop/files/playera_yazbek_n0300_turquesa_nino_enfrente.webp?v=1731341526',
    reseñas: [4, 4, 4, 5],
  }
 
  
];

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    Alert.alert('Producto agregado', `${producto.nombre} ha sido agregado al carrito.`);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const promedioEstrellas = (reseñas) => {
    const total = reseñas.reduce((sum, r) => sum + r, 0);
    return Math.round(total / reseñas.length);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuAbierto(!menuAbierto)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.titulo }>Tienda THE STRONGS  🚬🗿</Text>
      </View>

      {/* Menú lateral */}
      {menuAbierto && (
        <View style={styles.menuLateral}>
          <View style={{ marginTop: 80 }}>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setMenuAbierto(false);
              navigation.navigate('Carrito', { carrito, setCarrito });
            }}>
              <Text style={styles.menuItem}>🛒 Ir al carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuAbierto(false)}>
              <Text style={styles.menuCerrar}>✖️ Cerrar menú</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={{ marginBottom: 60 }}>
        {/* Buscador */}
        <TextInput
          style={styles.input}
          placeholder="🔍 Buscar productos..."
          value={busqueda}
          onChangeText={setBusqueda}
        />

        {/* Productos destacados */}
        <Text style={styles.subtitulo}>Productos destacados 🔥🗣️</Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.destacadoCard}>
              <Image source={{ uri: item.imagen }} style={styles.imagenDestacada} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}></Text>
                  ))}
              </View>
              <TouchableOpacity onPress={() => agregarAlCarrito(item)} style={styles.botonAgregar}>
                <Text style={{ color: '#fff' }}>🛒 Agregar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Todos los productos */}
        <Text style={styles.subtitulo}>Todos los productos 🤯​</Text>
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <View style={styles.estrellas}>
                {Array(promedioEstrellas(item.reseñas))
                  .fill()
                  .map((_, i) => (
                    <Text key={i}>⭐</Text>
                  ))}
              </View>
              <TouchableOpacity onPress={() => agregarAlCarrito(item)} style={styles.botonAgregar}>
                <Text style={{ color: '#fff' }}>🛒 Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* Botón flotante carrito */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Carrito', { carrito, setCarrito })}
          style={styles.botonIrCarrito}
        >
          <Text style={styles.textoBoton}>🛒 Ver carrito ({carrito.length})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CarritoScreen({ route, navigation }) {
  const { carrito, setCarrito } = route.params;

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    Alert.alert('Producto eliminado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>🛒 Carrito</Text>
      <ScrollView style={{ marginBottom: 60 }}>
        {carrito.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>El carrito está vacío.</Text>
        ) : (
          carrito.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.imagen} />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>💲 {item.precio.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => eliminarDelCarrito(index)}
                style={[styles.botonAgregar, { backgroundColor: 'red' }]}
              >
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={styles.carrito}>
          <Text>Artículos: {carrito.length}</Text>
          <Text>Total: ${total.toFixed(2)}</Text>
         
        </View>
      </ScrollView>

      {/* Botón flotante Comprar */}
      <View style={styles.botonFijo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pago', { total })}
          style={[styles.botonIrCarrito, { backgroundColor: '#28a745' }]}
        >
          <Text style={styles.textoBoton}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PagoScreen({ route }) {
  const { total } = route.params;

  const confirmarPago = (metodo) => {
    Alert.alert('Pago confirmado', `Has pagado $${total.toFixed(2)} con ${metodo}. ¡Gracias por tu compra!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}> Opciones de pago</Text>
      <TouchableOpacity onPress={() => confirmarPago('Tarjeta de crédito')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Tarjeta de crédito</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('PayPal')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmarPago('Transferencia bancaria')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Transferencia bancaria</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={() => confirmarPago('Pago oxxo')} style={styles.botonAgregar}>
        <Text style={{ color: '#fff' }}>Pago Oxxo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Pago" component={PagoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#E6E6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    fontSize: 30,
    marginRight: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'future',
    flex: 1,
    textAlign: 'center',
  },
  menuLateral: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: '100%',
    backgroundColor: '#D5F5E3',
    padding: 20,
    zIndex: 1,
    elevation: 10,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  menuCerrar: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#9B59B6 ',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  destacadoCard: {
    backgroundColor: '#F1C40F',
    padding: 10,
    marginRight: 10,
    width: 180,
    borderRadius: 8,
    elevation: 3,
  },
  imagenDestacada: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonAgregar: {
    marginTop: 5,
    backgroundColor: '#EA0000',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  estrellas: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  carrito: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 10,
  },
  botonFijo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  botonIrCarrito: {
    backgroundColor: '#f5ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
