# Logic Pro I/O map — X32 tracking and summing

## Start with the interface

Connect the X32's USB audio card to the Mac and install the vendor driver only if the installed card requires it. In Logic Pro, open **Logic Pro → Settings → Audio → Devices** and select the X32/USB card as the input and output device. Match Logic's project sample rate to the console's clock; use 48 kHz for a new session if the desk is set to 48 kHz, or keep an existing project at its current rate and set the desk to match.

Open **Mix → I/O Labels**, choose the X32 in the Device menu, select the User column, then enter short and long names for the input/output slots. Labels are Logic settings and persist across projects, so make sure the selected device is the X32 before changing them.

## Tracking map

Load `tracking.snp`, select **REC** on the X32 input-source selector, then verify the card and Logic meters with a test signal. The snippet routes the 16 local analog inputs to card outputs 1–16 and maps User In slots 31/32 to card inputs 1/2.

| Logic audio track | Logic input | X32 source | X32 channel |
|---|---:|---|---:|
| Kick | 1 | Local analog 1 → Card out 1 | 1 |
| Snare | 2 | Local analog 2 → Card out 2 | 2 |
| Tom 1–3 | 3–5 | Local analog 3–5 → Card out 3–5 | 3–5 |
| Overheads L/R | 6–7 | Local analog 6–7 → Card out 6–7 | 6–7 |
| Bass DI | 8 | Local analog 8 → Card out 8 | 8 |
| Guitar L/R | 9–10 | Local analog 9–10 → Card out 9–10 | 9–10 |
| Keys L/R | 11–12 | Local analog 11–12 → Card out 11–12 | 11–12 |
| Lead / BGV 1 / BGV 2 / Click | 13–16 | Local analog 13–16 → Card out 13–16 | 13–16 |
| Logic Stereo Out L/R | Outputs 1/2 | Card inputs 1/2 → X32 channels 31/32 | 31/32 |

The USB recording feed is direct from the X32 local analog inputs. It gives one Logic input per XLR input and does not print channel EQ, dynamics or fader moves. The console preamps still set the analogue gain. For processed or post-fader recordings, build and verify a separate direct-out patch on the desk rather than changing this raw-input map blindly.

**Headphone cue:** if Bus 1/2 are free, link them as a stereo pair and send the live input channels to them pre-fader. Add the Logic return channels as needed. Patch Bus 1/2 to a confirmed free physical output pair feeding the headphone amp. Set talkback's source from the mic actually connected in that room and route it to the cue. The room's output patch and talkback source are unknown, so neither is preconfigured.

**Low-latency monitoring:** keep Logic software input monitoring off on armed tracks and monitor the live mic through the X32's local input path into the cue. This avoids the Logic software-monitor round trip for live input. Logic playback still passes through the DAW and interface; this is not a claim of zero system latency.

## Mixdown / virtual soundcheck map

Load `mixdown.snp`, select **PLAY** on the X32 input-source selector, and set Logic's stem outputs to the same card numbers. Each card return lands on the matching X32 channel. The snippet names the strips `Stem 01`–`Stem 32` and assigns them to Main L/R. Adapt names and processing for the actual session after import.

| Logic hardware output | X32 card input | X32 channel | X32 destination |
|---:|---:|---:|---|
| 1–8 | 1–8 | 1–8 | Main L/R |
| 9–16 | 9–16 | 9–16 | Main L/R |
| 17–24 | 17–24 | 17–24 | Main L/R |
| 25–32 | 25–32 | 25–32 | Main L/R |

A normal Logic Stereo Out uses hardware outputs 1/2 only. For a 32-stem summing pass, assign the stem tracks or buses to separate hardware outputs 1–32; a stereo mix on outputs 1/2 will only occupy X32 channels 1/2 in PLAY mode.

## Label suggestions

In Logic's I/O Labels window, use these first 16 input labels:

| Slots | Suggested short label |
|---:|---|
| 1–8 | `X32 In 01` … `X32 In 08` |
| 9–16 | `X32 In 09` … `X32 In 16` |
| 17–32 | `X32 In 17` … `X32 In 32` (available if the card presents them) |

For output labels, name slots 1–32 `To X32 01` … `To X32 32`. In tracking, outputs 1/2 return the Logic stereo mix to desk channels 31/32. In mixdown, outputs 1–32 feed the corresponding desk channels. Keep long labels descriptive and short labels concise.

## Buffer size and recording level

For tracking, start at **64 or 128 samples** and raise the buffer if Logic reports clicks, pops or overloads. For editing/mixing with larger plug-in loads, try **256 or 512 samples**; use the lowest stable value that keeps playback clean. Apple's guidance is to balance lower latency against CPU strain and choose the lowest buffer that does not introduce audio glitches.

Set preamp gain while musicians perform at expected level. A practical starting point is to have ordinary peaks around **−18 to −12 dBFS**, with loud transient peaks around **−12 to −6 dBFS** and no clipping. Treat these as headroom targets, not a loudness requirement; do not normalize the tracking files to hit them.

## Summing printback

For a stereo print, first confirm the X32's existing Card output patch and choose a pair of unused card channels. Route Main L/R to those two card sends using the desk's output-slot patch, then select that pair as Logic's stereo input and record a new print track. Keep the print track out of the return path to prevent a feedback loop. The snippets deliberately do not choose card outputs for printback because the current patch is unknown.
