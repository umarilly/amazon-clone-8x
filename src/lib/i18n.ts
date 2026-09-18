export type LanguageCode = "EN" | "ES" | "AR" | "DE" | "HE" | "KO" | "PT";

export const RTL_LANGUAGES: LanguageCode[] = ["AR", "HE"];

export type TranslationKey =
  | "deliverTo"
  | "searchPlaceholder"
  | "helloSignIn"
  | "accountLists"
  | "hello"
  | "signOut"
  | "returns"
  | "andOrders"
  | "cart"
  | "all"
  | "addToCart"
  | "outOfStock"
  | "added"
  | "shoppingCart"
  | "subtotal"
  | "proceedToCheckout"
  | "continueShopping"
  | "yourCartIsEmpty"
  | "emptyCartHelp"
  | "remove"
  | "qty"
  | "filters"
  | "clearAll"
  | "department"
  | "customerReview"
  | "brand"
  | "price"
  | "deals"
  | "todaysDeals"
  | "sortBy"
  | "results"
  | "noResults"
  | "signIn"
  | "createAccount"
  | "email"
  | "password"
  | "fullName"
  | "yourOrders"
  | "noOrdersYet"
  | "startShopping"
  | "shippingAddress"
  | "reviewYourOrder"
  | "placeOrder"
  | "orderPlaced"
  | "home"
  | "aboutThisItem"
  | "productInformation"
  | "customerReviews"
  | "inStock"
  | "footerDisclaimer";

type Dict = Record<LanguageCode, string>;

export const TRANSLATIONS: Record<TranslationKey, Dict> = {
  deliverTo: { EN: "Deliver to", ES: "Entregar en", AR: "التوصيل إلى", DE: "Liefern an", HE: "משלוח אל", KO: "배송지", PT: "Entregar em" },
  searchPlaceholder: { EN: "Search Amazon", ES: "Buscar en Amazon", AR: "البحث في أمازون", DE: "Amazon durchsuchen", HE: "חיפוש באמזון", KO: "Amazon 검색", PT: "Pesquisar na Amazon" },
  helloSignIn: { EN: "Hello, sign in", ES: "Hola, identifícate", AR: "مرحبًا، سجّل الدخول", DE: "Hallo, anmelden", HE: "שלום, התחבר", KO: "안녕하세요, 로그인", PT: "Olá, faça login" },
  accountLists: { EN: "Account & Lists", ES: "Cuenta y listas", AR: "الحساب والقوائم", DE: "Konto & Listen", HE: "חשבון ורשימות", KO: "계정 및 목록", PT: "Conta e listas" },
  hello: { EN: "Hello", ES: "Hola", AR: "مرحبًا", DE: "Hallo", HE: "שלום", KO: "안녕하세요", PT: "Olá" },
  signOut: { EN: "Sign Out", ES: "Cerrar sesión", AR: "تسجيل الخروج", DE: "Abmelden", HE: "התנתק", KO: "로그아웃", PT: "Sair" },
  returns: { EN: "Returns", ES: "Devoluciones", AR: "المرتجعات", DE: "Rücksendungen", HE: "החזרות", KO: "반품", PT: "Devoluções" },
  andOrders: { EN: "& Orders", ES: "y pedidos", AR: "والطلبات", DE: "& Bestellungen", HE: "והזמנות", KO: "및 주문", PT: "e pedidos" },
  cart: { EN: "Cart", ES: "Carrito", AR: "السلة", DE: "Warenkorb", HE: "עגלה", KO: "장바구니", PT: "Carrinho" },
  all: { EN: "All", ES: "Todo", AR: "الكل", DE: "Alle", HE: "הכל", KO: "전체", PT: "Tudo" },
  addToCart: { EN: "Add to Cart", ES: "Añadir al carrito", AR: "أضف إلى السلة", DE: "In den Warenkorb", HE: "הוסף לעגלה", KO: "장바구니에 담기", PT: "Adicionar ao carrinho" },
  outOfStock: { EN: "Out of Stock", ES: "Agotado", AR: "غير متوفر", DE: "Nicht auf Lager", HE: "אזל מהמלאי", KO: "품절", PT: "Fora de estoque" },
  added: { EN: "Added", ES: "Añadido", AR: "تمت الإضافة", DE: "Hinzugefügt", HE: "נוסף", KO: "추가됨", PT: "Adicionado" },
  shoppingCart: { EN: "Shopping Cart", ES: "Carrito de compra", AR: "سلة التسوق", DE: "Einkaufswagen", HE: "עגלת קניות", KO: "쇼핑 카트", PT: "Carrinho de compras" },
  subtotal: { EN: "Subtotal", ES: "Subtotal", AR: "المجموع الفرعي", DE: "Zwischensumme", HE: "סכום ביניים", KO: "소계", PT: "Subtotal" },
  proceedToCheckout: { EN: "Proceed to Checkout", ES: "Proceder al pago", AR: "المتابعة للدفع", DE: "Zur Kasse gehen", HE: "המשך לתשלום", KO: "결제 진행", PT: "Finalizar compra" },
  continueShopping: { EN: "Continue Shopping", ES: "Seguir comprando", AR: "متابعة التسوق", DE: "Weiter einkaufen", HE: "המשך בקניות", KO: "쇼핑 계속하기", PT: "Continuar comprando" },
  yourCartIsEmpty: { EN: "Your cart is empty", ES: "Tu carrito está vacío", AR: "سلتك فارغة", DE: "Ihr Warenkorb ist leer", HE: "העגלה שלך ריקה", KO: "장바구니가 비어 있습니다", PT: "Seu carrinho está vazio" },
  emptyCartHelp: { EN: "Browse the catalog and add something you like, it will show up here.", ES: "Explora el catálogo y añade algo que te guste, aparecerá aquí.", AR: "تصفح الكتالوج وأضف شيئًا يعجبك، سيظهر هنا.", DE: "Durchstöbern Sie den Katalog und fügen Sie etwas hinzu, es erscheint hier.", HE: "עיין בקטלוג והוסף משהו שאהבת, זה יופיע כאן.", KO: "카탈로그를 둘러보고 마음에 드는 것을 추가하면 여기에 표시됩니다.", PT: "Navegue pelo catálogo e adicione algo que goste, aparecerá aqui." },
  remove: { EN: "Remove", ES: "Eliminar", AR: "إزالة", DE: "Entfernen", HE: "הסר", KO: "삭제", PT: "Remover" },
  qty: { EN: "Qty", ES: "Cant.", AR: "الكمية", DE: "Menge", HE: "כמות", KO: "수량", PT: "Qtd" },
  filters: { EN: "Filters", ES: "Filtros", AR: "التصفية", DE: "Filter", HE: "מסננים", KO: "필터", PT: "Filtros" },
  clearAll: { EN: "Clear all", ES: "Borrar todo", AR: "مسح الكل", DE: "Alle löschen", HE: "נקה הכל", KO: "모두 지우기", PT: "Limpar tudo" },
  department: { EN: "Department", ES: "Departamento", AR: "القسم", DE: "Abteilung", HE: "מחלקה", KO: "부서", PT: "Departamento" },
  customerReview: { EN: "Customer Review", ES: "Opinión de clientes", AR: "تقييم العملاء", DE: "Kundenbewertung", HE: "ביקורת לקוחות", KO: "고객 리뷰", PT: "Avaliação de clientes" },
  brand: { EN: "Brand", ES: "Marca", AR: "العلامة التجارية", DE: "Marke", HE: "מותג", KO: "브랜드", PT: "Marca" },
  price: { EN: "Price", ES: "Precio", AR: "السعر", DE: "Preis", HE: "מחיר", KO: "가격", PT: "Preço" },
  deals: { EN: "Deals", ES: "Ofertas", AR: "العروض", DE: "Angebote", HE: "מבצעים", KO: "할인", PT: "Ofertas" },
  todaysDeals: { EN: "Today's Deals", ES: "Ofertas de hoy", AR: "عروض اليوم", DE: "Heutige Angebote", HE: "מבצעי היום", KO: "오늘의 할인", PT: "Ofertas de hoje" },
  sortBy: { EN: "Sort by", ES: "Ordenar por", AR: "الترتيب حسب", DE: "Sortieren nach", HE: "מיין לפי", KO: "정렬 기준", PT: "Ordenar por" },
  results: { EN: "results", ES: "resultados", AR: "نتائج", DE: "Ergebnisse", HE: "תוצאות", KO: "결과", PT: "resultados" },
  noResults: { EN: "No results", ES: "Sin resultados", AR: "لا توجد نتائج", DE: "Keine Ergebnisse", HE: "אין תוצאות", KO: "결과 없음", PT: "Nenhum resultado" },
  signIn: { EN: "Sign in", ES: "Iniciar sesión", AR: "تسجيل الدخول", DE: "Anmelden", HE: "התחברות", KO: "로그인", PT: "Entrar" },
  createAccount: { EN: "Create account", ES: "Crear cuenta", AR: "إنشاء حساب", DE: "Konto erstellen", HE: "צור חשבון", KO: "계정 만들기", PT: "Criar conta" },
  email: { EN: "Email", ES: "Correo electrónico", AR: "البريد الإلكتروني", DE: "E-Mail", HE: "דוא\"ל", KO: "이메일", PT: "E-mail" },
  password: { EN: "Password", ES: "Contraseña", AR: "كلمة المرور", DE: "Passwort", HE: "סיסמה", KO: "비밀번호", PT: "Senha" },
  fullName: { EN: "Full name", ES: "Nombre completo", AR: "الاسم الكامل", DE: "Vollständiger Name", HE: "שם מלא", KO: "성명", PT: "Nome completo" },
  yourOrders: { EN: "Your Orders", ES: "Tus pedidos", AR: "طلباتك", DE: "Ihre Bestellungen", HE: "ההזמנות שלך", KO: "내 주문", PT: "Seus pedidos" },
  noOrdersYet: { EN: "You haven't placed any orders yet.", ES: "Aún no has realizado ningún pedido.", AR: "لم تقم بإجراء أي طلبات بعد.", DE: "Sie haben noch keine Bestellungen aufgegeben.", HE: "עדיין לא ביצעת הזמנות.", KO: "아직 주문한 내역이 없습니다.", PT: "Você ainda não fez nenhum pedido." },
  startShopping: { EN: "Start shopping", ES: "Empezar a comprar", AR: "ابدأ التسوق", DE: "Jetzt einkaufen", HE: "התחל לקנות", KO: "쇼핑 시작하기", PT: "Começar a comprar" },
  shippingAddress: { EN: "Shipping address", ES: "Dirección de envío", AR: "عنوان الشحن", DE: "Lieferadresse", HE: "כתובת למשלוח", KO: "배송 주소", PT: "Endereço de entrega" },
  reviewYourOrder: { EN: "Review your order", ES: "Revisa tu pedido", AR: "مراجعة طلبك", DE: "Bestellung überprüfen", HE: "בדוק את ההזמנה שלך", KO: "주문 검토", PT: "Revise seu pedido" },
  placeOrder: { EN: "Place Order", ES: "Realizar pedido", AR: "إتمام الطلب", DE: "Bestellung aufgeben", HE: "בצע הזמנה", KO: "주문하기", PT: "Fazer pedido" },
  orderPlaced: { EN: "Order placed, thank you!", ES: "¡Pedido realizado, gracias!", AR: "تم تقديم الطلب، شكرًا لك!", DE: "Bestellung aufgegeben, danke!", HE: "ההזמנה בוצעה, תודה!", KO: "주문이 완료되었습니다. 감사합니다!", PT: "Pedido realizado, obrigado!" },
  home: { EN: "Home", ES: "Inicio", AR: "الرئيسية", DE: "Startseite", HE: "בית", KO: "홈", PT: "Início" },
  aboutThisItem: { EN: "About this item", ES: "Acerca de este producto", AR: "حول هذا المنتج", DE: "Über diesen Artikel", HE: "על הפריט הזה", KO: "상품 정보", PT: "Sobre este item" },
  productInformation: { EN: "Product information", ES: "Información del producto", AR: "معلومات المنتج", DE: "Produktinformation", HE: "מידע על המוצר", KO: "제품 정보", PT: "Informações do produto" },
  customerReviews: { EN: "Customer Reviews", ES: "Opiniones de clientes", AR: "تقييمات العملاء", DE: "Kundenrezensionen", HE: "ביקורות לקוחות", KO: "고객 리뷰", PT: "Avaliações de clientes" },
  inStock: { EN: "In Stock", ES: "En stock", AR: "متوفر", DE: "Auf Lager", HE: "במלאי", KO: "재고 있음", PT: "Em estoque" },
  footerDisclaimer: { EN: "Amazon Clone, a 24-hour take-home demo. Not affiliated with Amazon.com. All products, prices, and reviews are mock data.", ES: "Amazon Clone, una demostración de 24 horas. No afiliado con Amazon.com. Todos los productos, precios y reseñas son datos ficticios.", AR: "Amazon Clone، عرض توضيحي مدته 24 ساعة. غير تابع لـ Amazon.com. جميع المنتجات والأسعار والتقييمات بيانات وهمية.", DE: "Amazon Clone, eine 24-Stunden-Demo. Nicht mit Amazon.com verbunden. Alle Produkte, Preise und Bewertungen sind Beispieldaten.", HE: "Amazon Clone, הדגמה בת 24 שעות. לא קשור ל-Amazon.com. כל המוצרים, המחירים והביקורות הם נתוני דמה.", KO: "Amazon Clone, 24시간 데모 프로젝트입니다. Amazon.com과 제휴되어 있지 않습니다. 모든 상품, 가격, 리뷰는 가상 데이터입니다.", PT: "Amazon Clone, uma demonstração de 24 horas. Não afiliado à Amazon.com. Todos os produtos, preços e avaliações são dados fictícios." },
};

export function translate(key: TranslationKey, lang: LanguageCode): string {
  return TRANSLATIONS[key]?.[lang] ?? TRANSLATIONS[key]?.EN ?? key;
}
