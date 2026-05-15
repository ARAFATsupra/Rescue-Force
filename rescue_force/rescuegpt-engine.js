/* ══════════════════════════════════════════════════════════════
   RESCUEGPT OFFLINE AI ENGINE v4.0
   ITM Rescue Force — 100% offline, no API, no internet required
   Features: intent scoring, context memory, multi-turn, rich responses
   ══════════════════════════════════════════════════════════════ */
'use strict';

window.RescueGPT = (function () {

  /* ── KNOWLEDGE BASE ─────────────────────────────────────────
     Each entry: { intents, keywords, weight, response, followups }
     intents   : high-priority exact phrases
     keywords  : scored word list  [word, score]
     response  : full answer (supports \n for line breaks)
     followups : suggested follow-up questions shown after reply
  ────────────────────────────────────────────────────────────── */
  const KB = [

    /* ══ IDENTITY ══ */
    {
      id: 'identity',
      intents: ['who are you','what are you','rescuegpt','what is rescuegpt','your name','introduce yourself','tell me about yourself'],
      keywords: [['who',2],['are',1],['you',2],['name',3],['rescuegpt',5],['introduce',3],['bot',2],['ai',2],['assistant',2]],
      response: `I am RescueGPT — the offline emergency AI assistant built by ITM Rescue Force, Bangladesh.

I work completely without internet. No API. No server. Just me, right here in your browser.

I can help you with:
• Emergency first aid procedures
• Disaster safety (flood, cyclone, earthquake, fire)
• Bangladesh emergency hotline numbers
• Rescue and evacuation guidance
• Disaster preparedness tips
• Animal rescue guidance
• Environmental emergency response

For any immediate life-threatening emergency — call 999 right now. Do not wait.

How can I help you today?`,
      followups: ['What emergencies can you help with?', 'Bangladesh emergency numbers', 'How to prepare for disasters?']
    },

    /* ══ GREETING ══ */
    {
      id: 'greeting',
      intents: ['hello','hi','hey','good morning','good evening','good afternoon','assalamu alaikum','salam','greetings'],
      keywords: [['hello',5],['hi',5],['hey',4],['morning',3],['evening',3],['afternoon',3],['salam',5],['assalamu',5],['greetings',4]],
      response: `Hello! Welcome to RescueGPT — ITM Rescue Force Emergency AI Assistant.

I am fully offline and ready to help you 24 hours a day, 7 days a week.

What emergency or safety topic can I assist you with today?

Quick topics I can help with:
• Flood safety and evacuation
• Fire emergency procedures
• Earthquake survival
• First aid (CPR, burns, bleeding, choking)
• Cyclone preparedness
• Emergency hotlines in Bangladesh`,
      followups: ['Emergency hotlines in Bangladesh', 'What to do in a flood?', 'How to perform CPR?']
    },

    /* ══ GOODBYE ══ */
    {
      id: 'goodbye',
      intents: ['bye','goodbye','see you','take care','allah hafez','khoda hafez','thank you','thanks'],
      keywords: [['bye',5],['goodbye',5],['thanks',4],['thank',3],['hafez',5],['see you',5],['take care',4]],
      response: `Stay safe and take care.

Remember — in any real emergency, call 999 immediately. Do not delay.

Key numbers to save in your phone right now:
• 999 — National Emergency
• 108 — Ambulance
• 101 — Fire Brigade
• 100 — Police

ITM Rescue Force is here for you anytime. Stay prepared, stay safe.`,
      followups: []
    },

    /* ══ EMERGENCY NUMBERS ══ */
    {
      id: 'hotlines',
      intents: ['emergency number','hotline','emergency contact','phone number','helpline','emergency call','who to call','which number'],
      keywords: [['number',4],['hotline',5],['emergency',3],['call',3],['phone',4],['contact',3],['helpline',5],['dial',4],['999',5],['108',5],['101',5],['112',5]],
      response: `BANGLADESH EMERGENCY HOTLINES — Save these now:

NATIONAL EMERGENCY
• 999 — Police, Fire, Ambulance (all-in-one)
• 112 — Global emergency (works on any network, even without credit)

MEDICAL
• 108 — Ambulance service (national)
• 16000 — Health helpline
• 10655 — COVID / health emergency

FIRE & DISASTER
• 101 — Fire Brigade
• 104 — Bangladesh Disaster Management

LAW & SECURITY
• 100 — Police (direct)
• 999 — Police emergency

SUPPORT LINES
• 181 — Women & children helpline (24/7)
• 1090 — Anti-harassment helpline
• 10921 — Legal aid
• 16110 — Child helpline

GAS & UTILITIES
• 1906 — Titas Gas emergency
• 16199 — Dhaka WASA emergency

MEDICAL CENTERS
• Dhaka Medical: 02-55165088
• BIRDEM: 02-8616641
• National Heart Foundation: 02-8116000

Tip: Screenshot this and save it offline. Share it with your family.`,
      followups: ['What to do before calling 999?', 'How to report a flood?', 'Fire emergency steps']
    },

    /* ══ FLOOD ══ */
    {
      id: 'flood',
      intents: ['flood','flooding','flash flood','river overflow','water rising','bonna','baadh','waterlogged','inundation'],
      keywords: [['flood',5],['flooding',5],['flash',3],['river',3],['overflow',4],['water',2],['rising',3],['bonna',5],['waterlog',4],['inundat',4],['submerge',4],['deluge',4]],
      response: `FLOOD EMERGENCY — Complete Safety Guide

IMMEDIATE ACTION (first 5 minutes):
1. Move to highest ground available immediately — do not wait
2. Call 999 if in immediate danger or 104 for disaster help
3. Turn off electricity at the main switch box
4. Do not touch electrical switches if standing in water

IF TRAPPED INSIDE:
• Move to the highest floor — roof if necessary
• Signal rescuers with bright cloth, flashlight, or whistle
• Do not try to swim through fast-moving floodwater
• 15cm of moving water can knock an adult off their feet
• 30cm of water can sweep a car away

EVACUATION RULES:
• Never walk through moving water
• Do not drive through flooded roads
• Follow official evacuation routes only
• Take emergency bag: water, food, medicine, documents, phone charger
• Help neighbors — especially elderly, children, disabled persons

AFTER THE FLOOD:
• Do not return home until authorities declare it safe
• Floodwater is extremely contaminated — avoid all contact
• Check for structural damage before entering buildings
• Boil all drinking water for at least 1 minute
• Watch for snakes and insects displaced by water
• Document damage with photos for insurance

BANGLADESH-SPECIFIC:
• Haor region: evacuate before monsoon season (June-October)
• Coastal areas: move 2+ km inland during cyclone flood surge
• Dhaka: know your nearest flood shelter location
• Monitor BWDB (Bangladesh Water Development Board) flood bulletins

FLOOD PREPAREDNESS:
• Store 3 days of water (4 litres per person per day)
• Keep important documents in waterproof bags
• Know your nearest flood shelter address
• Keep a battery-powered radio for alerts`,
      followups: ['What to pack in a flood emergency bag?', 'How to stay safe after a flood?', 'Flood warning signs in Bangladesh']
    },

    /* ══ CYCLONE ══ */
    {
      id: 'cyclone',
      intents: ['cyclone','tornado','hurricane','storm','tidal wave','storm surge','jhor','typhoon','tropical storm','ghurni jhor','super cyclone'],
      keywords: [['cyclone',5],['tornado',5],['hurricane',5],['storm',4],['surge',3],['tidal',4],['jhor',5],['typhoon',5],['tropical',3],['ghurni',5],['wind',2],['gale',3]],
      response: `CYCLONE SAFETY — Bangladesh Coastal Emergency Guide

BEFORE THE CYCLONE (when warning issued):
1. Follow Bangladesh Meteorological Department (BMD) alerts immediately
2. Move to nearest Cyclone Preparedness Programme (CPP) shelter
3. Bangladesh has 4,000+ cyclone shelters — know yours now
4. Secure or bring indoors all loose outdoor objects
5. Charge all devices and power banks
6. Store 3+ days of food, water, and medications
7. Prepare emergency bag with documents in waterproof pouch

CYCLONE ALERT LEVELS — BANGLADESH:
• Signal 1: Distant danger — prepare and monitor
• Signal 3: Warning — ready to evacuate
• Signal 7: Danger — evacuate coastal areas immediately
• Signal 10: Extreme danger — all coastal areas must evacuate NOW

DURING THE CYCLONE:
• Stay inside a strong building or shelter — never go outside
• Stay away from all windows and glass doors
• Move to interior rooms on lower floors (not basements — flood risk)
• If shelter collapses, hold onto a fixed structure
• The eye of the storm is deceptively calm — do NOT go outside
• Wait for official all-clear before leaving shelter

STORM SURGE — MOST DANGEROUS PART:
• Can raise water levels 5-10 metres above normal
• Cox's Bazar, Chittagong, Khulna, Barisal most at risk
• If in surge zone: evacuate BEFORE the storm, not during
• No building is safe in a major storm surge zone

AFTER THE CYCLONE:
• Wait for official all-clear announcement
• Watch for downed power lines — assume all lines are live
• Avoid floodwater — it carries sewage, chemicals, debris
• Report damage to local government immediately
• Bangladesh Disaster Management call: 104

CYCLONE PREPAREDNESS NUMBERS:
• CPP (Cyclone Preparedness Programme): 02-9130665
• BDRCS (Red Crescent): 02-9330188
• BMD (Weather): 02-9127600`,
      followups: ['How to build a cyclone emergency kit?', 'What is storm surge?', 'Flood safety after cyclone']
    },

    /* ══ EARTHQUAKE ══ */
    {
      id: 'earthquake',
      intents: ['earthquake','tremor','seismic','quake','building collapse','collapse','bhumi kompa','aftershock','richter'],
      keywords: [['earthquake',5],['tremor',5],['seismic',5],['quake',5],['collapse',4],['shake',3],['bhumi',5],['kompa',5],['aftershock',5],['richter',4],['magnitude',3],['fault',3]],
      response: `EARTHQUAKE SURVIVAL — Drop, Cover, Hold On

DURING THE SHAKING:
1. DROP immediately to hands and knees
2. Take COVER under a sturdy desk or table — hold on
3. If no table: get against an interior wall, cover your head
4. HOLD ON — move with the shelter until shaking stops
5. Stay away from windows, exterior walls, heavy furniture
6. Do NOT run outside during shaking — most injuries are from falling

IF OUTDOORS:
• Move away from buildings, trees, power lines, streetlights
• Drop to the ground in an open area
• Stay there until shaking completely stops

IF IN A VEHICLE:
• Pull over away from overpasses, bridges, power lines
• Stay inside with seatbelt on until shaking stops
• Proceed carefully — avoid damaged roads and bridges

IF TRAPPED:
• Do not light a match or candle — gas leaks possible
• Cover mouth with clothing to filter dust
• Tap on pipe or wall so rescuers can find you
• Shout only as a last resort — conserves energy
• Use phone flashlight to signal

AFTER THE EARTHQUAKE:
• Expect aftershocks — treat each one as Drop, Cover, Hold On
• Check yourself and others for injuries
• Check for gas leaks — smell, hissing sound. If detected: open windows, leave building, call 1906
• Check for electrical damage — if sparks seen, turn off power
• Do not use elevators
• Stay out of damaged buildings

BANGLADESH EARTHQUAKE RISK:
• Dhaka, Sylhet, Chittagong are in high seismic zones
• Sylhet: Zone III (highest risk in Bangladesh)
• Major fault lines run through Sylhet and Chittagong Hill Tracts
• Bangladesh is due for a major earthquake — prepare NOW

STRUCTURAL SAFETY CHECK AFTER QUAKE:
• Check walls for diagonal cracks (serious) vs hairline cracks (minor)
• Check foundation for shifting or separation
• Do not enter if you see wall separation, roof sagging, or staircase damage
• Call BUET or local engineering department for assessment`,
      followups: ['How to prepare an earthquake emergency kit?', 'What is the earthquake risk in Dhaka?', 'Building collapse rescue steps']
    },

    /* ══ FIRE ══ */
    {
      id: 'fire',
      intents: ['fire','building fire','house fire','gas fire','kitchen fire','agun','durghatona','fire escape','smoke','burn building','electrical fire'],
      keywords: [['fire',5],['flame',4],['smoke',4],['burning',4],['agun',5],['blaze',4],['inferno',4],['ignite',3],['arson',3],['escape',3],['evacuate fire',4]],
      response: `FIRE EMERGENCY — Life-Saving Steps

FIRST 30 SECONDS:
1. Alert everyone immediately — shout "FIRE" loudly
2. Call 101 (Fire Brigade) or 999 — give exact address
3. Activate the fire alarm if available
4. If fire is small and contained — use fire extinguisher (PASS method)
5. If fire is growing — evacuate immediately, do not fight it

EVACUATION RULES:
• Feel doors before opening — if hot, use another route
• Stay LOW — clean air is near the floor, smoke rises
• Never use elevators during a fire
• Close doors behind you — slows fire spread dramatically
• Get out first, then call — do not gather belongings
• Meet at your designated assembly point

PASS METHOD (Fire Extinguisher):
• Pull the pin
• Aim at the base of the fire (not the flames)
• Squeeze the handle slowly
• Sweep from side to side

TYPES OF FIRE — What to use:
• Paper/wood/cloth: water or dry powder extinguisher
• Electrical fire: NEVER use water — use CO2 or dry powder
• Oil/cooking fire: cover with lid or fire blanket — NEVER use water
• Gas fire: turn off gas supply first if safe to do so

IF TRAPPED BY FIRE:
• Close all doors between you and the fire
• Seal gaps under doors with clothing or bedding
• Open a window and signal for help
• Stay low and near the window
• Call 101 or 999 with your exact location

IF CLOTHES CATCH FIRE:
• STOP — do not run, you will fan the flames
• DROP to the ground immediately
• ROLL repeatedly until flames are out
• Cool burn with cold running water for 20 minutes

BANGLADESH-SPECIFIC:
• Dhaka slum areas: narrow lanes make evacuation critical — know 2 exit routes
• Garment factories: fire exits must not be locked — report violations to DIFE: 02-9145335
• Building code requires fire exits every 30 metres in commercial buildings`,
      followups: ['How to treat fire burns?', 'Gas leak emergency steps', 'Electrical fire safety']
    },

    /* ══ CPR ══ */
    {
      id: 'cpr',
      intents: ['cpr','cardiopulmonary resuscitation','heart attack','cardiac arrest','not breathing','pulse','unconscious person','resuscitate','rescue breath','chest compression'],
      keywords: [['cpr',5],['cardiac',5],['heart',4],['breathing',4],['unconscious',5],['pulse',4],['resuscitate',5],['compression',4],['rescue breath',5],['arrest',4],['defibrillator',4],['aed',4]],
      response: `CPR — Cardiopulmonary Resuscitation Guide

STEP 1 — CHECK SAFETY & RESPONSE:
• Make sure the scene is safe for you to approach
• Tap shoulders firmly: "Are you OK? Are you OK?"
• If no response — call 108 (ambulance) IMMEDIATELY
• Put phone on speaker so you can follow instructions

STEP 2 — CHECK BREATHING:
• Tilt head back gently, lift chin
• Look, listen, feel for breath for no more than 10 seconds
• Occasional gasps (agonal breathing) = person is NOT breathing normally
• If not breathing normally — begin CPR now

STEP 3 — CHEST COMPRESSIONS (30):
• Place heel of hand on center of chest (lower half of breastbone)
• Place other hand on top, interlace fingers
• Keep arms straight, lean directly over chest
• Push DOWN at least 5cm (2 inches) — compress fully
• Rate: 100-120 compressions per minute (to beat of "Stayin' Alive")
• Let chest fully recoil between compressions
• Count aloud: 1-and-2-and-3-and...

STEP 4 — RESCUE BREATHS (2):
• Tilt head back, lift chin
• Pinch nose closed
• Seal your lips around their mouth
• Breathe in steadily for 1 second — watch chest rise
• Give 2 breaths, then immediately return to compressions

STEP 5 — CONTINUE 30:2 CYCLE:
• 30 compressions, 2 breaths = 1 cycle
• Continue until: ambulance arrives, person starts breathing, you are too exhausted
• If AED (defibrillator) available — use it the moment it arrives

CPR FOR DIFFERENT AGES:
Adult (8+ years): 2 hands, 5cm deep, 30:2 ratio
Child (1-8 years): 1 or 2 hands, 5cm deep, 30:2 ratio
Infant (under 1): 2 fingers on chest, 4cm deep, 30:2 ratio

COMPRESSION-ONLY CPR:
• If you cannot or will not do rescue breaths — compressions only is still very effective
• Continuous compressions at 100-120/min with no pauses
• This is especially recommended for untrained bystanders

CHOKING + UNCONSCIOUS:
• If person collapses from choking, begin CPR
• Before each rescue breath, look in mouth — remove visible object only`,
      followups: ['What is an AED defibrillator?', 'How to help a choking adult?', 'How to do infant CPR?']
    },

    /* ══ BLEEDING ══ */
    {
      id: 'bleeding',
      intents: ['bleeding','blood','wound','cut','laceration','hemorrhage','blood loss','stab','injury','gash'],
      keywords: [['bleed',5],['blood',4],['wound',4],['cut',4],['laceration',5],['hemorrhage',5],['stab',4],['gash',4],['injury',2],['loss blood',5],['tourniquet',4]],
      response: `BLEEDING CONTROL — Severe and Minor Wounds

FOR SEVERE / HEAVY BLEEDING:
1. Call 108 or 999 immediately if bleeding is severe
2. Apply DIRECT PRESSURE with clean cloth, bandage, or clothing
3. Press firmly without releasing — do not peek to check
4. If cloth soaks through — add MORE cloth on top, do not remove first layer
5. Maintain pressure for minimum 10-15 minutes continuously
6. Elevate the injured limb above heart level if possible

TOURNIQUETS — USE FOR LIFE-THREATENING LIMB BLEEDING:
• Apply 5-7cm above the wound (not on joint)
• Tighten until bleeding stops — this will be painful
• Write the time of application on the person's skin or forehead
• Never remove a tourniquet once applied — only medical personnel should
• Improvise with belt, tie, or torn clothing if no proper tourniquet

WOUND CLEANING (minor cuts):
1. Wash hands first
2. Rinse wound under clean running water for 5-10 minutes
3. Clean around wound with antiseptic or soap
4. Cover with clean bandage or cloth
5. Change dressing daily, watch for infection signs

SIGNS OF INFECTION (seek medical help):
• Increasing redness, swelling, warmth around wound
• Pus or foul smell
• Red streaks spreading from wound
• Fever above 38°C
• Wound not closing or healing after several days

INTERNAL BLEEDING SIGNS:
• Swollen, rigid, or tender abdomen
• Bruising around abdomen or back
• Blood in urine or stool
• Vomiting blood or coffee-ground material
• Pale, cold, clammy skin with rapid weak pulse
• Action: Call 108 immediately — this is life-threatening

DO NOT:
• Do not remove embedded objects — stabilize around them
• Do not use hot water on a burn wound
• Do not close a puncture wound with tape
• Do not give aspirin to a bleeding patient (thins blood)`,
      followups: ['How to treat a deep cut?', 'Signs of internal bleeding', 'Wound infection symptoms']
    },

    /* ══ BURNS ══ */
    {
      id: 'burns',
      intents: ['burn','scald','hot water','chemical burn','acid burn','sunburn','fire burn','blister','pora','fire injury'],
      keywords: [['burn',5],['scald',5],['blister',4],['hot water',4],['chemical burn',5],['acid',4],['sunburn',3],['pora',5],['sear',4],['char',3]],
      response: `BURN TREATMENT — Complete First Aid Guide

COOLING THE BURN (first and most important step):
1. Cool under COLD RUNNING WATER for 20 minutes minimum
2. Start cooling immediately — every second matters
3. Water should be cool, not ice cold
4. Never use ice, ice water, or frozen items — causes frostbite
5. Remove jewelry, watches, belts near the burn while cooling
6. Do not remove clothing stuck to burn — cut around it

WHAT NEVER TO DO:
• Never apply butter, ghee, oil, toothpaste, or cream
• Never burst blisters — infection risk
• Never use fluffy materials (cotton wool) — sticks to wound
• Never apply ice or very cold water
• Never wrap burn too tightly

COVER THE BURN:
• Cover loosely with cling film (plastic wrap) — ideal, prevents infection
• Or use a clean non-fluffy cloth
• Do not wrap tightly — allow for swelling

BURN SEVERITY GUIDE:
First Degree (Superficial): Red skin, painful, no blisters — treat at home
Second Degree (Partial): Blisters, very painful, wet-looking — seek medical care
Third Degree (Full thickness): White, brown, or black skin, may be painless — EMERGENCY, call 108

CALL 108 IF:
• Burns larger than palm size
• Burns on face, hands, feet, genitals, or over a joint
• Burns that circle a limb (circumferential)
• Chemical or electrical burns (any size)
• Burns in children under 2 or elderly
• Person inhaled smoke or hot air

CHEMICAL BURNS:
1. Remove contaminated clothing carefully (wear gloves)
2. Flush with large amounts of water for 30+ minutes
3. Do not try to neutralize acid with base or vice versa
4. Cover loosely and get to hospital immediately
5. Bring the chemical container for medical staff

ELECTRICAL BURNS:
• Do not touch — person may still be in contact with electricity
• Turn off power source at breaker/switch
• Once safe, check for breathing — begin CPR if not breathing
• Electrical burns are deeper than they appear — always need hospital`,
      followups: ['What to do for a chemical burn?', 'How to treat sunburn?', 'Signs of serious burns needing hospital']
    },

    /* ══ CHOKING ══ */
    {
      id: 'choking',
      intents: ['choking','choke','food stuck','throat blocked','heimlich','cannot breathe','airway blocked','swallowed','gag'],
      keywords: [['chok',5],['heimlich',5],['airway',4],['throat',4],['swallow',3],['food stuck',5],['cannot breathe',5],['blocked airway',5],['back blow',5],['gag',3]],
      response: `CHOKING EMERGENCY — Act Immediately

RECOGNIZE CHOKING:
• Person cannot speak, cry, or make much sound
• High-pitched noises or no sound when trying to breathe
• Weak, ineffective cough
• Skin turning blue (cyanosis) — especially lips and fingertips
• Clutching throat with hands (universal choking sign)
• Panic in the person's eyes

IF PERSON CAN COUGH FORCEFULLY:
• Encourage them to keep coughing — do not interfere
• Stand by and monitor
• If coughing becomes ineffective, begin back blows

ADULT / CHILD OVER 1 YEAR — 5+5 METHOD:
Step 1 — 5 BACK BLOWS:
• Lean person forward (or bend them forward)
• Give 5 firm blows between shoulder blades with heel of hand
• Each blow should be a separate, distinct movement

Step 2 — 5 ABDOMINAL THRUSTS (Heimlich):
• Stand behind the person
• Make a fist and place thumb side against abdomen (above navel, below breastbone)
• Grasp fist with other hand
• Give 5 quick upward thrusts — inward and upward
• Each thrust should be a separate, sharp movement

Step 3 — ALTERNATE:
• Continue alternating 5 back blows and 5 abdominal thrusts
• Call 999 if object not dislodged quickly

IF PERSON BECOMES UNCONSCIOUS:
• Lower carefully to the ground
• Call 108 immediately
• Begin CPR — before each rescue breath, look in mouth
• If you see an object, remove it. If you do not see it, do NOT do blind finger sweeps

INFANT CHOKING (under 1 year):
• Hold face-down on your forearm, supporting head
• Give 5 back blows between shoulder blades with 2 fingers
• Turn face-up, give 5 chest thrusts with 2 fingers on breastbone
• Check mouth — remove visible objects only
• Repeat until clear or infant loses consciousness
• Call 108 immediately

PREGNANT WOMEN / OBESE PERSONS:
• Use chest thrusts instead of abdominal thrusts
• Position hands on center of breastbone
• Same inward thrust motion

SELF-CHOKING WHEN ALONE:
• Call 999 if possible — leave phone on
• Try to perform self-abdominal thrusts
• Lean over a hard edge (chair back, countertop, railing)
• Drive your upper abdomen sharply against the edge`,
      followups: ['How to do CPR after choking?', 'Choking in infants guide', 'How to prevent choking?']
    },

    /* ══ SNAKE BITE ══ */
    {
      id: 'snakebite',
      intents: ['snake bite','snakebite','snake venom','venomous snake','cobra','krait','viper','bitten by snake','sarp','saper kata','snake attack'],
      keywords: [['snake',5],['venom',5],['bite',4],['cobra',5],['krait',5],['viper',5],['sarp',5],['saper',5],['envenomation',5],['antivenom',5],['fangs',4]],
      response: `SNAKE BITE EMERGENCY — Critical First Response

CALL 108 IMMEDIATELY — Snake bite is a medical emergency.

WHAT TO DO:
1. Keep the victim CALM and STILL — movement speeds venom spread
2. Lay person down — keep bitten limb immobilized and below heart level
3. Remove watches, rings, bracelets near bite site — swelling expected
4. Mark the edge of swelling with pen every 15 minutes to track progression
5. Note the time of the bite — tell medical staff immediately
6. Keep person warm with a blanket
7. If person loses consciousness — check breathing, prepare to do CPR

WHAT NEVER TO DO:
• Never cut the wound and try to suck out venom (causes harm, does not work)
• Never apply a tourniquet or tie off the limb
• Never apply ice or cold packs
• Never give alcohol, painkillers, or any medication
• Never use electric shock treatment
• Never let person walk — carry them if needed
• Never try to catch or kill the snake — more bites happen this way

IDENTIFYING THE SNAKE (tell hospital):
• Size and color (do not approach for a close look)
• Shape of head — triangular often indicates venomous
• Pattern on body
• Take a photo from safe distance if possible

COMMON VENOMOUS SNAKES IN BANGLADESH:
• Banded Krait: Most deadly. Black and yellow bands. Often enters homes.
• King Cobra: Rare but extremely dangerous. Found in forests.
• Russell's Viper: Brown with oval markings. Causes local tissue destruction.
• Monocled Cobra: Common in rural areas. Causes rapid paralysis.

ANTIVENOM:
• Only effective treatment for envenomation
• Available at district and upazila hospitals
• Most effective within 4-6 hours of bite
• Patient may need multiple vials
• Dhaka Medical College: 02-55165088
• National Institute of Traumatology: 02-9120306

SIGNS OF SERIOUS ENVENOMATION:
• Drooping eyelids (ptosis) — krait or cobra venom
• Difficulty swallowing or speaking
• Muscle weakness or paralysis
• Local tissue swelling, blistering, or blackening
• Blood oozing from gums or other sites (viper venom)
• Loss of consciousness`,
      followups: ['Which hospitals treat snake bites in Bangladesh?', 'How to identify venomous snakes?', 'Snake bite prevention tips']
    },

    /* ══ HEATSTROKE ══ */
    {
      id: 'heatstroke',
      intents: ['heatstroke','heat stroke','heat exhaustion','overheating','high temperature','hyperthermia','heat cramp','sunstroke','goromer dhaka'],
      keywords: [['heat',4],['stroke',3],['hot',3],['temperature',3],['hyperthermia',5],['overheating',5],['sunstroke',5],['exhaustion',4],['heat cramp',5],['faint heat',4],['dehydration',3]],
      response: `HEATSTROKE / HEAT EXHAUSTION — Emergency Treatment

TELL THE DIFFERENCE:
Heat Exhaustion (less severe): Heavy sweating, weakness, cold/pale/clammy skin, nausea, headache, normal temperature
Heat Stroke (EMERGENCY): Hot/red/dry or damp skin, rapid strong pulse, confusion or unconsciousness, temperature above 40°C

HEAT STROKE TREATMENT:
1. Call 108 immediately — heat stroke is life-threatening
2. Move person to a cool location — air-conditioned building or shaded area
3. Cool the person as rapidly as possible using any method available:
   • Apply ice packs to neck, armpits, and groin
   • Spray with cool water and fan continuously
   • Immerse in cool (not cold) water if available
   • Wrap in cool wet sheets
4. Do NOT give water or fluids if unconscious
5. Monitor breathing — be ready to start CPR
6. Continue cooling until body temperature drops to 38°C

HEAT EXHAUSTION TREATMENT:
1. Move to a cool, shaded location
2. Lie person down and elevate their legs
3. Give cool water or sports drinks to sip slowly (not gulped)
4. Loosen or remove excess clothing
5. Apply cool, wet cloths to skin
6. Fan the person
7. If no improvement in 30 minutes — call 108

HEAT CRAMP TREATMENT:
• Move to cool location, rest
• Drink water with a small amount of salt or sports drink
• Gently stretch and massage cramped muscle
• Do not return to intense activity for several hours

BANGLADESH-SPECIFIC RISK:
• April to June are peak heatstroke months in Bangladesh
• Rickshaw pullers, construction workers, farmers are highest risk
• During Ramadan: risk elevated due to fasting and dehydration
• Humidity makes heat feel much more intense
• Children and elderly are most vulnerable

PREVENTION:
• Drink 2-3 litres of water per day in hot weather
• Avoid going out between 11am and 3pm
• Wear light-colored, loose, breathable clothing
• Use umbrella or hat in direct sun
• Never leave children or animals in parked vehicles`,
      followups: ['Signs of dehydration', 'Heat safety for outdoor workers', 'When is it safe to exercise in heat?']
    },

    /* ══ DROWNING ══ */
    {
      id: 'drowning',
      intents: ['drowning','drowned','water rescue','swimming accident','river accident','boat capsized','capsized','near drowning','secondary drowning','water emergency'],
      keywords: [['drown',5],['water rescue',5],['capsiz',5],['river accident',4],['swimming',3],['submerge',4],['near drowning',5],['secondary drowning',5],['boat accident',4],['pool accident',4]],
      response: `DROWNING EMERGENCY — Speed Is Critical

RESCUE THE PERSON (your safety first):
• Do NOT jump in unless you are a trained swimmer
• REACH: Extend a rope, stick, clothing, or towel from shore
• THROW: Throw a life ring, cooler, or anything that floats
• ROW: Use a boat to reach them if available
• GO: Only trained swimmers should enter the water — always go with backup
• Call 999 while rescue is in progress

ONCE PERSON IS OUT OF WATER:
1. Check for breathing immediately
2. If not breathing — begin CPR at once (30 compressions, 2 breaths)
3. For drowning, 5 initial rescue breaths are recommended before compressions
4. Tilt head back, lift chin, give 2 breaths — watch chest rise
5. Call 108 — drowning victims need hospital evaluation even if recovered

DO NOT:
• Do not perform the Heimlich maneuver — it does not remove water from lungs
• Do not waste time trying to remove water from lungs
• Do not assume they are fine because they seem awake and breathing

SECONDARY DROWNING — IMPORTANT:
• Can occur 1-24 hours after a water incident
• Person seems fine but later develops coughing, difficulty breathing, chest pain
• Send ALL drowning victims to hospital for evaluation regardless of how they appear
• This is life-threatening and requires hospital treatment

COLD WATER DROWNING:
• Cold water can preserve brain function longer
• Continue CPR even if person appears lifeless
• "Not dead until warm and dead" — hospital can rewarm and resuscitate
• Always transport to hospital, do not stop resuscitation

PREVENTION IN BANGLADESH:
• Never swim alone — rivers are extremely dangerous
• River currents are deceptive — stronger than they appear
• Avoid rivers during monsoon season (June-October)
• Children: constant adult supervision near ANY water
• Teach children to swim — swimming lessons save lives
• Life jackets: mandatory for all boat travel`,
      followups: ['How to do CPR for drowning?', 'Water safety for children', 'Boat safety rules in Bangladesh']
    },

    /* ══ ROAD ACCIDENT ══ */
    {
      id: 'accident',
      intents: ['road accident','car accident','vehicle accident','motorcycle accident','bus accident','crash','collision','hit by car','traffic accident','motorbike accident','truck accident'],
      keywords: [['accident',5],['crash',5],['collision',5],['vehicle',3],['car',3],['bus',3],['truck',3],['motorcycle',4],['road',3],['traffic',3],['hit by',4],['run over',5]],
      response: `ROAD ACCIDENT EMERGENCY — First Response Guide

STEP 1 — SCENE SAFETY:
• Never stop vehicle in middle of road — pull completely off
• Turn on hazard lights immediately
• Place warning triangles or use phone torch to warn oncoming traffic
• Keep bystanders back — vehicles approaching may not see the accident
• Check for fuel leaks before approaching — fire risk

STEP 2 — CALL FOR HELP:
• Call 999 immediately
• State: exact location, number of vehicles, estimated number injured
• Stay on line — dispatcher will guide you

STEP 3 — CHECK THE INJURED:
• Approach carefully — check for hazards (traffic, fuel leak, electricity)
• Do NOT move injured persons unless immediate danger (fire, vehicle in water)
• Moving a spinal injury victim without care can cause permanent paralysis
• Check for breathing — if not breathing, begin CPR
• Control severe bleeding with direct pressure

SPINAL INJURY PRECAUTIONS:
• If person was involved in a high-speed crash or thrown from vehicle
• If person complains of neck or back pain, or cannot feel their legs
• Keep head and neck completely still — tell them not to move
• Wait for ambulance — do not move them unless fire or drowning

SERIOUS INJURIES TO WATCH FOR:
• Unresponsive or confused
• Difficulty breathing
• Blood in urine (internal organ injury)
• Distended (swollen) abdomen
• Pale, cold, sweating — signs of shock

MANAGING SHOCK:
• Lay person flat, elevate legs (unless spine injury)
• Keep warm with blanket
• Do not give anything to eat or drink
• Monitor breathing constantly

DOCUMENTING THE SCENE:
• Photograph all vehicles, road markings, damage
• Note time of accident
• Get contact details of witnesses
• Note license plates of all vehicles
• This protects you legally

BANGLADESH LEGAL REQUIREMENTS:
• Bangladesh Road Transport Authority (BRTA): 02-9112375
• Highway Police: 999 or local police station
• Notify police within 24 hours of any accident

FIRE AFTER ACCIDENT:
• Get all people away from vehicles immediately
• Do not try to retrieve belongings
• Call 101 (Fire Brigade) immediately
• Stay at least 30 metres away from vehicle fire`,
      followups: ['How to manage shock at accident scene?', 'How to prevent road accidents in Bangladesh?', 'What to do for spinal injuries?']
    },

    /* ══ GAS LEAK ══ */
    {
      id: 'gasleak',
      intents: ['gas leak','gas smell','smell gas','lpg leak','natural gas leak','titas gas','gas pipe broken','propane leak','gas hissing'],
      keywords: [['gas leak',5],['smell gas',5],['gas smell',5],['lpg',5],['titas',5],['propane',5],['hissing',4],['gas pipe',4],['fumes',3],['vapour',3]],
      response: `GAS LEAK EMERGENCY — Act Fast, Do Not Use Any Switch

IMMEDIATE ACTIONS — First 60 Seconds:
1. Do NOT operate any electrical switches — no lights, no fans, nothing
2. Do NOT use your mobile phone inside the building — go outside first
3. Do NOT light a match, cigarette, or candle
4. Open all windows and doors as you exit — let the gas out
5. Alert all occupants — get everyone out immediately
6. Shut off gas supply at the meter if you can reach it safely
7. Leave the building immediately

ONCE OUTSIDE:
• Call Titas Gas Emergency: 1906
• Call Fire Brigade: 101
• Call general emergency: 999
• Keep everyone far from the building
• Do not re-enter for any reason
• Warn neighbors in adjacent buildings

IF SOMEONE IS UNCONSCIOUS DUE TO GAS:
• Do NOT enter the building alone — you may also collapse
• Open windows and doors from outside if possible
• Call 999 and follow their instructions for rescue
• If you must enter: hold your breath, move quickly, drag person out

SAFE TO RETURN WHEN:
• Gas company has inspected and confirmed leak is fixed
• Gas company or fire brigade gives clear to re-enter
• Smell of gas is completely gone with ventilation

LPG CYLINDER SAFETY:
• Store upright in well-ventilated area
• Keep away from heat sources
• Turn off regulator when not in use
• Check rubber hose for cracks every 3 months
• Replace hose every 2 years even if it looks fine
• If cylinder is very hot to touch — do not move, call 101

GAS LEAK PREVENTION:
• Have all gas fittings inspected annually by licensed technician
• Install gas detector/alarm (available at hardware stores)
• Never sleep in a room with gas appliances burning
• Do not use gas appliances as heaters`,
      followups: ['What to do if LPG cylinder is on fire?', 'How to install a gas detector?', 'Gas safety in the kitchen']
    },

    /* ══ MENTAL HEALTH CRISIS ══ */
    {
      id: 'mentalhealth',
      intents: ['feeling suicidal','want to die','mental health crisis','panic attack','anxiety attack','depressed','self harm','cannot cope','crisis','no reason to live'],
      keywords: [['suicid',5],['want to die',5],['self harm',5],['crisis',4],['panic attack',5],['anxiety attack',5],['depress',4],['cope',3],['hopeless',4],['no reason',4],['end my life',5]],
      response: `I hear you. You matter, and help is available right now.

Please reach out to someone immediately:

EMERGENCY MENTAL HEALTH HELP:
• Kaan Pete Roi (Bangladesh): 01779-554391 (emotional support helpline)
• National Mental Health Helpline: 16789
• Emergency (if in immediate danger): 999

If you are having thoughts of harming yourself, please:
1. Tell someone you trust right now — a family member, friend, neighbor
2. Remove access to any means of harm
3. Call 16789 and speak to a counselor

You are not alone. This feeling is temporary, even when it does not feel that way.

Please talk to someone. I am an emergency AI — I care, but you need a real human voice right now. Please make that call.`,
      followups: ['Mental health resources in Bangladesh', 'How to help someone in crisis?']
    },

    /* ══ ANIMAL RESCUE ══ */
    {
      id: 'animal',
      intents: ['animal rescue','injured animal','trapped animal','stray dog','dog bite','cat rescue','animal emergency','wildlife rescue','bird rescue'],
      keywords: [['animal',4],['dog',4],['cat',4],['bird',4],['rescue animal',5],['injured animal',5],['wildlife',4],['stray',4],['bite animal',4],['trap animal',4]],
      response: `ANIMAL RESCUE & EMERGENCY GUIDE

DOG BITE EMERGENCY:
1. Wash wound immediately with soap and water for 15 minutes minimum
2. Apply antiseptic and sterile bandage
3. Seek medical attention SAME DAY — rabies vaccination required within 24-72 hours
4. Report bite to local authority (Union Parishad)
5. Bangladesh Rabies Free Initiative: contact local DILS office
6. Rabies vaccination: Government hospitals provide free anti-rabies vaccine

INJURED WILD ANIMAL:
• Do not attempt to handle wild animals yourself — risk of injury and disease
• Bangladesh Forest Department Wildlife Rescue: 01711-800-800
• Wildlife Crime Helpline: 16989
• Keep the animal calm — cover with light cloth, keep away from noise

STRAY DOG RESCUE:
• Dhaka North City Corporation (DNCC): 02-9811100
• Dhaka South City Corporation (DSCC): 02-9331181
• Overseers Animal Welfare Society: 01717-041733

INJURED DOMESTIC ANIMALS:
• Bangladesh Veterinary Association: 02-9122793
• Government Livestock Officer: contact local Upazila office
• Most Upazila livestock offices provide emergency vet visits

BIRDS HIT BY CARS OR WINDOWS:
• Keep in a quiet, dark, ventilated box — reduces shock
• Do not offer food or water until alert and standing
• Contact Bangladesh Bird Club for guidance: birdclubbd.org

TRAPPED ANIMALS (well, drain, construction hole):
• Call Fire Brigade (101) for large animal rescues
• Fire brigade has equipment and training for animal rescue
• Do not attempt to enter confined spaces yourself

ANIMAL WELFARE ORGANIZATIONS — DHAKA:
• AWSB (Animal Welfare Society of Bangladesh): 01711-800800
• Bangladesh Society for the Enforcement of Animal Rights: 01716-482481`,
      followups: ['Rabies vaccination in Bangladesh', 'What to do for a dog bite?', 'Wild animal rescue contacts']
    },

    /* ══ DISASTER PREPAREDNESS ══ */
    {
      id: 'preparedness',
      intents: ['disaster preparedness','emergency kit','emergency bag','go bag','prepare for disaster','emergency plan','family emergency plan','survival kit','first aid kit'],
      keywords: [['preparedness',5],['emergency kit',5],['go bag',5],['survival kit',5],['first aid kit',4],['prepare',3],['emergency plan',5],['disaster plan',5],['ready bag',4],['emergency supply',4]],
      response: `DISASTER PREPAREDNESS — Build Your Emergency Kit Today

YOUR 72-HOUR EMERGENCY BAG (for 4 family members):

WATER (most critical):
• 16 litres minimum (4 litres per person per day)
• Water purification tablets or portable filter
• Know your nearest water source

FOOD:
• 3 days of non-perishable food: rice, dal, biscuits, canned food
• Manual can opener
• Baby food and formula if needed
• Special dietary items for family members

DOCUMENTS (waterproof pouch):
• National ID cards (NID) — copies
• Birth certificates
• Property documents
• Medical records
• Insurance papers
• Emergency contact list (written on paper)
• Some cash (ATMs may not work)

FIRST AID KIT:
• Bandages (assorted sizes)
• Sterile gauze pads
• Antiseptic (Dettol, Savlon)
• Paracetamol, Antacid tablets
• ORS sachets (essential in Bangladesh)
• Personal prescription medications (30-day supply)
• Thermometer
• Scissors and safety pins

TOOLS & SUPPLIES:
• Battery-powered or hand-crank radio
• Torch/flashlight with extra batteries
• Power bank (fully charged)
• Whistle (to signal rescuers)
• Basic toolkit (hammer, wrench, screwdriver)
• Work gloves
• Dust masks or N95 masks
• Plastic sheeting and duct tape
• Matches in waterproof container
• Blankets or sleeping bags

FOR FAMILIES WITH SPECIAL NEEDS:
• Extra prescription glasses
• Hearing aid batteries
• Mobility aid supplies
• Pet food and supplies

YOUR FAMILY EMERGENCY PLAN:
1. Choose two meeting spots: one near home, one outside neighborhood
2. Identify an out-of-area contact everyone can check in with
3. Know your evacuation routes — at least two directions from home
4. Know the location of nearest shelter, hospital, fire station
5. Assign responsibilities: who carries the bag, who helps elderly members
6. Practice your evacuation plan every 6 months
7. Know how to turn off gas, water, electricity in your home

STORE & MAINTAIN:
• Store kit in an easily accessible, known location
• Check and replace food/water every 6 months
• Update documents when they change
• Check batteries every 3 months`,
      followups: ['Where are cyclone shelters in Bangladesh?', 'How to make water safe to drink?', 'Family communication plan for disasters']
    },

    /* ══ WATER SAFETY ══ */
    {
      id: 'watersafety',
      intents: ['water purification','safe water','boil water','water contamination','dirty water','drinking water emergency','cholera','diarrhea water','water borne'],
      keywords: [['water purif',5],['safe water',5],['boil water',5],['contaminat',4],['dirty water',4],['cholera',5],['diarrhea',4],['water borne',5],['ors',4],['dehydration',4]],
      response: `WATER SAFETY IN EMERGENCIES — Bangladesh Guide

MAKING WATER SAFE TO DRINK:
Method 1 — BOILING (most reliable):
• Bring water to a rolling boil for at least 1 minute
• At altitudes above 2000m: boil for 3 minutes
• Let cool naturally in a covered container
• Store in clean, covered containers

Method 2 — CHEMICAL TREATMENT:
• Water purification tablets (Halzone, Aquatabs): follow package instructions
• Bleach (Sodium Hypochlorite 1%): 1 drop per litre, wait 30 minutes
• Clear water: 2 drops per litre. Cloudy water: 4 drops per litre

Method 3 — FILTRATION:
• Portable water filters (available in emergency kits)
• Improvised: cloth → sand → gravel → charcoal layers in container
• This removes particles but does NOT remove all bacteria — also treat chemically

ORS (ORAL REHYDRATION SOLUTION) — Critical in Bangladesh:
• ORS treats dehydration from diarrhea — saves thousands of lives
• Available at every pharmacy and most shops in Bangladesh
• Homemade ORS: 1 litre clean water + 6 teaspoons sugar + 0.5 teaspoon salt
• Give small sips continuously, not large amounts at once
• For infants: consult doctor or call 16000 (health helpline)

WATERBORNE DISEASES IN BANGLADESH:
• Cholera: sudden severe diarrhea and vomiting — ORS and immediate hospital
• Typhoid: sustained fever, abdominal pain — hospital required
• Hepatitis A: jaundice, fatigue — rest and hydration
• Leptospirosis: from floodwater contact — fever, muscle pain — hospital required

FLOOD WATER SAFETY:
• Never drink floodwater — it contains sewage, chemicals, animal waste
• Do not use floodwater for cooking or washing food
• Wash hands with soap thoroughly after any floodwater contact
• Floodwater in wounds causes serious infection — clean and cover immediately
• Discard all food that has been in contact with floodwater`,
      followups: ['How to treat diarrhea in an emergency?', 'ORS recipe for children', 'Signs of serious dehydration']
    },

    /* ══ BUILDING COLLAPSE ══ */
    {
      id: 'buildingcollapse',
      intents: ['building collapse','collapsed building','trapped in building','structural collapse','rubble','rana plaza','debris','buried alive','building fell'],
      keywords: [['collapse',5],['rubble',5],['debris',5],['trapped',4],['buried',5],['structural',4],['building fell',5],['rescue collapse',5],['aftershock',3]],
      response: `BUILDING COLLAPSE — Rescue and Survival Guide

IF YOU ARE TRAPPED:
1. Stay calm — panic wastes energy and oxygen
2. Cover mouth with clothing to filter dust
3. Do NOT light a match or lighter — gas leaks possible
4. Tap on pipes or walls rhythmically — rescuers listen for these sounds
5. Use a whistle if available
6. Shout only periodically — conserves energy
7. If phone works: call 999 and stay on the line, text if voice fails
8. Try to create space above you if possible — move debris to sides
9. Conserve water if you have any

IF YOU ARE OUTSIDE AND OTHERS ARE TRAPPED:
1. Call 999 and 102 (Civil Defence) immediately
2. Do NOT attempt to enter the collapsed structure — risk of secondary collapse
3. Call out to trapped persons — note where responses come from
4. Keep bystanders back from the collapse zone
5. Mark areas where survivors have been heard
6. Guide rescue services to exact locations when they arrive

PROFESSIONAL RESCUE CONTACTS:
• Fire Brigade (trained for building rescue): 101
• Bangladesh National Civil Defence: 102
• Police: 100 or 999
• Army: Called by government in major collapses

AFTERSHOCK RISK:
• Building collapses from earthquakes: strong aftershocks likely
• Rescuers and survivors near collapse must be ready to take cover
• Each aftershock can cause further collapse of weakened structures

STRUCTURAL WARNING SIGNS (evacuate before collapse):
• Cracks appearing in walls that grow over time
• Floors that slope or feel unsteady
• Doors and windows that no longer close properly
• Visible settlement or sinking of the building
• Sounds of creaking or cracking from structure
• In Bangladesh: many buildings are dangerously overloaded — report to RAJUK: 02-9123985

RANA PLAZA LESSON — Bangladesh:
• Always inspect buildings you live or work in
• Report visible structural damage to RAJUK or local authority
• Never ignore structural warning signs
• Know your building's structural history`,
      followups: ['What to do after an earthquake?', 'How to report unsafe buildings in Bangladesh?', 'Emergency contacts for rescue']
    },

    /* ══ WEATHER ALERTS ══ */
    {
      id: 'weather',
      intents: ['weather alert','storm warning','heavy rain','thunder','lightning','weather warning','bmd alert','meteorological','flood warning','weather forecast emergency'],
      keywords: [['weather alert',5],['storm warning',5],['heavy rain',4],['thunder',4],['lightning',4],['weather warning',5],['bmd',5],['meteorological',4],['flood warning',5],['forecast',3]],
      response: `WEATHER EMERGENCY ALERTS — Bangladesh

OFFICIAL WARNING SOURCES:
• Bangladesh Meteorological Department (BMD): bmd.gov.bd
• BMD Phone: 02-9127600
• Radio Bangladesh (Bangladesh Betar): emergency alerts
• Signal flags at coastal ports for maritime warnings
• TV: Bangladesh Television (BTV) for official alerts

CYCLONE SIGNAL NUMBERS:
• Signal 1-2: Be aware, prepare
• Signal 3-4: Local danger — take precautions
• Signal 5-6: Danger — fishermen return to shore, boats secure
• Signal 7-8: Great danger — evacuate low-lying coastal areas NOW
• Signal 9-10: Very dangerous — all coastal and riverine areas MUST evacuate
• Signal 11 (rare): Extreme conditions, most powerful cyclone

THUNDER AND LIGHTNING SAFETY:
• If you hear thunder — you are in lightning range. Seek shelter immediately.
• The 30/30 rule: if thunder comes within 30 seconds of lightning — take shelter. Wait 30 minutes after last lightning before going outside.
• Safe shelters: substantial buildings, hard-topped vehicles
• Unsafe: open fields, hilltops, under trees, near water, open shelters
• If caught outdoors: crouch low on balls of feet, hands on knees — do not lie flat
• Indoor: stay away from windows, plumbing, electrical appliances, corded phones

BANGLADESH FLASH FLOOD WARNING:
• Flash floods develop within 6 hours of heavy rain
• Haor region most vulnerable (Sunamganj, Netrokona, Kishoreganj)
• Monitor local water levels — if rising rapidly, move to higher ground
• Do not try to cross flooded rivers or roads

MONSOON PREPAREDNESS (June - October):
• Prepare emergency kit before June each year
• Know your nearest flood shelter address
• Store 1 week of food and water before monsoon peak
• Ensure drainage around your home is clear`,
      followups: ['Cyclone signal guide', 'Flash flood warning signs', 'Lightning safety in Bangladesh']
    },

    /* ══ FIRST AID KIT ══ */
    {
      id: 'firstaidkit',
      intents: ['first aid kit','what to put in first aid','first aid box','first aid bag','medical supplies','emergency medicine','home first aid'],
      keywords: [['first aid kit',5],['first aid box',5],['first aid bag',5],['medical supplies',4],['emergency medicine',4],['home first aid',5],['aid kit',4]],
      response: `COMPLETE FIRST AID KIT — Bangladesh Home Edition

WOUND CARE:
• Adhesive bandages (plasters) — assorted sizes
• Sterile gauze pads — 5cm and 10cm
• Elastic bandage (crepe bandage) — 5cm and 10cm widths
• Medical adhesive tape (micropore)
• Sterile eye pads
• Triangular bandage (sling)
• Cotton wool
• Antiseptic wipes
• Antiseptic solution: Dettol or Savlon
• Povidone-iodine (Betadine) for wound cleaning

TOOLS:
• Scissors (blunt-ended for safety)
• Tweezers
• Digital thermometer
• Penlight/torch
• Safety pins — assorted
• Disposable gloves (at least 4 pairs)
• Face shield or pocket CPR mask
• Cold pack (instant)

MEDICATIONS:
• Paracetamol tablets and syrup for children
• Ibuprofen (for adults — not for children under 12 without doctor advice)
• Antacid tablets
• Antihistamine (for allergic reactions)
• Oral Rehydration Salts (ORS) — minimum 10 sachets
• Oral rehydration solution for children
• Antidiarrheal medicine (consult pharmacist)
• Eye drops (artificial tears)
• Antiseptic cream (Neosporin or similar)
• Hydrocortisone cream (mild allergic skin reactions)

SPECIALTY ITEMS:
• Epipen if any family member has anaphylaxis history
• Extra prescription medications (30-day supply)
• Medical information card for each family member (blood type, allergies, medications)

WHERE TO BUY IN BANGLADESH:
• Most items available at pharmacies (dakpatthar) without prescription
• Complete pre-made kits available at larger pharmacies
• Dhaka: Lazz Pharma, Nipa, Popular Drug House
• Cost: A complete home kit typically costs Tk. 1,500-3,000

MAINTAIN YOUR KIT:
• Check expiry dates every 6 months
• Replace used items immediately
• Store in cool, dry location — not in bathroom (humidity)
• Keep out of reach of children but accessible to adults
• Post the kit location on your home emergency plan`,
      followups: ['How to treat minor cuts and scrapes?', 'What medications are essential for home?', 'Baby first aid kit guide']
    },

    /* ══ COVID / INFECTION ══ */
    {
      id: 'infection',
      intents: ['infection','covid','corona','fever','high fever','dengue','chikungunya','malaria','epidemic','outbreak','disease spread'],
      keywords: [['infection',4],['covid',5],['corona',5],['fever',4],['dengue',5],['malaria',5],['epidemic',4],['outbreak',4],['virus',4],['disease',3],['quarantine',4],['isolation',3]],
      response: `INFECTIOUS DISEASE EMERGENCY — Bangladesh Guide

HIGH FEVER — When to go to hospital:
• Temperature above 39.5°C (103°F) that does not reduce with paracetamol
• Fever with stiff neck and sensitivity to light (meningitis signs)
• Fever with skin rash developing
• Fever with confusion or altered consciousness
• Fever that lasts more than 3 days without clear cause

DENGUE FEVER — Most common emergency in Bangladesh:
WARNING SIGNS requiring immediate hospital:
• Severe abdominal pain or persistent vomiting
• Vomiting blood or blood in stool
• Skin bleeding (bruising, red spots, bleeding gums)
• Rapid breathing or difficulty breathing
• Cold, clammy skin, rapid pulse (shock)
• Severe fatigue or restlessness

Home management of mild dengue:
• Complete bed rest
• Drink 2-3 litres of fluid daily (ORS, coconut water, water)
• Take paracetamol for fever — NOT aspirin or ibuprofen
• Mosquito net even indoors
• Monitor platelet count — daily blood tests if suspected dengue

MALARIA:
• Suspicious symptoms: chills, fever, sweating in cycles, headache, muscle pain
• High risk: Chittagong Hill Tracts, Cox's Bazar area
• Test at upazila health complex (rapid malaria test available)
• Free treatment at government hospitals

INFECTION CONTROL IN OUTBREAKS:
• Wash hands with soap for 20 seconds: before eating, after toilet, after coughing
• Use N95/surgical mask if respiratory illness is spreading
• Maintain ventilation in all rooms
• Health Helpline: 16000 (24/7)
• COVID/Health Emergency: 10655
• IEDCR (disease outbreak reporting): 02-9898246`,
      followups: ['Dengue prevention in Bangladesh', 'Signs of malaria', 'How to care for fever at home']
    },

    /* ══ HELP / COMMANDS ══ */
    {
      id: 'help',
      intents: ['help','what can you do','topics','what do you know','capabilities','what questions','how to use','guide'],
      keywords: [['help',3],['what can',3],['topics',4],['know',2],['capabilit',4],['questions',3],['guide',3],['how to use',4],['what do',2]],
      response: `RESCUEGPT — Complete Topic Guide

I can answer questions about all of these topics:

DISASTERS & WEATHER:
• Flood safety and evacuation
• Cyclone preparedness (coastal Bangladesh)
• Earthquake survival and Drop-Cover-Hold On
• Building collapse rescue
• Flash flood warnings
• Weather alerts and cyclone signals

FIRE & GAS:
• Building fire evacuation
• Gas leak emergency steps
• LPG cylinder safety
• Electrical fire response

FIRST AID:
• CPR (adult, child, infant)
• Bleeding control and tourniquets
• Burns treatment (all types)
• Choking and Heimlich maneuver
• Snake bite first aid
• Heatstroke treatment
• Drowning response

ACCIDENTS & INJURIES:
• Road accident first response
• Building collapse survival
• Head injury assessment
• Spinal injury precautions

HEALTH & DISEASE:
• Dengue fever warning signs
• Water purification methods
• ORS preparation
• Infection control
• Mental health crisis support

PREPAREDNESS:
• Emergency kit contents
• Family emergency plan
• Disaster supply list
• First aid kit guide

CONTACTS:
• All Bangladesh emergency numbers
• Hospital contacts
• Disaster management contacts

ANIMALS:
• Dog bite treatment
• Snake bite identification
• Animal rescue contacts

Just ask me your question in normal language. I understand questions in English.`,
      followups: ['Emergency numbers in Bangladesh', 'How to do CPR?', 'What to do in a flood?']
    }
  ];

  /* ── CONTEXT MEMORY ───────────────────────────────── */
  const context = {
    lastTopicId: null,
    lastTopicTime: 0,
    turnCount: 0,
    askedAbout: new Set()
  };

  /* ── INTENT SCORING ENGINE ────────────────────────── */
  function scoreEntry(entry, input) {
    let score = 0;
    const normalized = input.toLowerCase().trim();

    /* Exact intent match — highest priority */
    for (const intent of entry.intents) {
      if (normalized.includes(intent)) {
        score += 20 + intent.length; /* longer intents = more specific = higher score */
      }
    }

    /* Keyword scoring */
    for (const [word, weight] of entry.keywords) {
      if (normalized.includes(word)) {
        score += weight;
      }
    }

    return score;
  }

  function findBestMatch(input) {
    let bestScore = 0;
    let bestEntry = null;

    for (const entry of KB) {
      const score = scoreEntry(entry, input);
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    return { entry: bestEntry, score: bestScore };
  }

  /* ── CONTEXTUAL FOLLOW-UP DETECTION ──────────────── */
  function detectFollowUp(input) {
    const followUpPhrases = [
      'tell me more', 'more details', 'what else', 'and then', 'after that',
      'what about', 'how about', 'anything else', 'continue', 'go on',
      'more info', 'explain more', 'elaborate'
    ];
    const norm = input.toLowerCase();
    return followUpPhrases.some(p => norm.includes(p));
  }

  function detectNegation(input) {
    const neg = ['not', "don't", 'never', 'no', 'cannot', 'without'];
    const norm = input.toLowerCase();
    return neg.some(w => norm.split(' ').includes(w));
  }

  /* ── UNCERTAINTY RESPONSES ────────────────────────── */
  const FALLBACKS = [
    `I am not sure I fully understood your question. Could you rephrase it?

You can ask me about:
• Flood, cyclone, earthquake, or fire safety
• First aid: CPR, burns, bleeding, choking
• Emergency numbers in Bangladesh
• Disaster preparedness tips

For any immediate emergency — call 999 now.`,

    `I am a rescue and emergency specialist. Your question may be outside my expertise.

Topics I handle well:
• Emergency first aid and procedures
• Natural disaster response
• Bangladesh emergency contacts
• Disaster preparedness

Please try rephrasing your question, or ask about one of these topics.`,

    `I did not quite get that. I work best with emergency and safety questions.

Examples of what I can answer:
• "What should I do during a flood?"
• "How do I perform CPR?"
• "What are the emergency numbers in Bangladesh?"
• "How to treat a burn?"

What is your emergency or safety question?`
  ];

  let fallbackIdx = 0;
  function getFallback() {
    const r = FALLBACKS[fallbackIdx % FALLBACKS.length];
    fallbackIdx++;
    return r;
  }

  /* ── MAIN RESPOND FUNCTION ────────────────────────── */
  function respond(userInput) {
    if (!userInput || userInput.trim().length === 0) {
      return {
        text: 'Please type your emergency or safety question. I am ready to help.',
        followups: ['Emergency numbers', 'How to do CPR?', 'Flood safety steps']
      };
    }

    context.turnCount++;
    const input = userInput.trim();
    const { entry, score } = findBestMatch(input);

    /* Confidence threshold */
    const THRESHOLD = 4;

    if (!entry || score < THRESHOLD) {
      return { text: getFallback(), followups: ['What can you help with?', 'Emergency numbers in Bangladesh', 'First aid guide'] };
    }

    /* Update context */
    context.lastTopicId = entry.id;
    context.lastTopicTime = Date.now();
    context.askedAbout.add(entry.id);

    return {
      text: entry.response,
      followups: entry.followups || [],
      topicId: entry.id
    };
  }

  /* ── SUGGESTED QUICK QUESTIONS ────────────────────── */
  const QUICK_QUESTIONS = [
    { label: 'Flood Safety',          text: 'What should I do during a flood?' },
    { label: 'Fire Emergency',        text: 'What to do in a building fire?' },
    { label: 'CPR Steps',             text: 'How do I perform CPR?' },
    { label: 'Earthquake',            text: 'What to do during an earthquake?' },
    { label: 'Cyclone Safety',        text: 'How to stay safe during a cyclone?' },
    { label: 'Emergency Numbers',     text: 'What are all emergency numbers in Bangladesh?' },
    { label: 'Burns First Aid',       text: 'How to treat a burn?' },
    { label: 'Snake Bite',            text: 'What to do for a snake bite?' },
    { label: 'Emergency Kit',         text: 'What should I put in an emergency kit?' },
    { label: 'Choking',               text: 'How to help a choking person?' },
    { label: 'Bleeding Control',      text: 'How to stop severe bleeding?' },
    { label: 'Gas Leak',              text: 'What to do if there is a gas leak?' },
  ];

  /* ── PUBLIC API ───────────────────────────────────── */
  return {
    respond,
    quickQuestions: QUICK_QUESTIONS,
    topicCount: KB.length,
    version: '4.0-offline'
  };

})();
