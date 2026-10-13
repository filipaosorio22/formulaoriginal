/* Lista de cidades (nome|país|lat|lon|fuso), partilhada pelo pop-up da Leitura */
window.FO_CITIES = (function(){
var RAW = [
// Portugal — capitais de distrito
'Aveiro|Portugal|40.6405|-8.6538|Europe/Lisbon','Beja|Portugal|38.0151|-7.8632|Europe/Lisbon','Braga|Portugal|41.5454|-8.4265|Europe/Lisbon',
'Bragança|Portugal|41.8061|-6.7567|Europe/Lisbon','Castelo Branco|Portugal|39.8222|-7.4909|Europe/Lisbon','Coimbra|Portugal|40.2033|-8.4103|Europe/Lisbon',
'Évora|Portugal|38.5714|-7.9135|Europe/Lisbon','Faro|Portugal|37.0194|-7.9304|Europe/Lisbon','Guarda|Portugal|40.5373|-7.2658|Europe/Lisbon',
'Leiria|Portugal|39.7436|-8.8071|Europe/Lisbon','Lisboa|Portugal|38.7223|-9.1393|Europe/Lisbon','Portalegre|Portugal|39.2967|-7.4285|Europe/Lisbon',
'Porto|Portugal|41.1579|-8.6291|Europe/Lisbon','Santarém|Portugal|39.2362|-8.6859|Europe/Lisbon','Setúbal|Portugal|38.5244|-8.8882|Europe/Lisbon',
'Viana do Castelo|Portugal|41.6932|-8.8329|Europe/Lisbon','Vila Real|Portugal|41.3006|-7.7441|Europe/Lisbon','Viseu|Portugal|40.6566|-7.9125|Europe/Lisbon',
// Portugal — outras
'Almada|Portugal|38.6790|-9.1569|Europe/Lisbon','Amadora|Portugal|38.7538|-9.2308|Europe/Lisbon','Sintra|Portugal|38.8029|-9.3817|Europe/Lisbon',
'Cascais|Portugal|38.6979|-9.4215|Europe/Lisbon','Oeiras|Portugal|38.6969|-9.3146|Europe/Lisbon','Loures|Portugal|38.8309|-9.1685|Europe/Lisbon',
'Odivelas|Portugal|38.7930|-9.1830|Europe/Lisbon','Seixal|Portugal|38.6401|-9.1015|Europe/Lisbon','Barreiro|Portugal|38.6631|-9.0724|Europe/Lisbon',
'Vila Franca de Xira|Portugal|38.9553|-8.9897|Europe/Lisbon','Vila Nova de Gaia|Portugal|41.1239|-8.6118|Europe/Lisbon','Matosinhos|Portugal|41.1821|-8.6891|Europe/Lisbon',
'Maia|Portugal|41.2357|-8.6199|Europe/Lisbon','Gondomar|Portugal|41.1444|-8.5322|Europe/Lisbon','Guimarães|Portugal|41.4425|-8.2918|Europe/Lisbon',
'Barcelos|Portugal|41.5388|-8.6151|Europe/Lisbon','Vila Nova de Famalicão|Portugal|41.4076|-8.5198|Europe/Lisbon','Póvoa de Varzim|Portugal|41.3804|-8.7609|Europe/Lisbon',
'Figueira da Foz|Portugal|40.1508|-8.8618|Europe/Lisbon','Covilhã|Portugal|40.2806|-7.5045|Europe/Lisbon','Chaves|Portugal|41.7400|-7.4707|Europe/Lisbon',
'Torres Vedras|Portugal|39.0911|-9.2586|Europe/Lisbon','Caldas da Rainha|Portugal|39.4036|-9.1386|Europe/Lisbon','Tomar|Portugal|39.6019|-8.4092|Europe/Lisbon',
'Elvas|Portugal|38.8810|-7.1630|Europe/Lisbon','Sines|Portugal|37.9560|-8.8698|Europe/Lisbon','Portimão|Portugal|37.1386|-8.5376|Europe/Lisbon',
'Lagos|Portugal|37.1028|-8.6731|Europe/Lisbon','Albufeira|Portugal|37.0891|-8.2479|Europe/Lisbon','Loulé|Portugal|37.1381|-8.0197|Europe/Lisbon',
'Olhão|Portugal|37.0260|-7.8411|Europe/Lisbon','Tavira|Portugal|37.1275|-7.6506|Europe/Lisbon','Lamego|Portugal|41.0970|-7.8098|Europe/Lisbon',
// Madeira
'Funchal|Madeira, Portugal|32.6669|-16.9241|Atlantic/Madeira','Câmara de Lobos|Madeira, Portugal|32.6500|-16.9770|Atlantic/Madeira',
'Santa Cruz|Madeira, Portugal|32.6881|-16.7937|Atlantic/Madeira','Machico|Madeira, Portugal|32.7190|-16.7663|Atlantic/Madeira',
'Ribeira Brava|Madeira, Portugal|32.6726|-17.0634|Atlantic/Madeira','Porto Santo|Madeira, Portugal|33.0617|-16.3420|Atlantic/Madeira',
// Açores
'Ponta Delgada|Açores, Portugal|37.7412|-25.6756|Atlantic/Azores','Ribeira Grande|Açores, Portugal|37.8211|-25.5194|Atlantic/Azores',
'Angra do Heroísmo|Açores, Portugal|38.6551|-27.2156|Atlantic/Azores','Praia da Vitória|Açores, Portugal|38.7333|-27.0667|Atlantic/Azores',
'Horta|Açores, Portugal|38.5363|-28.6269|Atlantic/Azores','Madalena do Pico|Açores, Portugal|38.5361|-28.5283|Atlantic/Azores',
'Velas|Açores, Portugal|38.6806|-28.2083|Atlantic/Azores','Vila do Porto|Açores, Portugal|36.9447|-25.1450|Atlantic/Azores',
'Santa Cruz das Flores|Açores, Portugal|39.4533|-31.1275|Atlantic/Azores',
// Brasil
'São Paulo|Brasil|-23.5505|-46.6333|America/Sao_Paulo','Rio de Janeiro|Brasil|-22.9068|-43.1729|America/Sao_Paulo','Brasília|Brasil|-15.7939|-47.8828|America/Sao_Paulo',
'Belo Horizonte|Brasil|-19.9167|-43.9345|America/Sao_Paulo','Salvador|Brasil|-12.9777|-38.5016|America/Bahia','Fortaleza|Brasil|-3.7319|-38.5267|America/Fortaleza',
'Recife|Brasil|-8.0476|-34.8770|America/Recife','Manaus|Brasil|-3.1190|-60.0217|America/Manaus','Curitiba|Brasil|-25.4284|-49.2733|America/Sao_Paulo',
'Porto Alegre|Brasil|-30.0346|-51.2177|America/Sao_Paulo','Belém|Brasil|-1.4558|-48.4902|America/Belem','Goiânia|Brasil|-16.6869|-49.2648|America/Sao_Paulo',
'São Luís|Brasil|-2.5307|-44.3068|America/Fortaleza','Maceió|Brasil|-9.6658|-35.7353|America/Maceio','Natal|Brasil|-5.7945|-35.2110|America/Fortaleza',
'Teresina|Brasil|-5.0919|-42.8034|America/Fortaleza','João Pessoa|Brasil|-7.1195|-34.8450|America/Fortaleza','Aracaju|Brasil|-10.9472|-37.0731|America/Maceio',
'Cuiabá|Brasil|-15.6014|-56.0979|America/Cuiaba','Campo Grande|Brasil|-20.4697|-54.6201|America/Campo_Grande','Florianópolis|Brasil|-27.5954|-48.5480|America/Sao_Paulo',
'Vitória|Brasil|-20.3155|-40.3128|America/Sao_Paulo','Palmas|Brasil|-10.2491|-48.3243|America/Araguaina','Porto Velho|Brasil|-8.7612|-63.9004|America/Porto_Velho',
'Rio Branco|Brasil|-9.9754|-67.8249|America/Rio_Branco','Macapá|Brasil|0.0349|-51.0694|America/Belem','Boa Vista|Brasil|2.8235|-60.6758|America/Boa_Vista',
'Campinas|Brasil|-22.9099|-47.0626|America/Sao_Paulo','Guarulhos|Brasil|-23.4543|-46.5337|America/Sao_Paulo','Santos|Brasil|-23.9608|-46.3336|America/Sao_Paulo',
'Niterói|Brasil|-22.8832|-43.1034|America/Sao_Paulo','Juiz de Fora|Brasil|-21.7642|-43.3496|America/Sao_Paulo','Uberlândia|Brasil|-18.9186|-48.2772|America/Sao_Paulo',
'Ribeirão Preto|Brasil|-21.1775|-47.8103|America/Sao_Paulo','Sorocaba|Brasil|-23.5015|-47.4526|America/Sao_Paulo','Londrina|Brasil|-23.3045|-51.1696|America/Sao_Paulo',
'Joinville|Brasil|-26.3045|-48.8487|America/Sao_Paulo','Caxias do Sul|Brasil|-29.1678|-51.1794|America/Sao_Paulo','Feira de Santana|Brasil|-12.2664|-38.9663|America/Bahia',
// África lusófona
'Luanda|Angola|-8.8390|13.2894|Africa/Luanda','Huambo|Angola|-12.7761|15.7392|Africa/Luanda','Benguela|Angola|-12.5763|13.4055|Africa/Luanda',
'Lobito|Angola|-12.3644|13.5366|Africa/Luanda','Lubango|Angola|-14.9177|13.4925|Africa/Luanda','Cabinda|Angola|-5.5500|12.2000|Africa/Luanda',
'Maputo|Moçambique|-25.9692|32.5732|Africa/Maputo','Beira|Moçambique|-19.8436|34.8389|Africa/Maputo','Nampula|Moçambique|-15.1165|39.2666|Africa/Maputo',
'Quelimane|Moçambique|-17.8786|36.8883|Africa/Maputo','Tete|Moçambique|-16.1564|33.5867|Africa/Maputo',
'Praia|Cabo Verde|14.9330|-23.5133|Atlantic/Cape_Verde','Mindelo|Cabo Verde|16.8901|-24.9804|Atlantic/Cape_Verde','Espargos|Cabo Verde|16.7550|-22.9450|Atlantic/Cape_Verde',
'Bissau|Guiné-Bissau|11.8636|-15.5977|Africa/Bissau','São Tomé|São Tomé e Príncipe|0.3365|6.7273|Africa/Sao_Tome',
'Joanesburgo|África do Sul|-26.2041|28.0473|Africa/Johannesburg',
// Espanha
'Madrid|Espanha|40.4168|-3.7038|Europe/Madrid','Barcelona|Espanha|41.3874|2.1686|Europe/Madrid','Valência|Espanha|39.4699|-0.3763|Europe/Madrid',
'Sevilha|Espanha|37.3891|-5.9845|Europe/Madrid','Málaga|Espanha|36.7213|-4.4214|Europe/Madrid','Bilbau|Espanha|43.2630|-2.9350|Europe/Madrid',
'Vigo|Espanha|42.2406|-8.7207|Europe/Madrid','Santiago de Compostela|Espanha|42.8782|-8.5448|Europe/Madrid','Salamanca|Espanha|40.9701|-5.6635|Europe/Madrid',
'Badajoz|Espanha|38.8794|-6.9707|Europe/Madrid','Las Palmas de Gran Canaria|Espanha|28.1235|-15.4363|Atlantic/Canary',
// França
'Paris|França|48.8566|2.3522|Europe/Paris','Lyon|França|45.7640|4.8357|Europe/Paris','Marselha|França|43.2965|5.3698|Europe/Paris',
'Toulouse|França|43.6047|1.4442|Europe/Paris','Bordéus|França|44.8378|-0.5792|Europe/Paris','Nice|França|43.7102|7.2620|Europe/Paris',
'Lille|França|50.6292|3.0573|Europe/Paris','Nantes|França|47.2184|-1.5536|Europe/Paris','Estrasburgo|França|48.5734|7.7521|Europe/Paris',
// Reino Unido e Irlanda
'Londres|Reino Unido|51.5074|-0.1278|Europe/London','Manchester|Reino Unido|53.4808|-2.2426|Europe/London','Birmingham|Reino Unido|52.4862|-1.8904|Europe/London',
'Liverpool|Reino Unido|53.4084|-2.9916|Europe/London','Bristol|Reino Unido|51.4545|-2.5879|Europe/London','Edimburgo|Reino Unido|55.9533|-3.1883|Europe/London',
'Jersey (St Helier)|Reino Unido|49.1868|-2.1100|Europe/Jersey','Dublin|Irlanda|53.3498|-6.2603|Europe/Dublin',
// Suíça, Luxemburgo, Benelux, Alemanha, Itália
'Genebra|Suíça|46.2044|6.1432|Europe/Zurich','Lausana|Suíça|46.5197|6.6323|Europe/Zurich','Zurique|Suíça|47.3769|8.5417|Europe/Zurich',
'Berna|Suíça|46.9480|7.4474|Europe/Zurich','Basileia|Suíça|47.5596|7.5886|Europe/Zurich','Sion|Suíça|46.2331|7.3606|Europe/Zurich',
'Luxemburgo|Luxemburgo|49.6116|6.1319|Europe/Luxembourg','Esch-sur-Alzette|Luxemburgo|49.4958|5.9806|Europe/Luxembourg',
'Bruxelas|Bélgica|50.8503|4.3517|Europe/Brussels','Amesterdão|Países Baixos|52.3676|4.9041|Europe/Amsterdam','Roterdão|Países Baixos|51.9244|4.4777|Europe/Amsterdam',
'Berlim|Alemanha|52.5200|13.4050|Europe/Berlin','Hamburgo|Alemanha|53.5511|9.9937|Europe/Berlin','Munique|Alemanha|48.1351|11.5820|Europe/Berlin',
'Frankfurt|Alemanha|50.1109|8.6821|Europe/Berlin','Colónia|Alemanha|50.9375|6.9603|Europe/Berlin','Estugarda|Alemanha|48.7758|9.1829|Europe/Berlin',
'Düsseldorf|Alemanha|51.2277|6.7735|Europe/Berlin','Roma|Itália|41.9028|12.4964|Europe/Rome','Milão|Itália|45.4642|9.1900|Europe/Rome',
// EUA
'Nova Iorque|EUA|40.7128|-74.0060|America/New_York','Newark|EUA|40.7357|-74.1724|America/New_York','Boston|EUA|42.3601|-71.0589|America/New_York',
'Fall River|EUA|41.7015|-71.1550|America/New_York','New Bedford|EUA|41.6362|-70.9342|America/New_York','Providence|EUA|41.8240|-71.4128|America/New_York',
'Washington, D.C.|EUA|38.9072|-77.0369|America/New_York','Miami|EUA|25.7617|-80.1918|America/New_York','Orlando|EUA|28.5383|-81.3792|America/New_York',
'Chicago|EUA|41.8781|-87.6298|America/Chicago','Houston|EUA|29.7604|-95.3698|America/Chicago','Denver|EUA|39.7392|-104.9903|America/Denver',
'Phoenix|EUA|33.4484|-112.0740|America/Phoenix','Los Angeles|EUA|34.0522|-118.2437|America/Los_Angeles','São Francisco|EUA|37.7749|-122.4194|America/Los_Angeles',
'San José (Califórnia)|EUA|37.3382|-121.8863|America/Los_Angeles','Honolulu|EUA|21.3069|-157.8583|Pacific/Honolulu',
// Canadá
'Toronto|Canadá|43.6532|-79.3832|America/Toronto','Montreal|Canadá|45.5019|-73.5674|America/Toronto','Otava|Canadá|45.4215|-75.6972|America/Toronto',
'Vancouver|Canadá|49.2827|-123.1207|America/Vancouver','Calgary|Canadá|51.0447|-114.0719|America/Edmonton','Winnipeg|Canadá|49.8954|-97.1385|America/Winnipeg',
// Outros com comunidades lusófonas
'Caracas|Venezuela|10.4806|-66.9036|America/Caracas','Macau|China|22.1987|113.5439|Asia/Macau','Díli|Timor-Leste|-8.5569|125.5603|Asia/Dili'
];
return RAW;
})();
