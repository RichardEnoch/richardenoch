# ADLM case study — the asset drop

> The full site-wide table, including NIQS and Snotes, is in **IMAGE-SLOTS.md**.
> This file covers the ADLM folder only.

Everything on the ADLM pages that has not been photographed yet renders as a
labelled placeholder at the exact size and ratio the real picture will take.
None of those frames name an import. They name a **key**, and the key is a
filename.

**To publish a picture: drop a file with the right name into the right folder
and rebuild. There is no code to change.**

```
client/src/assets/ADLM/dropin/
├─ guideline/       the ADLM brand guideline spreads
├─ touchpoints/     stationery, merch, events
├─ products/        one folder per product
└─ site/            the two diagrams
```

Extension is ignored — `.webp`, `.png`, `.jpg`, `.jpeg`, `.svg` and `.avif` all
resolve, so a `.jpg` can be re-encoded to `.webp` later without breaking
anything. Case is ignored. A `name.thumb.webp` sibling is never picked up as
the full image.

Resolution lives in `client/src/data/adlmAssets.js`.

---

## guideline/ — 16:9 landscape

Ten spreads, in reading order. The frames are 16:9; anything else will be
letterboxed inside one.

| File | The spread |
| --- | --- |
| `01` | Cover |
| `02` | The mark and its construction |
| `03` | Clearance and minimum size |
| `04` | The four lockups |
| `05` | Colourways |
| `06` | Misuse |
| `07` | Colour |
| `08` | Typography |
| `09` | Stationery |
| `10` | Templates |

More than ten spreads? Add the frame to `GUIDELINE_SLIDES` in
`src/pages/featured/AdlmBrand.jsx` — one line, with the next number as its key.

## touchpoints/ — mixed ratios

Each has a ratio the layout already reserves. Shoot to it or the crop will do
it for you.

| File | Ratio | | File | Ratio |
| --- | --- | --- | --- | --- |
| `letterhead` | 3/4 | | `t-shirt` | 1/1 |
| `business-cards` | 4/3 | | `polo-shirt` | 4/5 |
| `envelope` | 4/3 | | `hoodie` | 4/5 |
| `document-folder` | 4/5 | | `face-cap` | 1/1 |
| `notepad` | 4/5 | | `tote-bag` | 4/5 |
| `branded-pen` | 1/1 | | `paper-bag` | 4/5 |
| `desk-calendar` | 4/3 | | `mug` | 1/1 |
| `lanyard` | 4/5 | | `water-bottle` | 3/4 |
| `roll-up-banner` | 3/4 | | `branded-flash-drive` | 4/3 |
| `event-backdrop` | 16/9 | | `keychain` | 1/1 |
| | | | `sticker-pack` | 4/3 |
| | | | `mouse-pad` | 4/3 |

The training certificate and the course completion seal are already in and are
not drop-ins.

## products/&lt;product&gt;/ — 16:10 unless noted

Products: `quiv`, `heron`, `rategen`, `revit-mep`, `time-pro`, `civiq`.

Every product takes the same four:

| File | The shot |
| --- | --- |
| `hero` | The product running in its host — the in-context proof |
| `01` `02` `03` | The three-frame strip, in the order listed on its page |

QUIV takes ten more, because it is the only product with the long-form page:

| File | The shot |
| --- | --- |
| `loop-capture` | Selecting an element in Revit and the panel filling (a loop, 5–8s) |
| `in-context` | The full Revit window with QUIV docked — 16:9, full width |
| `flow-import` | Import — bringing a model in |
| `flow-measure` | Measure — selection and capture |
| `flow-collation` | Collation — the generated list |
| `flow-export` | Export — out to a bill or the cloud |
| `snippet-panel-fills` | The side panel mid-capture, one element selected behind it |
| `snippet-source-link` | A collation row with its source element highlighted |
| `snippet-besmm-grouped` | The collation list, BESMM-grouped, with section headers |
| `on-phone` | The same take-off open on a phone — **4:5 portrait** |
| `output-list` | The generated take-off list |
| `output-bill` | The priced bill it becomes |

The four `flow-*` frames run in the scroll carousel, so they should be
consistent with each other — same window size, same theme, same zoom.

## site/ — 21:9 diagrams

| File | The diagram |
| --- | --- |
| `spine-diagram` | One account → entitlements → Installer Hub → six products → phone |
| `workflow-diagram` | Drawing → measure → price → report, with the six products placed on it |

Both are drawn, not photographed. One line, lime on dark.

---

## What is deliberately still missing

These are gaps in the **writing**, not in the layout, and a file cannot fill
them:

- **The decisions behind HERON, RateGen, Revit MEP, Time Pro and CIVIQ.** Only
  QUIV has its research written up. The other five run the short form
  (`components/ProjectPage/ProductCase.jsx`) and say so on the page. When the
  story for one exists, it graduates onto the QUIV template.
- **The ADLM brand guideline itself.** The ten frames are reserved; the
  document is being rebuilt against the current direction.

## Going live

Point the ADLM links at the live site by changing `LIVE` in
`src/pages/featured/AdlmWebsite.jsx`. Everything else already links internally.
