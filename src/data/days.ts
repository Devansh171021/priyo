export type DayContent = {
  day: number;
  target?: string;
  title?: string;
  letter: string;
  photoUrl?: string;
  voiceNoteUrl?: string;
  voiceNoteDurationSec?: number;
};

export const START_CITY = "Pondicherry";
export const END_CITY = "Kolkata";

export const DAYS: DayContent[] = [
  {
    day: 1,
    target: "Target 01: Welcome to the Map",
    title: "Day 1: Welcome to the Map",
    photoUrl: "/media/day-01.jpg",
    letter:
      "You didn’t actually think I was just going to send you a standard 'Happy Birthday' text at midnight on August 14th and call it a day, did you? You are stepping into your twenties, and a milestone like that deserves a proper buildup.\n\n" +
      "I built this 32-day map because I wanted to give you something that lasts longer than a single day. Over the next month, you are going to unlock 32 different targets. Each one is a memory, a truth, and a reminder of exactly why you are the absolute best part of my life. I wanted you to wake up every single morning and see yourself exactly the way that I see you.\n\n" +
      "Target 1 is officially unlocked. Settle in, Priyo—we have 31 days to go.",
  },
  {
    day: 2,
    target: "Target 02: Baruipur Bypass",
    title: "Day 2: The Baruipur Run",
    photoUrl: "/media/day-02.mp4",
    letter:
      "I was thinking about those scooty rides today—the ones where we’d head down the bypass and straight into the chaos of Baruipur just for the fun of it.\n\n" +
      "And let’s be honest, those were your early driving days. I still remember us having to stop in the middle of the road, losing our balance a little bit, and then just getting right back to running again. I was the one sitting behind you, and even with the wobbles, I wouldn't trade that for anything. There is a very specific kind of peace and warmth I only get when I have my arms around you. It never actually mattered where we were going, or how bumpy the ride was. As long as I was holding onto you, I was exactly where I wanted to be.",
  },
  {
    day: 3,
    target: "Target 03: The Society Watchtower",
    title: "Day 3: Telepathy & Chicken Legs",
    photoUrl: "/media/day-03.jpg",
    letter:
      "One of my absolute favorite things about us is that we don’t even need to speak to have an entire conversation.\n\n" +
      "Whether we are sitting in the society watching Prantik uncle walk by on those legendary 'chicken legs' (seriously, the man refuses to do a leg day), or watching our friends do something completely ridiculous, we never actually need words. Just one look. A single eye contact when someone walks out in a funny outfit, or that specific silent signal you shoot me when some mutual friend decides to try his luck and start hitting on you. It's like we have our own private frequency. We can silently judge an entire room together, and no one else even has a clue.",
  },
  {
    day: 4,
    target: "Target 04: Casual Perfection",
    title: "Day 4: Effortlessly Heavenly",
    photoUrl: "/media/day-04.jpg",
    letter:
      "You probably think you need to dress up or put in effort to get my attention, but the truth is, you ruin my focus when you aren't even trying.\n\n" +
      "I’m talking about the messy hair, a random t-shirt that just perfectly fits your body, and those white shorts with the blue horizontal stripes. We could literally just be walking around casually, doing absolutely nothing, and I will still be staring at you thinking about how heavenly you look. It doesn't matter what you wear, everything just suits you perfectly. You don't even have to try, and you are still the most beautiful girl in the room.",
  },
  {
    day: 5,
    target: "Target 05: The Late-Night Lifeline",
    title: "Day 5: 6 AM Warnings & 9 AM Classes",
    photoUrl: "/media/day-05.jpg",
    letter:
      "Living in Pondi means there are 1,600 kilometers between us, but those late-night calls completely erase the distance.\n\n" +
      "I honestly don't care that I have college at 9 AM. I will gladly stay up all night just listening to you speak. Between catching up, the random bitching, giving each other advice, and bonding over how completely fucked both of our love lives are... those calls are my absolute lifeline. We keep going in the dark until it's 6 AM, right up until that exact second we hear your mom coming out of her room and we have to hang up. I would trade sleep for those 6 AM conversations with you every single time.",
  },
  {
    day: 6,
    target: "Target 06: The Gym",
    title: "Day 6: Coffee, Breakfast, and Leg Day",
    photoUrl: "/media/day-06.jpg",
    letter:
      "I will gladly take the crown for lifting heavier, but I will openly admit that you absolutely dominate leg days. Even if I complain about them the entire time.\n\n" +
      "Honestly, our gym routine is unmatched. From me pushing you to show up, to us completely vibing, hyping each other up, and recording each other's sets. And obviously, the mandatory post-workout pictures when we are completely dead. But my favorite part wasn't just the weights. It was the balance of it all—you walking in with coffee to wake us up, and me making sure you actually had some breakfast in your system so you wouldn't pass out. We just make the perfect team.",
  },
  {
    day: 7,
    target: "Target 07: The Streets of Kolkata",
    title: "Day 7: Dancing in the Downpour",
    photoUrl: "/media/day-07.mp4",
    letter:
      "Some of the absolute best memories we have weren't planned at all. Like that time we were just walking out of the gym, completely exhausted, and the sky just opened up.\n\n" +
      "Most people would have run for cover or complained about getting their gym clothes wet, but not us. Getting caught in that sudden rain and just dancing around in the middle of a downpour is one of those moments that plays in my head like a movie scene. We didn't care who was watching, how cold it was, or how soaked we got. It was just pure, unfiltered fun. I wouldn't trade those spontaneous, crazy moments with you for anything in the world.",
  },
  {
    day: 8,
    target: "Target 08: The Safe Space (Voice Note)",
    title: "Day 8: The Safe Space",
    photoUrl: "/media/day-08.jpg",
    voiceNoteUrl: "/media/day-08-voice.wav",
    voiceNoteDurationSec: 90,
    letter:
      "Some things are better spoken than written. Press play above to listen to today's voice note — a reminder of why you will always be my safe space.",
  },
  {
    day: 9,
    target: "Target 09: The Competitor",
    title: "Day 9: The 10-Ring Mentality",
    photoUrl: "/media/day-09.jpg",
    letter:
      "We both know exactly what it takes to compete at a high level and the kind of mental grind it demands. But watching your journey as a shooter is something else entirely.\n\n" +
      "From dominating in Khelo India to the nationals, you always bring your absolute best. I know how agonizing it is to go through 4 Indian trials and narrowly miss that top 2 spot for the national team. But what makes me so unbelievably proud of you is that you don't break. Even when you fall short, you push that extra mile. Your resilience and your work ethic inspire me more than you know. To me, you are always the absolute best.",
  },
  {
    day: 10,
    target: "Target 10: The Voice Note (Shayari)",
    title: "Day 10: Shayari",
    photoUrl: "/media/day-10.jpg",
    voiceNoteUrl: "/media/day-10-voice.wav",
    voiceNoteDurationSec: 90,
    letter:
      "Some feelings need the rhythm of poetry. Press play above to listen to today's shayari, recorded just for you.",
  },
  {
    day: 11,
    target: "Target 11: The Perfect Fit",
    title: "Day 11: Curves and Confidence",
    photoUrl: "/media/day-11.jpg",
    letter:
      "I know I tease you and make sexual jokes just to annoy you, but the reality is I am insanely attracted to you.\n\n" +
      "You are just so incredibly beautiful that literally anything you put on, you look absolutely gorgeous in it. There is this undeniable way that every single piece of clothing just fits your body perfectly and shapes your curves. It doesn't matter what we are doing or where we are going, half the time I’m just quietly looking at you, completely admiring you. It drives me crazy in the best way possible. You have this effortless, sexy confidence that hooks me every single time.",
  },
  {
    day: 12,
    target: "Target 12: The Revelation",
    title: "Day 12: November 2021",
    photoUrl: "/media/day-12.jpg",
    letter:
      "Since we were talking about how hot you are yesterday, I need to take you back to the exact origin story. November 2021.\n\n" +
      "I was at the gym, doing pull-ups, completely in my own zone. You walked in and headed straight for the treadmill. You were clearly visible in the mirror right in front of me. I looked at your ass, and my brain just completely short-circuited. That was the exact second it hit me: 'Fuck, she is hot.' It was game over from there. That was the moment I realized I wasn't just dealing with a pretty girl; I was dealing with someone who was going to completely ruin my focus.",
  },
  {
    day: 13,
    target: "Target 13: The Vault",
    title: "Day 13: Unspoken Trust",
    photoUrl: "/media/day-13.jpg",
    letter:
      "We spend so much time flirting, teasing each other, and making ridiculous jokes, but I never want to overlook the actual foundation of all of this: absolute, unfiltered trust.\n\n" +
      "It is incredibly rare to find someone who just genuinely gets you on every single level. I don't ever have to pretend or filter myself around you. I trust you with absolutely everything—my thoughts, my lows, and things I wouldn't dare tell anyone else. Knowing that you trust me the exact same way is something I value more than I can even explain. We have built this massive collection of memories, inside jokes, and late-night confessions that belong strictly to us. Having a girl best friend who is undeniably gorgeous is a massive flex, but having one who is my absolute safest space and ultimate confidant? That is everything.",
  },
  {
    day: 14,
    target: "Target 14: The Voice Note (The Tease)",
    title: "Day 14: The Tease",
    photoUrl: "/media/day-16.jpg",
    voiceNoteUrl: "/media/day-16-voice.wav",
    voiceNoteDurationSec: 90,
    letter:
      "Press play above to listen to today's voice note — a little tease from 1,600 kilometers away.",
  },
  {
    day: 15,
    target: "Target 15: The Anchor",
    title: "Day 15: The Warmth",
    photoUrl: "/media/day-15.jpg",
    letter:
      "College keeps me busy, but out of everything I miss about being back home, the thing I crave the most right now is simply hugging you.\n\n" +
      "There is a very different, specific kind of warmth and peace that washes over me the second my arms are around you. It’s like the rest of the world and all its chaos just instantly goes quiet. It’s a feeling of absolute safety, comfort, and belonging that I have only ever found with you. Every single time I hug you, I just feel this overwhelming urge to hold on tighter and never let you go. No amount of late-night calls can replace that physical feeling. I cannot wait to close this distance so I can finally hold you again.",
  },
  {
    day: 16,
    target: "Target 16: The Halfway Mark",
    title: "Day 16: 800 Kilometers Closer",
    photoUrl: "/media/day-14.jpg",
    letter:
      "Take a look at the map today. We are officially halfway there.\n\n" +
      "You are exactly 16 days away from leaving your teenage years behind and turning 20. When I moved away for college, I knew the physical distance was going to suck, which is exactly why I built this. I wanted to make sure that for an entire month, no matter how far away I am, you wake up to a massive reminder of your worth. You have been through a lot, and you deserve a huge chunk of happiness and love right now. I want you to look at this every single morning and remember how valuable, lovable, charming, and undeniably beautiful you are to me. Brace yourself, because the second half of this road trip is about to turn the heat up.",
  },
  {
    day: 17,
    target: "Target 17: Zero Friction",
    title: "Day 17: Zero Friction",
    photoUrl: "/media/day-17-friction.jpg",
    letter:
      "I spend hours analyzing complex systems—how gears lock together perfectly, how energy shifts and balances under intense pressure. But honestly, no textbook explains how we work so effortlessly.\n\n" +
      "You are the one constant variable in my life that always makes complete sense. Even when the stress of classes and daily chaos hits a boiling point, you are the grounding force that keeps my head clear. Finding someone whose mind just seamlessly clicks with yours is rare. With us, there is zero friction.",
  },
  {
    day: 18,
    target: "Target 18: Post-Workout Flex",
    title: "Day 18: The Glow-Up and The Grind",
    photoUrl: "/media/day-17.jpg",
    letter:
      "If you are looking at the screen right now, you are probably smiling at this picture. There is nothing quite like our post-workout state. We are both completely dead, sweating, and probably arguing about who had the better session, yet we still manage to take the absolute best pictures together. I love looking back at these gym selfies. It’s not just about the flex or the pump; it’s about the fact that we push each other to our absolute physical limits and then celebrate it together. It still amazes me how you manage to look flawlessly gorgeous and glowing even after a brutal leg day, while I’m just trying to catch my breath. I miss these daily victories with you, and I miss looking over to see you matching my energy.",
  },
  {
    day: 19,
    target: "Target 19: The Athlete",
    title: "Day 19: The 10-Ring Focus",
    photoUrl: "/media/day-18.png",
    letter:
      "Watching your journey as a professional shooter is something that constantly leaves me in awe. The sheer mental endurance, absolute precision, and unshakeable focus required on that range is insane, and you handle it with so much grace. From dominating in Khelo India to stepping up for the nationals, you always bring this fierce, quiet intensity. I have an unbelievable amount of respect for your grind. You don't just talk about being great; you put in the grueling hours to actually be it. Watching you build your legacy, and seeing how you bounce back and push harder every single time, makes me so incredibly proud of you. This is your time, your spotlight, and your journey, and I will always be standing right here as your biggest cheerleader.",
  },
  {
    day: 20,
    target: "Target 20: The 1,600km Reality",
    title: "Day 20: Unbreakable Frequencies",
    photoUrl: "/media/day-19.jpg",
    letter:
      "Leaving Kolkata and moving all the way to Puducherry for college was a massive shift. The hardest part wasn't adjusting to the new environment or the engineering classes; it was adjusting to the fact that I couldn't just call you up and meet you down in the society or head to the gym together whenever I wanted. The physical distance of 1,600 kilometers is tough, but it has also proven something pretty amazing about us. No matter how many states are between us, our dynamic hasn't skipped a single beat. You are still the first person I want to talk to, and the last voice I want to hear before the sun comes up. The distance hasn't weakened us at all; it only confirmed that you are entirely irreplaceable to me.",
  },
  {
    day: 21,
    target: "Target 21: The Inside Jokes",
    title: "Day 21: Unmatched Comedy",
    photoUrl: "/media/day-20.jpg",
    letter:
      "If anyone ever got hold of our chat history or heard the things we say when we are just hanging out, we would probably both be in trouble. Between our completely unhinged inside jokes and the sheer amount of time we spend judging people for fun, I honestly don't think I laugh harder with anyone else on the planet. You have this incredibly sharp, hilarious sense of humor that matches mine perfectly. It's one thing to be insanely attractive, but the fact that you are genuinely so funny and that we can just act like absolute idiots together is what makes this bond so unbreakable.",
  },
  {
    day: 22,
    target: "Target 22: The Best Friend",
    title: "Day 22: My Anchor and My Rock",
    photoUrl: "/media/day-21.jpg",
    letter:
      "I talk constantly about how beautiful you are, how perfectly your clothes fit, and how you completely ruin my focus, but today I want to talk about your heart and the way you actually take care of me.\n\n" +
      "You have seen me through my own outbreaks, my heaviest low days, and the moments when the frustration just builds up and I desperately need to rant about everything going wrong. When I am spiraling or just having a terrible day, you never try to rush me out of it. Not once have you ever made me feel judged, annoying, or crazy for feeling the way I do. You just listen, you validate everything I'm going through, and you consistently show up for me.\n\n" +
      "It is incredibly rare to find a girl who seamlessly transitions between being this fiercely attractive, flirtatious presence and being a true, solid, grounding best friend. You genuinely care about my peace of mind, and you put in the effort to make sure I’m okay, even when your own life is completely chaotic and we are dealing with our own messed-up situations. You have been my rock and my anchor more times than I can count. I want you to know that I see all of that effort, and I appreciate your heart just as much as I admire everything else about you.",
  },
  {
    day: 23,
    target: "Target 23: The Deep End",
    title: "Day 23: Eyes, Smiles, and Open Hair",
    photoUrl: "/media/day-22.jpg",
    letter:
      "I know I tell you all the time how hot you are, but today I need to talk about the absolute hold your face has on me.\n\n" +
      "First of all, your eyes are so fucking deep. It is genuinely distracting; I could just sit there and get completely lost in them for hours. And then you hit me with that smile—it is absolutely deadly. But honestly, one of my favorite things in the world is the way you make those random, fucking cute faces when we are just talking or joking around. I love seeing you like that, just completely comfortable and being yourself.\n\n" +
      "And as if all of that wasn't enough, whenever you leave your hair open and just let it run down your shoulders... it frames your face in a way that makes you look absolutely, flawlessly perfect. You are the prettiest sight in the world to me, and half the time I am just quietly admiring you, completely hooked.",
  },
  {
    day: 24,
    target: "Target 24: The Homecoming",
    title: "Day 24: Sketches and Scent",
    photoUrl: "/media/day-23.mp4",
    letter:
      "Traveling back to Kolkata for this summer break, I don't think I have ever been more impatient in my life. The entire trip back from Pondi, all I could think about was finally seeing you again, giving you those sketches I made for you, and just pulling you into my arms.\n\n" +
      "I missed you like absolute hell. Finally getting to hold you and feel that exact same warmth I’ve been craving was everything. And honestly? I don't even know how to properly explain it, but I am absolutely obsessed with how you smell every time I hug you. it really doesnt matter if u are sweaty or freshly showered, i just love how you smell in every way. Just being back and getting to see you this regularly again is easily the best part of my break. I am soaking up every single second of having you this close.",
  },
  {
    day: 25,
    target: "Target 25: The Unseen Details",
    title: "Day 25: Ponytails and Baby Faces",
    photoUrl: "/media/day-24.mp4",
    letter:
      "It is one thing to notice how beautiful you are when you get dressed up, but my absolute favorite things are the tiny, everyday details that most people probably miss.\n\n" +
      "Like the way your ponytail swings from side to side when you walk—it is honestly so undeniably sweet and cute. Or the absolute cheat code you have when you want me to do something for you. I will actively try to say no, and then you just hit me with that baby face, say 'chol na,' and it is instantly game over. I literally cannot say no to that face.\n\n" +
      "Then there are those adorable little winks you do when we are busy making fun of your exes. You look so ridiculously cute when you do it, and it always transitions right into that incredibly elegant smile of yours. It’s these random, unseen little things that make me completely crazy about you.",
  },
  {
    day: 26,
    target: "Target 26: Us Against the World",
    title: "Day 26: The One Constant",
    photoUrl: "/media/day-25.mp4",
    letter:
      "Life gets ridiculously chaotic sometimes. We joke constantly about our messed-up love lives, the random drama, and the people who come and go, but the truth is, through all of that noise, you are my one absolute constant.\n\n" +
      "It doesn't matter what is happening or who is causing the storm, I am always going to be in your corner. If someone messes with you, they are instantly dealing with me. Whether we need to aggressively defend each other, scheme together, or just sit in comfortable silence while everything else falls apart, you never have to face any of it alone. Relationships and people will always be unpredictable, but the loyalty we have built is entirely bulletproof. No matter how messy things get out there, it is always going to be us against the world.",
  },
  {
    day: 27,
    target: "Target 27: The Effect",
    title: "Day 27: The Reset Button",
    photoUrl: "/media/day-26.mp4",
    letter:
      "I talk a lot about the fun we have and how much I admire you, but I need to talk about what you actually do to my mind. You are my ultimate fix.\n\n" +
      "Whenever my day is completely falling apart, when I feel drained, or when I am just exhausted and frustrated with the drama in my own relationship, my first instinct is always to call you. It doesn't even matter what we talk about—just hearing your voice is the most peaceful, relaxing feeling in the world. You act as a complete reset button for my brain. The second we start talking, all the weight and the chaos just fade out. You have this incredible ability to make everything feel okay again just by being on the other end of the line.",
  },
  {
    day: 28,
    target: "Target 28: The Blueprint",
    title: "Day 28: The Blueprint",
    photoUrl: "/media/day-28-blueprint.jpg",
    letter:
      "I’ve been sketching out these intricate, clockwork-style systems lately, and it got me thinking about time. We are literally days away from your twenties now. \n\n" +
      "The blueprint for your next decade is completely wide open. Whatever you decide to build next, and whatever massive goals you set your sights on, just know I’m going to be right there in your corner watching you execute it perfectly. The countdown on this app is almost over, but your next era is just getting started.",
  },
  {
    day: 29,
    target: "Target 29: The Woman She Is Becoming",
    title: "Day 29: Owning the Journey",
    photoUrl: "/media/day-27.jpg",
    letter:
      "In just a few days, you are officially leaving your teenage years behind, and I cannot even begin to explain how incredibly proud I am of the woman you are shaping up to be.\n\n" +
      "Growth isn't just about the successes; it’s about how you handle the lows. I have watched you admit the mistakes you made in the past and face the consequences of them so bravely. Instead of letting those moments break you, you used them to understand the world on a much deeper level. You are so much more prepared and ready for whatever comes next. Watching the relentless way you work for your career and how flawlessly you manage everything on your plate is completely commendable. You haven't just grown older; you have evolved into a fiercely strong, wise, and resilient woman, and having a front-row seat to your journey is my greatest privilege.",
  },
  {
    day: 30,
    target: "Target 30: The Promise",
    title: "Day 30: Your Permanent",
    photoUrl: "/media/day-28.jpg",
    letter:
      "We talk a lot about the future, the distance, and the chaos of life, but today I just want to make you one absolute promise: I am going to be your permanent.\n\n" +
      "I have seen you cry, and it is genuinely one of the things I hate the most in this entire world. I want you to know that whatever happens, I am with you. I am here for life. I promise to be there in your absolute lowest moments, just like you have been there for mine. You will always have me having your back, and you will always have my shoulder to cry on... (and honestly, ei shoulder onek kaaj e ashte pare ifukuk 😂).\n\n" +
      "But jokes aside, I promise to love you, to care for you, and to always, always be by your side. No matter where we are, what city we are in, or what is going on in our lives, you never have to question if I'll be there. I am not going anywhere.",
  },
  {
    day: 31,
    target: "Target 31: 11:59 PM",
    title: "Day 31: The Final Countdown",
    photoUrl: "/media/day-29.jpg",
    letter:
      "You actually did it. You clicked through 31 days, tracked 31 targets across this map, and read 31 reminders of exactly why you mean so much to me. I hope waking up to these every single morning has made you smile as much as I smiled putting this entire thing together for you.\n\n" +
      "But right now, the clock is ticking. Today is the very last day of your teenage years. Take a second to soak that in. Tomorrow, a brand new chapter starts, and you step into your twenties. Enjoy your last few hours as a 19-year-old, relax, and get ready for midnight.\n\n" +
      "The final target is locked in right over your house, and the best is yet to come. I'll see you at 12:00 AM.",
  },
  {
    day: 32,
    target: "Target 32: The Grand Finale",
    title: "Day 32: Welcome to 20",
    photoUrl: "/media/day-30.gif",
    voiceNoteUrl: "/media/day-30-voice.wav",
    voiceNoteDurationSec: 90,
    letter:
      "Happy 20th Birthday, Priyo.\n\n" +
      "We made it to the end of the map. After spending an entire month trying to put into words exactly what you mean to me, I’ve realized that no countdown could ever truly capture the full weight of it.\n\n" +
      "Stepping into your twenties is a massive milestone, and looking at the woman standing in front of me today just leaves me in absolute awe. I am hopelessly, wildly attracted to you—not just because you are the most undeniably gorgeous person I have ever laid eyes on, but because of the fierce, effortless energy you carry. The way you can completely ruin my focus with just a look, a subtle smile, or a shift in your mood... it drives me completely crazy. Honestly, ar toh dekhe toke thaka jaye na, eto hotness bol newa jaye? You hold this absolute power over me, and I wouldn't have it any other way.\n\n" +
      "But the pull I feel towards you goes so much deeper than just how beautiful you are. I have this immense, profound respect for the fire inside you. Watching you evolve, handle life's turbulence with so much grace, and chase your goals with that unshakeable, relentless mindset makes me ridiculously proud. You have grown into a woman of incredible depth, wisdom, and strength. You know exactly who you are, and watching that confidence bloom is the greatest privilege I could ask for.\n\n" +
      "For me, you are simply home. You are the ultimate peace in my chaotic world. No matter how loud or heavy things get, just hearing your voice or feeling your arms around me makes the rest of the universe fade out completely. You are my absolute safest space, my best friend, and my anchor.\n\n" +
      "And let's be completely real—no guy out there can ever treat you better than your best friend can, and absolutely no one could ever love you the way that I do.\n\n" +
      "Today, as you start this brand new chapter, my promise remains entirely untouched. I am your permanent. Through your highest highs and the moments where you just need to break down, I am right here. I will always be the shoulder you lean on (and yes, we both know exactly how useful this shoulder can be 😉). I will always protect you, aggressively defend you, and love you with everything I have. And besides... tui toh janish ami ki ki korte chai 😏.\n\n" +
      "You deserve the absolute universe today. Have the happiest birthday. Now, put the phone away—it's time to celebrate you.",
  },
];

export function getDayContent(day: number): DayContent | undefined {
  return DAYS.find((entry) => entry.day === day);
}
