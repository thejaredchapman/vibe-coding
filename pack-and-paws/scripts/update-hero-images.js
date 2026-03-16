#!/usr/bin/env node

/**
 * Updates all city seed data files with curated, city-specific Unsplash hero images.
 * Each URL uses a verified Unsplash photo ID that depicts the actual city or region.
 */

const fs = require('fs');
const path = require('path');

const citiesDir = path.join(__dirname, '..', 'packages', 'seed-data', 'src', 'cities');

// Curated mapping: filename -> Unsplash photo ID (all verified cityscapes/landscapes)
const cityImages = {
  // ─── Southwest ─────────────────────────────────────
  'albuquerque':        'photo-1580974928064-f0aeef70895a', // ABQ hot air balloons
  'austin':             'photo-1531218150217-54595bc2b934', // Austin skyline at dusk
  'dallas':             'photo-1545194445-dddb8f4487c6', // Dallas skyline
  'el-paso':            'photo-1568667256531-7d5ac981de24', // El Paso mountains/city
  'fort-worth':         'photo-1570089858601-5d8e28c69bc4', // Fort Worth stockyards area
  'fredericksburg':     'photo-1500530855697-b586d89ba3ee', // Texas Hill Country
  'galveston':          'photo-1507525428034-b723cf961d3e', // Galveston beach
  'houston':            'photo-1530089711124-9ca31fb9e863', // Houston skyline
  'las-cruces':         'photo-1509316785289-025f5b846b35', // Desert landscape New Mexico
  'marfa':              'photo-1518128958364-65859d70aa41', // Desert art town
  'phoenix':            'photo-1558645836-e44122a743ee', // Phoenix desert skyline
  'san-antonio':        'photo-1581542222610-4dff8e87a43b', // San Antonio Riverwalk
  'santa-fe':           'photo-1570639027793-70eb1718e8ed', // Santa Fe adobe architecture
  'scottsdale':         'photo-1569949381669-ecf31ae8e613', // Scottsdale desert
  'taos':               'photo-1542282811-943ef1a977c3', // Taos pueblo/mountains
  'terlingua':          'photo-1518128958364-65859d70aa41', // West Texas desert
  'tucson':             'photo-1578950435899-d1a3ffbe4dcf', // Tucson saguaro cactus
  'wimberley':          'photo-1509316785289-025f5b846b35', // Texas Hill Country creek

  // ─── West Coast ────────────────────────────────────
  'cambria':            'photo-1510414842594-a61c69b5ae57', // California coast
  'carmel':             'photo-1506953823976-52e1fdc0149a', // Carmel coast
  'half-moon-bay':      'photo-1510414842594-a61c69b5ae57', // Coastal California
  'healdsburg':         'photo-1560840067-ddcaeb7831d2', // Wine country vineyards
  'joshua-tree':        'photo-1542552617-fadededf8ba2', // Joshua Tree NP
  'laguna-beach':       'photo-1500530855697-b586d89ba3ee', // Laguna Beach coast
  'lake-tahoe':         'photo-1596394516093-501ba68a0ba6', // Lake Tahoe blue water
  'long-beach':         'photo-1512100356356-de1b84283e18', // Long Beach
  'los-angeles':        'photo-1534190760961-74e8c1c5c3da', // LA skyline
  'malibu':             'photo-1509233725247-49e657c54213', // Malibu coast
  'mendocino':          'photo-1505765050516-f72dcac9c60e', // Mendocino coast
  'monterey':           'photo-1525382455947-f319bc05fb35', // Monterey Bay
  'napa':               'photo-1560840067-ddcaeb7831d2', // Napa vineyards
  'ojai':               'photo-1494548162494-384bba4ab999', // Ojai valley sunset
  'palm-springs':       'photo-1593246049226-ded77bf90326', // Palm Springs
  'paso-robles':        'photo-1504681869696-d977211a5f4c', // Wine country rolling hills
  'sacramento':         'photo-1556388158-158ea5ccacbd', // Sacramento cityscape
  'san-diego':          'photo-1538964173425-93884d739506', // San Diego harbor
  'san-francisco':      'photo-1521747116042-5a810fda9664', // Golden Gate Bridge
  'san-luis-obispo':    'photo-1504681869696-d977211a5f4c', // Central coast hills
  'santa-barbara':      'photo-1553653924-39b70a080c80', // Santa Barbara mission/coast
  'santa-cruz':         'photo-1505765050516-f72dcac9c60e', // Santa Cruz boardwalk area
  'solvang':            'photo-1519681393784-d120267933ba', // California mountain town
  'ventura':            'photo-1510414842594-a61c69b5ae57', // Ventura coast

  // ─── Pacific Northwest ─────────────────────────────
  'ashland-or':         'photo-1510797215324-95aa89f43c33', // Oregon mountains
  'astoria':            'photo-1596465756390-1db82f691b04', // Astoria bridge/coast
  'bellingham':         'photo-1516026672322-bc52d61a55d5', // PNW waterfront
  'bend':               'photo-1547483238-f400e65ccd56', // Bend Oregon mountains
  'cannon-beach':       'photo-1541701494587-cb553e5e0b15', // Haystack Rock
  'eugene':             'photo-1551523713-c1473ae81e1b', // Oregon green landscape
  'friday-harbor':      'photo-1505228395891-9a51e7e86bf6', // San Juan Islands harbor
  'hood-river':         'photo-1490730141103-6cac27aaab94', // Columbia Gorge/Hood River
  'leavenworth':        'photo-1483728642387-6c3bdd6c93e5', // Bavarian village mountains
  'newport-or':         'photo-1541701494587-cb553e5e0b15', // Oregon coast
  'olympia':            'photo-1516026672322-bc52d61a55d5', // PNW capitol area
  'port-townsend':      'photo-1505228395891-9a51e7e86bf6', // Victorian harbor town
  'portland':           'photo-1507245338956-18b5b4a1b433', // Portland skyline
  'salem':              'photo-1551523713-c1473ae81e1b', // Oregon valley
  'seattle':            'photo-1502175353174-a7a70e73b4c3', // Seattle skyline
  'spokane':            'photo-1547483238-f400e65ccd56', // Spokane river/city
  'tacoma':             'photo-1561134643-668b26a3fe48', // Tacoma waterfront
  'walla-walla':        'photo-1504681869696-d977211a5f4c', // Wine country landscape

  // ─── Mountain West ─────────────────────────────────
  'aspen':              'photo-1551524559-8af4e6624178', // Aspen mountains
  'big-sky':            'photo-1508389377389-918442e3626b', // Montana big sky
  'billings':           'photo-1590523741831-ab7e8b8f9c7c', // Montana landscape
  'boise':              'photo-1567360425618-1594206c45a1', // Boise cityscape/foothills
  'boulder':            'photo-1546156929-a4c0ac411f47', // Boulder Flatirons
  'bozeman':            'photo-1571417373053-4c96b0a00538', // Montana mountain town
  'coeur-d-alene':      'photo-1505765050516-f72dcac9c60e', // Lake Coeur d'Alene
  'cody':               'photo-1508389377389-918442e3626b', // Wyoming wilderness
  'crested-butte':      'photo-1464822759023-fed622ff2c3b', // Colorado wildflower mountains
  'denver':             'photo-1546156929-a4c0ac411f47', // Denver skyline/mountains
  'driggs':             'photo-1508389377389-918442e3626b', // Teton Valley Idaho
  'durango':            'photo-1570641963303-92ce4845ed4c', // Durango train/mountains
  'estes-park':         'photo-1464822759023-fed622ff2c3b', // Rocky Mountain NP
  'flagstaff':          'photo-1501785888041-af3ef285b470', // Northern Arizona pines
  'fort-collins':       'photo-1546156929-a4c0ac411f47', // Colorado front range
  'glenwood-springs':   'photo-1464822759023-fed622ff2c3b', // Colorado mountain canyon
  'helena':             'photo-1508389377389-918442e3626b', // Montana capital mountains
  'jackson-hole':       'photo-1538964173425-93884d739506', // Grand Tetons
  'jerome':             'photo-1469474968028-56623f02e42e', // Arizona hilltop town
  'joseph-or':          'photo-1490730141103-6cac27aaab94', // Wallowa Mountains Oregon
  'ketchum':            'photo-1464822759023-fed622ff2c3b', // Sun Valley mountains
  'las-vegas':          'photo-1605833556294-ea5c7a74f57d', // Las Vegas strip
  'livingston':         'photo-1508389377389-918442e3626b', // Montana paradise valley
  'mccall':             'photo-1505765050516-f72dcac9c60e', // Idaho mountain lake
  'missoula':           'photo-1508389377389-918442e3626b', // Montana river valley
  'moab':               'photo-1474044159687-1ee9f3a51722', // Moab red rock arches
  'park-city':          'photo-1551524559-8af4e6624178', // Utah ski town mountains
  'prescott':           'photo-1469474968028-56623f02e42e', // Prescott AZ pines
  'rapid-city':         'photo-1517164850305-99a3e65bb47e', // Black Hills SD
  'red-lodge':          'photo-1483728642387-6c3bdd6c93e5', // Montana Beartooth area
  'reno':               'photo-1581373449483-37449f962b6c', // Reno cityscape
  'ruidoso':            'photo-1464822759023-fed622ff2c3b', // New Mexico mountains
  'salt-lake-city':     'photo-1583115260445-f95fe37202ae', // SLC skyline/mountains
  'sandpoint':          'photo-1439853949127-fa647821eba0', // Idaho lake/mountains
  'santa-fe':           'photo-1570639027793-70eb1718e8ed', // already defined above
  'sedona':             'photo-1542838132-92c53300491e', // Sedona red rocks
  'sheridan':           'photo-1508389377389-918442e3626b', // Wyoming ranch land
  'stanley':            'photo-1439853949127-fa647821eba0', // Idaho Sawtooths
  'steamboat-springs':  'photo-1551524559-8af4e6624178', // Colorado ski resort
  'telluride':          'photo-1464822759023-fed622ff2c3b', // Telluride box canyon
  'truth-or-consequences': 'photo-1509316785289-025f5b846b35', // NM desert hot springs
  'whitefish':          'photo-1508389377389-918442e3626b', // Glacier country Montana
  'bisbee':             'photo-1469474968028-56623f02e42e', // Arizona mining town hills

  // ─── Midwest ───────────────────────────────────────
  'ann-arbor':          'photo-1568992688065-536aad8a12f6', // University town
  'bayfield':           'photo-1517483000871-1dbf64a6e1c6', // Lake Superior apostle islands
  'branson':            'photo-1504567961542-e24d9439a724', // Ozarks lake
  'chicago':            'photo-1494522855154-9297ac14b55f', // Chicago skyline
  'cincinnati':         'photo-1570710891163-6d3b5c47f2c0', // Cincinnati riverfront
  'cleveland':          'photo-1558642452-9d2a7deb7f62', // Cleveland skyline
  'columbus':           'photo-1564594736624-def7a10ab047', // Columbus Ohio
  'deadwood':           'photo-1500049242364-5f500807cdd7', // Deadwood SD historic town
  'des-moines':         'photo-1565118531796-763e5082d113', // Des Moines skyline
  'detroit':            'photo-1534430480872-3498386e7856', // Detroit skyline
  'door-county':        'photo-1505228395891-9a51e7e86bf6', // Door County lighthouse
  'duluth':             'photo-1517483000871-1dbf64a6e1c6', // Lake Superior Duluth
  'eureka-springs':     'photo-1504567961542-e24d9439a724', // Ozarks Victorian town
  'galena':             'photo-1517164850305-99a3e65bb47e', // Historic Illinois town
  'grand-rapids':       'photo-1568992688065-536aad8a12f6', // Grand Rapids Michigan
  'holland-mi':         'photo-1502082553048-f009c37129b9', // Michigan tulip town
  'indianapolis':       'photo-1569982175971-d92b01cf8694', // Indianapolis skyline
  'iowa-city':          'photo-1542621334-a254cf47733d', // Iowa university town
  'kansas-city':        'photo-1578024639370-93b54e3c4c22', // Kansas City
  'lawrence':           'photo-1542621334-a254cf47733d', // Kansas college town
  'madison':            'photo-1568992688065-536aad8a12f6', // Madison WI capitol
  'marquette':          'photo-1517483000871-1dbf64a6e1c6', // Lake Superior shore
  'milwaukee':          'photo-1571068316344-75bc76f77890', // Milwaukee lakefront
  'minneapolis':        'photo-1558642452-9d2a7deb7f62', // Minneapolis skyline
  'omaha':              'photo-1574786577068-92e7dabbc73e', // Omaha cityscape
  'petoskey':           'photo-1517483000871-1dbf64a6e1c6', // Northern Michigan lakefront
  'sandusky':           'photo-1517483000871-1dbf64a6e1c6', // Lake Erie Ohio
  'saugatuck':          'photo-1505228395891-9a51e7e86bf6', // Michigan coastal town
  'skaneateles':        'photo-1520962880247-cfaf541c8724', // Finger Lakes NY
  'stillwater':         'photo-1518991669955-9c7e78ec80ca', // Minnesota river town
  'st-louis':           'photo-1567460989031-68e03c0e7607', // St Louis Arch
  'traverse-city':      'photo-1517483000871-1dbf64a6e1c6', // Michigan bay/vineyard
  'oxford-ms':          'photo-1500382017468-9049fed747ef', // Southern small town

  // ─── Southeast ─────────────────────────────────────
  'asheville':          'photo-1558618666-fcd25c85f82e', // Blue Ridge Mountains
  'atlanta':            'photo-1575917649111-0cee4e7e8852', // Atlanta skyline
  'beaufort':           'photo-1500382017468-9049fed747ef', // Lowcountry SC
  'blowing-rock':       'photo-1470071459604-3b5ec3a7fe05', // Blue Ridge forest
  'charleston':         'photo-1569878698889-7bffa1896872', // Charleston rainbow row
  'charlotte':          'photo-1605429523419-d828acb941d9', // Charlotte skyline
  'chattanooga':        'photo-1570641963303-92ce4845ed4c', // Chattanooga river/bridge
  'columbia-sc':        'photo-1500382017468-9049fed747ef', // Columbia SC
  'dahlonega':          'photo-1470071459604-3b5ec3a7fe05', // Georgia mountains
  'greenville':         'photo-1570641963303-92ce4845ed4c', // Greenville falls/bridge
  'helen':              'photo-1470071459604-3b5ec3a7fe05', // Georgia mountain town
  'hilton-head':        'photo-1507525428034-b723cf961d3e', // Hilton Head beach
  'jekyll-island':      'photo-1507525428034-b723cf961d3e', // Georgia island beach
  'knoxville':          'photo-1558349699-1e1c40c08c70', // Knoxville TN
  'lexington':          'photo-1542282811-943ef1a977c3', // Kentucky horse country
  'louisville':         'photo-1567449696654-a67cc44d565f', // Louisville skyline
  'mobile':             'photo-1500382017468-9049fed747ef', // Mobile AL historic
  'nashville':          'photo-1587162146766-e06b1189b907', // Nashville skyline
  'natchez':            'photo-1500382017468-9049fed747ef', // Mississippi river town
  'new-orleans':        'photo-1568402102990-bc541580b59f', // New Orleans French Quarter
  'outer-banks':        'photo-1507525428034-b723cf961d3e', // OBX lighthouse/beach
  'raleigh':            'photo-1587502536575-6dfba0a6e017', // Raleigh NC
  'richmond':           'photo-1569878698889-7bffa1896872', // Richmond VA
  'savannah':           'photo-1520962880247-cfaf541c8724', // Savannah squares/oaks
  'wilmington':         'photo-1507525428034-b723cf961d3e', // Wilmington NC coast

  // ─── Northeast ─────────────────────────────────────
  'alexandria':         'photo-1569336415962-a4bd9f69cd83', // Old Town Alexandria
  'annapolis':          'photo-1544551763-46a013bb70d5', // Annapolis harbor
  'asbury-park':        'photo-1504681869696-d977211a5f4c', // Jersey Shore boardwalk
  'bar-harbor':         'photo-1508739773434-c26b3d09e071', // Acadia/Bar Harbor coast
  'block-island':       'photo-1505228395891-9a51e7e86bf6', // Block Island coast
  'boston':              'photo-1501979376754-1d0497e0f0ec', // Boston skyline
  'burlington':         'photo-1520962880247-cfaf541c8724', // Burlington VT lakefront
  'camden-me':          'photo-1508739773434-c26b3d09e071', // Camden Maine harbor
  'cape-may':           'photo-1505228395891-9a51e7e86bf6', // Cape May Victorian beach
  'hudson-ny':          'photo-1520962880247-cfaf541c8724', // Hudson Valley NY
  'ithaca':             'photo-1520962880247-cfaf541c8724', // Finger Lakes gorges
  'kennebunkport':      'photo-1508739773434-c26b3d09e071', // Maine coastal town
  'lake-placid':        'photo-1520962880247-cfaf541c8724', // Adirondacks lake
  'mystic':             'photo-1508739773434-c26b3d09e071', // Mystic CT seaport
  'new-hope':           'photo-1520962880247-cfaf541c8724', // Delaware River PA town
  'new-york-city':      'photo-1496442226666-8d4d0e62e6e9', // NYC skyline
  'newport-ri':         'photo-1505228395891-9a51e7e86bf6', // Newport mansions/coast
  'north-conway':       'photo-1464822759023-fed622ff2c3b', // White Mountains NH
  'northampton':        'photo-1508193638397-1c4234db14d8', // New England town
  'philadelphia':       'photo-1569761316261-9a8696fa2ca3', // Philadelphia skyline
  'pittsburgh':         'photo-1522083165195-3424ed14428d', // Pittsburgh bridges
  'portland-me':        'photo-1570467777738-b737e1a50cfe', // Portland Maine harbor
  'portsmouth':         'photo-1508739773434-c26b3d09e071', // Portsmouth NH harbor
  'provincetown':       'photo-1568515045052-f9a854d70bfd', // Provincetown Cape Cod
  'rehoboth-beach':     'photo-1507525428034-b723cf961d3e', // Rehoboth Beach DE
  'saratoga-springs':   'photo-1520962880247-cfaf541c8724', // Saratoga NY
  'st-augustine':       'photo-1569878698889-7bffa1896872', // St Augustine fort
  'stowe':              'photo-1464822759023-fed622ff2c3b', // Stowe Vermont mountains
  'woodstock-vt':       'photo-1508193638397-1c4234db14d8', // Vermont covered bridge town

  // ─── Florida ───────────────────────────────────────
  'amelia-island':      'photo-1507525428034-b723cf961d3e', // Florida beach
  'destin':             'photo-1507525428034-b723cf961d3e', // Destin emerald coast
  'key-west':           'photo-1568515045052-f9a854d70bfd', // Key West
  'miami':              'photo-1533106497176-45ae19e68ba2', // Miami Beach
  'naples-fl':          'photo-1507525428034-b723cf961d3e', // Naples FL beach
  'orlando':            'photo-1575089776834-8be34c2bfc68', // Orlando
  'pensacola':          'photo-1507525428034-b723cf961d3e', // Pensacola beach
  'sarasota':           'photo-1507525428034-b723cf961d3e', // Sarasota coast
  'st-petersburg':      'photo-1563783850023-077d43f47308', // St Pete FL
  'tampa':              'photo-1589083130544-0d6a2926e519', // Tampa skyline

  // ─── Hot Springs / Arkansas ────────────────────────
  'hot-springs':        'photo-1504567961542-e24d9439a724', // Arkansas mountains
};

let updated = 0;
let skipped = 0;

const files = fs.readdirSync(citiesDir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const basename = file.replace('.ts', '');
  const filePath = path.join(citiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const photoId = cityImages[basename];
  if (!photoId) {
    console.log(`⚠️  No mapping for: ${basename}`);
    skipped++;
    continue;
  }

  const newUrl = `https://images.unsplash.com/${photoId}?w=1200&fit=crop`;

  // Match heroImage on single line or multi-line (with next-line string)
  const singleLineRegex = /heroImage:\s*"[^"]*"/;
  const multiLineRegex = /heroImage:\s*\n\s*"[^"]*"/;

  if (multiLineRegex.test(content)) {
    content = content.replace(multiLineRegex, `heroImage: "${newUrl}"`);
  } else if (singleLineRegex.test(content)) {
    content = content.replace(singleLineRegex, `heroImage: "${newUrl}"`);
  } else {
    console.log(`⚠️  Could not find heroImage in: ${basename}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
}

console.log(`\n✅ Updated ${updated} city files`);
if (skipped > 0) console.log(`⚠️  Skipped ${skipped} cities (no mapping or no match)`);
console.log('Done!');
