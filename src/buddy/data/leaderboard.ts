import type { LeaderboardDivision } from '../types'

export const GAMEWEEK = 412

export const DIVISIONS: LeaderboardDivision[] = [
  {
    id: 'd1',
    name: 'All-Star · Division 3',
    competition: 'All-Star',
    rewardText: 'Top 3: Rare card · Top 50: ETH rewards',
    entries: [
      { rank: 1, manager: 'CardShark93', score: 342.1, streak: 27 },
      { rank: 2, manager: 'FutbolFanatic', score: 331.6, streak: 12 },
      { rank: 3, manager: 'MidfieldMaestro', score: 327.9, streak: 41 },
      { rank: 4, manager: 'You', score: 318.4, streak: 9, isYou: true },
      { rank: 5, manager: 'GoalMachineFC', score: 312.2, streak: 5 },
      { rank: 6, manager: 'LaMasiaScout', score: 305.8, streak: 18 },
      { rank: 7, manager: 'PressingGame', score: 298.3, streak: 3 },
      { rank: 8, manager: 'TikiTakaTim', score: 291.0, streak: 22 },
      { rank: 9, manager: 'CleanSheetKing', score: 287.5, streak: 7 },
      { rank: 10, manager: 'WonderkidHunter', score: 280.9, streak: 15 },
    ],
  },
  {
    id: 'd2',
    name: 'Champion Europe · Division 2',
    competition: 'Champion Europe',
    rewardText: 'Top 1: Super Rare card · Top 10: Rare card',
    entries: [
      { rank: 1, manager: 'BosmanRuling', score: 358.7, streak: 33 },
      { rank: 2, manager: 'XGWizard', score: 349.2, streak: 8 },
      { rank: 3, manager: 'You', score: 344.0, streak: 9, isYou: true },
      { rank: 4, manager: 'CounterAttack', score: 340.6, streak: 19 },
      { rank: 5, manager: 'SweeperKeeper', score: 333.1, streak: 2 },
      { rank: 6, manager: 'DerbyDominator', score: 329.8, streak: 11 },
      { rank: 7, manager: 'FalseNineFan', score: 322.4, streak: 26 },
      { rank: 8, manager: 'OffsideTrap', score: 316.0, streak: 6 },
      { rank: 9, manager: 'HatTrickHero', score: 309.7, streak: 14 },
      { rank: 10, manager: 'RegistaRoyalty', score: 301.3, streak: 4 },
    ],
  },
  {
    id: 'd3',
    name: 'Under 23 · Division 1',
    competition: 'Under 23',
    rewardText: 'Top 5: ETH rewards · Top 100: XP boost',
    entries: [
      { rank: 1, manager: 'You', score: 296.5, streak: 9, isYou: true },
      { rank: 2, manager: 'AcademyGraduate', score: 290.1, streak: 17 },
      { rank: 3, manager: 'NextGenScout', score: 284.8, streak: 30 },
      { rank: 4, manager: 'GoldenBoyPicks', score: 279.2, streak: 13 },
      { rank: 5, manager: 'YouthCoach', score: 271.6, streak: 21 },
      { rank: 6, manager: 'StarletSpotter', score: 265.0, streak: 1 },
      { rank: 7, manager: 'FirstTouchFC', score: 258.3, streak: 10 },
      { rank: 8, manager: 'LoanArmyWatch', score: 249.9, streak: 5 },
      { rank: 9, manager: 'PitchPerfect', score: 243.4, streak: 24 },
      { rank: 10, manager: 'BenchWarmerBob', score: 236.8, streak: 2 },
    ],
  },
]
