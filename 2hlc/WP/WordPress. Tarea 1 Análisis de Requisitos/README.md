```markdown
# PowerFit Nutrition & Gear - E-commerce Web Development

[![WordPress](https://img.shields.io/badge/WordPress-6.3%2B-blue.svg)](https://wordpress.org/)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-7.8%2B-orange.svg)](https://woocommerce.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Descripción del Proyecto
Desarrollo de un e-commerce para **PowerFit Nutrition & Gear**, especializado en la venta de productos de gimnasio (proteínas, creatina, straps, accesorios y ropa deportiva). Incluye tienda online, sistema de suscripciones, blog educativo y comunidad interactiva.

---

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Plugins Utilizados](#plugins-utilizados)
6. [Licencia](#licencia)
7. [Soporte](#soporte)

---

## Requisitos Previos
- Servidor web (Apache/Nginx)
- PHP 7.4 o superior
- MySQL 5.6+ o MariaDB 10.1+
- WordPress 6.3 o superior
- Certificado SSL (recomendado)

---

## Instalación
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/powerfit-ecommerce.git
   ```

2. **Base de datos**:
   - Crear una base de datos MySQL.
   - Importar el archivo `powerfit-database.sql` (ubicado en `/database`).

3. **Configurar WordPress**:
   - Copiar el archivo `wp-config-sample.php` a `wp-config.php`.
   - Actualizar las credenciales de la base de datos en `wp-config.php`.

4. **Instalar dependencias**:
   ```bash
   cd wp-content/plugins && composer install
   ```

---

## Estructura del Proyecto
```
powerfit-ecommerce/
├── wp-content/
│   ├── themes/                # Tema personalizado "PowerFit-Theme"
│   ├── plugins/               # Plugins esenciales (WooCommerce, MemberPress, etc.)
│   └── uploads/               # Medios (imágenes/vídeos de productos)
├── database/                  # Exportación SQL inicial
└── documentation/             # Análisis de requisitos y esquemas
```

---

## Configuración
### Pasos esenciales:
1. **Activar plugins**:
   - WooCommerce (para la tienda online).
   - MemberPress (gestión de suscripciones).
   - BuddyPress (comunidad interactiva).

2. **Configurar WooCommerce**:
   - Ir a *WooCommerce → Ajustes* y completar:
     - Moneda: EUR (€).
     - Región de envío: España + UE.
     - Pasarela de pago: Stripe/PayPal.

3. **Personalizar tema**:
   - Usar el Customizer de WordPress para ajustar colores corporativos (#FF5A1F para CTA, #2D3748 para texto).

---

## Plugins Utilizados
| Plugin | Versión | Función |
|--------|---------|---------|
| WooCommerce | 7.8+ | Gestión de la tienda online |
| MemberPress | 1.11+ | Suscripciones recurrentes |
| BuddyPress | 11.0+ | Comunidad y foros |
| Yoast SEO | 20.0+ | Optimización SEO |
| WP Rocket | 3.14+ | Caché y velocidad |

---

## Licencia
Este proyecto está bajo la licencia [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html).  
*Nota: Los plugins premium (ej: MemberPress) requieren licencia por separado.*

---

## Soporte
- **Documentación técnica**: Consulte el PDF `Analisis_Requisitos_PowerFit.pdf` en `/documentation`.
- **Reporte de errores**: Abra un [issue](https://github.com/tu-usuario/powerfit-ecommerce/issues).
- **Contacto directo**: dev@powerfitnutrition.com

---

**¡Gracias por utilizar PowerFit Nutrition & Gear!**  
*Desarrollado por Carlos Ruiz Fernández - 2023*
```

### Instrucciones Adicionales:
1. **Demo en vivo**: Disponible en [https://powerfit-demo.com](https://powerfit-demo.com) (credenciales de prueba: usuario `demo`, contraseña `fit2023`).
2. **Requisitos de hosting**: Se recomienda un plan con al menos 2 GB de RAM y 10 GB de almacenamiento.