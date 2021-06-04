(() => ({
  name: 'Detail View Child',
  icon: 'DataContainer',
  category: 'DATA',
  structure: [
    {
      name: 'Column',
      options: [
        {
          label: 'Toggle visibility',
          key: 'visible',
          value: true,
          type: 'TOGGLE',
          configuration: {
            as: 'VISIBILITY',
          },
        },
        {
          value: 'flexible',
          label: 'Column width',
          key: 'columnWidth',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Fit content', value: 'fitContent' },
              { name: 'Flexible', value: 'flexible' },
              { name: 'Hidden', value: 'hidden' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
              { name: '4', value: '4' },
              { name: '5', value: '5' },
              { name: '6', value: '6' },
              { name: '7', value: '7' },
              { name: '8', value: '8' },
              { name: '9', value: '9' },
              { name: '10', value: '10' },
              { name: '11', value: '11' },
              { name: '12', value: '12' },
            ],
          },
        },
        {
          value: 'flexible',
          label: 'Column width (tablet landscape)',
          key: 'columnWidthTabletLandscape',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Fit content', value: 'fitContent' },
              { name: 'Flexible', value: 'flexible' },
              { name: 'Hidden', value: 'hidden' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
              { name: '4', value: '4' },
              { name: '5', value: '5' },
              { name: '6', value: '6' },
              { name: '7', value: '7' },
              { name: '8', value: '8' },
              { name: '9', value: '9' },
              { name: '10', value: '10' },
              { name: '11', value: '11' },
              { name: '12', value: '12' },
            ],
          },
        },
        {
          value: 'flexible',
          label: 'Column width (tablet portrait)',
          key: 'columnWidthTabletPortrait',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Fit content', value: 'fitContent' },
              { name: 'Flexible', value: 'flexible' },
              { name: 'Hidden', value: 'hidden' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
              { name: '4', value: '4' },
              { name: '5', value: '5' },
              { name: '6', value: '6' },
              { name: '7', value: '7' },
              { name: '8', value: '8' },
              { name: '9', value: '9' },
              { name: '10', value: '10' },
              { name: '11', value: '11' },
              { name: '12', value: '12' },
            ],
          },
        },
        {
          value: 'flexible',
          label: 'Column width (mobile)',
          key: 'columnWidthMobile',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              { name: 'Fit content', value: 'fitContent' },
              { name: 'Flexible', value: 'flexible' },
              { name: 'Hidden', value: 'hidden' },
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
              { name: '4', value: '4' },
              { name: '5', value: '5' },
              { name: '6', value: '6' },
              { name: '7', value: '7' },
              { name: '8', value: '8' },
              { name: '9', value: '9' },
              { name: '10', value: '10' },
              { name: '11', value: '11' },
              { name: '12', value: '12' },
            ],
          },
        },
        {
          value: '',
          label: 'Height',
          key: 'columnHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'White',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          type: 'CUSTOM',
          label: 'Horizontal Alignment',
          key: 'horizontalAlignment',
          value: 'inherit',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'inherit' },
              { name: 'Left', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Right', value: 'flex-end' },
            ],
          },
        },
        {
          type: 'CUSTOM',
          label: 'Vertical Alignment',
          key: 'verticalAlignment',
          value: 'inherit',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'None', value: 'inherit' },
              { name: 'Top', value: 'flex-start' },
              { name: 'Center', value: 'center' },
              { name: 'Bottom', value: 'flex-end' },
            ],
          },
        },
        {
          value: ['S', 'S', 'S', 'S'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: ['M', 'M', 'M', 'M'],
          label: 'Inner space',
          key: 'innerSpacing',
          type: 'SIZES',
        },
      ],
      descendants: [
        {
          name: 'DetailViewChild',
          options: [
            {
              value: '',
              label: 'Property',
              key: 'property',
              type: 'PROPERTY',
            },
            {
              type: 'VARIABLE',
              label: 'Label Text',
              key: 'labelText',
              value: [],
            },
            {
              value: 'Body1',
              label: 'Type',
              key: 'type',
              type: 'FONT',
            },
            {
              type: 'CUSTOM',
              label: 'Text Alignment',
              key: 'textAlignment',
              value: 'left',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'Left', value: 'left' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'right' },
                ],
              },
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              value: false,
              label: 'Side by Side',
              key: 'sideBySide',
              type: 'TOGGLE',
            },
            {
              value: true,
              label: 'Styles',
              key: 'styles',
              type: 'TOGGLE',
            },
            {
              type: 'COLOR',
              label: 'Text color',
              key: 'textColor',
              value: 'Black',
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'styles',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
            {
              type: 'CUSTOM',
              label: 'Label font weight',
              key: 'fontWeight',
              value: '800',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: '100', value: '100' },
                  { name: '200', value: '200' },
                  { name: '300', value: '300' },
                  { name: '400', value: '400' },
                  { name: '500', value: '500' },
                  { name: '600', value: '600' },
                  { name: '700', value: '700' },
                  { name: '800', value: '800' },
                  { name: '900', value: '900' },
                ],
                condition: {
                  type: 'SHOW',
                  option: 'styles',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
