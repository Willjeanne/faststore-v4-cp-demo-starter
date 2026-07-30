export type InkTonerModel = {
  label: string
  value: string
}

export type InkTonerProductLine = {
  label: string
  value: string
  models: InkTonerModel[]
}

export type InkTonerManufacturer = {
  label: string
  value: string
  productLines: InkTonerProductLine[]
}

export const DEFAULT_MANUFACTURERS: InkTonerManufacturer[] = [
  {
    label: 'HP',
    value: 'hp',
    productLines: [
      {
        label: 'LaserJet',
        value: 'laserjet',
        models: [
          { label: 'M455dn', value: 'm455dn' },
          { label: 'M404dn', value: 'm404dn' },
          { label: 'Pro M428fdw', value: 'pro-m428fdw' },
        ],
      },
      {
        label: 'OfficeJet',
        value: 'officejet',
        models: [
          { label: 'Pro 9015e', value: 'pro-9015e' },
          { label: 'Pro 8025e', value: 'pro-8025e' },
        ],
      },
      {
        label: 'DeskJet',
        value: 'deskjet',
        models: [
          { label: '2755e', value: '2755e' },
          { label: '4155e', value: '4155e' },
        ],
      },
    ],
  },
  {
    label: 'Canon',
    value: 'canon',
    productLines: [
      {
        label: 'PIXMA',
        value: 'pixma',
        models: [
          { label: 'TR8620a', value: 'tr8620a' },
          { label: 'G6020', value: 'g6020' },
        ],
      },
      {
        label: 'imageCLASS',
        value: 'imageclass',
        models: [
          { label: 'MF445dw', value: 'mf445dw' },
          { label: 'LBP6030w', value: 'lbp6030w' },
        ],
      },
    ],
  },
  {
    label: 'Brother',
    value: 'brother',
    productLines: [
      {
        label: 'HL-L Series',
        value: 'hl-l',
        models: [
          { label: 'HL-L2350DW', value: 'hl-l2350dw' },
          { label: 'HL-L3270CDW', value: 'hl-l3270cdw' },
        ],
      },
      {
        label: 'MFC Series',
        value: 'mfc',
        models: [
          { label: 'MFC-L2750DW', value: 'mfc-l2750dw' },
          { label: 'MFC-J995DW', value: 'mfc-j995dw' },
        ],
      },
    ],
  },
  {
    label: 'Epson',
    value: 'epson',
    productLines: [
      {
        label: 'EcoTank',
        value: 'ecotank',
        models: [
          { label: 'ET-2850', value: 'et-2850' },
          { label: 'ET-4800', value: 'et-4800' },
        ],
      },
      {
        label: 'WorkForce',
        value: 'workforce',
        models: [
          { label: 'WF-2960', value: 'wf-2960' },
          { label: 'WF-4830', value: 'wf-4830' },
        ],
      },
    ],
  },
]
