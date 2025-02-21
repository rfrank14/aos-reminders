import { keyPicker, tagAs } from 'factions/metatagger'
import { GenericEffects } from 'generic_rules'
import meta_rule_sources from 'meta/rule_sources'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  DURING_GAME,
  DURING_SETUP,
  END_OF_COMBAT_PHASE,
  END_OF_MOVEMENT_PHASE,
  HERO_PHASE,
  MOVEMENT_PHASE,
  SAVES_PHASE,
  SHOOTING_PHASE,
  START_OF_HERO_PHASE,
  START_OF_SETUP,
  TURN_FOUR_START_OF_ROUND,
  WOUND_ALLOCATION_PHASE,
} from 'types/phases'
import command_abilities from './command_abilities'
import prayers from './prayers'
import rule_sources from './rule_sources'
import spells from './spells'

const DuardinArtilleryEffects = [
  {
    name: `Duardin Artillery`,
    desc: `The Crew are in cover while they are within 1" of their war machine.`,
    when: [DURING_GAME],
    shared: true,
  },
  {
    name: `Duardin Artillery`,
    desc: `The war machine does not need to take battleshock tests and is unaffected by any attack or ability that uses Bravery.`,
    when: [BATTLESHOCK_PHASE],
    shared: true,
  },
  {
    name: `Duardin Artillery`,
    desc: `The war machine cannot make charge moves.`,
    when: [CHARGE_PHASE],
    shared: true,
  },
  {
    name: `Duardin Artillery`,
    desc: `If its Crew are within 1" of the model in the shooting phase, they can fire the war machine.`,
    when: [SHOOTING_PHASE],
    shared: true,
  },
  {
    name: `Duardin Artillery`,
    desc: `This model can only move if its Crew are within 1" at the start of the movement phase.`,
    when: [MOVEMENT_PHASE],
    shared: true,
  },
]
const CelestialHurricanumEffects = [
  {
    name: `Locus of Azyr`,
    desc: `Add 1 to casting rolls made for friendly COLLEGIATE ARCANE WIZARDS wholly within 12" of any friendly CELESTIAL HURRICANUMS.`,
    when: [HERO_PHASE],
    shared: true,
  },
  {
    name: `Portents of Battle`,
    desc: `Add 1 to hit rolls for attacks made by friendly CITIES OF SIGMAR models within range of the Portents of Battle ability of any friendly CELESTIAL HURRICANUMS. Range is on damage table.`,
    when: [DURING_GAME],
    shared: true,
  },
  {
    name: `Storm of Shemtek`,
    desc: `Roll a number of dice equal to the Storm of Shemtek value shown on this model's damage table. For each 2+, the target suffers D3 mortal wounds.`,
    when: [SHOOTING_PHASE],
    shared: true,
  },
]
const LuminarkEffects = [
  {
    name: `Aura of Protection`,
    desc: `Roll a D6 each time you allocate a wound or mortal wound to a friendly CITIES OF SIGMAR model within range of any friendly LUMINARKS OF HYSH. On a 6+, that wound or mortal wound is negated. The range of this ability is shown on the damage table.`,
    when: [WOUND_ALLOCATION_PHASE],
    shared: true,
  },
  {
    name: `Locus of Hysh`,
    desc: `Add 1 to unbinding rolls for friendly COLLEGIATE ARCANE WIZARDS wholly within 12" of any friendly LUMINARKS OF HYSH.`,
    when: [HERO_PHASE],
    shared: true,
  },
  {
    name: `Searing Beam of Light`,
    desc: `Pick 1 visible point on the battlefield within range of this ability (see damage table) and draw an imaginary straight line 1mm wide between that point and the closest part of this model's base. Roll a D6 for each unit that has models passed across by this line. For each roll that is equal to or greater than the Searing Beam of Light value shown on this model's damage table, that unit suffers D3 mortal wounds.`,
    when: [SHOOTING_PHASE],
    shared: true,
  },
]
const SteamTankEffects = [
  {
    name: `Bouncing Cannon Balls`,
    desc: `Add 1 to hit rolls for attacks made by this model's Steam Cannon that target an enemy unit that has 10 or more models.`,
    when: [SHOOTING_PHASE],
    shared: true,
  },
  {
    name: `More Pressure!`,
    desc: `You can choose to overpressure this model's boiler. If you do so, roll 2D6. If the roll is less than the number of wounds currently allocated to this model, this model immediately suffers D3 mortal wounds. If the roll is equal to or greater than the number of wounds currently allocated to this model, until the start of your next hero phase, you can add 2 to this model's Move characteristic and add 2 to the Attacks characteristic of this model's Steam Gun.`,
    when: [START_OF_HERO_PHASE],
    shared: true,
  },
  {
    name: `Steel Behemoth`,
    desc: `After this model makes a charge move, you can pick 1 enemy unit within 1" of this model and roll a D6. On a 2+, that enemy unit suffers D3 mortal wounds.`,
    when: [CHARGE_PHASE],
    shared: true,
  },
]
const BloodSacrificeEffect = {
  name: `Blood Sacrifice`,
  desc: `At the start of your hero phase, you can pick 1 friendly DARKLING COVEN model within 3" to be slain. If you do so, add 2 to casting rolls for this model until the end of that phase.`,
  when: [START_OF_HERO_PHASE],
  shared: true,
}
const NoxiousBreathEffect = {
  name: `Noxious Breath`,
  desc: `Do not use the attack sequence for an attack made with Noxious Breath. Instead, roll a number of dice equal to the number of models from the target unit that are in range of the attack. For each 6, the target unit suffers 1 mortal wound.`,
  when: [SHOOTING_PHASE],
  shared: true,
}
const WitnessToDestinyEffect = {
  name: `Witness to Destiny`,
  desc: `Roll a D6 each time you allocate a wound or mortal wound to this model. On a 4+, that wound or mortal wound is negated.`,
  when: [WOUND_ALLOCATION_PHASE],
  shared: true,
}
const AttunedToMagicEffects = [
  {
    name: `Attuned to Magic`,
    desc: `If a friendly WIZARD within 12" of this model casts a spell that is not unbound, this model is imbued with magical energy until the start of your next hero phase. Add 1 to save rolls for attacks that target this model while it is imbued with magical energy (this ability can never add more than 1 to the save roll).`,
    when: [HERO_PHASE],
    shared: true,
  },
  {
    name: `Attuned to Magic`,
    desc: `Add 1 to save rolls for attacks that target this model while it is imbued with magical energy (this ability can never add more than 1 to the save roll).`,
    when: [SAVES_PHASE],
    shared: true,
  },
]
const LordlingAndRanksOfColdSteelEffects = [
  {
    name: `Lordling`,
    desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
    when: [COMBAT_PHASE],
    shared: true,
  },
  {
    name: `Ranks of Cold Steel`,
    desc: `Add 1 to hit rolls for attacks made by this unit if it has 10 or more models.`,
    when: [COMBAT_PHASE],
    shared: true,
  },
]
const DrummerEffect = {
  name: `Drummer`,
  desc: `Add 1 to run and charge rolls for units that include any Drummers.`,
  when: [MOVEMENT_PHASE, CHARGE_PHASE],
  shared: true,
}
const TrumpeterEffect = {
  name: `Trumpeter`,
  desc: `Add 1 to charge rolls for units that include any Trumpeters.`,
  when: [CHARGE_PHASE],
  shared: true,
}
const MusicianEffect = {
  name: `Musician`,
  desc: `Add 1 to run and charge rolls for units that include any Musicians.`,
  when: [MOVEMENT_PHASE, CHARGE_PHASE],
  shared: true,
}
const PiperEffect = {
  name: `Piper`,
  desc: `Add 1 to run and charge rolls for units that include any Pipers.`,
  when: [MOVEMENT_PHASE, CHARGE_PHASE],
  shared: true,
}
const SeaDragonCloakEffect = {
  name: `Sea Dragon Cloak`,
  desc: `Add 1 to save rolls for attacks made with missile weapons that target this unit.`,
  when: [SAVES_PHASE],
  shared: true,
}
const StandardBearerEffect = {
  name: `Standard Bearer`,
  desc: `Add 1 to the Bravery characteristic of units that include any Standard Bearers.`,
  when: [BATTLESHOCK_PHASE],
  shared: true,
}
const DecapitatingSwingEffect = {
  name: `Decapitating Swing`,
  desc: `If the unmodified hit roll for an attack made with a Zweihander is 6, that attack inflicts 1 mortal wound on the target in addition to any normal damage.`,
  when: [COMBAT_PHASE],
  shared: true,
}
const getHornblowerEffect = (onlyCharge?: boolean) => {
  const RunAnd = onlyCharge ? `` : `run and `
  return {
    name: `Hornblower`,
    desc: `Add 1 to ${RunAnd}charge rolls for units that include any Hornblowers.`,
    when: [MOVEMENT_PHASE, CHARGE_PHASE],
    shared: true,
  }
}
const QuickWithTheLashEffect = {
  name: `Quick with the Lash`,
  desc: `Before you make a charge roll for this model, you can say that its Handlers are going to apply the lash. If you do so, roll 3D6, remove 1 dice of your choice, and then use the remaining 2D6 to determine the charge roll. However, if the 3D6 roll was a triple, this model suffers 1 mortal wound and it cannot make a charge move in that phase.`,
  when: [CHARGE_PHASE],
  shared: true,
}
const FrostheartPhoenixEffects = [
  ...AttunedToMagicEffects,
  {
    name: `Blizzard Aura`,
    desc: `Subtract 1 from wound rolls for attacks made with melee weapons by enemy units within range of the Blizzard Aura ability of any friendly models. The range of the Blizzard Aura ability for this model is shown on the damage table.`,
    when: [COMBAT_PHASE],
    shared: true,
  },
]
const FlamespyrePhoenixEffects = [
  ...AttunedToMagicEffects,
  {
    name: `Phoenix Reborn`,
    desc: `The first time this model is slain, before removing it from the battlefield, roll a D6. On a 1-3, this model is slain. On a 4-6, this model is not slain, all wounds allocated to it are healed, and any wounds that currently remain to be allocated to it are negated.`,
    when: [WOUND_ALLOCATION_PHASE],
    shared: true,
  },
  {
    name: `Wake of Fire`,
    desc: `After this model has made a normal move, pick 1 enemy unit that has any models that this model passed across and roll a D6. On a 2+, that unit suffers a number of mortal wounds equal to the Wake of Fire value shown on this model's damage table.`,
    when: [MOVEMENT_PHASE],
    shared: true,
  },
]
const MagicOfTheRealmsEffect = {
  name: `Magic of the Realms`,
  desc: `When you select this model to be part of your army, you must choose the realm that your Battlemage comes from.`,
  when: [START_OF_SETUP],
  shared: true,
}
const MagicOfTheRealmsCastingEffect = {
  name: `Magic of the Realms`,
  desc: `Add 1 to casting rolls for this model if the battle is taking place in the realm it comes from.`,
  when: [HERO_PHASE],
  shared: true,
}
const BattlemageMagicEffect = {
  name: `Magic`,
  desc: `This model knows the spell from its warscroll that includes the name of the realm it comes from.`,
  when: [HERO_PHASE],
}
const DenizenOfUlfenkarnEffect = {
  name: `Denizen of Ulfenkarn`,
  desc: `ULFENKARN is a city keyword (this means that this model cannot gain another city keyword if it is included in a Cities of Sigmar army - see the Strongholds of Order battle trait in Battletome: Cities of Sigmar).`,
  when: [DURING_GAME],
  shared: true,
}
const GrimResolveEffect = {
  name: `Grim Resolve`,
  desc: `Roll a D6 each time you allocate a wound or mortal wound to this model. On a 5+ it is negated.`,
  when: [WOUND_ALLOCATION_PHASE],
  rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
  shared: true,
}
const WeaponsOfBanishmentEffects = [
  {
    name: `Weapons of Banishment`,
    desc: `Double the damage characteristic for this models attacks if targeting a Wizard or Daemon.`,
    when: [SHOOTING_PHASE, COMBAT_PHASE],
    rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
    shared: true,
  },
  {
    name: `Weapons of Banishment`,
    desc: `This model can target endless spells with its attacks. If it scores a hit, roll 2D6. If the roll is greater than the endless spell casting value it is dispelled.`,
    when: [SHOOTING_PHASE, COMBAT_PHASE],
    rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
    shared: true,
  },
]
const PairedDrakefirePistolsEffect = {
  name: `Paired Drakefire Pistols`,
  desc: `Add 1 to the Attacks characteristic of a Drakefire Pistol for models armed with a pair of Drakefire Pistols.`,
  when: [SHOOTING_PHASE],
  shared: true,
}
const CinderblastBombEffect = {
  name: `Cinderblast Bomb`,
  desc: `Once per battle, in your shooting phase, a model armed with a Cinderblast Bomb can throw it. If they do so, pick 1 enemy unit within 6" of that model and roll a D6. On a 2+, that unit suffers D3 mortal wounds.`,
  when: [SHOOTING_PHASE],
  shared: true,
}

const Units = {
  Battlemage: {
    mandatory: {
      spells: [
        keyPicker(spells, [
          'Chain Lightning (Azyr)',
          'Fireball (Aqshy)',
          'Mystifying Miasma (Ulgu)',
          'Pall of Doom (Shyish)',
          "Pha's Protection (Hysh)",
          'Shield of Thorns (Ghyran)',
          'Transmutation of Lead (Chamon)',
          'Wildform (Ghur)',
        ]),
      ],
    },
    effects: [BattlemageMagicEffect, MagicOfTheRealmsCastingEffect, MagicOfTheRealmsEffect],
  },
  'Battlemage (Ayzr)': {
    mandatory: {
      spells: [keyPicker(spells, ['Chain Lightning (Azyr)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Aqshy)': {
    mandatory: {
      spells: [keyPicker(spells, ['Fireball (Aqshy)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Ulgu)': {
    mandatory: {
      spells: [keyPicker(spells, ['Mystifying Miasma (Ulgu)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Shyish)': {
    mandatory: {
      spells: [keyPicker(spells, ['Pall of Doom (Shyish)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Hysh)': {
    mandatory: {
      spells: [keyPicker(spells, ["Pha's Protection (Hysh)"])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Chamon)': {
    mandatory: {
      spells: [keyPicker(spells, ['Transmutation of Lead (Chamon)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Ghur)': {
    mandatory: {
      spells: [keyPicker(spells, ['Wildform (Ghur)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage (Ghyran)': {
    mandatory: {
      spells: [keyPicker(spells, ['Shield of Thorns (Ghyran)'])],
    },
    effects: [MagicOfTheRealmsCastingEffect],
  },
  'Battlemage on Griffon': {
    mandatory: {
      spells: [keyPicker(spells, ['Amber Spear', 'Wildform (Ghur)'])],
    },
    effects: [
      {
        name: `Amber Battlemage`,
        desc: `Add 1 to casting rolls for this model if the battle is taking place in Ghur.`,
        when: [HERO_PHASE],
      },
      {
        name: `Two-headed`,
        desc: `If the unmodified hit roll for an attack made with Twin Beaks is 6, that attack scores 2 hits on the target instead of 1. Make a wound and save roll for each hit.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Celestial Hurricanum with Celestial Battlemage': {
    mandatory: {
      spells: [keyPicker(spells, ['Comet of Casandora', 'Chain Lightning (Azyr)'])],
    },
    effects: [
      {
        name: `Celestial Battlemage`,
        desc: `Add 1 to casting rolls for this model if the battle is taking place in Azyr.`,
        when: [HERO_PHASE],
      },
      ...CelestialHurricanumEffects,
    ],
  },
  'Celestial Hurricanum': {
    effects: [...CelestialHurricanumEffects],
  },
  'Luminark of Hysh with White Battlemage': {
    mandatory: {
      spells: [keyPicker(spells, ['Burning Gaze'])],
    },
    effects: [
      ...LuminarkEffects,
      {
        name: `White Battlemage`,
        desc: `Add 1 to casting rolls for this model if the battle is taking place in Hysh.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Luminark of Hysh': {
    effects: [...LuminarkEffects],
  },
  Flagellants: {
    effects: [
      {
        name: `Prophet`,
        desc: `Leader gets +1 melee attack.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Glorious Martyrs`,
        desc: `+1 melee attacks if any models from this unit have been slain in the same turn. +2 attacks instead of 1 if 5 or more models from this unit have been slain in the same turn.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Fanatical Fury`,
        desc: `+1 to hit and to wound by this unit if it made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Wreckless Abandon`,
        desc: `Each time a model from this unit flees, you can pick 1 enemy unit within 6" of this unit and roll a D6. On a 4+, that enemy unit suffers 1 mortal wound.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  'Freeguild General': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Hold the Line'])],
    },
    effects: [
      DecapitatingSwingEffect,
      {
        name: `Inspiring Leader`,
        desc: `Add 1 to the Bravery characteristic of friendly FREEGUILD units while they are wholly within 18" of this model.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  'Freeguild General on Griffon': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Rousing Battle Cry'])],
    },
    effects: [
      {
        name: `Charging Lance`,
        desc: `This model's Freeguild Lance has a Rend characteristic of -2 instead of -1 if this model made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Freeguild Shield`,
        desc: `+1 to save.`,
        when: [DURING_GAME],
      },
      {
        name: `Skilled Rider`,
        desc: `Add 1 to run rolls for this model if it does not carry a Freeguild Shield.`,
        when: [MOVEMENT_PHASE],
      },
      {
        name: `Skilled Rider`,
        desc: `Add 1 to charge rolls for this model if it does not carry a Freeguild Shield.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Piercing Bloodroar`,
        desc: `Subtract 1 from the Bravery characteristic of enemy units while they are within 8" of any friendly units with this ability.`,
        when: [BATTLESHOCK_PHASE],
      },
    ],
  },
  'Freeguild Guard': {
    effects: [
      {
        name: `Sergeant`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      DrummerEffect,
      StandardBearerEffect,
      {
        name: `Massed Ranks`,
        desc: `+1 to hit for attacks made by this unit if it has 10 or more models.`,
        when: [COMBAT_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Parry and Block`,
        desc: `+1 save for attacks that target a unit armed with Freeguild Swords and Shields.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Wall of Spears`,
        desc: `Add 1 to wound rolls for attacks made with Freeguild Spears that target an enemy unit that made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
    ],
  },
  'Freeguild Crossbowmen': {
    effects: [
      {
        name: `Marksman`,
        desc: `+1 to hit for attacks made with this model's crossbow.`,
        when: [SHOOTING_PHASE],
      },
      PiperEffect,
      StandardBearerEffect,
      {
        name: `Reload, Fire!`,
        desc: `Add 1 to the Attacks characteristic of this unit's Freeguild Crossbows if it has 10 or more models, there are no enemy models within 3" of this unit, and this unit has not made a move in the same turn.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Freeguild Handgunners': {
    effects: [
      {
        name: `Marksman`,
        desc: `May replace their Freeguild Handgun with: Long Rifle; or Repeater Handgun. In addition, add 2 to hit rolls for attacks made with that model's Freeguild Handgun.`,
        when: [SHOOTING_PHASE],
      },
      PiperEffect,
      StandardBearerEffect,
      {
        name: `Stand and Shoot`,
        desc: `If an enemy unit finishes a charge move within 3" of this unit, this unit can receive the Unleash Hell command without the command being issued and without a command point being spent.'`,
        when: [CHARGE_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Steady Aim`,
        desc: `Add 1 to hit rolls for attacks made by this unit if it has 10 or more models, there are no enemy models within 3" of this unit, and this unit has not made a move in the same turn.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Crack Shot`,
        desc: `Enemy HEROES do not benefit from the Look Out, Sir! rule for attacks made with a Long Rifle.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Freeguild Greatswords': {
    effects: [
      {
        name: `Guild Champion`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      getHornblowerEffect(),
      StandardBearerEffect,
      DecapitatingSwingEffect,
      {
        name: `Oathsworn Honour Guard`,
        desc: `Add 1 to hit rolls for attacks made with melee weapons by this unit if it is wholly within 18" of any friendly FREEGUILD HEROES.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Demigryph Knights': {
    effects: [
      {
        name: `Preceptor`,
        desc: `Add 1 to the Attacks characteristic of that model's Demigryph Knight's Halberd or Demigryph Knight's Lance.`,
        when: [COMBAT_PHASE],
      },
      getHornblowerEffect(),
      StandardBearerEffect,
      {
        name: `Charging Lance`,
        desc: `Rend and Damage 2 for lances if this unit made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Savage Ferocity`,
        desc: `If the unmodified wound roll for an attack made with this unit's Beak and Talons is 6, that attack inflicts 1 mortal wound on the target in addition to any normal damage.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Freeguild Outriders': {
    effects: [
      {
        name: `Sharpshooter`,
        desc: `+1 Attacks for that model's Freeguild Cavalry Sabre. In addition, a Sharpshooter can replace their Repeater Handgun with: Grenade-launching Blunderbuss; or Brace of Pistols.`,
        when: [COMBAT_PHASE],
      },
      TrumpeterEffect,
      {
        name: `Expert Gunners`,
        desc: `Add 1 to the Attacks characteristic of this unit's Repeater Handguns if this unit is not within 3" of any enemy units.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Skilled Riders`,
        desc: `This unit can run and/or retreat and still shoot later in the same turn.`,
        when: [MOVEMENT_PHASE, SHOOTING_PHASE],
      },
    ],
  },
  'Freeguild Pistoliers': {
    effects: [
      {
        name: `Outrider`,
        desc: `+1 Attacks for that model's Sabre and Pistol Butt. In addition, a Sharpshooter can replace their Brace of Pistols with a Repeater Handgun.`,
        when: [COMBAT_PHASE],
      },
      TrumpeterEffect,
      {
        name: `Hail of Bullets`,
        desc: `After this unit makes a charge move, it can shoot with any Braces of Pistols it is armed with.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Reckless Riders`,
        desc: `You can reroll run and charge rolls for this unit.`,
        when: [MOVEMENT_PHASE, CHARGE_PHASE],
      },
    ],
  },
  'Warden King': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Ancestral Grudge'])],
    },
    effects: [
      {
        name: `Oath Stone`,
        desc: `In your hero phase, you can say this model will stand atop its oath stone. If you do so, until the start of your next turn, this model cannot move. In addition, until the start of your next turn, do not take battleshock tests for friendly DISPOSSESSED units wholly within 18" of this model.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Runelord: {
    mandatory: {
      prayers: [keyPicker(prayers, ['Rune Lore: Ancestral Shield', 'Rune Lore: Forgefire'])],
    },
    effects: [
      {
        name: `Runes of Spellbreaking`,
        desc: `This model can attempt to dispel 1 endless spell in your hero phase and attempt to unbind 1 spell in the enemy hero phase. Add 2 to dispelling and unbinding rolls for this model.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Longbeards: {
    effects: [
      {
        name: `Old Guard`,
        desc: `Add 1 to the Attacks characteristic of the leader's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      MusicianEffect,
      {
        name: `Gromril Shieldwall`,
        desc: `Add 1 to save rolls for attacks made with melee weapons that target a unit with Gromril Shields.`,
        when: [SAVES_PHASE],
      },
      {
        name: `Old Grumblers`,
        desc: `Pick a grumble. That complaint is in effect until the start of your next hero phase.`,
        when: [HERO_PHASE],
      },
      {
        name: `Grumble - 'I thought duardin were made of sterner stuff!'`,
        desc: `Add 1 to the Bravery characteristic of friendly Dispossessed units while they are wholly within 12" of any units with this complaint.`,
        when: [HERO_PHASE],
      },
      {
        name: `Grumble - 'Put your back into it, beardling!'`,
        desc: `You can reroll wound rolls of 1 for attacks made by friendly Dispossessed units while they are wholly within 12" of any units with this complaint.`,
        when: [HERO_PHASE],
      },
      {
        name: `Grumble - 'Too much damned magic flying about these days!'`,
        desc: `A unit with this complaint can attempt to dispel 1 endless spell in your hero phase.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Ironbreakers: {
    effects: [
      PairedDrakefirePistolsEffect,
      {
        name: `Ironbeard`,
        desc: `+1 melee attacks. Can carry Drakefire Pistol and Cinderblast Bomb; or a pair of Drakefire Pistols.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      DrummerEffect,
      CinderblastBombEffect,
    ],
  },
  Irondrakes: {
    effects: [
      {
        name: `Ironwarden`,
        desc: `+1 Melee attack. Can carry Grudgehammer Torpedo; Drakefire Pistol and Cinderblast Bomb; or a pair of Drakefire Pistols.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      PairedDrakefirePistolsEffect,
      CinderblastBombEffect,
      {
        name: `Blaze Away`,
        desc: `Add 1 to the Attacks characteristic of this unit's missile weapons if there are no enemy units within 3" of this unit and this unit has not made a move in the same turn.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Forge-proven Gromril Armour`,
        desc: `Add 1 to save rolls for attacks made with missile weapons that target this unit.`,
        when: [SAVES_PHASE],
      },
      {
        name: `Grudgehammer Torpedo`,
        desc: `A Grudgehammer Torpedo has a Damage characteristic of D6 instead of D3 if the target is a MONSTER.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  Hammerers: {
    effects: [
      {
        name: `Keeper of The Gate`,
        desc: `Add 1 to the Attacks characteristic of this model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      MusicianEffect,
      {
        name: `Kingsguard`,
        desc: `Do not take battleshock tests for this unit while it is wholly within 12" of a friendly DISPOSSESSED HERO.`,
        when: [BATTLESHOCK_PHASE],
      },
      {
        name: `Shattering Blow`,
        desc: `If the unmodified wound roll for an attack made with a Gromril Great Hammer is 6, that attack inflicts 1 mortal wound on the target in addition to any normal damage.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Steam Tank with Commander': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Target Sighted'])],
    },
    effects: [
      {
        name: `I'll Fix It`,
        desc: `In your hero phase, you can heal up to D3 wounds allocated to this model if it includes a Commander and has not used the More Pressure! ability.`,
        when: [HERO_PHASE],
      },
      ...SteamTankEffects,
    ],
  },
  Cogsmith: {
    effects: [
      {
        name: `Free Arm`,
        desc: `Add 1 to hit rolls for attacks made with this model's missile weapons if it is not armed with a Cog Axe.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Free Arm`,
        desc: `Add 1 to hit rolls for attacks made with this model's melee weapons if it is not armed with a Grudge-raker.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Master Engineer`,
        desc: `In your hero phase, you can pick 1 friendly IRONWELD ARSENAL WAR MACHINE unit within 3" of this model. You can heal up to D3 wounds allocated to that unit.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Steamtank: {
    effects: [...SteamTankEffects],
  },
  'Helstorm Rocket Battery': {
    effects: [
      {
        name: `Rocket Salvo`,
        desc: `Add 1 to hit rolls for attacks made with this model's Helstorm Rocket Salvo if all of the attacks made by that Helstorm Rocket Salvo in the same phase target the same enemy unit.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Calculated Trajectory`,
        desc: `You can reroll hit rolls of 1 for attacks made with this model's Helstorm Rocket Salvo if this model is within 3" of a friendly IRONWELD ARSENAL ENGINEER.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Helblaster Volley Gun': {
    effects: [
      {
        name: `Point Blank`,
        desc: `Add 1 to hit rolls for attacks made with this model's missile weapons that target an enemy unit wholly within 12" of this model.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Helblaster Volley`,
        desc: `Before attacking with a Volley of Shots, choose either the 1 Deck, 2 Decks or 3 Decks missile weapon characteristics for that shooting attack. However, if the roll to determine the Attacks characteristic includes a double, this model cannot shoot in that phase and instead suffers 1 mortal wound.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Working Like Clockwork`,
        desc: `You can reroll any dice when rolling to determine the Attacks characteristic of this model's Volley of Shots if this model is within 3" of a friendly IRONWELD ARSENAL ENGINEER.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Gyrobombers: {
    effects: [
      {
        name: `Grudgebuster Bombs`,
        desc: `After this unit has made a normal move, pick 1 enemy unit and roll 1 dice for each model in this unit that passed across any models from that enemy unit. For each 2+, that enemy unit suffers D3 mortal wounds.`,
        when: [MOVEMENT_PHASE],
      },
    ],
  },
  Gyrocopters: {
    effects: [
      GenericEffects.Elite,
      {
        name: `Steam Gun`,
        desc: `Before attacking with a Steam Gun, pick 1 enemy unit that is within range of the attacking model's Steam Gun. The Attacks characteristic of that model's Steam Gun is equal to the number of models from that enemy unit within range of the attacking model's Steam Gun. All attacks made with that Steam Gun must target that enemy unit.`,
        when: [SHOOTING_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Guild Bombs`,
        desc: `Once per battle, after this unit has made a normal move, pick 1 enemy unit and roll 1 dice for each model in this unit that passed across any models from that enemy unit. For each 2+, that enemy unit suffers D3 mortal wounds.`,
        when: [MOVEMENT_PHASE],
      },
    ],
  },
  Sorceress: {
    mandatory: {
      spells: [keyPicker(spells, ['Word of Pain'])],
      command_abilities: [keyPicker(command_abilities, ['Command Underlings'])],
    },
    effects: [BloodSacrificeEffect],
  },
  'Sorceress on Black Dragon': {
    mandatory: {
      spells: [keyPicker(spells, ['Bladewind'])],
      command_abilities: [keyPicker(command_abilities, ['Command Underlings', 'Inspire Hatred'])],
    },
    effects: [BloodSacrificeEffect, NoxiousBreathEffect],
  },
  Dreadspears: {
    effects: [
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Coven Guard`,
        desc: `If the unmodified hit roll for an attack made with a Darkling Spear is 6, that weapon has a Rend characteristic of -1 for that attack.`,
        when: [COMBAT_PHASE],
      },
      ...LordlingAndRanksOfColdSteelEffects,
    ],
  },
  Bleakswords: {
    effects: [
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Quicksilver Strike`,
        desc: `If the unmodified hit roll for an attack made with a Darkling Sword is 6, that attack scores 2 hits on the target instead of 1. Make a wound and save roll for each hit.`,
        when: [COMBAT_PHASE],
      },
      ...LordlingAndRanksOfColdSteelEffects,
    ],
  },
  Darkshards: {
    effects: [
      {
        name: `Guardmaster`,
        desc: `Add 1 to hit rolls for attacks made with this model's missile weapon.`,
        when: [SHOOTING_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Storm of Iron-tipped Bolts`,
        desc: `Add 1 to hit rolls for attacks made with this unit's Repeater Crossbows if it has 10 or more models.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Black Guard': {
    effects: [
      {
        name: `Captain`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      DrummerEffect,
      {
        name: `Elite Bodyguard`,
        desc: `Add 1 to hit rolls for attacks made by this unit if this unit is wholly within 12" of a friendly DARKLING COVEN HERO.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  Executioners: {
    effects: [
      {
        name: `Draich Master`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      DrummerEffect,
      {
        name: `Severing Strike`,
        desc: `If the unmodified hit roll for an attack made with an Executioner's Draich is 6, that attack inflicts 1 mortal wound on the target and the attack sequence ends (do not make a wound or save roll).`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  Anointed: {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Captain of the Phoenix Guard'])],
    },
    effects: [
      {
        name: `Blessing of the Ur-Phoenix`,
        desc: `This model can attempt to dispel 1 endless spell in your hero phase and attempt to unbind 1 spell in the enemy hero phase.`,
        when: [HERO_PHASE],
      },
      WitnessToDestinyEffect,
    ],
  },
  'Anointed on Flamespyre Phoenix': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Captain of the Phoenix Guard (Flamespyre)'])],
    },
    effects: [...FlamespyrePhoenixEffects, WitnessToDestinyEffect],
  },
  'Anointed on Frostheart Phoenix': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Captain of the Phoenix Guard (Frostheart)'])],
    },
    effects: [...FrostheartPhoenixEffects, WitnessToDestinyEffect],
  },
  'Flamespyre Phoenix': {
    effects: [...FlamespyrePhoenixEffects],
  },
  'Frostheart Phoenix': {
    effects: [...FrostheartPhoenixEffects],
  },
  'Phoenix Guard': {
    effects: [
      {
        name: `Keeper of the Flame`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      {
        name: `Drummer`,
        desc: `Add 1 to charge rolls for units that include any Drummers.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Emboldened`,
        desc: `Do not take battleshock tests for this unit while it is wholly within 12" of a friendly PHOENIX TEMPLE HERO.`,
        when: [BATTLESHOCK_PHASE],
      },
      WitnessToDestinyEffect,
    ],
  },
  'Dreadlord on Black Dragon': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Do Not Disappoint Me'])],
    },
    effects: [
      {
        name: `Lance of Spite`,
        desc: `This model's Lance of Spite has a Rend characteristic of -2 instead of -1 and a Damage characteristic of 2 instead of 1 if this model made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
      NoxiousBreathEffect,
      {
        name: `Paired Exile Blades`,
        desc: `You can reroll hit rolls for attacks made with a pair of Exile Blades.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Tyrant Shield`,
        desc: `Add 1 to save rolls for attacks that target this model if it is armed with a Tyrant Shield.`,
        when: [SAVES_PHASE],
      },
    ],
  },
  'Drakespawn Knights': {
    effects: [
      {
        name: `Dread Knight`,
        desc: `Add 1 to the Attacks characteristic of that model's melee weapon.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(true),
      {
        name: `Lance Charge`,
        desc: `This unit's Barbed Lances have a Rend characteristic of -2 instead of -1 and a Damage characteristic of 2 instead of 1 if this unit made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Drakespawn Chariots': {
    effects: [
      {
        name: `Scythed Runners`,
        desc: `Each time a model from this unit finishes a charge move, you can pick 1 enemy unit within 1" of that model and roll a D6. On a 2+, that enemy unit suffers D3 mortal wounds. If this unit has more than 1 model, roll to determine if mortal wounds are inflicted after each model completes its charge move, but do not allocate the mortal wounds until after all of the models in the unit have moved.`,
        when: [CHARGE_PHASE],
      },
    ],
  },
  'War Hydra': {
    effects: [
      QuickWithTheLashEffect,
      {
        name: `Sever One Head, Another Takes Its Place`,
        desc: `Heal up to D3 wounds allocated to this model.`,
        when: [START_OF_HERO_PHASE],
      },
    ],
  },
  Assassin: {
    effects: [
      {
        name: `Deathshead Poison`,
        desc: `If the unmodified wound roll for an attack made with Poison-coated Blades is 6, that attack inflicts D3 mortal wounds and the attack sequence ends (do not make a save roll).`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Hidden Murderer`,
        desc: `Instead of setting up this model on the battlefield, you can place it to one side and say that it is set up in hiding as a reserve unit. If you do so, at the start of a combat phase, you can set up this model within 1" of a friendly Cities of Sigmar unit that has 5 or more models and a Wounds characteristic of 1. If this model is not set up on the battlefield before the start of the fourth battle round, it is slain.`,
        when: [DURING_SETUP],
      },
    ],
  },
  'Dark Riders': {
    effects: [
      {
        name: `Herald`,
        desc: `+1 to hit for that model's missile weapon.`,
        when: [SHOOTING_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(true),
      {
        name: `Sow Terror and Confusion`,
        desc: `Subtract 1 from the Bravery characteristic of enemy units while they are within 12" of any friendly DARK RIDERS.`,
        when: [BATTLESHOCK_PHASE],
      },
      {
        name: `Murderous Charge`,
        desc: `This unit's Barbed Spears have a Damage characteristic of 2 instead of 1 if this unit made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Shadow Warriors': {
    effects: [
      {
        name: `Shadow Walker`,
        desc: `+1 to hit for that model's missile weapon.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `One with the Shadows`,
        desc: `Instead of setting up this unit on the battlefield, you can place this unit to one side and say that it is set up in the shadows as a reserve unit.`,
        when: [DURING_SETUP],
      },
      {
        name: `One with the Shadows`,
        desc: `If you have set this unit up as a reserve unit, at the end of your movement phase, you can set up this unit anywhere on the battlefield more than 9" from any enemy units.`,
        when: [END_OF_MOVEMENT_PHASE],
      },
      {
        name: `One with the Shadows`,
        desc: `Any reserve units in the shadows that are not set up on the battlefield before the start of the fourth battle round are destroyed.`,
        when: [TURN_FOUR_START_OF_ROUND],
      },
      {
        name: `Strike Unseen`,
        desc: `Add 1 to hit and wound rolls for attacks made with missile weapons by this unit if this unit is in cover.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Black Ark Fleetmaster': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['At Them, You Curs!'])],
    },
    effects: [
      {
        name: `Murderous Swashbuckler`,
        desc: `If the unmodified hit roll for an attack made with a Black Ark Cutlass is 6, that attack scores 2 hits on the target instead of 1. Make a wound and save roll for each hit.`,
        when: [COMBAT_PHASE],
      },
      SeaDragonCloakEffect,
    ],
  },
  'Black Ark Corsairs': {
    effects: [
      {
        name: `Reaver`,
        desc: `+1 to hit for that model's attacks.`,
        when: [SHOOTING_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Flashing Steel`,
        desc: `Add 1 to hit rolls for attacks made by this unit if it has 15 or more models.`,
        when: [DURING_GAME],
      },
      SeaDragonCloakEffect,
    ],
  },
  'Scourgerunner Chariots': {
    effects: [
      {
        name: `High Beastmaster`,
        desc: `If this unit has 3 or more models, 1 model in this unit can be a High Beastmaster. Add 1 to hit rolls for attacks made with that model's missile weapons.`,
        when: [SHOOTING_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Lay the Beast Low`,
        desc: `If the unmodified hit roll for an attack made with a Ravager Harpoon is 6, that attack inflicts D3 mortal wounds on the target and the attack sequence ends (do not make a wound or save roll).`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  Kharibdyss: {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Feast of Bones'])],
    },
    effects: [
      {
        name: `Abyssal Howl`,
        desc: `Subtract 1 from the Bravery characteristic of enemy units within 12" of any models with this ability.`,
        when: [BATTLESHOCK_PHASE],
      },
      QuickWithTheLashEffect,
    ],
  },
  'Nomad Prince': {
    mandatory: {
      command_abilities: [keyPicker(command_abilities, ['Lord of the Deepwood Host'])],
    },
    effects: [
      {
        name: `Harrying Bird of Prey`,
        desc: `In your hero phase, you can pick 1 enemy HERO within 16" of this model. Until your next hero phase, subtract 1 from casting, dispelling and unbinding rolls for that model, and subtract 1 from hit rolls for attacks made by that model.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Eternal Guard': {
    effects: [
      {
        name: `Eternal Warden`,
        desc: `+1 to this model's melee attacks.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Fortress of Boughs`,
        desc: `Add 1 to save rolls for attacks that target this unit if this unit has not made a move in the same turn.`,
        when: [SAVES_PHASE],
      },
      {
        name: `Form Fortress of Boughs`,
        desc: `Add 1 to hit and wound rolls for attacks made by this unit if this unit has not made a move in the same turn.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Wildwood Rangers': {
    effects: [
      {
        name: `Wildwood Warden`,
        desc: `+1 to this model's melee attacks.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Guardians of the Kindred`,
        desc: `A Ranger's Draich has a Damage characteristic of 2 instead of 1 if the target is a MONSTER.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Wild Riders': {
    effects: [
      {
        name: `Wild Hunter`,
        desc: `+1 to this model's Hunting Spear attacks.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Unbound Fury`,
        desc: `This unit's Hunting Spears have a Rend characteristic of -2 instead of -1 and a Damage characteristic of 2 instead of 1 if this unit made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  'Sisters of the Watch': {
    effects: [
      {
        name: `High Sister`,
        desc: `Add 1 to the Attacks characteristic of that model's missile weapon.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Eldritch Arrows`,
        desc: `If the unmodified wound roll for an attack made with a Watch Bow is 6, that attack inflicts 1 mortal wound on the target in addition to any normal damage.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Loose Until the Last`,
        desc: `If an enemy unit finishes a charge move within 3" of this unit, this unit can receive the Unleash Hell command without the command being issued and without a command point being spent.`,
        when: [CHARGE_PHASE],
        rule_sources: [rule_sources.BATTLETOME_CITIES_OF_SIGMAR, rule_sources.ERRATA_JULY_2021],
      },
      {
        name: `Quicksilver Shot`,
        desc: `Add 1 to the Attacks characteristic of this unit's Watch Bows if there are no enemy models within 3" of this unit and this unit has not made a move in the same turn.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Sisters of the Thorn': {
    mandatory: {
      spells: [keyPicker(spells, ['Armour of Thorns'])],
    },
    effects: [
      {
        name: `Handmaiden of the Thorn`,
        desc: `+1 to this model's Deepwood Coven Staff attacks.`,
        when: [COMBAT_PHASE],
      },
      StandardBearerEffect,
      getHornblowerEffect(),
      {
        name: `Magic`,
        desc: `This unit is a Wizard while it has 2 or more models.`,
        when: [HERO_PHASE],
      },
    ],
  },
  Cannon: {
    effects: [
      ...DuardinArtilleryEffects,
      {
        name: `Explosive Shells`,
        desc: `You can reroll the damage inflicted by a Cannon Shell if the target unit has 10 or more models.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Rune of Accuracy`,
        desc: `You can reroll failed hit rolls when firing a Cannon Shell if there is an ENGINEER from your army within 1" of the war machine.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  'Organ Gun': {
    effects: [
      ...DuardinArtilleryEffects,
      {
        name: `Organ Fire`,
        desc: `In the shooting phase the Organ Gun's Crew can load 1, 2, 3 or 4 barrels. If they load 2 or more barrels, roll a D6; if the result is equal to or greater than the number of loaded barrels, make one Barrage of Shots attack for each loaded barrel (roll separately to determine the number of Barrage of Shots attacks made for each barrel being fired). However, if the result is less than the number of loaded barrels, the Organ Gun jams and no shots are fired this phase.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Rune of Forging`,
        desc: `You can reroll the dice rolled to see if an Organ Gun jams if there is an ENGINEER from your army within 1" of the war machine.`,
        when: [SHOOTING_PHASE],
      },
    ],
  },
  // Cursed City heroes
  'Brutogg Corpse-Eater': {
    effects: [
      {
        name: `Devour the Enemy`,
        desc: `If any enemy models are slain by attacks from this model during the combat phase, heal D3 wounds. If slain models include any DEATH models, heal D6 wounds.`,
        when: [END_OF_COMBAT_PHASE],
      },
      DenizenOfUlfenkarnEffect,
    ],
  },
  'Captain Emelda Braskov': {
    effects: [
      {
        name: `Deathblow`,
        desc: `If the unmodified hit roll for an attack made with Dawnlight is 6, that attack inflicts 1 mortal wound on the target in addition to normal damage.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Shining Exemplar`,
        desc: `While this model is within 3" of any enemy units, do not take battleshock tests for friendly units wholly within 9" of this model.`,
        when: [BATTLESHOCK_PHASE],
      },
      DenizenOfUlfenkarnEffect,
    ],
  },
  'Cleona Zeitengale': {
    mandatory: {
      prayers: [
        keyPicker(prayers, ['Celestial Prayers: Invigorating Touch', 'Celestial Prayers: Cometary Blast']),
      ],
    },
    effects: [DenizenOfUlfenkarnEffect],
  },
  'Glaurio Ven Alten III': {
    effects: [
      {
        name: `Point-blank Shot`,
        desc: `If an attack made with Noblesse hits a target within 3", that attack scores 1 mortal wound and the attack sequence ends.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Unrivalled Duellist`,
        desc: `Subtract 1 from melee hit rolls that target this model. If the attacker's unmodified hit roll is 1, attacking unit suffers 1 mortal wound after all of its attacks have been resolved.`,
        when: [COMBAT_PHASE],
      },
      DenizenOfUlfenkarnEffect,
    ],
  },
  'Octren Glimscry': {
    mandatory: {
      spells: [keyPicker(spells, ['Withering Hex'])],
    },
    effects: [
      {
        name: `Master of Mortality`,
        desc: `Roll a D6 each time you allocate a wound or mortal wound to this model. On a 6+, it is negated.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      DenizenOfUlfenkarnEffect,
      GenericEffects.WizardOneSpellEffect,
    ],
  },
  'Jelsen Darrock': {
    effects: [
      {
        name: `Firewood Stakes`,
        desc: `Pick 1 enemy unit within 1" of this model and roll a D6, add 1 to result if target has DEATH keyword. On 3+ that unit suffers 1 mortal wound.`,
        when: [END_OF_COMBAT_PHASE],
      },
      {
        name: `Judgement`,
        desc: `If an attack made with Judgement scores a hit. The attack sequence ends, roll a D6. If roll is double the target unit's Wounds characterstic or more, 1 model from the unit is slain after resolving this model's attacks. If the roll is less than double, the unit suffers 1 mortal wound after resolving this model's attacks.`,
        when: [SHOOTING_PHASE],
      },
      DenizenOfUlfenkarnEffect,
    ],
  },
  'Doralia Ven Denst': {
    effects: [
      GrimResolveEffect,
      {
        name: `Sureshot`,
        desc: `If this model has not moved this turn, add 1 to hit rolls for its Crossbow weapon.`,
        when: [MOVEMENT_PHASE, SHOOTING_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      ...WeaponsOfBanishmentEffects,
    ],
  },
  'Galen Ven Denst': {
    effects: [
      GrimResolveEffect,
      {
        name: `Agile Opponent`,
        desc: `This model can retreat and can still shoot and/or charge in the same turn.`,
        when: [MOVEMENT_PHASE, SHOOTING_PHASE, CHARGE_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      ...WeaponsOfBanishmentEffects,
    ],
  },
}

export default tagAs(Units, 'unit')
