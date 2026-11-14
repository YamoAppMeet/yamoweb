/* ============================================================
   YAMO — Pays desservis et villes proposées
   Le site n'est pas réservé à la Côte d'Ivoire : à l'inscription et
   dans le profil, on choisit un pays puis une ville.
   Modifier cette liste = ajouter/retirer un pays en une ligne.
   ============================================================ */
window.YAMO_COUNTRIES = (function () {
  var LIST = [
    { code: 'CI', dial: '+225', flag: '\uD83C\uDDE8\uD83C\uDDF3', name: "Côte d'Ivoire", cities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San-Pédro', 'Korhogo', 'Man', 'Gagnoa', 'Divo', 'Anyama', 'Grand-Bassam', 'Abengourou'] },
    { code: 'BF', dial: '+226', flag: '\uD83C\uDDE7\uD83C\uDDEB', name: 'Burkina Faso', cities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya'] },
    { code: 'ML', dial: '+223', flag: '\uD83C\uDDF2\uD83C\uDDF1', name: 'Mali', cities: ['Bamako', 'Sikasso', 'Mopti', 'Ségou', 'Kayes'] },
    { code: 'SN', dial: '+221', flag: '\uD83C\uDDF8\uD83C\uDDF3', name: 'Sénégal', cities: ['Dakar', 'Thiès', 'Touba', 'Saint-Louis', 'Ziguinchor'] },
    { code: 'TG', dial: '+228', flag: '\uD83C\uDDF9\uD83C\uDDEC', name: 'Togo', cities: ['Lomé', 'Sokodé', 'Kara', 'Kpalimé'] },
    { code: 'BJ', dial: '+229', flag: '\uD83C\uDDE7\uD83C\uDDEF', name: 'Bénin', cities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi'] },
    { code: 'GN', dial: '+224', flag: '\uD83C\uDDEC\uD83C\uDDF3', name: 'Guinée', cities: ['Conakry', 'Kankan', 'Nzérékoré', 'Kindia'] },
    { code: 'CM', dial: '+237', flag: '\uD83C\uDDE8\uD83C\uDDF2', name: 'Cameroun', cities: ['Douala', 'Yaoundé', 'Bafoussam', 'Garoua'] },
    { code: 'GA', dial: '+241', flag: '\uD83C\uDDEC\uD83C\uDDE6', name: 'Gabon', cities: ['Libreville', 'Port-Gentil', 'Franceville'] },
    { code: 'CD', dial: '+243', flag: '\uD83C\uDDE8\uD83C\uDDE9', name: 'RD Congo', cities: ['Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu'] },
    { code: 'CG', dial: '+242', flag: '\uD83C\uDDE8\uD83C\uDDEC', name: 'Congo-Brazzaville', cities: ['Brazzaville', 'Pointe-Noire'] },
    { code: 'TD', dial: '+235', flag: '\uD83C\uDDF9\uD83C\uDDE9', name: 'Tchad', cities: ["N'Djaména", 'Moundou'] },
    { code: 'MA', dial: '+212', flag: '\uD83C\uDDF2\uD83C\uDDE6', name: 'Maroc', cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger'] },
    { code: 'FR', dial: '+33', flag: '\uD83C\uDDEB\uD83C\uDDF7', name: 'France', cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Bordeaux', 'Lille'] },
    { code: 'BE', dial: '+32', flag: '\uD83C\uDDE7\uD83C\uDDEA', name: 'Belgique', cities: ['Bruxelles', 'Liège', 'Charleroi', 'Namur'] },
    { code: 'CA', dial: '+1', flag: '\uD83C\uDDE8\uD83C\uDDE6', name: 'Canada', cities: ['Montréal', 'Québec', 'Ottawa', 'Toronto', 'Gatineau'] },
    { code: 'US', dial: '+1', flag: '\uD83C\uDDFA\uD83C\uDDF8', name: 'États-Unis', cities: ['New York', 'Washington', 'Atlanta', 'Houston', 'Los Angeles'] },
    { code: 'XX', dial: '+', flag: '\uD83C\uDF0D', name: 'Autre pays', cities: [] },
  ];

  function get(code) {
    var c = String(code || '').toUpperCase();
    for (var i = 0; i < LIST.length; i++) if (LIST[i].code === c) return LIST[i];
    return null;
  }
  function byDial(dial) {
    for (var i = 0; i < LIST.length; i++) if (LIST[i].dial === dial) return LIST[i];
    return null;
  }
  function name(code) { var c = get(code); return c ? c.name : 'Autre pays'; }
  function cities(code) { var c = get(code); return c ? c.cities : []; }

  /* Liste déroulante des pays : <option value="CI">🇨🇮 Côte d'Ivoire</option> */
  function options(selected, withDial) {
    return LIST.map(function (c) {
      var lbl = c.flag + ' ' + c.name + (withDial && c.dial !== '+' ? ' (' + c.dial + ')' : '');
      return '<option value="' + c.code + '"' + (c.code === selected ? ' selected' : '') + '>' + lbl + '</option>';
    }).join('');
  }

  /* Liste déroulante des villes du pays (saisie libre possible en "Autre pays") */
  function cityOptions(code, selected) {
    var arr = cities(code);
    if (!arr.length) return '<option value="">Saisissez votre ville</option>';
    return arr.map(function (v) {
      return '<option value="' + v + '"' + (v === selected ? ' selected' : '') + '>' + v + '</option>';
    }).join('');
  }

  return { LIST: LIST, get: get, byDial: byDial, name: name, cities: cities, options: options, cityOptions: cityOptions };
})();
