================================================================================
  PROJECT 20 — AUTOMATIC MEDIA DIRECTORY (DRAG & DROP YOUR MEMORIES HERE)
================================================================================

You do NOT need to edit any code or days.ts to add pictures, videos, or voice notes!
Just drag and drop your media files directly into this exact folder (`public/media/`), and the website will automatically detect and display them inside the exact day's letter modal!

--------------------------------------------------------------------------------
1. FOR PHOTOS OR VIDEOS (Just name the file `day-XX.jpg` or `day-XX.mp4`):
--------------------------------------------------------------------------------
Drop your photo or video into this folder and give it the day number:
- Day 1:   day-01.jpg   (or day-01.png, day-01.mp4)
- Day 2:   day-02.jpg   (or day-02.png, day-02.mp4)
- Day 3:   day-03.jpg   (or day-03.png, day-03.mp4)
...
- Day 10:  day-10.jpg   (or day-10.mp4)
...
- Day 30:  day-30.jpg   (or day-30.mp4)

The website checks for .jpg, .png, and .mp4 automatically! If you add day-01.jpg, when she taps the target for Day 1 and unlocks it, your photo or video immediately appears at the top of her letter!

--------------------------------------------------------------------------------
2. FOR VOICE NOTES (Just name the file `day-XX-voice.mp3`):
--------------------------------------------------------------------------------
If you recorded a voice note or special audio message for any day, drop the MP3 directly into this folder and name it:
- Day 1:   day-01-voice.mp3   (or day-01-voice.m4a, day-01-voice.wav)
- Day 2:   day-02-voice.mp3
- Day 3:   day-03-voice.mp3
...
- Day 30:  day-30-voice.mp3

When she opens the day, a glowing Rose Gold voice note player will automatically appear right above her letter so she can press play and hear your voice!

--------------------------------------------------------------------------------
SUMMARY EXAMPLE OF A FULLY LOADED DAY 1:
--------------------------------------------------------------------------------
Inside `public/media/`:
  ├── day-01.jpg         <-- Her photo for Day 1
  └── day-01-voice.mp3   <-- Your voice recording for Day 1

That's it! Refresh your browser or open the app on your phone to see it in action.
