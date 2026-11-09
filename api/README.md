# Social Steps API (Android-brug naar CloudKit)

Vercel Functions (Node, geen dependencies) waarmee de Android-app dezelfde community-teller en
hetzelfde verwijssysteem gebruikt als iOS. Ze praten met CloudKit Web Services (publieke database)
via een server-to-server key. iOS praat rechtstreeks met CloudKit; beide zien dezelfde records.

## Endpoints

| Methode | Pad | Body / query | Antwoord |
|---|---|---|---|
| GET | `/api/community` | optioneel `?day=yyyyMMdd` | `{ total, today }` |
| POST | `/api/community` | `{ installId, lifetimeDelta, todayDelta, dayKey }` | `{ ok: true }` |
| POST | `/api/referral/register` | `{ installId, code }` | `{ ok: true }` |
| POST | `/api/referral/redeem` | `{ installId, code }` | `{ result: "ok"\|"invalid"\|"own"\|"already" }` |
| GET | `/api/referral/count` | `?code=STEP-XXXXXX` | `{ count }` |

Fouten: `400 { error: "<veld>" }`, `405`, `429 { error: "rate_limited" }`,
`503 { error: "busy" }` (CloudKit druk, niets opgeslagen: later opnieuw sturen), `502 { error: "upstream" }`.

- `today` zonder `?day` = dag in Europe/Amsterdam. iOS gebruikt de tijdzone van het toestel; Android kan
  `?day=<eigen dayKey>` meegeven om exact hetzelfde te tonen. GET is 60 s gecachet (geheugen + CDN).
- POST `/api/community`: eerst `lifetimeDelta`, dan `todayDelta`. Bij `503` is niets geschreven: alles
  opnieuw sturen. Bij `200` is het totaal zeker opgeslagen (de dagdelta in uitzonderingen niet).

## Records (gelijk aan iOS)

| Record | Type | Velden | Gemaakt door |
|---|---|---|---|
| `shard_0`..`shard_11` | `StepsShard` | `count` (INT64) | iOS + server |
| `day_<yyyyMMdd>_0`..`_11` | `StepsShard` | `count` | iOS + server |
| `code_<CODE>` | `Referral` | `createdAt` | iOS + server |
| `usr_<sha256(iCloud-userID)>` | `Referral` | `referrerCode`, `createdAt` | iOS |
| `usr_and_<sha256(installId)>` | `Referral` | `referrerCode`, `createdAt` | server |
| `own_<sha256(CODE + "\|" + installId)>` | `Referral` | `createdAt` | server |

`own_` legt vast welke Android-install een code bezit. Server-records hebben als creator de
server-key, dus de iOS-creatorcheck kan dat niet zien. Een apart record in plaats van een nieuw veld:
geen schemawijziging nodig. iOS telt via `referrerCode == CODE`, dus `usr_and_`-records tellen mee en
`own_`/`code_`-records niet.

Shard-updates: read-modify-write met `recordChangeTag`. Bij `CONFLICT` of `TRY_AGAIN_LATER` tot 4
pogingen op andere shards; bij HTTP 503 (throttling) direct stoppen.

## Misbruikrem

- `installId` moet een UUID zijn, code `STEP-` + 6 tekens uit het iOS-alfabet.
- `lifetimeDelta` 0..200000, `todayDelta` 0..100000, gehele getallen; `dayKey` UTC-datum -2..+1 dag.
- Rate limit per IP en installId (per uur): community POST 120/30, register 20/5, redeem 10/5,
  count 60 per IP, community GET 300 per IP. In-memory per serverless-instantie: best effort.
- Verwijzingen per code: er tellen er hooguit 12 in totaal en 3 per 24 uur mee voor de uitnodiger. Dat volgt uit
  de records in CloudKit (duurzaam, over alle IP's heen). Boven de grens krijgt de vriend gewoon `ok` en wordt zijn
  inwisseling vastgelegd, maar zonder `referrerCode`, zodat hij niet meetelt.

## Omgeving

| Variabele | Waarde |
|---|---|
| `CK_ENV` | `development` of `production` |
| `CK_KEY_ID` | key-id van de server-to-server key voor die omgeving |
| `CK_PRIVATE_KEY` | inhoud van de PEM (EC prime256v1); `\n` letterlijk mag |
| `CK_CONTAINER` | `iCloud.com.socialsteps.app` |
| `REVIEW_CODES` | komma-gescheiden reviewcodes voor Google Play (`STEP-` + 6 tekens, zonder 0/O/1/I). Niet gezet of leeg = geen reviewcode. Staat alleen in Vercel, nooit in de repo |

De privésleutel staat alleen in Vercel-env en lokaal buiten de repo. Nooit committen of loggen.

## Tests

```sh
cd api
node --test _tests/unit.test.js                       # geen netwerk
CK_ENV=development CK_KEY_ID=... CK_PRIVATE_KEY="$(cat pad/naar.pem)" \
  node --test _tests/integration.test.js              # schrijft echt in CloudKit Development
```

De integratietest weigert te draaien zonder `CK_ENV=development`. Nooit tegen Production draaien.
