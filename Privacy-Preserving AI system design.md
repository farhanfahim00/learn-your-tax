### Why this works
[[AI_Cert_Prep_App_Plan]]

Confirmed via current data: Germany's tax/SV system is legitimately confusing even for natives, and the rules that matter most for internationals (Werkstudent privilege, Steuerklassen, Minijob thresholds) change yearly and are scattered across German-only government sites. For 2026 specifically: Grundfreibetrag is €12,348, income tax brackets run 14-24% (to €17,799), 24-42% (to €69,878), 42% flat (to €277,825), 45% above. Werkstudents under 20hrs/week pay only 9.3% (Rentenversicherung) instead of the full ~20% social security stack — a huge, non-obvious detail that trips people up constantly. This is exactly the kind of "the rules are public but nobody explains them in plain English" gap that justifies a tool.

### The privacy architecture is the interesting engineering problem here

You're right to insist on client-side-only for the payslip. This actually forces a more interesting system design than a typical AI app, and it's worth leaning into as the portfolio story rather than treating it as a limitation:

- **Payslip parsing:** PDF text extraction (`pdf.js`) or OCR (`Tesseract.js`) runs entirely in-browser. German payslips (SAP, DATEV, Personio) share fairly standardized line-item labels (Bruttogehalt, Lohnsteuer, Soli, KiSt, RV, KV, PV, ALV, Nettogehalt), so field extraction is a rules/regex layer, not an LLM call — nothing about parsing a payslip actually _needs_ AI.
- **Tax bracket calculation:** also deterministic. German tax/SV math is a formula, not a judgment call — encode the actual brackets and rates as a calculation engine. This runs client-side too, so the whole Q&A flow (residence status → salary → rent/spending → bracket) never needs to leave the browser either.
- **Where AI legitimately earns its place:** turning "you're in Steuerklasse 1, your RV is 9.3%, your net is X" into a good plain-English, personalized explanation with context ("here's why you're paying less than a full-time colleague," "here's what changes if you cross 20hrs/week"). Two honest options:
    - **In-browser LLM inference** (WebLLM/transformers.js with a small quantized model) — zero data leaves the device, ever. This is a genuinely current (2025-2026) and technically impressive pattern, more novel than another RAG chatbot.
    - **Tiered/opt-in cloud AI** — default fully local + rule-based; user can explicitly opt in to send only the _already-computed abstract numbers_ (bracket, rates, no raw payslip) to a cloud LLM for richer explanation. The architecture decision itself (what's allowed to leave the device, under what consent) is a strong system-design writeup.

Either way: **"privacy-preserving AI system design"** is a better portfolio narrative than "yet another wrapper," and it's true to the constraint you set.

### Two features, cleanly separable

1. **Payslip understander** (upload/paste → client-side parse → explain each line)
2. **Guided tax bracket Q&A** (no payslip needed — residence status → salary range → rent/spending → estimated bracket + explanation). This one's independently useful and probably the easier, higher-value MVP to ship first, since it sidesteps payslip-format variability entirely.

### One real caveat to design around

This edges into tax-adjacent guidance. It needs to be clearly framed as **educational, not Steuerberatung** (tax advice), with a visible disclaimer, and the numbers need a cited source (BMF/Deutsche Rentenversicherung/Minijob-Zentrale) rather than an LLM's guess — which is actually a good forcing function for building it on a hard-coded, sourced ruleset rather than letting an LLM improvise tax law.