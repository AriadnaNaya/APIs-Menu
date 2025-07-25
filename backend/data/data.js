export const data = [
	{
		nombre: "CHOW FAN",
		img: "/img/chowfan.png",
		descripcion: "Salteado de arroz con vegetales y huevo. Si se agrega proteína:",
		variantes: [
			{ cantidad: "Pollo", precio: 17152 },
			{ cantidad: "Carne", precio: 17449 },
			{ cantidad: "Cerdo", precio: 18228 },
			{ cantidad: "Langos", precio: 19072 },
			{ cantidad: "Mixto", precio: 19566 }
		],
		tipo:"townKitchen"
	},
	{
		nombre: "BREADED STEAK",
		img: "/img/breadedsteak.png",
		descripcion: "250g de ojo de bife en panko especiado, servido con papas triple cocción.",
		precio: 18569,
		tipo:"townKitchen"
	},
	{
		nombre: "SALMON TEPPAN",
		img: "/img/salmongrillado.png",
		descripcion: "Salmón rosado grillado, arroz y vegetales grillados.",
		precio: 28989,
		tipo:"townKitchen"
	},
	{
		nombre: "CATCH OF THE DAY",
		img: "/img/pesca.jpeg",
		descripcion: "Pesca fresca del día.",
		precio: 19779,
		tipo:"townKitchen"
	},
	{
		nombre: "PULLED PORK SANDWICH",
		img: "/img/pulledpork.jpg",
		descripcion: "Bondiola desmenuzada en teriyaki, coleslaw y papas fritas.",
		precio: 15452,
		tipo:"townKitchen"
	},
	{
		nombre: "DOUBLE CHEESE BURGER",
		img: "/img/doblecheese.jpeg",
		descripcion: "Doble cuarto de libra de carne, cheddar, panceta, salsa y papas fritas.",
		precio: 15452,
		tipo:"townKitchen"
	},
	{
		nombre: "CHICKEN SANDWICH",
		img: "/img/chickensandwich.jpeg",
		descripcion: "Pechuga de pollo en panko, cheddar, lechuga, special mayo y papas fritas.",
		precio: 15452,
		tipo:"townKitchen"
	},
	{
		nombre: "FISH SANDWICH",
		img: "/img/fishsandwich.jpeg",
		descripcion: "Pesca blanca del día en panko, cheddar, alioli de cilantro y papas fritas.",
		precio: 15452,
		tipo:"townKitchen"
	},
	{
		nombre: "POKE BOWLS",
		img: "/img/pokebowl.jpg",
		descripcion: "Base de arroz avinagrado, zanahoria, remolacha y:",
		variantes: [
			{
				cantidad: "Ahi Tuna",
				precio: 21879,
				descripcion: "Atún rojo marinado, mango, palta, batata, salsa Buenos Aires y mayosriracha."
			},
			{
				cantidad: "Salmón",
				precio: 19113,
				descripcion: "Salmón rosado marinado, pepino, palta, alioli de cilantro."
			},
			{
				cantidad: "Chicken",
				precio: 17270,
				descripcion: "Pollo rebozado, palta, shiitake marinado y mayosriracha."
			}
		],
		tipo:"townKitchen"
	},
	{
		nombre: 'KIOTO',
		img: "",
		descripcion: 'Selección especial por el itamae.',
		variantes: [
			{ cantidad: '24 P', precio: 44275 }
		],
		tipo:"sushiCombinado"
	},
	{
		nombre: 'SAKE',
		img: "",
		descripcion: 'Rolls y makis de salmón rosado y ahumado, nigiri, sashimi y geishas de salmón.',
		variantes: [
			{ cantidad: '15 P', precio: 25313 },
			{ cantidad: '20 P', precio: 33222 },
			{ cantidad: '30 P', precio: 49398 },
			{ cantidad: '40 P', precio: 65856 },
			{ cantidad: '50 P', precio: 78968 },
			{ cantidad: '60 P', precio: 94427 }
		],
		tipo:"sushiCombinado"
	},
	{
		nombre: 'TOWN',
		img: "",
		descripcion: 'Rolls de langostino, caviar salmón rosado y ahumado. Nigiri, sashimi y geishas de salmón.',
		variantes: [
			{ cantidad: '15 P', precio: 27353 },
			{ cantidad: '20 P', precio: 35817 },
			{ cantidad: '30 P', precio: 53733 },
			{ cantidad: '40 P', precio: 71634 },
			{ cantidad: '50 P', precio: 84506 },
			{ cantidad: '60 P', precio: 102623 }
		],
		tipo:"sushiCombinado"
	},
	{
		nombre: 'DRAGON',
		img: "",
		descripcion: 'Armalos como quieras, combinado a tu gusto o lo armamos nosotros con un mix especial.',
		variantes: [
			{ cantidad: '15 P', precio: 31977 },
			{ cantidad: '20 P', precio: 42636 },
			{ cantidad: '30 P', precio: 63399 },
			{ cantidad: '40 P', precio: 85158 },
			{ cantidad: '50 P', precio: 100089 },
			{ cantidad: '60 P', precio: 118802 }
		],
		tipo:"sushiCombinado"
	},
	{
		nombre: "Gaseosa",
		img: "/img/gaseosa.png",
		descripcion: "Gaseosa línea Coca",
		precio: "$4,000",
		tipo: "bebidasSinAlcohol",
		id: 1
	},
	{
		nombre: "Exprimido de naranja",
		img: "/img/naranja.jpg",
		descripcion: "Sin descripción",
		precio: "$4,800",
		tipo: "bebidasSinAlcohol",
		id: 2
	},
	{
		nombre: "Limonada de menta y jengibre",
		img: "/img/limonada.jpeg",
		descripcion: "Sin descripción",
		precio: "$4,400",
		tipo: "bebidasSinAlcohol",
		id: 3
	},
	{
		nombre: "Agua saborizada",
		img: "/img/aguaSaborizada.jpg",
		descripcion: "Sin descripción",
		precio: "$4,000",
		tipo: "bebidasSinAlcohol",
		id: 4
	},
	{
		nombre: "Café",
		img: "/img/cafe.jpg",
		descripcion: "Sin descripción",
		precio: "$3,800",
		tipo: "bebidasSinAlcohol",
		id: 5
	},
	{
		nombre: "Té",
		img: "/img/te.png",
		descripcion: "Sin descripción",
		precio: "$3,800",
		tipo: "bebidasSinAlcohol",
		id: 6
	},
	{
		nombre: "Corona",
		img: "/img/corona.png",
		descripcion: "Sin descripción",
		precio: "$5,200",
		tipo: "cervezas",
		id: 7
	},
	{
		nombre: "Heineken",
		img: "/img/heineken.jpg",
		descripcion: "Sin descripción",
		precio: "$4,500",
		tipo: "cervezas",
		id: 8
	},
	{
		nombre: "Artesanal",
		img: "/img/artesanal.jpeg",
		descripcion: "Sin descripción",
		precio: "$5,600",
		tipo: "cervezas",
		id: 9
	},
	{
		nombre: "CAIPIRINHA / OSKA",
		img: "/img/caipi.png",
		descripcion: "Sin descripción",
		precio: "$6,171",
		tipo: "cocktails",
		id: 10
	},
	{
		nombre: "MOJITO",
		img: "/img/mojito.jpg",
		descripcion: "Sin descripción",
		precio: "$6,014",
		tipo: "cocktails",
		id: 11
	},
	{
		nombre: "SAKEJITO",
		img: "/img/sake.jpeg",
		descripcion: "Sin descripción",
		precio: "$6,171",
		tipo: "cocktails",
		id: 12
	},
	{
		nombre: "NEGRONI",
		img: "/img/negroni.jpeg",
		descripcion: "Sin descripción",
		precio: "$6,474",
		tipo: "cocktails",
		id: 13
	},
	{
		nombre: "DAIKIRI",
		img: "/img/daiquiri.png",
		descripcion: "Sin descripción",
		precio: "$6,171",
		tipo: "cocktails",
		id: 14
	},
	{
		nombre: "MARGARITA",
		img: "/img/margarita.png",
		descripcion: "Sin descripción",
		precio: "$7,381",
		tipo: "cocktails",
		id: 15
	},
	{
		nombre: "NEW YORK SOUR",
		img: "/img/nyksour.jpeg",
		descripcion: "Sin descripción",
		precio: "$7,514",
		tipo: "cocktails",
		id: 16
	},
	{
		nombre: "CYNAR JULEP",
		img: "/img/cynar.jpg",
		descripcion: "Sin descripción",
		precio: "$6,014",
		tipo: "cocktails",
		id: 17
	},
	{
		nombre: "GIN & TONIC",
		img: "/img/gin.png",
		descripcion: "Sin descripción",
		precio: "$6,365",
		tipo: "cocktails",
		id: 18
	},
	{
		nombre: "APEROL SPRITZ",
		img: "/img/aperol.png",
		descripcion: "Sin descripción",
		precio: "$6,171",
		tipo: "cocktails",
		id: 19
	},
	{
		nombre: "OLD FASHIONED",
		img: "/img/old.jpeg",
		descripcion: "Sin descripción",
		precio: "$6,885",
		tipo: "cocktails",
		id: 20
	},
	{
		nombre: "CAMPARI",
		img: "/img/campari.png",
		descripcion: "Sin descripción",
		precio: "$6,014",
		tipo: "cocktails",
		id: 21
	},
	{
		nombre: "TOM COLLINS",
		img: "/img/tom.png",
		descripcion: "Sin descripción",
		precio: "$6,014",
		tipo: "cocktails",
		id: 22
	},
	{
		nombre: "PISCO SOUR",
		img: "/img/pisco.jpeg",
		descripcion: "Sin descripción",
		precio: "$7,405",
		tipo: "cocktails",
		id: 23
	},
	{
		nombre: "MOSCOW MULE",
		img: "/img/moscow.jpeg",
		descripcion: "Sin descripción",
		precio: "$8,615",
		tipo: "cocktails",
		id: 24
	},
	{
		nombre: "CHICKEN FINGERS",
		img: "/img/fingers.jpeg",
		descripcion: "Pechuguitas rebozadas en escamas de papa, papas fritas y barbacoa.",
		precio: "$12,500",
		tipo: "entradas",
		id: 25
	},
	{
		nombre: "RABAS",
		img: "/img/rabas.jpg",
		descripcion: "Anillos de calamar fritos, servidos con salsa tártara y lima.",
		precio: "$19,200",
		tipo: "entradas",
		id: 26
	},
	{
		nombre: "LANGOSTINOS CRISP",
		img: "/img/langostinocrisp.jpg",
		descripcion: "Langostinos rebozados en escamas de papas & honey mustard.",
		precio: "$17,800",
		tipo: "entradas",
		id: 27
	},
	{
		nombre: "FISH STICKS",
		img: "/img/fishsticks.jpg",
		descripcion: "Bastones de pesca blanca cubiertos en panko, servidos con alioli de cilantro.",
		precio: "$13,500",
		tipo: "entradas",
		id: 28
	},
	{
		nombre: "MOZZARELLA FINGERS",
		img: "/img/mozzarella.jpeg",
		descripcion: "Bastones de mozzarella rebozados, servidos con salsa de tomate.",
		precio: "$13,500",
		tipo: "entradas",
		id: 29
	},
	{
		nombre: "TEMPURA MIX",
		img: "/img/tempuramix.jpeg",
		descripcion: "Pesca, geishas, langostinos y verduras, fritos en tempura oriental.",
		precio: "$17,600",
		tipo: "entradas",
		id: 30
	},
	{
		nombre: "CEVICHE",
		img: "/img/ceviche.jpg",
		descripcion: "De salmón rosado, pescado blanco del día y langostinos.",
		precio: "$17,993",
		tipo: "entradas",
		id: 31
	},
	{
		nombre: "TARTAR DE ATÚN",
		img: "/img/tartar.jpg",
		descripcion: "Atún rojo marinado, mango, palta y tulipa de papel de arroz.",
		precio: "$19,679",
		tipo: "entradas",
		id: 32
	},
	{
		nombre: "GEISHAS SAKE",
		img: "/img/geishasake.jpg",
		descripcion: "Láminas de salmón rosado, philadelphia y palta.",
		precio: "$13,891",
		tipo: "geishas",
		id: 33
	},
	{
		nombre: "GEISHAS AHUMADAS",
		img: "/img/geishaahumada.jpeg",
		descripcion: "Láminas de salmón ahumado, philadelphia y mango.",
		precio: "$15,354",
		tipo: "geishas",
		id: 34
	},
	{
		nombre: "GEISHA PINK TROUT",
		img: "/img/geishapink.jpg",
		descripcion: "Láminas de trucha gravlax, philadelphia y pepino.",
		precio: "$14,731",
		tipo: "geishas",
		id: 35
	},
	{
		nombre: "CRISPY",
		img: "/img/crispysalmon.jpeg",
		descripcion: "Arroz, salmón, queso saborizado. Rebozado en escama de papa y frito.",
		precio: "$14,500",
		tipo: "hotRolls",
		id: 36
	},
	{
		nombre: "OKINAWA",
		img: "/img/okinawa.png",
		descripcion: "Láminas de salmón rosado, philadelphia y palta. Rebozado y frito.",
		precio: "$17,604",
		tipo: "hotRolls",
		id: 37
	},
	{
		nombre: "CHIPOTLE",
		img: "/img/chipotle.jpg",
		descripcion: "Arroz, salmón rosado, queso saborizado. Frito y cubierto en mayo de chipotle.",
		precio: "$15,500",
		tipo: "hotRolls",
		id: 38
	},
	{
		nombre: "CHUTNEY",
		img: "/img/chutney.jpg",
		descripcion: "Arroz, langostinos, queso saborizado. Frito y cubierto en chutney de tomate.",
		precio: "$15,500",
		tipo: "hotRolls",
		id: 39
	},
	{
		nombre: "PORKY",
		img: "/img/porky.png",
		descripcion: "Arroz, bondiola estofada, bbq, philadelphia. Frito y cubierto en alioli.",
		precio: "$14,500",
		tipo: "hotRolls",
		id: 40
	},
	{
		nombre: "ONCE",
		img: "/img/once.png",
		descripcion: "Arroz, salmón, queso saborizado. Frito y cubierto en ceviche.",
		precio: "$17,645",
		tipo: "hotRolls",
		id: 41
	},
	{
		nombre: "HOT GEISHA x 5 unidades",
		img: "/img/geishasushi.png",
		descripcion: "Lámina de salmón, queso saborizado y verdeo. Frito en tempura.",
		precio: "$16,364",
		tipo: "hotRolls",
		id: 42
	},
	{
		nombre: "SAKE MAKI",
		img: "/img/sakemaki.png",
		descripcion: "Relleno de salmón rosado.",
		precio: "$13,308",
		tipo: "maki",
		id: 43
	},
	{
		nombre: "IKURA",
		img: "/img/ikura.jpeg",
		descripcion: "Langostino, philadelphia, salmón ahumado y palta. Envuelto en salmón rosado y caviar.",
		precio: "$17,103",
		tipo: "maki",
		id: 44
	},
	{
		nombre: "TUNA",
		img: "/img/tuna.png",
		descripcion: "Relleno de atún y salmón rosado cocidos, mayonesa y verdeo.",
		precio: "$12,251",
		tipo: "maki",
		id: 45
	},
	{
		nombre: "FRESHTOWN",
		img: "/img/freshtown.jpeg",
		descripcion: "Mango, ananá, frutilla, limón, almíbar.",
		precio: "$4,800",
		tipo: "mocktails",
		id: 46
	},
	{
		nombre: "CITRIC",
		img: "/img/citric.png",
		descripcion: "Jugo de naranja y limón, almíbar.",
		precio: "$4,650",
		tipo: "mocktails",
		id: 47
	},
	{
		nombre: "POMELADA",
		img: "/img/pomelada.jpeg",
		descripcion: "Jugo de pomelo y limón, almíbar de romero y romero fresco.",
		precio: "$4,800",
		tipo: "mocktails",
		id: 48
	},
	{
		nombre: "NIGIRI SAKE",
		img: "/img/nigiri.png",
		descripcion: "Lámina de salmón rosado sobre arroz avinagrado.",
		precio: "$10,706",
		tipo: "nigiriSashimi",
		id: 49
	},
	{
		nombre: "NIGIRI AHUMADO",
		img: "/img/nigiriahumado.jpg",
		descripcion: "Lámina de salmón ahumado sobre arroz avinagrado.",
		precio: "$12,739",
		tipo: "nigiriSashimi",
		id: 50
	},
	{
		nombre: "NIGIRI PINK TROUT",
		img: "/img/nigiripink.jpg",
		descripcion: "Lámina de trucha gravlax sobre arroz avinagrado.",
		precio: "$9,983",
		tipo: "nigiriSashimi",
		id: 51
	},
	{
		nombre: "NIGIRI RED TUNA",
		img: "/img/nigirituna.jpeg",
		descripcion: "Lámina de atún rojo sobre arroz avinagrado.",
		precio: "$12,820",
		tipo: "nigiriSashimi",
		id: 52
	},
	{
		nombre: "NIGIRI FLAME",
		img: "/img/nigiriflame.png",
		descripcion: "Lámina de salmón flambeada, salsa huancaína y maíz cancha.",
		precio: "$12,739",
		tipo: "nigiriSashimi",
		id: 53
	},
	{
		nombre: "NIGIRI TEST!",
		img: "/img/nigiris.png",
		descripcion: "Degustación de cuatro variedades de nigiri.",
		precio: "$12,468",
		tipo: "nigiriSashimi",
		id: 54
	},
	{
		nombre: "SASHIMI SAKE",
		img: "/img/sashimi.jpg",
		descripcion: "Láminas de salmón delicadamente cortadas.",
		precio: "$10,706",
		tipo: "nigiriSashimi",
		id: 55
	},
	{
		nombre: "SASHIMI PINK TROUT",
		img: "/img/sashimitrout.png",
		descripcion: "Láminas de trucha delicadamente cortadas.",
		precio: "$9,893",
		tipo: "nigiriSashimi",
		id: 56
	},
	{
		nombre: "SASHIMI SPICY",
		img: "/img/sashimispicy.png",
		descripcion: "Láminas de salmón rosado cubiertas en togarashi y selladas en plancha.",
		precio: "$12,073",
		tipo: "nigiriSashimi",
		id: 57
	},
	{
		nombre: "SASHIMI RED TUNA",
		img: "/img/sashimituna.jpeg",
		descripcion: "Láminas de atún rojo delicadamente cortadas.",
		precio: "$12,820",
		tipo: "nigiriSashimi",
		id: 58
	},
	{
		nombre: "Medida de sake",
		img: "/img/medidasake.jpg",
		descripcion: "Sin descripción",
		precio: "$6,655",
		tipo: "sake",
		id: 59
	},
	{
		nombre: "TEMAKI SAKE",
		img: "/img/temakisake.png",
		descripcion: "Cono de alga y arroz, salmón rosado, palta y philadelphia.",
		precio: "$15,964",
		tipo: "temakis",
		id: 60
	},
	{
		nombre: "TEMAKI EBI",
		img: "/img/temakiebi.jpeg",
		descripcion: "Cono de alga y arroz, langostinos, palta y philadelphia.",
		precio: "$15,368",
		tipo: "temakis",
		id: 61
	},
	{
		nombre: "TEMAKI PINK TROUT",
		img: "/img/temakipinktrout.png",
		descripcion: "Cono de alga y arroz, trucha gravlax, philadelphia y pepino.",
		precio: "$15,368",
		tipo: "temakis",
		id: 62
	},
	{
		nombre: "TEMAKI RED TUNA",
		img: "/img/temakiredtuna.png",
		descripcion: "Cono de alga y arroz, atún rojo, philadelphia y mango.",
		precio: "$16,872",
		tipo: "temakis",
		id: 63
	},
	{
		nombre: "FUTOMAKI",
		img: "/img/futomaki.png",
		descripcion: "Maki relleno con mix de vegetales y philadelphia (opción vegana).",
		precio: "$10,421",
		tipo: "veggies",
		id: 64
	},
	{
		nombre: "VEGGIE MANGO",
		img: "/img/veggiemango.png",
		descripcion: "Roll relleno de mango, philadelphia y batata frita.",
		precio: "$11,065",
		tipo: "veggies",
		id: 65
	},
	{
		nombre: "VEGGIE NUTS",
		img: "/img/veggienuts.png",
		descripcion: "Roll relleno con queso brie, tomate confitado y rúcula. Cubierto en nuez garrapiñada.",
		precio: "$12,500",
		tipo: "veggies",
		id: 66
	},
	{
		nombre: "ARUGULA & BRIE x 4 unidades",
		img: "/img/arugula.png",
		descripcion: "Nigiri cubierto en queso brie, tomate confitado y rúcula.",
		precio: "$11,302",
		tipo: "veggies",
		id: 67
	},
	{
		nombre: "Álamos Chardonnay",
		img: "/img/alamoschardonay.jpg",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosBlancos",
		id: 68
	},
	{
		nombre: "Álamos Sauvignon Blanc",
		img: "/img/alamosblanc.png",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosBlancos",
		id: 69
	},
	{
		nombre: "Álamos Moscatel de Alejandría",
		img: "/img/alamosmoscatel.jpg",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosBlancos",
		id: 70
	},
	{
		nombre: "Álamos Dulce Natural",
		img: "/img/alamosdulcenatural.jpg",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosBlancos",
		id: 71
	},
	{
		nombre: "Nicasia Blanc de Blancs",
		img: "/img/nicasiablanc.jpg",
		descripcion: "Sin descripción",
		precio: "$18,330",
		tipo: "vinosBlancos",
		id: 72
	},
	{
		nombre: "El Enemigo Chardonnay",
		img: "/img/enemigochardo.jpg",
		descripcion: "Sin descripción",
		precio: "$46,079",
		tipo: "vinosBlancos",
		id: 73
	},
	{
		nombre: "Saint Felicien Chardonnay",
		img: "/img/saintfelicien.jpg",
		descripcion: "Sin descripción",
		precio: "$23,131",
		tipo: "vinosBlancos",
		id: 74
	},
	{
		nombre: "Saint Felicien Sauvignon Blanc",
		img: "/img/felicienblanc.png",
		descripcion: "Sin descripción",
		precio: "$23,131",
		tipo: "vinosBlancos",
		id: 75
	},
	{
		nombre: "D.V. Catena Chardo Chardo",
		img: "/img/dvcatena.jpeg",
		descripcion: "Sin descripción",
		precio: "$32,586",
		tipo: "vinosBlancos",
		id: 76
	},
	{
		nombre: "Álamos Extra Brut",
		img: "/img/alamosextrabrut.jpg",
		descripcion: "Sin descripción",
		precio: "$19,203",
		tipo: "vinosEspumantes",
		id: 77
	},
	{
		nombre: "Saint Felicien Nature",
		img: "/img/alamosnature.jpg",
		descripcion: "Sin descripción",
		precio: "$25,553",
		tipo: "vinosEspumantes",
		id: 78
	},
	{
		nombre: "Álamos",
		img: "/img/copavino.jpg",
		descripcion: "Sin descripción",
		precio: "$5,262",
		tipo: "vinosPorCopas",
		id: 79
	},
	{
		nombre: "Álamos Malbec",
		img: "/img/alamosmalbec.png",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosTintos",
		id: 80
	},
	{
		nombre: "Álamos Cabernet Sauvignon",
		img: "/img/alamoscarbenet.png",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosTintos",
		id: 81
	},
	{
		nombre: "Álamos Red Blend",
		img: "/img/alamosredblend.jpeg",
		descripcion: "Sin descripción",
		precio: "$18,370",
		tipo: "vinosTintos",
		id: 82
	},
	{
		nombre: "Álamos Pinot Noir Reserve",
		img: "/img/alamospinotnoir.jpg",
		descripcion: "Sin descripción",
		precio: "$17,200",
		tipo: "vinosTintos",
		id: 83
	},
	{
		nombre: "Álamos Malbec Mac Atenuada",
		img: "/img/alamosmaceracion.jpg",
		descripcion: "Sin descripción",
		precio: "$16,800",
		tipo: "vinosTintos",
		id: 84
	},
	{
		nombre: "Nicasia Red Blend Malbec",
		img: "/img/nicasiared.jpg",
		descripcion: "Sin descripción",
		precio: "$18,330",
		tipo: "vinosTintos",
		id: 85
	},
	{
		nombre: "Nicasia Red Blend Cabernet Franc",
		img: "/img/nicasiaredcabernet.png",
		descripcion: "Sin descripción",
		precio: "$18,330",
		tipo: "vinosTintos",
		id: 86
	},
	{
		nombre: "El Enemigo Bonarda",
		img: "/img/elenemigo.jpg",
		descripcion: "Sin descripción",
		precio: "$46,079",
		tipo: "vinosTintos",
		id: 87
	},
	{
		nombre: "El Enemigo Malbec",
		img: "/img/elenemigomalbec.png",
		descripcion: "Sin descripción",
		precio: "$46,079",
		tipo: "vinosTintos",
		id: 88
	},
	{
		nombre: "El Enemigo Cabernet Franc",
		img: "/img/elenemigocabernet.jpg",
		descripcion: "Sin descripción",
		precio: "$46,079",
		tipo: "vinosTintos",
		id: 89
	},
	{
		nombre: "Saint Felicien Malbec",
		img: "/img/saintfelicienmalbec.png",
		descripcion: "Sin descripción",
		precio: "$23,131",
		tipo: "vinosTintos",
		id: 90
	},
	{
		nombre: "Saint Felicien Cabernet Sauvignon",
		img: "/img/saintfeliciencabernet.jpg",
		descripcion: "Sin descripción",
		precio: "$23,131",
		tipo: "vinosTintos",
		id: 91
	},
	{
		nombre: "Saint Felicien Cabernet Merlot",
		img: "/img/saintfelicienmerlot.jpeg",
		descripcion: "Sin descripción",
		precio: "$21,028",
		tipo: "vinosTintos",
		id: 92
	},
	{
		nombre: "Saint Felicien Syrah",
		img: "/img/saintfeliciensyrah.png",
		descripcion: "Sin descripción",
		precio: "$21,028",
		tipo: "vinosTintos",
		id: 93
	},
	{
		nombre: "D.V. Catena Cabernet Malbec",
		img: "/img/dvcatenacabernetmalbec.jpeg",
		descripcion: "Sin descripción",
		precio: "$27,200",
		tipo: "vinosTintos",
		id: 94
	},
	{
		nombre: "D.V. Catena Syrah Syrah",
		img: "/img/dvcatenasyrah.jpeg",
		descripcion: "Sin descripción",
		precio: "$27,200",
		tipo: "vinosTintos",
		id: 95
	},
	{
		nombre: "D.V. Catena Cabernet – Cabernet",
		img: "/img/dvcatenacarbernet.jpg",
		descripcion: "Sin descripción",
		precio: "$27,200",
		tipo: "vinosTintos",
		id: 96
	},
	{
		nombre: "D.V. Catena Malbec – Malbec",
		img: "/img/dvcatenamalbec.jpeg",
		descripcion: "Sin descripción",
		precio: "$45,759",
		tipo: "vinosTintos",
		id: 97
	},
	{
		nombre: "D.V. Catena Malbec – Malbec",
		img: "/img/dvcatenamalbec.jpeg",
		descripcion: "Sin descripción",
		precio: "$45,759",
		tipo: "vinosTintos",
		id: 98
	},
	{
		nombre: "PHILADELPHIA",
		img: "/img/philadelphia.jpeg",
		descripcion: "Salmón rosado y philadelphia.",
		precio: "13.972",
		tipo: "rolls",
		id: 99
	},
	{
		nombre: "NEW YORK",
		img: "/img/newyork.jpeg",
		descripcion: "Salmón rosado y palta.",
		precio: "13.959",
		tipo: "rolls",
		id: 100
	},
	{
		nombre: "NEW YORK & PHILADELPHIA",
		img: "/img/nykphila.png",
		descripcion: "Salmón rosado, philadelphia y palta.",
		precio: "14.826",
		tipo: "rolls",
		id: 101
	},
	{
		nombre: "OJO DE TIGRE",
		img: "/img/ojotigre.webp",
		descripcion: "Crispy skin de salmón rosado y salmón rosado fresco.",
		precio: "13.728",
		tipo: "rolls",
		id: 102
	},
	{
		nombre: "ACAPULCO",
		img: "/img/acapulco.png",
		descripcion: "Salmón rosado, philadelphia y guacamole.",
		precio: "14.121",
		tipo: "rolls",
		id: 103
	},
	{
		nombre: "HONSU",
		img: "/img/honsu.png",
		descripcion: "Salmón rosado, philadelphia, cubierto en palta.",
		precio: "14.426",
		tipo: "rolls",
		id: 104
	},
	{
		nombre: "HONEY",
		img: "/img/honey.png",
		descripcion: "Salmón rosado cocido, coronado con batata frita.",
		precio: "12.780",
		tipo: "rolls",
		id: 105
	},
	{
		nombre: "SUMMER MANGO",
		img: "/img/supermango.jpg",
		descripcion: "Salmón rosado, queso, verdeo, tempura. Cubierto con mango flambeado.",
		precio: "16.628",
		tipo: "rolls",
		id: 106
	},
	{
		nombre: "CEVICHE ROLL",
		img: "/img/cevicheroll.webp",
		descripcion: "Pescado blanco marinado en leche de tigre, cebolla y jalapeño.",
		precio: "15.070",
		tipo: "rolls",
		id: 107
	},
	{
		nombre: "TARTAR",
		img: "/img/tartarroll.png",
		descripcion: "Salmón cubierto en batata frita, tartar de salmón rosado y ahumado.",
		precio: "16.099",
		tipo: "rolls",
		id: 108
	},
	{
		nombre: "SMOKE",
		img: "/img/smoke.png",
		descripcion: "Salmón ahumado, philadelphia.",
		precio: "16.290",
		tipo: "rolls",
		id: 109
	},
	{
		nombre: "NUTS",
		img: "/img/nuts.png",
		descripcion: "Salmón ahumado, brie, tomate y rúcula. Cubierto en nuez garrapiñada.",
		precio: "17.469",
		tipo: "rolls",
		id: 110
	},
	{
		nombre: "MOLTEN",
		img: "/img/molten.png",
		descripcion: "Langostinos tempura, philadelphia y palta. Cubierto en queso flambeado.",
		precio: "15.490",
		tipo: "rolls",
		id: 111
	},
	{
		nombre: "DINAMITA",
		img: "/img/dinamita.png",
		descripcion: "Langostinos tempura, palta. Cubierto con caviar.",
		precio: "15.883",
		tipo: "rolls",
		id: 112
	},
	{
		nombre: "AVOCADO",
		img: "/img/avocado.png",
		descripcion: "Langostinos tempura, crocante de batata y guacamole.",
		precio: "15.327",
		tipo: "rolls",
		id: 113
	},
	{
		nombre: "MATSUBA",
		img: "/img/matsuba.png",
		descripcion: "Langostinos tempura, honey mustard.",
		precio: "14.379",
		tipo: "rolls",
		id: 114
	},
	{
		nombre: "OSAKA",
		img: "/img/osaka.jpg",
		descripcion: "Langostinos, palta y philadelphia. Cubierto en salmón rosado.",
		precio: "16.113",
		tipo: "rolls",
		id: 115
	},
	{
		nombre: "EBI",
		img: "/img/ebi.jpg",
		descripcion: "Langostinos, palta y philadelphia. Cubierto en caviar.",
		precio: "15.829",
		tipo: "rolls",
		id: 116
	},
	{
		nombre: "RAINBOW",
		img: "/img/rainbow.png",
		descripcion: "Salmón rosado, philadelphia, palta y verdeo. Envuelto en salmón.",
		precio: "15.612",
		tipo: "rolls",
		id: 117
	},
	{
		nombre: "BALAT",
		img: "/img/balat.png",
		descripcion: "Salmón, queso, palta y verdeo. Envuelto en salmón, atún rojo y pesca blanca, cubierto en caviar.",
		precio: "17.248",
		tipo: "rolls",
		id: 118
	},
	{
		nombre: "CRUNCH",
		img: "/img/crunch.png",
		descripcion: "Lámina de philadelphia, tamago, salmón y ananá macerado. Cubierto en nuez garrapiñada.",
		precio: "18.255",
		tipo: "rolls",
		id: 119
	},
	{
		nombre: "FEEL",
		img: "/img/feel.png",
		descripcion: "Lámina de tamago, salmón rosado, philadelphia y verdeo.",
		precio: "15.544",
		tipo: "rolls",
		id: 120
	},
	{
		nombre: "PASION FRUIT",
		img: "/img/pasionFruit.png",
		descripcion: "Tamago, salmón, philadelphia y verdeo. Cubierto con batata frita y maracuyá.",
		precio: "16.073",
		tipo: "rolls",
		id: 121
	},
	{
		nombre: "LUJURIA",
		img: "/img/lujuria.png",
		descripcion: "Tamago, philadelphia y verdeo. Envuelto en salmón. Cubierto con batata frita y maracuyá.",
		precio: "18.234",
		tipo: "rolls",
		id: 122
	},
	{
		nombre: "RED TUNA & MANGO",
		img: "/img/tunamango.png",
		descripcion: "Atún rojo, mango y palta.",
		precio: "17.136",
		tipo: "soyPaperRolls",
		id: 123
	},
	{
		nombre: "OAHU COCONUT",
		img: "/img/oahu.png",
		descripcion: "Langostinos rebozados, coco en escamas, palta y mayosriracha.",
		precio: "17.472",
		tipo: "soyPaperRolls",
		id: 124
	},
	{
		nombre: "BROWNIE",
		img: "/img/brownie.jpeg",
		descripcion: "Torta húmeda de chocolate y nuez, servida con helado de crema.",
		precio: "9.983",
		tipo: "postres",
		id: 125
	},
	{
		nombre: "KEY LIME PIE",
		img: "/img/lemonpie.jpeg",
		descripcion: "Torta de lima con crema de leche.",
		precio: "9.983",
		tipo: "postres",
		id: 126
	},
	{
		nombre: "CROCANTE DE MANZANA",
		img: "/img/applecrumble.jpg",
		descripcion: "Tarta de manzana con crumble crust y nueces, servida con helado.",
		precio: "9.716",
		tipo: "postres",
		id: 127
	}

];