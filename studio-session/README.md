# X32 + Logic studio session

This folder contains a selective X32 tracking snippet, a 32-channel mixdown snippet, a Logic Pro I/O map and a one-page setup checklist.

## Hardware assumptions

The template assumes an X32-family console with at least 16 local analog inputs and a USB audio card that presents 32 inputs and 32 outputs to the Mac (for example, the X-USB card). The exact console model, installed card, firmware and connected analog inputs have not been confirmed. Behringer documents the X32 Producer as having 16 mic preamps and 32×32 USB audio; this is a compatibility reference, not a claim that this is Diego's model.

The routing uses X32 firmware v4 or later User Routing. If the console exposes a different card name or fewer I/O channels, adapt the map before loading either snippet.

## Files

- `tracking.snp` — routes local analog inputs 1–16 to Logic record inputs 1–16. It returns Logic output 1/2 to X32 channels 31/32 for playback monitoring and names the typical session channels.
- `mixdown.snp` — routes Logic card returns 1–32 to X32 channels 1–32, labels them Stem 01–32 and assigns them to Main L/R for a desk mix.
- `logic-io-map.md` — Logic device, I/O label, buffer, monitoring and summing setup.
- `session-checklist.pdf` — one-page print checklist.

## Load safely

1. Save a copy of the current X32 show or scene first.
2. Import the `.snp` files into X32-Edit and inspect their recall scopes. They are snippets, so they leave unrelated processing and console state in place.
3. The tracking snippet intentionally replaces the four User In banks, the first two Card output banks, the User In map, channel names on 1–16 and 31–32, and Main L/R assignment on channels 31–32. Its USB record feed is direct from local analog inputs, so it does not include channel EQ, dynamics or fader moves.
4. The mixdown snippet intentionally replaces the four PLAY banks, names channels 1–32 and turns on their Main L/R assignment. It leaves existing faders, mutes, EQ, dynamics and output patching as-is.
5. The global REC/PLAY input-source selector is not included in these snippets. Select REC for tracking and PLAY for the 32-channel Logic return, then verify signal on the desk before opening headphones or speakers.
6. Bus 1/2 are suggested for a stereo headphone cue only if free. Link them, set pre-fader sends, and route them to a verified free physical output/headphone amp. The snippets do not guess the room's output patch or talkback input.

## Signal-flow summary

**Tracking:** X32 Local 1–16 → USB Card 1–16 → Logic inputs 1–16. Logic stereo output 1/2 → USB Card 1/2 → X32 channels 31/32.

**Mixdown:** Logic outputs 1–32 → USB Card 1–32 → X32 channels 1–32 → Main L/R. The X32 input-source selector must be set to PLAY.

## References

- [Behringer X32 user manual (official PDF)](https://mediadl.musictribe.com/media/sys_master/h74/hf0/8849385750558.pdf)
- [Behringer X32 Producer specifications](https://www.behringer.com/en/products/0603-ADU)
- [Apple Logic Pro: I/O Labels](https://support.apple.com/en-gb/guide/logicpro/lgcp8ea31562/mac)
- [Apple Logic Pro: Audio device preferences and buffer size](https://support.apple.com/guide/logicpro/audio-devices-settings-lgcpbb81aca5/mac)
