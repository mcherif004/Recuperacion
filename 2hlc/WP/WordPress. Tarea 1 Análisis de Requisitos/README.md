# Estudio de Necesidades del Cliente y Esquema de Estructura Web  
**Cliente:** PowerFit Nutrition & Gear (Tienda online de nutrición y accesorios deportivos).  

---

## 1. Necesidades Prioritarias del Cliente  
| **Requisito**               | **Detalle**                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| **Objetivo principal**       | Vender productos de fitness (suplementos, accesorios, ropa) online.        |
| **Funcionalidades clave**    | - Carrito de compra.<br>- Blog educativo.<br>- Diseño móvil-first. |
| **Diseño**                   | - Paleta corporativa: naranja (`#FF5A1F`) y gris oscuro (`#2D3748`).<br>- Imágenes HD y optimizadas (webp). |
| **Experiencia de usuario**   | - Navegación rápida e intuitiva.            |

---

## 2. Público Objetivo  
| **Característica**           | **Descripción**                                                            |
|------------------------------|-----------------------------------------------------------------------------|
| **Perfil**                   | Personas de 18-45 años en España/UE, interesadas en fitness y vida sana.   |
| **Comportamiento**           | Buscan compras rápidas, precios competitivos y contenido práctico.         |

---

## 3. Funcionalidades Básicas (MVP)  
| **Elemento**                 | **Descripción**                                                            |
|------------------------------|-----------------------------------------------------------------------------|
| **Tienda Online**            | - WooCommerce con categorías: Nutrición, Accesorios, Ropa.|
| **Blog**                     | - Artículos cortos (nutrición/rutinas).<br>- Integración con redes sociales. |
| **Contacto**                 | - Formulario simple + WhatsApp Business integrado.                         |
| **Optimización técnica**     | - SSL gratuito (Let's Encrypt).<br>- Compresión de imágenes automática.    |

---

## 4. Estructura Simplificada  
### **Nivel 1: Páginas Esenciales**  
1. **Inicio**  
   - Banner promocional + productos destacados.  
   - Enlace rápido al blog y categorías principales.  

2. **Productos**  
   - **Nivel 2**:  
     - Nutrición → Filtros por tipo (proteínas, creatina).  
     - Accesorios → Ordenar por precio.  
     - Ropa → Guía de tallas interactiva.  

3. **Blog**  
   - **Nivel 2**:  
     - Categorías: Nutrición, Entrenamiento.  
     - Artículos con imágenes y botones de compartir.  

4. **Mi Cuenta**  
   - **Nivel 2**:  
     - Registro/inicio de sesión con email.  
     - Historial de pedidos.  

5. **Contacto**  
   - Formulario + horario de atención (sin FAQs).  

6. **Legal**  
   - Política de privacidad + términos.  

---

## 5. Tecnologías Recomendadas (Gratuitas)  
| **Componente**          | **Herramienta**               | **Propósito**                              |  
|-------------------------|-------------------------------|--------------------------------------------|  
| **CMS**                 | WordPress                     | Base del sitio web.                        |  
| **E-commerce**          | WooCommerce                   | Gestión de productos y pedidos.            |  
| **SEO**                 | Yoast SEO (free)              | Optimización para buscadores.              |  
| **Velocidad**           | WP Super Cache                | Caché estática para mejorar rendimiento.   |  
| **Imágenes**            | Smush                         | Compresión automática sin pérdida de calidad. |  
| **Hosting**             | Hostinger (plan Starter)      | ≈€2.99/mes + SSL gratis.                   |  

---

## 6. Esquema Visual Optimizado  

```
Inicio
├── Productos
│ ├── Nutrición
│ ├── Accesorios
│ └── Ropa
├── Blog
│ ├── Nutrición
│ └── Entrenamiento
├── Mi Cuenta
│ ├── Registro
│ └── Pedidos
├── Contacto
└── Legal
├── Privacidad
└── Términos
```