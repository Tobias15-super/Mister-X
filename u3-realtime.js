// u3-realtime.js
// Demo: "bewegte" U3-Züge zwischen Volkstheater, Herrengasse, Stephansplatz, Stubentor
// Quelle Monitor-API/Doku: https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf  [1](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf)
// Fair Use (≥15s, nur nötige Stops): https://www.data.gv.at/katalog/dataset/wiener-linien-echtzeitdaten-via-datendrehscheibe-wien  [2](https://www.data.gv.at/katalog/dataset/wiener-linien-echtzeitdaten-via-datendrehscheibe-wien)
// Stationen/DIVA/Koordinaten-CSV: http://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltestellen.csv  [3](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltestellen.csv)

/**
 * Öffentliche API
 * startU3Realtime(map, { directionTargets, pollMs, segmentSeconds, divaOverride })
 * stopU3Realtime()
 */

let _timer = null;
let _layerGroup = null;
let _trainMarkers = new Map();
let _polylineLayer = null;
let _aborted = false;

const WL_MONITOR = 'https://www.wienerlinien.at/ogd_realtime/monitor';

const DEFAULT_STATION_NAMES = [
  'Volkstheater', 'Herrengasse', 'Stephansplatz', 'Stubentor'
];

// Terminalnamen für Richtungs-Erkennung im "towards"-Feld:
const DEFAULT_DIRECTION_TARGETS = {
  toSimmering: 'Simmering',
  toOttakring: 'Ottakring'
};

// sehr grobe Standard-Fahrzeiten je Abschnitt (Sekunden)
// -> Für realistischere Werte: aus GTFS stop_times berechnen.  [4](https://www.data.gv.at/katalog/dataset/wiener-linien-fahrplandaten-gtfs-wien)
const DEFAULT_SEGMENT_SECONDS = {
  'Volkstheater→Herrengasse': 90,
  'Herrengasse→Stephansplatz': 90,
  'Stephansplatz→Stubentor': 90,
};

export async function startU3Realtime(map, {
  directionTargets = DEFAULT_DIRECTION_TARGETS,
  pollMs = 15000, // Fair Use: >= 15s  [2](https://www.data.gv.at/katalog/dataset/wiener-linien-echtzeitdaten-via-datendrehscheibe-wien)
  segmentSeconds = DEFAULT_SEGMENT_SECONDS,
  divaOverride = null, // optional: {Volkstheater: 6020xxxxx, ...}
} = {}) {
  if (!map) throw new Error('Leaflet map erforderlich.');
  stopU3Realtime();
  _aborted = false;
  _layerGroup = L.layerGroup().addTo(map);

  // 1) DIVA + Koordinaten besorgen (CSV) oder Overrides nehmen
  const stations = await resolveStations(divaOverride);

  // 2) Segmente (Polylines) zeichnen
  drawSegments(map, stations);

  // 3) Polling starten
  await pollOnce(stations, directionTargets, segmentSeconds);
  if (_aborted) return;
  _timer = setInterval(() => pollOnce(stations, directionTargets, segmentSeconds), pollMs);
}

export function stopU3Realtime() {
  _aborted = true;
  if (_timer) clearInterval(_timer);
  _timer = null;
  if (_layerGroup) {
    _layerGroup.clearLayers();
    _layerGroup.remove();
    _layerGroup = null;
  }
  if (_polylineLayer) {
    _polylineLayer.remove();
    _polylineLayer = null;
  }
  _trainMarkers.clear();
}

/* ---------------- intern ---------------- */

async function resolveStations(divaOverride) {
  const names = DEFAULT_STATION_NAMES;
  let rows = [];
  try {
    // CSV laden (enthält: DIVA;PlatformText;Municipality;MunicipalityID;Longitude;Latitude; …)
    // Hinweis: CSV ist Semikolon-separiert.  [3](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltestellen.csv)
    const res = await fetch('https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-ogd-haltestellen.csv', {
      headers: { 'Accept': 'text/csv' },
      cache: 'no-store'
    });
    const text = await res.text();
    rows = parseCSV(text);
  } catch (e) {
    console.warn('Haltestellen-CSV nicht ladbar. Bitte divaOverride verwenden.', e);
  }

  const stations = [];
  for (const name of names) {
    // fuzzy match: "Stephansplatz" vs "Stephansplatz U" etc.
    const match = rows.find(r => {
      const ptxt = (r.PlatformText || '').toLowerCase();
      return ptxt === name.toLowerCase() ||
             ptxt === `${name.toLowerCase()} u` ||
             ptxt.includes(name.toLowerCase());
    });

    const diva = divaOverride?.[name] ?? (match ? Number(match.DIVA) : null);
    const lat = match ? Number(match.Latitude || match.WGS84_LAT) : null;
    const lon = match ? Number(match.Longitude || match.WGS84_LON) : null;

    if (!diva) {
      console.warn(`Keine DIVA für ${name} gefunden – bitte divaOverride setzen.`);
    }
    stations.push({ name, diva, lat, lon });
  }

  // Reihenfolge fix: Volkstheater → Herrengasse → Stephansplatz → Stubentor
  return stations;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = lines.shift().split(/;|,/).map(h => h.trim());
  return lines.map(line => {
    const cols = line.split(/;|,/);
    const obj = {};
    header.forEach((h, i) => obj[h] = cols[i]);
    // normalize some keys
    obj.DIVA = obj.DIVA || obj['Diva'] || obj['diva'];
    obj.PlatformText = obj.PlatformText || obj['Platformtext'] || obj['NAME'];
    obj.Latitude = obj.Latitude || obj['WGS84_LAT'];
    obj.Longitude = obj.Longitude || obj['WGS84_LON'];
    return obj;
  });
}

function drawSegments(map, stations) {
  // einfache Polyline über die 4 Stationen (Geraden). Für schönere Kurven:
  // Shapes aus GTFS verwenden.  [4](https://www.data.gv.at/katalog/dataset/wiener-linien-fahrplandaten-gtfs-wien)
  const latlngs = stations
    .filter(s => isFinite(s.lat) && isFinite(s.lon))
    .map(s => [s.lat, s.lon]);

  if (latlngs.length >= 2) {
    _polylineLayer = L.polyline(latlngs, {
      color: '#ff7f00',
      weight: 5,
      opacity: 0.6
    }).addTo(_layerGroup);
  }

  // Stationen markieren
  for (const s of stations) {
    if (isFinite(s.lat) && isFinite(s.lon)) {
      L.circleMarker([s.lat, s.lon], { radius: 5, color: '#444', fillColor: '#fff', fillOpacity: 1 })
        .addTo(_layerGroup)
        .bindTooltip(`${s.name}${s.diva ? ` (DIVA ${s.diva})` : ''}`, { permanent: false });
    }
  }
}

async function pollOnce(stations, directionTargets, segmentSeconds) {
  if (_aborted) return;

  // Wir nutzen den Monitor jeweils am "Ziel-Stop" eines Segments:
  // A→B: wir lesen den Monitor von B; alle U3-Abfahrten in Richtung Terminal liefern Countdown -> Position auf A→B.
  // monitor?diva=... liefert Abfahrten aller Haltepunkte der Station.  [1](https://www.wienerlinien.at/ogd_realtime/doku/ogd/wienerlinien-echtzeitdaten-dokumentation.pdf)
  const segs = [
    { from: 'Volkstheater', to: 'Herrengasse', dir: 'toSimmering'   },
    { from: 'Herrengasse',   to: 'Stephansplatz', dir: 'toSimmering' },
    { from: 'Stephansplatz', to: 'Stubentor',     dir: 'toSimmering' },

    { from: 'Herrengasse',   to: 'Volkstheater',  dir: 'toOttakring' },
    { from: 'Stephansplatz', to: 'Herrengasse',   dir: 'toOttakring' },
    { from: 'Stubentor',     to: 'Stephansplatz', dir: 'toOttakring' },
  ];

  // Monitor-Requests (nur für Ziel-Stationen je Segment; hier 3 einzigartige Ziele pro Richtung)
  const uniqueTargets = [...new Set(segs.map(s => s.to))];
  const divaMap = Object.fromEntries(stations.map(s => [s.name, s.diva]));
  const coord = Object.fromEntries(stations.map(s => [s.name, [s.lat, s.lon]]));

  // Fallback, falls DIVA fehlt: keine Abfrage ausführen
  const requests = uniqueTargets
    .filter(name => divaMap[name])
    .map(async name => {
      const url = `${WL_MONITOR}?diva=${encodeURIComponent(divaMap[name])}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
      if (!res.ok) throw new Error(`Monitor ${name} fehlgeschlagen ${res.status}`);
      const json = await res.json();
      return { name, json };
    });

  let monitorByStation = new Map();
  try {
    const results = await Promise.all(requests);
    for (const r of results) monitorByStation.set(r.name, r.json);
  } catch (e) {
    console.warn('Monitor-Request fehlgeschlagen', e);
    return;
  }

  // alle existierenden Marker "entmarkieren"; wir räumen später auf
  const seenKeys = new Set();

  for (const seg of segs) {
    const to = seg.to;
    const targetJson = monitorByStation.get(to);
    if (!targetJson || !targetJson.data || !Array.isArray(targetJson.data.monitors)) continue;

    const towardsStr = seg.dir === 'toSimmering' ? directionTargets.toSimmering : directionTargets.toOttakring;

    // Relevante U3-Abfahrten am Ziel-Stop herausfiltern
    const departures = [];
    for (const mon of targetJson.data.monitors) {
      for (const line of (mon.lines || [])) {
        if (line.name !== 'U3') continue; // nur U3
        for (const dep of (line.departures?.departure || [])) {
          const countdown = Number(dep?.departureTime?.countdown);
          const towards = (line.towards || '');
          // wir brauchen die Fahrten Richtung Terminal dieses Segments
          if (towards.includes(towardsStr) && isFinite(countdown)) {
            departures.push({
              countdownMin: countdown,
              timePlanned: dep?.departureTime?.timePlanned,
              timeReal: dep?.departureTime?.timeReal,
              towards,
            });
          }
        }
      }
    }

    // Fortschritt auf dem Segment A→B
    const fromLL = coord[seg.from];
    const toLL = coord[seg.to];
    if (!fromLL || !toLL) continue;

    const travelSec = segmentSeconds[`${seg.from}→${seg.to}`] ?? 90;
    for (const d of departures) {
      const progress = clamp01(1 - (d.countdownMin * 60) / travelSec);

      // Interpolation entlang einer einfachen Linie zwischen den Stationen:
      const lat = fromLL[0] + (toLL[0] - fromLL[0]) * progress;
      const lon = fromLL[1] + (toLL[1] - fromLL[1]) * progress;

      const key = `${seg.from}->${seg.to}:${d.timePlanned || d.timeReal || d.countdownMin}`;
      seenKeys.add(key);

      if (!_trainMarkers.has(key)) {
        const m = L.circleMarker([lat, lon], {
          radius: 6,
          color: '#ff6a00',
          weight: 2,
          fillColor: '#ffa64d',
          fillOpacity: 0.9
        }).addTo(_layerGroup);
        m.bindTooltip(`U3 → ${towardsStr} • ${seg.from}→${seg.to}\n~${d.countdownMin} min bis ${seg.to}`);
        _trainMarkers.set(key, m);
      } else {
        _trainMarkers.get(key).setLatLng([lat, lon]);
      }
    }
  }

  // Marker aufräumen (nicht mehr gesehene)
  for (const [key, marker] of _trainMarkers.entries()) {
    if (!seenKeys.has(key)) {
      marker.remove();
      _trainMarkers.delete(key);
    }
  }
}

function clamp01(v) { return Math.max(0, Math.min(1, v)); }
