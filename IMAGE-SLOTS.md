# Image slots — the shot list

Every frame on the site that is waiting for a picture, and the exact filename that fills it. **The Image ID is the filename, minus the extension.** Name a file after its ID, drop it in the folder, rebuild — no code changes.

Resolution lives in `client/src/data/adlmAssets.js` (ADLM) and `client/src/data/dropin.js` (everything else). Extension and case are ignored; `name.thumb.*` siblings are never picked up. A wrong name leaves the placeholder up rather than breaking anything.

A browsable version of this table, with a filter and tick-boxes, is published as **The Shot List**.

| # | Image ID | Folder | Project | Category | What the image is | Ratio | Notes |
|---|---|---|---|---|---|---|---|
| 1 | `guideline/01` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Cover | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 2 | `guideline/02` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | The mark and its construction | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 3 | `guideline/03` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Clearance and minimum size | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 4 | `guideline/04` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | The four lockups | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 5 | `guideline/05` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Colourways | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 6 | `guideline/06` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Misuse | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 7 | `guideline/07` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Colour | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 8 | `guideline/08` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Typography | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 9 | `guideline/09` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Stationery | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 10 | `guideline/10` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Guideline spread | Templates | 16:9 | Runs in the scroll carousel. Keep every spread the same size and margin. |
| 11 | `touchpoints/letterhead` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Letterhead | 3:4 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 12 | `touchpoints/business-cards` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Business cards, front and back | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 13 | `touchpoints/envelope` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Envelope | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 14 | `touchpoints/document-folder` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Document folder | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 15 | `touchpoints/notepad` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Notepad | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 16 | `touchpoints/branded-pen` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Branded pen | 1:1 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 17 | `touchpoints/desk-calendar` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Desk calendar | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 18 | `touchpoints/lanyard` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Lanyard and ID card | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 19 | `touchpoints/roll-up-banner` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Roll-up banner | 3:4 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 20 | `touchpoints/event-backdrop` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Event backdrop | 16:9 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 21 | `touchpoints/t-shirt` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | T-shirt | 1:1 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 22 | `touchpoints/polo-shirt` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Polo shirt | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 23 | `touchpoints/hoodie` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Hoodie | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 24 | `touchpoints/face-cap` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Face cap | 1:1 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 25 | `touchpoints/tote-bag` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Tote bag | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 26 | `touchpoints/paper-bag` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Paper bag | 4:5 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 27 | `touchpoints/mug` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Mug | 1:1 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 28 | `touchpoints/water-bottle` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Water bottle | 3:4 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 29 | `touchpoints/branded-flash-drive` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Branded flash drive | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 30 | `touchpoints/keychain` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Keychain | 1:1 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 31 | `touchpoints/sticker-pack` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Sticker pack | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 32 | `touchpoints/mouse-pad` | `client/src/assets/ADLM/dropin/` | ADLM — Brand identity | Touchpoint / merch | Mouse pad | 4:3 | Masonry gallery. Shoot to the ratio or the crop decides for you. |
| 33 | `products/quiv/hero` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product hero | QUIV panel docked in Revit, mid take-off | 16:10 | In-context proof: the product running inside Revit plugin · Take-off. |
| 34 | `products/quiv/01` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Import — bringing a model in | 16:10 | Frame 1 of the three-frame strip. |
| 35 | `products/quiv/02` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Measure — selection and capture | 16:10 | Frame 2 of the three-frame strip. |
| 36 | `products/quiv/03` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Collation — the generated list | 16:10 | Frame 3 of the three-frame strip. |
| 37 | `products/heron/hero` | `client/src/assets/ADLM/dropin/` | ADLM — HERON | Product hero | HERON measuring a scanned drawing in Planswift | 16:10 | In-context proof: the product running inside Planswift plugin · 2D take-off. |
| 38 | `products/heron/01` | `client/src/assets/ADLM/dropin/` | ADLM — HERON | Product screen | Scaling a scanned sheet | 16:10 | Frame 1 of the three-frame strip. |
| 39 | `products/heron/02` | `client/src/assets/ADLM/dropin/` | ADLM — HERON | Product screen | Measurement in progress | 16:10 | Frame 2 of the three-frame strip. |
| 40 | `products/heron/03` | `client/src/assets/ADLM/dropin/` | ADLM — HERON | Product screen | The linked Excel bill | 16:10 | Frame 3 of the three-frame strip. |
| 41 | `products/rategen/hero` | `client/src/assets/ADLM/dropin/` | ADLM — RateGen | Product hero | RateGen — the rate library and one build-up record | 16:10 | In-context proof: the product running inside Rate build-up. |
| 42 | `products/rategen/01` | `client/src/assets/ADLM/dropin/` | ADLM — RateGen | Product screen | The library, filtered by zone | 16:10 | Frame 1 of the three-frame strip. |
| 43 | `products/rategen/02` | `client/src/assets/ADLM/dropin/` | ADLM — RateGen | Product screen | A single build-up record | 16:10 | Frame 2 of the three-frame strip. |
| 44 | `products/rategen/03` | `client/src/assets/ADLM/dropin/` | ADLM — RateGen | Product screen | Priced bill with unpriced items surfaced | 16:10 | Frame 3 of the three-frame strip. |
| 45 | `products/revit-mep/hero` | `client/src/assets/ADLM/dropin/` | ADLM — Revit MEP | Product hero | Revit MEP — services panel | 16:10 | In-context proof: the product running inside Revit plugin · Services. |
| 46 | `products/revit-mep/01` | `client/src/assets/ADLM/dropin/` | ADLM — Revit MEP | Product screen | The services panel, docked in Revit | 16:10 | Frame 1 of the three-frame strip. |
| 47 | `products/revit-mep/02` | `client/src/assets/ADLM/dropin/` | ADLM — Revit MEP | Product screen | MEP take-off in progress | 16:10 | Frame 2 of the three-frame strip. |
| 48 | `products/revit-mep/03` | `client/src/assets/ADLM/dropin/` | ADLM — Revit MEP | Product screen | The services schedule, out | 16:10 | Frame 3 of the three-frame strip. |
| 49 | `products/time-pro/hero` | `client/src/assets/ADLM/dropin/` | ADLM — Time Pro | Product hero | Time Pro — programme view | 16:10 | In-context proof: the product running inside Programme. |
| 50 | `products/time-pro/01` | `client/src/assets/ADLM/dropin/` | ADLM — Time Pro | Product screen | The programme, built from priced work | 16:10 | Frame 1 of the three-frame strip. |
| 51 | `products/time-pro/02` | `client/src/assets/ADLM/dropin/` | ADLM — Time Pro | Product screen | Progress tracked against it | 16:10 | Frame 2 of the three-frame strip. |
| 52 | `products/time-pro/03` | `client/src/assets/ADLM/dropin/` | ADLM — Time Pro | Product screen | A report a client will accept | 16:10 | Frame 3 of the three-frame strip. |
| 53 | `products/civiq/hero` | `client/src/assets/ADLM/dropin/` | ADLM — CIVIQ | Product hero | CIVIQ — civil measurement | 16:10 | In-context proof: the product running inside Civil engineering. |
| 54 | `products/civiq/01` | `client/src/assets/ADLM/dropin/` | ADLM — CIVIQ | Product screen | Civil measurement, running | 16:10 | Frame 1 of the three-frame strip. |
| 55 | `products/civiq/02` | `client/src/assets/ADLM/dropin/` | ADLM — CIVIQ | Product screen | Earthworks quantities | 16:10 | Frame 2 of the three-frame strip. |
| 56 | `products/civiq/03` | `client/src/assets/ADLM/dropin/` | ADLM — CIVIQ | Product screen | Priced against the shared library | 16:10 | Frame 3 of the three-frame strip. |
| 57 | `products/quiv/loop-capture` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Selecting an element in Revit and the panel filling | 16:10 | A 5-8 second loop, not a still. Silent, no cursor trails. |
| 58 | `products/quiv/in-context` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The full Revit window with QUIV docked | 16:9 | Full width. The 'real software in a real host' frame. |
| 59 | `products/quiv/flow-import` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Import - bringing a model in | 16:9 | Flow 1 of 4. Same window size, theme and zoom across all four. |
| 60 | `products/quiv/flow-measure` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Measure - selection and capture | 16:9 | Flow 2 of 4. Must match the other three exactly. |
| 61 | `products/quiv/flow-collation` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Collation - the generated list | 16:9 | Flow 3 of 4. Must match the other three exactly. |
| 62 | `products/quiv/flow-export` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | Export - out to a bill, a schedule or the cloud | 16:9 | Flow 4 of 4. Must match the other three exactly. |
| 63 | `products/quiv/snippet-panel-fills` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The side panel mid-capture, one element selected in the view behind it | 16:10 | An extracted component, not a whole screen. Crop tight. |
| 64 | `products/quiv/snippet-source-link` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | A collation row with its source element highlighted in the model | 16:10 | Extracted component. The highlight is the point. |
| 65 | `products/quiv/snippet-besmm-grouped` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The collation list, BESMM-grouped, with section headers | 16:10 | Extracted component. Section headers must be readable. |
| 66 | `products/quiv/on-phone` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The same take-off open on a phone | 4:5 | PORTRAIT. The only portrait frame in the product set. |
| 67 | `products/quiv/output-list` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The generated take-off list | 16:10 | Paired beside the priced bill. Shoot both the same way. |
| 68 | `products/quiv/output-bill` | `client/src/assets/ADLM/dropin/` | ADLM — QUIV | Product screen | The priced bill it becomes | 16:10 | Paired with the take-off list. Same treatment. |
| 69 | `site/spine-diagram` | `client/src/assets/ADLM/dropin/` | ADLM — Product suite | Diagram | One account → entitlements → Installer Hub → six products → phone | 21:9 | Drawn, not photographed. One line, lime on dark. Used on the hub AND the suite page. |
| 70 | `site/workflow-diagram` | `client/src/assets/ADLM/dropin/` | ADLM — Product suite | Diagram | Drawing → measure → price → report, with the six products placed on it | 21:9 | Drawn, not photographed. The most explanatory single image on the suite page. |
| 71 | `niqs/portal-dashboard` | `client/src/assets/dropin/` | NIQS | Product screen | The member portal dashboard — membership status, category and chapter in one place | 4:3 | STANDING IN with the exams screen until this lands. Section 07. |
| 72 | `niqs/flyer-engine` | `client/src/assets/dropin/` | NIQS | Product screen | The Flyer Design Engine in the admin panel — a staff member editing a locked template | 4:3 | STANDING IN with a social sheet. The most-used output of the project has no capture of its own. Section 08. |
| 73 | `snotes/hero` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Hero composition | wide, about 3.4:1 | Full-bleed band under the title. Min height 320px, caps at 60vh. |
| 74 | `snotes/problem-split` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Split visual: the phone Notes app vs. a structured Snotes note with metadata, scripture chips and action points | 4:5 | The before/after that carries the whole problem statement. |
| 75 | `snotes/visual-band` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Mid-page visual band | 16:9 | A breather between the landscape section and the features. |
| 76 | `snotes/feature-autocomplete` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Phone mockup: scripture autocomplete chip rising above the cursor, with an annotated callout | 16:9 (4:5 on mobile) | Feature 1 of 5. Keep device and lighting consistent across all five. |
| 77 | `snotes/feature-anchor-scriptures` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Phone mockup: note header with auto-populated anchor scriptures listing five references | 16:9 (4:5 on mobile) | Feature 2 of 5. |
| 78 | `snotes/feature-action-points` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Phone mockup: action points tab, items grouped by state with parent-sermon context | 16:9 (4:5 on mobile) | Feature 3 of 5. |
| 79 | `snotes/feature-service-aware` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Phone mockup sequence: pre-service reminder, in-service focus indicator, post-service prompt | 16:9 (4:5 on mobile) | Feature 4 of 5. Three states in one frame. |
| 80 | `snotes/feature-offline` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Diagram: offline note-taking on one side, online retroactive tagging on the other | 16:9 (4:5 on mobile) | Feature 5 of 5. A diagram, not a mockup. |
| 81 | `snotes/persona-richard` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Stylised portrait: young Nigerian man with Bible and phone, thoughtful | portrait, fills a 540px-tall panel | Three personas sit side by side and expand on hover. All three need the same treatment. |
| 82 | `snotes/persona-tosin` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Stylised portrait: young Nigerian woman journaling | portrait, fills a 540px-tall panel | Persona 2 of 3. |
| 83 | `snotes/persona-daniel` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Stylised portrait: Nigerian pastor in a small church setting | portrait, fills a 540px-tall panel | Persona 3 of 3. |
| 84 | `snotes/phases` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Vertical infographic: V1/V2/V3 stacked panels, solo → small group → public | 4:5 | Drawn, not photographed. |
| 85 | `snotes/roadmap` | `client/src/assets/dropin/` | Snotes | Explanation / mockup | Roadmap: Concept → Architecture → V1 Build → V1 Testing → V2 → V3, current position marked | 4:5 | Drawn, not photographed. Mark where the project actually is. |

**85 frames total** — 83 empty, 2 standing in with a borrowed image.
