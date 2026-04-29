# Claude Code Prompt — Tool Extractor UI Rebuild

## Context

This is a single-file React artifact (`tool-extractor.jsx`) that extracts machining tool data from product page screenshots/PDFs/text and exports to Fusion 360 CAM and ProShop ERP formats. All the backend logic — AI extraction, CSV generation, description naming, unit conversion — is complete and working. Read `CLAUDE.md` before touching anything.

---

## The One Big Job

**Implement per-tool-type field visibility using `fieldVisibility.js`.**

Right now the form shows every field for every tool type. A tap has no use for "Corner Radius." A drill has no use for "Thread Pitch." The form should dynamically show/hide field groups when the user changes the tool type dropdown.

### How it works

`fieldVisibility.js` exports:
- `FIELD_VISIBILITY` — maps each app field key to a 24-element array of `true / false / "optional"` per tool type
- `TOOL_TYPE_KEYS` — the 24 type strings in column order
- `getVisibleFields(toolType)` — returns `[{ key, optional }]` for the selected type
- `FIELD_SECTIONS` — groups fields into sections (Dimensions, Material & Coating, etc.)

### What to build

1. **Import `fieldVisibility.js`** and wire `getVisibleFields` to the tool type dropdown state.

2. **Conditional rendering** — when a section has zero visible fields for the current tool type, hide the entire section divider too. When a field is `"optional"`, show it but dimmed/collapsed by default with a small expand toggle.

3. **Smooth transition** — fields should appear/disappear cleanly (CSS opacity + height transition is fine, no need for animation libraries).

4. **Keep the 12-column grid intact** — the form uses `G = {display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:5}` and `C(n)` for column spans. When hiding fields, remove them from the DOM entirely (don't just `display:none` — that breaks the grid flow).

5. **Always-visible fields** — these never hide regardless of type: Tool Type dropdown, ProShop Group, Description bar, Diameter, OAL, all Purchasing & Identity fields, Preset Name, Tool # / Pocket, Coolant.

---

## Additional Tasks (do after field visibility is working)

### A. Taper Angle field in the UI

`taperAngle` exists in state and writes to Fusion col 147, but has no UI field yet. Add it to the Dimensions — Geometry section using the same `DimInput` component. It should show for: tapered mill, face mill, chamfer mill, dovetail, circle segment taper.

Pill type: **both** (F+P). It goes to ProShop as `taperAngle`.

### B. New ProShop-only fields in the UI

These fields exist in state and write to the ProShop CSV but have no UI yet. Add them to the ProShop section:

| Field key | Label | Type | Show for |
|-----------|-------|------|----------|
| `fullProfile` | Full Profile | Toggle (bool) | thread mill only |
| `stubJobber` | Stub / Jobber | Text input | drill only |
| `backsideCapable` | Backside Capable | Toggle (bool) | flat EM, ball EM, bull nose, form mill, dovetail, lollipop, slot mill, thread mill, boring head |
| `doubleEnded` | Double Ended | Toggle (bool) | flat EM, ball EM, bull nose, tapered, radius mill, face mill, drill, center drill, spot drill |
| `cuttingDirection` | Cutting Direction | Select: Right Hand / Left Hand | all types |
| `minThreadPitch` | Min Thread Pitch (in) | Text input | thread mill only |
| `maxThreadPitch` | Max Thread Pitch (in) | Text input | thread mill only |

Pill type for all: **orange** (ProShop only).

### C. Circle segment geometry fields

These exist in state (`lowerRadius`, `upperRadius`, `profileRadius`, `axialDistance`) but have no UI. Add them as `DimInput` fields in the Dimensions section. Show only for the relevant circle segment types per `fieldVisibility.js`.

Pill type: **blue** (Fusion only — they write to Fusion CSV cols 99, 162, 128, 17).

### D. Insert / Turning fields

These exist in state but have no UI: `insertShape`, `insertType`, `insertIC` (inscribed circle), `insertSize`, `insertTolerance`, `insertCornerRadius`, `insertReliefAngle`. Add them in the Insert / Turning section (only shown when tool type = "turning general"). Use plain text inputs. Pill type: **both**.

---

## Constraints — Do Not Change

- **`buildFusionRow`** — column positions are ground truth. Do not reorder or add columns.
- **`buildDesc`** — shop naming conventions. Do not alter output format.
- **`FT` map** — Fusion type strings are exact. Wrong string breaks import.
- **ProShop field names** — `no. of flutes` and `EDP#` are intentionally different from the ProShop docs (docs are wrong).
- **The 172-column CSV header string** — do not modify.
- **All state keys in `BLANK`** — do not rename; the AI extraction maps to these keys by name.

---

## Testing Checklist

After each change, verify:

- [ ] Switching tool type to "drill" hides Corner Radius, Thread Pitch, Tap Class, Center Cutting
- [ ] Switching to "tap form" hides LOC, Corner Radius, Flutes, Helix Angle; shows Thread Pitch, Tap Class, Point Type
- [ ] Switching to "turning general" hides most fields; shows Insert section
- [ ] Switching to "flat end mill" shows full standard set; hides thread/tap/insert fields
- [ ] "Copy for Fusion" still produces valid 172-column tab-separated output
- [ ] "Export to ProShop" still downloads a valid CSV
- [ ] Description bar updates live as fields change
- [ ] Unit toggle (in/mm) still works for all tool types
- [ ] AI extraction still populates fields correctly for a screenshot/PDF/text input
- [ ] Clear button resets all fields including new ones

---

## Style Reference

```js
const T = {
  pageBg: "#1a1a1a", cardBg: "#242424", border: "#383838",
  text: "#e0e0e0", sub: "#666", label: "#999", ph: "#3a3a3a",
  green: "#45b36b", amber: "#d4922a", red: "#d94f4f", inputBg: "#181818",
};
const BLUE   = "#4a8fff";   // Fusion
const ORANGE = "#d97830";   // ProShop
```

The `FL({type, label})` component renders the connected pill label above each input. `type` is `"fusion"`, `"proshop"`, or `"both"`. The `DimInput` component handles metric detection and the `[mm]` overlay badge — use it for all dimension fields.

The `GroupDiv` component renders section dividers. When a section has no visible fields, don't render it at all.
