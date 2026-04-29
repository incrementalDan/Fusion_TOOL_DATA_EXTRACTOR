# Tool Extractor — CLAUDE.md

## What This Is

A single-file React artifact (`tool-extractor.jsx`) that extracts cutting tool data from product page screenshots, PDFs, or pasted text using the Anthropic API, then exports to two formats:

- **Fusion 360** — 172-column tab-separated CSV for the Fusion 360 CAM tool library
- **ProShop ERP** — comma-separated CSV for ProShop tooling database

The app is deployed as a Claude artifact (rendered inside claude.ai). There is no build step, no backend, no localStorage — everything runs in the browser.

---

## File Structure

```
tool-extractor.jsx      — The entire app, ~1100 lines, single React component
fieldVisibility.js      — Field visibility config generated from the reviewed matrix
field_matrix_v3_CORRECTED.xlsx  — The source-of-truth field matrix (reviewed by user)
FUSION_Full_Type_List.json      — Fusion 360 exported tool library (all types)
```

---

## Key Architecture Decisions

### All Values Stored in Inches Internally
Metric inputs are converted to inches on blur. The unit toggle (in/mm) only affects the Fusion CSV output — `tool_unit` (col 7) switches to `"millimeters"` and all dimension values are multiplied by 25.4. Descriptions always use inches (shop naming convention).

### Fusion CSV Is Ground Truth
The 172-column Fusion CSV format is verified against actual exports from the user's Fusion library (`FUSION_Full_Type_List.json`). Column positions must not be changed without re-verifying against that file. Key columns:

| Col | Field | Notes |
|-----|-------|-------|
| 1 | tool_index | Always 1 |
| 3 | tool_type | Exact Fusion type string — see FT map |
| 5 | tool_diameter | DC |
| 6 | tool_number | Pocket — blank = Fusion auto-assigns |
| 33 | tool_bodyLength | LB = OOH = Length Below Holder |
| 38 | tool_clockwise | true except taps |
| 44 | tool_cornerRadius | Bull nose only; ball EM is inferred |
| 76 | tool_fluteLength | LCF = LOC |
| 99 | tool_lowerRadius | Circle segment tools |
| 106 | tool_maximumThreadPitch | TPX — thread mill |
| 107 | tool_minimumThreadPitch | TPN — thread mill |
| 110 | tool_numberOfFlutes | NOF |
| 114 | tool_overallLength | OAL |
| 128 | tool_profileRadius | Circle segment barrel/oval/taper |
| 134 | tool_shaftDiameter | SFDM |
| 137 | tool_shoulderDiameter | = cutting dia; empty for taps/drills |
| 138 | tool_shoulderLength | Must be >= LOC |
| 147 | tool_taperAngle | TA |
| 150 | tool_threadPitch | TP |
| 155 | tool_tipAngle | SIG |
| 156 | tool_tipDiameter | tip-diameter |
| 157 | tool_tipLength | tip-length |
| 158 | tool_tipOffset | tip-offset |
| 162 | tool_upperRadius | Face mill + circle segment barrel/taper |
| 172 | tool_library_version | Always 36 |

### ProShop Brand Rows
When vendor ≠ manufacturer, ProShop gets **two** approved brand entries:
- Row 1: manufacturer name, manufacturer EDP#, no cost, no vendor  
- Row 2: vendor name in both brand and vendor fields, vendor stock#, price

### Fusion Tool Type Strings
The `FT` map converts user-facing type names to the exact strings Fusion expects. These must match exactly — Fusion rejects unrecognized strings.

---

## Tool Types (24 total in dropdown)

```
End mills:     flat end mill, ball end mill, bull nose end mill,
               tapered mill, radius mill, form mill, lollipop mill,
               slot/key cutter, dovetail, thread mill, face mill, chamfer mill
Circle segment: barrel, lens (high feed), oval, taper  
Hole making:   drill, center drill, spot drill, reamer, counter bore, counter sink
Threading:     tap form, tap cut
Boring/turning: boring head (→ Fusion "boring bar"), turning general
```

Note: "rough end mill" was removed from the dropdown — it maps to `flat end mill` in Fusion output. "boring bar" was removed from dropdown — use "boring head" instead.

---

## Field Visibility System

`fieldVisibility.js` contains the `FIELD_VISIBILITY` object: for each of 24 tool types, every field is `true` (show), `false` (hide), or `"optional"` (show but collapsible/dimmed).

The current UI shows **all fields for all tool types** — this is the primary work item for Claude Code.

**The task:** wire `getVisibleFields(toolType)` to the tool type dropdown so the form dynamically shows/hides field groups when the type changes.

---

## Description Naming Conventions

Descriptions follow shop naming conventions — they stay in **inches** regardless of output unit toggle.

| Type | Format | Example |
|------|--------|---------|
| Flat EM | `{dia} {fl}FL EM {loc}LOC [MAT] [COAT]` | `3/8 (.375) 3FL EM 1.5LOC AL` |
| Ball EM | `{dia} BALL {fl}FL {loc}LOC [MAT]` | `1/2 (.5) BALL 3FL 2LOC` |
| Bull Nose | `{dia} BULL R{cr} {fl}FL {loc}LOC [MAT]` | `.375 BULL R0.125 3FL 1LOC` |
| Drill | `{frac/num/letter} (decimal) {ang}DEG [CARB] DRILL` | `25/64 (.3906) 135DEG CARB DRILL` |
| Tap | `{pitch} FORM/CUT TAP [class]` | `5/16-24 FORM TAP H5` |
| Thread Mill | `{dia} THREAD MILL` | `.488 THREAD MILL` |

Diameter display priority: number drill (#7) → letter drill (F) → metric (8mm) → fraction (3/8) → decimal (.312)

Append ` TSC` when coolant is through-spindle type.

---

## Pill Label Colors

Fields are labeled with colored pills indicating which output they feed:
- **Blue** (`#4a8fff`) — Fusion 360 only
- **Orange** (`#d97830`) — ProShop only  
- **Split F|label|P** — Both outputs

---

## AI Extraction

Uses `claude-sonnet-4-20250514` via direct API call. The system prompt in `buildSYS()` includes the full vendor list for fuzzy matching. Key extraction rules baked into the prompt:
- Uncoated/Bright/Bright-Uncoated → coating = `UC`
- MSC pages: use `Mfr#` field as EDP#, not the `MSC#`
- Vendor = distributor (e.g. MSC Industrial), approvedBrand = manufacturer (e.g. OSG)
- Drill tipAngle = full included angle (135°, not 67.5°)

---

## What NOT to Change Without Careful Testing

1. **The 172-column row builder** (`buildFusionRow`) — column positions are verified against real Fusion exports. Re-verify against `FUSION_Full_Type_List.json` if changing.
2. **The `tool_type` strings in `FT` map** — exact strings Fusion expects; wrong string = import failure.
3. **The `buildDesc` description logic** — shop naming conventions the user relies on.
4. **The thread pitch calculation** — `calcThreadPitch("5/16-24")` → `0.0416667`; tested against reference tap export.
5. **ProShop API field names** — `no. of flutes` (not `numberOfFlutes`), `EDP#` (not `vendorToolId`) — the ProShop documentation is wrong on these.

---

## ProShop CSV Notes

- Always combined (not split) — single file with all fields flattened
- `no. of flutes` — ProShop docs say `numberOfFlutes` but the actual API uses `no. of flutes`
- `EDP#` — ProShop docs say `vendorToolId` but actual API field is `EDP#`
- `throughCoolant` — boolean derived from coolant dropdown value; not user-entered
- `roundShank` — derived from tool type; face mills, boring bars, turning = false
- `lengthBelowShankDiameter` — OOH value (defaults to shoulder length → defaults to LOC)

---

## Environment

- Runs as a Claude artifact inside claude.ai
- No build step — raw JSX rendered by the artifact sandbox
- `navigator.clipboard` may be blocked — fallback uses `document.execCommand("copy")`
- `localStorage` is NOT available — all state is in-memory React state
- External API calls go to `https://api.anthropic.com/v1/messages` — API key injected by the artifact sandbox (no key in code)
- File downloads use `URL.createObjectURL` + programmatic `<a>` click
