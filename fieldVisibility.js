// Field Visibility Config — generated from field_matrix_v3_CORRECTED.xlsx
// For each tool type, lists which form fields to show: true=show, false=hide, 'optional'=show collapsed
// Source of truth for Fusion CSV: FUSION_Full_Type_List.json

export const TOOL_TYPE_KEYS = [
  "flat end mill",
  "ball end mill",
  "bull nose end mill",
  "tapered mill",
  "radius mill",
  "form mill",
  "face mill",
  "chamfer mill",
  "dovetail",
  "lollipop mill",
  "slot/key cutter",
  "thread mill",
  "circle segment barrel",
  "circle segment lens",
  "circle segment oval",
  "circle segment taper",
  "drill",
  "center drill",
  "spot drill",
  "reamer",
  "counter bore",
  "counter sink",
  "tap form",
  "boring head",
  "turning general",
];

// Maps each app field key to its visibility per tool type (order matches TOOL_TYPE_KEYS)
// true = show, false = hide, 'optional' = show but collapsible/dimmed
export const FIELD_VISIBILITY = {
  toolType: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  grouping: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  diameter: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  loc: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false],
  oal: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  shankDia: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
  shoulderLen: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
  ooh: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
  cornerRadius: [false, false, true, true, true, false, false, false, true, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
  tipAngle: [false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, true, true, false, false, true, false, false, false],
  taperAngle: [false, false, false, true, false, false, true, true, true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],
  tipDiameter: [false, false, false, false, false, false, false, true, true, false, false, true, false, false, false, true, false, true, true, false, false, true, true, false, false],
  lowerRadius: [false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false],
  upperRadius: [false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false],
  profileRadius: [false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, true, false, false, false, false, false, false, false, false, false],
  axialDistance: [false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false],
  lengthUnderBall: [false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  diameterOfBall: [false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  minBoreDia: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false],
  material: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
  coating: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
  workpieceMats: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, "optional", true, true],
  coolant: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  flutes: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true],
  helixAngle: [true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, true, false, false, false, false, false, false, false, false],
  fluteType: [true, true, true, true, true, true, false, false, false, true, true, false, false, false, false, false, "optional", false, false, false, false, false, false, false, false],
  centerCutting: [true, true, true, true, false, "optional", false, true, false, true, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false],
  cuttingDirection: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  backsideCapable: [false, false, false, false, false, true, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true, false],
  doubleEnded: [true, true, true, true, true, false, true, false, false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false],
  roundShank: [true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false],
  fullProfile: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
  stubJobber: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],
  pitch: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, false, false],
  tapClass: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],
  minThreadPitch: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
  maxThreadPitch: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
  pointType: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, false, false, true, true, false, false],
  tipTo1stFullThread: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, false, false],
  recommendedPredrillSize: [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false, false],
  edpNumber: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  approvedBrand: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  vendor: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  vendorStockNum: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  cost: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  productLink: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  presetName: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  toolNumber: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  insertShape: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertType: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertIC: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertSize: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertTolerance: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertCornerRadius: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
  insertReliefAngle: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
};

// Helper: get visible fields for a given tool type string
export function getVisibleFields(toolType) {
  const idx = TOOL_TYPE_KEYS.indexOf(toolType);
  if (idx < 0) return Object.keys(FIELD_VISIBILITY); // show all if unknown type
  return Object.entries(FIELD_VISIBILITY)
    .filter(([, checks]) => checks[idx] !== false)
    .map(([key, checks]) => ({ key, optional: checks[idx] === 'optional' }));
}

// UI section groupings
export const FIELD_SECTIONS = {
  "Classification": ["toolType", "grouping"],
  "Dimensions — Lengths": ["diameter", "loc", "oal", "shankDia", "shoulderLen", "ooh"],
  "Dimensions — Geometry": ["cornerRadius", "tipAngle", "taperAngle", "tipDiameter", "lowerRadius", "upperRadius", "profileRadius", "axialDistance", "lengthUnderBall", "diameterOfBall", "minBoreDia"],
  "Material & Coating": ["material", "coating", "workpieceMats", "coolant"],
  "Cutting Geometry": ["flutes", "helixAngle", "fluteType", "centerCutting", "cuttingDirection", "backsideCapable", "doubleEnded", "roundShank", "fullProfile", "stubJobber"],
  "Thread & Tap": ["pitch", "tapClass", "minThreadPitch", "maxThreadPitch", "pointType", "tipTo1stFullThread", "recommendedPredrillSize"],
  "Insert / Turning": ["insertShape", "insertType", "insertIC", "insertSize", "insertTolerance", "insertCornerRadius", "insertReliefAngle"],
  "Purchasing & Identity": ["edpNumber", "approvedBrand", "vendor", "vendorStockNum", "cost", "productLink"],
  "Fusion CAM Only": ["presetName", "toolNumber"],
};